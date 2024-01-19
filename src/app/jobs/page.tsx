"use client"
import PageTitle from '@/components/PageTitle'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from "./Jobs.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/loaderSlide'
import { toast } from 'sonner'
import axios from 'axios'
import { Table } from 'antd'
import moment from 'moment'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit, FaListUl } from "react-icons/fa";
import Applications from '@/components/Applications'


const Jobs = () => {
    const [jobs, setJobs] = useState([])
    const [selectedJobs, setSelectedJobs] = useState({} as any)
    const [showApplications, setShowApplications] = useState<any>(false)
    const { currentUser } = useSelector((state: any) => state.users)
    const router = useRouter()
    const dispatch = useDispatch()


    const fetchJobs = async () => {
        try {
            dispatch(setLoading(true))
            // const response = await axios.get("/api/jobs")
            if (!currentUser) {
                console.error('User not available');
                return;
            }
            // console.log('Current User ID:', currentUser._id);
            const response = await axios.get(`/api/jobs?user=${currentUser._id}`)
            setJobs(response.data.data)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(() => {
        if (currentUser) {
            fetchJobs();
        }
    }, [currentUser]);

    const deleteJob = async (jobid: any) => {
        try {
            dispatch(setLoading(true))
            const response = await axios.delete(`/api/jobs/${jobid}`)
            toast.success(response.data.message)
            fetchJobs()
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Posted On",
            dataIndex: "createdAt",
            render: (text: any) => moment(text).format("DD-MM-YYYY HH:mm:ss"),
        },
        {
            title: "Location",
            dataIndex: "location",
        },
        {
            title: "Job Type",
            dataIndex: "type",
        },
        {
            title: "Work Mode",
            dataIndex: "workmode",
        },
        {
            title: "Experience",
            dataIndex: "experience",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text: any, record: any) => (
                <div className="flex gap-3">
                    <FaEdit color="blue" size={18} style={{ cursor: "pointer" }} onClick={() => router.push(`/jobs/edit/${record._id}`)} />
                    <RiDeleteBin6Line color="red" size={18} style={{ cursor: "pointer" }} onClick={() => deleteJob(record._id)} />
                </div>
            ),
        },
        {
            title: "Applications",
            dataIndex: "applications",
            render: (text: any, record: any) => (
                <div className="flex justify-center items-center border p-1 rounded gap-3 cursor-pointer" onClick={() => {
                    setSelectedJobs(record);
                    setShowApplications(true)
                }} >
                    <FaListUl color="green" size={18} />
                    <p>View</p>
                </div>
            ),
        }
    ]

    return (

        <div className={`${styles.container}`}>
            <div className={`flex justify-between items-center mt-3 pr-6 ${styles.wrapper}`}>
                <div className="pl-6">
                    <PageTitle title="Jobs" />
                </div>

                <div className="flex justify-center items-center" onClick={() => router.push("/jobs/new")}>
                    <p className={`rounded ${styles.btn}`} >
                        New Job
                    </p>
                </div>
            </div>

            {currentUser && (
                <>

                    {/* <div className="my-2">
                        <Table columns={columns} dataSource={jobs} rowKey="_id" />
                    </div> */}

                    <div className={`my-2 ${styles["large-table"]}`}>
                        <Table className='custom-table' columns={columns} dataSource={jobs} rowKey="_id" />
                    </div>

                    <div className={`my-2 ${styles["mobile-table"]}`}>
                        <Table className='custom-table' style={{ maxWidth: 500 }} columns={columns} dataSource={jobs} rowKey="_id" scroll={{ x: true }} />
                    </div>
                </>
            )}

            {showApplications && (
                <Applications
                    selectedJob={selectedJobs}
                    setShowApplications={setShowApplications}
                    showApplications={showApplications}
                />

            )}

        </div>
    )

}

export default Jobs