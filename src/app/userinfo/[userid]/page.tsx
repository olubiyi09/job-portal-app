"use client"

import EmployeeInfo from '@/components/employeeInfo/EmployeeInfo'
import EmployerInfo from '@/components/employerInfo/EmployerInfo'
import { setLoading } from '@/redux/loaderSlide'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import styles from "./UserInfo.module.css"

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState<any>(null)
    // const { userRole } = useSelector((state: any) => state.users)
    const { userid } = useParams()
    const dispatch = useDispatch()
    const router = useRouter()

    const fetchUserInfo = async () => {
        try {
            dispatch(setLoading(true))
            const response = await axios.get(`/api/users/${userid}`)
            setUserInfo(response.data.data)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])


    return (
        <>
            {userInfo && (
                <div>
                    <div className={styles.banner}>
                        <div className={`${styles["banner-content"]}`}>
                            <h1>{userInfo.role === "Employer" ? "Employer" : "Employee "} Details</h1>
                            <p>Click here to {" "}<span className="cursor-pointer" onClick={() => router.back()}><span className={styles.back}>Go Back</span></span></p>
                        </div>
                    </div>


                    {userInfo.role === "Employer" ? <EmployerInfo employerInfo={userInfo} /> : <EmployeeInfo employeeInfo={userInfo} />}
                </div>
            )}
        </>
    )
}

export default UserInfo