// "use client"
// import PageTitle from '@/components/PageTitle'
// import React, { useEffect, useState } from 'react'
// import styles from "../app/applications/Applications.module.css"
// import { useDispatch, useSelector } from 'react-redux'
// import { setLoading } from '@/redux/loaderSlide'
// import { toast } from 'sonner'
// import axios from 'axios'
// import { Modal, Table } from 'antd'
// import moment from 'moment'



// const Applications = ({
//     showApplications,
//     setShowApplications,
//     selectedJob,
// }: {
//     showApplications: boolean;
//     setShowApplications: (showApplications: boolean) => void;
//     selectedJob: any;
// }) => {

//     const [applications, setApplications] = useState([])
//     const dispatch = useDispatch()


//     const fetchApplications = async () => {
//         try {
//             dispatch(setLoading(true))
//             const response = await axios.get(`/api/applications?job=${selectedJob._id}`)
//             setApplications(response.data.data)
//         } catch (error: any) {
//             toast.error(error.message)
//         } finally {
//             dispatch(setLoading(false))
//         }
//     }
//     useEffect(() => {
//         fetchApplications();
//     }, []);

//     const columns = [
//         {
//           title: "Application ID",
//           dataIndex: "_id",
//         },
//         {
//           title: "Applicant",
//           dataIndex: "user",
//           render: (user: any) => user.name,
//         },
//         {
//           title: "Email",
//           dataIndex: "user",
//           render: (user: any) => user.email,
//         },
//         {
//           title: "Applied On",
//           dataIndex: "createdAt",
//           render: (createdAt: any) => moment(createdAt).format("DD/MM/YYYY"),
//         },
//         {
//           title: "Status",
//           dataIndex: "status",
//           render: (status: string, record: any) => (
//             <select
//               value={status}
//             //   onChange={(e) => onStatusUpdate(record._id, e.target.value)}
//             >
//               <option value="pending">Pending</option>
//               <option value="shortlisted">Shortlisted</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           ),
//         },
//         {
//           title: "Actions",
//           dataIndex: "_id",
//           render: (applicationId: string, application: any) => (
//             <Button
//               onClick={() => router.push(`/userinfo/${application.user._id}`)}
//             >
//               View
//             </Button>
//           ),
//         },
//       ];
//     return (
//         <Modal width={1000} title="Applications" open={showApplications} onCancel={() => setShowApplications(false)}>
//             <div className={`my-2 ${styles["large-table"]}`}>
//                 <Table columns={columns} dataSource={applications} rowKey="_id" />
//             </div>

//             {/* <div className={`my-2 ${styles["mobile-table"]}`}>
//                 <Table style={{ maxWidth: 500 }} columns={columns} dataSource={applications} rowKey="_id" scroll={{ x: true }} />
//             </div> */}
//         </Modal>
//     )
// }

// export default Applications





"use client";
import { Button, Modal, Table, message } from "antd";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setLoading } from '@/redux/loaderSlide'
import moment from "moment";
import { toast } from "sonner";
import styles from "@/app/applications/Applications.module.css"

function Applications({
    showApplications,
    setShowApplications,
    selectedJob,
}: {
    showApplications: boolean;
    setShowApplications: (showApplications: boolean) => void;
    selectedJob: any;
}) {
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
        } catch (error: any) {
            message.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    // useEffect(() => {
    //     console.log(applications);

    // }, [fetchApplications])

    const onStatusUpdate = async (applicationId: string, status: string) => {
        try {
            dispatch(setLoading(true));
            const response = await axios.put(`/api/applications/${applicationId}`, {
                status,
            });
            toast.success(response.data.message)
            fetchApplications();
        } catch (error: any) {
            message.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    React.useEffect(() => {
        fetchApplications();
    }, []);

    const columns = [
        {
            title: "Application ID",
            dataIndex: "_id",
        },
        {
            title: "Applicant",
            dataIndex: "user",
            render: (user: any) => user.name,
        },
        {
            title: "Email",
            dataIndex: "user",
            render: (user: any) => user.email,
        },
        {
            title: "Applied On",
            dataIndex: "createdAt",
            render: (createdAt: any) => moment(createdAt).format("DD/MM/YYYY"),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: string, record: any) => (
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
            render: (applicationId: string, application: any) => (
                <Button
                    onClick={() => router.push(`/userinfo/${application.user._id}`)}
                >
                    View
                </Button>
            ),
        },
    ];
    return (
        <>

            <Modal
                title={`Applications for ${selectedJob.title}`}
                open={showApplications}
                onCancel={() => setShowApplications(false)}
                width={1000}
                footer={[
                    <Button key="cancel" onClick={() => setShowApplications(false)}>
                        Cancel
                    </Button>,
                ]}
            >

                <div className={`my-3 ${styles["large-table"]}`}>
                    <Table columns={columns} dataSource={applications} rowKey="_id" />
                </div>

                <div className={`my-2 ${styles["mobile-table"]}`}>
                    <Table style={{ maxWidth: 500 }} columns={columns} dataSource={applications} rowKey="_id" scroll={{ x: true }} />
                </div>
            </Modal>
        </>
    );
}

export default Applications;