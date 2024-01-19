"use client"
import PageTitle from '@/components/PageTitle'
import React, { useEffect, useState } from 'react'
import styles from "./Applications.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/loaderSlide'
import { toast } from 'sonner'
import axios from 'axios'
import { Table } from 'antd'
import moment from 'moment'


const Applications = () => {
    const [applications, setApplications] = useState([])
    const { currentUser } = useSelector((state: any) => state.users)
    const dispatch = useDispatch()


    const fetchApplications = async () => {
        try {
            dispatch(setLoading(true))
            if (!currentUser) {
                console.error('User not available');
                return;
            }
            console.log('Current User ID:', currentUser._id);
            const response = await axios.get(`/api/applications?user=${currentUser._id}`)
            setApplications(response.data.data)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(() => {
        if (currentUser) {
            fetchApplications();
        }
    }, [currentUser]);






    const columns = [
        {
            title: "Application ID",
            dataIndex: "_id",
        },
        {
            title: "Job Title",
            dataIndex: "job",
            render: (job: any) => job.title,
        },
        {
            title: "Company",
            dataIndex: "job",
            render: (job: any) => job.user.name,
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Applied On",
            dataIndex: "createdAt",
            render: (createdAt: any) => moment(createdAt).format("DD/MM/YYYY"),
        },
    ];


    return (

        <div className={`px-4 ${styles.container}`}>
            <div className={`flex justify-between items-center mt-3 pr-6 ${styles.wrapper}`}>
                <div className="pl-6">
                    <PageTitle title="Applications" />
                </div>
            </div>

            {currentUser && (
                <div className={`my-2 ${styles["large-table"]}`}>
                    <Table columns={columns} dataSource={applications} rowKey="_id" />
                </div>
            )}


            {currentUser && (
                <div className={`my-2 ${styles["mobile-table"]}`}>
                    <Table style={{ maxWidth: 500 }} columns={columns} dataSource={applications} rowKey="_id" scroll={{ x: true }} />
                </div>
            )}
        </div>

    )

}

export default Applications