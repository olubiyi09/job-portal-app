import React, { useState } from 'react';
import styles from "./Modal.module.css"
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Button, Table } from 'antd';
import { setLoading } from '@/redux/loaderSlide';
import axios from 'axios';
import { toast } from 'sonner';
import moment from 'moment';

const Modal = ({
    showApplications,
    setShowApplications,
    selectedJob,
}) => {
    const router = useRouter();
    const [applications, setApplications] = React.useState([]);
    const dispatch = useDispatch();

    const fetchApplications = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(
                `/api/applications?job=${selectedJob._id}`
            );
            // console.log(response.data.data);
            setApplications(response.data.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const onStatusUpdate = async (applicationId, status) => {
        try {
            dispatch(setLoading(true));
            const response = await axios.put(`/api/applications/${applicationId}`, {
                status,
            });
            toast.success(response.data.message)
            fetchApplications();
        } catch (error) {
            message.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    React.useEffect(() => {
        fetchApplications();
    }, []);

    const columns = [
        // {
        //     title: "Application ID",
        //     dataIndex: "_id",
        // },
        {
            title: "Applicant Name",
            dataIndex: "user",
            render: (user) => user.name,
        },
        {
            title: "Email",
            dataIndex: "user",
            render: (user) => user.email,
        },
        {
            title: "Applied On",
            dataIndex: "createdAt",
            render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status, record) => (
                <select
                    value={status}
                    onChange={(e) => onStatusUpdate(record._id, e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
            ),
        },
        {
            title: "Actions",
            dataIndex: "_id",
            render: (applicationId, application) => (
                <Button
                    onClick={() => router.push(`/userinfo/${application.user._id}`)}
                >
                    View
                </Button>
            ),
        },
    ];


    const closeModal = () => {
        setShowApplications(false)
    };

    return (
        <div>
            {/* <button onClick={openModal}>Open Modal</button> */}

            {showApplications && (
                <div className={`${styles["modal-overlay"]}`}>
                    <div className={styles["modal"]}>

                        <div className={`my-3 ${styles["large-table"]}`}>
                            <Table columns={columns} dataSource={applications} rowKey="_id" />
                        </div>
                        <div className={`my-2 ${styles["mobile-table"]}`}>
                            <Table style={{ maxWidth: 500 }} columns={columns} dataSource={applications} rowKey="_id" scroll={{ x: true }} />
                        </div>
                        <span className={`flex justify-end mr-2 ${styles["close"]}`} onClick={closeModal}>
                            {/* &times; */}
                            close
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
