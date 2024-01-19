"use client"
import React, { useEffect, useState } from 'react'
import styles from "../../Jobs.module.css"
import PageTitle from '@/components/PageTitle'
import { useRouter } from 'next/navigation'
import { Button, Form } from 'antd'
import JobPostForm from '@/components/JobPostForm'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/loaderSlide'
import { toast } from 'sonner'
import axios from 'axios'
import { useParams } from 'next/navigation'

const EditJob = () => {
    const [jobData, setJobData] = useState<any>(null)
    const router = useRouter()
    const { jobid } = useParams()
    const dispatch = useDispatch()

    const onFinish = async (values: any) => {
        // console.log(values);

        try {
            values._id = jobid;
            dispatch(setLoading(true))
            const response = await axios.put(`/api/jobs/${jobid}`, values);
            toast.success(response.data.message)
            router.push("/jobs")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    const fetchJobs = async () => {
        try {
            dispatch(setLoading(true))
            const response = await axios.get(`/api/jobs/${jobid}`)
            setJobData(response.data.data)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    return (
        <div className={`${styles.container}`}>
            <div className={`flex justify-between items-center mt-0 pr-6 ${styles.wrapper}`}>
                <div className="pl-6">
                    <PageTitle title="Edit Job" />
                </div>

                <div className="flex justify-center items-center" onClick={() => router.back()}>
                    <p className={`rounded ${styles.btn}`} >
                        Back
                    </p>
                </div>
            </div>

            {jobData && (
                <Form layout="vertical" className="mt-1" onFinish={onFinish} initialValues={jobData}>
                    <JobPostForm />

                    <div className={`flex justify-end items-center mt-0 pr-6`}>
                        <div className="pl-6">
                            <Button style={{ backgroundColor: "#c6c6c6", color: "#000000", border: "none" }} className={`py-1 px-7 ${styles["lower-btn"]}`} onClick={() => router.back()}>
                                cancel
                            </Button>
                        </div>

                        <div className="pl-6">
                            <Button htmlType="submit" style={{ backgroundColor: "#844d36", color: "#fff", border: "none" }} className={`py-1 px-7 ${styles["lower-btn"]}`}>
                                Update Job
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </div>
    )
}

export default EditJob