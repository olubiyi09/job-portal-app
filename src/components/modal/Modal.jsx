import React, { useState } from 'react';
import styles from "./Modal.module.css"
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
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

    const closeModal = () => {
        setShowApplications(false)
    };
    console.log(applications.length);

    return (
        <div>
            {showApplications && (
                <div className={`${styles["modal-overlay"]}`}>
                    <div className={styles["modal"]}>
                        <div className="tableContainer">
                            <div className={`my-3 ${styles["large-table"]}`}>
                                {applications.length === 0 ? <p>No Application Yet</p> : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Applicant ID</th>
                                                <th>Applicant Name</th>
                                                <th>Email</th>
                                                <th>Applied On</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications.map((application) => (
                                                <tr key={application._id}>
                                                    <td>{application.user._id}</td>
                                                    <td>{application.user.name}</td>
                                                    <td>{application.user.email}</td>
                                                    <td>{moment(application.createdAt).format("DD/MM/YYYY")}</td>
                                                    <td>
                                                        <select
                                                            value={application.status}
                                                            onChange={(e) => onStatusUpdate(application._id, e.target.value)}
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="shortlisted">Shortlisted</option>
                                                            <option value="accepted">Accepted</option>
                                                            <option value="rejected">Rejected</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => router.push(`/userinfo/${application.user._id}`)}>
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>


                            {/*  */}

                            <div className={`my-3 ${styles["mobile-table"]}`}>
                                {applications.length === 0 ? <p>No Application Yet</p> : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Applicant Name</th>
                                                <th>Email</th>
                                                <th>Applied On</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications.map((application) => (
                                                <tr key={application._id}>
                                                    <td>{application.user.name}</td>
                                                    <td>{application.user.email}</td>
                                                    <td>{moment(application.createdAt).format("DD/MM/YYYY")}</td>
                                                    <td>
                                                        <select
                                                            value={application.status}
                                                            onChange={(e) => onStatusUpdate(application._id, e.target.value)}
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="shortlisted">Shortlisted</option>
                                                            <option value="accepted">Accepted</option>
                                                            <option value="rejected">Rejected</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => router.push(`/userinfo/${application.user._id}`)}>
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                        </div>
                        <span className={`flex justify-end mr-2 ${styles["close"]}`} onClick={closeModal}>
                            close
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
