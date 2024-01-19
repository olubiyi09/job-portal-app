"use client"
import React from 'react'
import styles from "../Jobs.module.css"
import PageTitle from '@/components/PageTitle'
import { useRouter } from 'next/navigation'
import { Button, Form } from 'antd'
import JobPostForm from '@/components/JobPostForm'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/loaderSlide'
import { toast } from 'sonner'
import axios from 'axios'

const NewJob = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const onFinish = async (values: any) => {
        // console.log(values);

        try {
            dispatch(setLoading(true))
            const response = await axios.post("/api/jobs", values);
            toast.success(response.data.message)
            router.push("/jobs")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className={`${styles.container}`}>
            <div className={`flex justify-between items-center mt-0 pr-6 ${styles.wrapper}`}>
                <div className="pl-6">
                    <PageTitle title="Post New Job" />
                </div>

                <div className="flex justify-center items-center" onClick={() => router.back()}>
                    <p className={`rounded ${styles.btn}`} >
                        Back
                    </p>
                </div>
            </div>

            <Form layout="vertical" className="mt-1" onFinish={onFinish}>
                <JobPostForm />

                <div className={`flex justify-end items-center mt-0 pr-6`}>
                    <div className="pl-6">
                        <Button style={{ backgroundColor: "#c6c6c6", color: "#000000", border: "none" }} className={`py-1 px-7 ${styles["lower-btn"]}`} onClick={() => router.back()}>
                            cancel
                        </Button>
                    </div>

                    <div className="pl-6">
                        <Button htmlType="submit" style={{ backgroundColor: "#844d36", color: "#fff", border: "none" }} className={`py-1 px-7 ${styles["lower-btn"]}`}>
                            Post Job
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default NewJob