"use client"
import PageTitle from '@/components/PageTitle'
import React, { useEffect, useState } from 'react'
import styles from "./Applications.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/loaderSlide'
import { toast } from 'sonner'
import axios from 'axios'
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

    return (
        <div className={`px-4 ${styles.container}`}>
            <div className={`flex justify-between items-center mt-3 pr-6 ${styles.wrapper}`}>
                <div className="pl-6">
                    <PageTitle title="Applications" />
                </div>
            </div>

            {currentUser && (
                <div className="tableContainer">
                    <div className={`my-2 ${styles["large-table"]}`}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Application ID</th>
                                    <th>Job Title</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                    <th>Applied On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((application: any) => (
                                    <tr key={application._id}>
                                        <td>{application._id}</td>
                                        <td>{application.job.title}</td>
                                        <td>{application.job.user.name}</td>
                                        <td>{application.status}</td>
                                        <td>{moment(application.createdAt).format("DD/MM/YYYY")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={`my-2 ${styles["mobile-table"]}`}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Application ID</th>
                                    <th>Job Title</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                    <th>Applied On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((application: any) => (
                                    <tr key={application._id}>
                                        <td>{application._id}</td>
                                        <td>{application.job.title}</td>
                                        <td>{application.job.user.name}</td>
                                        <td>{application.status}</td>
                                        <td>{moment(application.createdAt).format("DD/MM/YYYY")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            )}
        </div>
    )
}

export default Applications
