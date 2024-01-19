"use client"
import EmployeeForm from '@/components/employeeForm/EmployeeForm'
import EmployerForm from '@/components/employerForm/EmployerForm'
import PageTitle from '@/components/PageTitle'
import { Form, Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./Profile.module.css"
import { setLoading } from '@/redux/loaderSlide'
import axios from 'axios'
import { setCurrentUser } from '@/redux/usersSlice'
import { toast } from 'sonner'

const Profile = () => {
    const { currentUser } = useSelector((state: any) => state.users)
    const dispatch = useDispatch()

    const onFinish = async (values: any) => {
        try {
            values._id = currentUser._id;
            dispatch(setLoading(true));
            const response = await axios.put("/api/users", values)
            toast.success("Profile updated successfully")
            dispatch(setCurrentUser(response.data.data));
        } catch (error) {

        } finally {
            dispatch(setLoading(false));
        }

    }



    return (
        <div className={`m-auto ${styles.container}`}>
            <div className={`m-auto ${styles["header-bg"]}`}>
                <PageTitle title="Profile" />
            </div>

            {currentUser && (
                <Form layout="vertical" initialValues={currentUser} onFinish={onFinish}>
                    {currentUser?.role === "Employer" ? (
                        <EmployerForm />
                    ) : (
                        <EmployeeForm />
                    )}

                    <div className="flex justify-end p-2 mr-4">
                        <Button htmlType="submit" style={{ backgroundColor: "#844d36", color: "#fff" }} className="w-1/4">
                            Save
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    )
}

export default Profile