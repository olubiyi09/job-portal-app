"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/loaderSlide'
import axios from 'axios'
import { toast } from 'sonner'
import PageTitle from '@/components/PageTitle'
import styles from "./JobDetails.module.css"
import Link from 'next/link'

const JobDetails = () => {
    const { currentUser } = useSelector((state: any) => state.users)
    const { userRole } = useSelector((state: any) => state.users)
    const [jobData, setJobData] = useState<any>(null)
    const [applications, setApplications] = useState<any[]>([]);
    const router = useRouter()
    const { jobid } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axios.get(`/api/jobs/${jobid}`);
                setJobData(response.data.data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                dispatch(setLoading(false));
            }
        };

        const fetchApplications = async () => {
            try {
                dispatch(setLoading(true));
                if (currentUser) {
                    const response = await axios.get(`/api/applications?job=${jobid}&user=${currentUser._id}`);
                    setApplications(response.data.data);
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchJobs();
        fetchApplications();
    }, [jobid, currentUser]);

    const onApply = async () => {
        if (currentUser) {
            try {
                dispatch(setLoading(true))
                const response = await axios.post(`/api/applications`, {
                    job: jobData._id,
                    user: currentUser._id,
                    status: "pending"
                })
                toast.success(response.data.message)
                router.push("/applications")
            } catch (error: any) {
                toast.error(error.message)
            } finally {
                dispatch(setLoading(false))
            }
        } else {
            router.push("/login")
        }
    }


    return (
        <>
            {jobData && (

                <div>


                    <div className={styles.banner}>
                        <div className={`${styles["banner-content"]}`}>
                            <PageTitle title="Job Details" />
                            {/* <h1>{userInfo.role === "Employer" ? "Employer" : "Employee "} Details</h1> */}
                            <p>Click here to {" "}<span className="cursor-pointer" onClick={() => router.back()}><span className={styles.back}>Go Back</span></span></p>
                        </div>
                    </div>

                    <div className={`${styles.wrapper}`}>

                        <div className={`${styles.first}`}>
                            <div className={` ${styles.job}`}>
                                <h1>{jobData.title}</h1>
                                <div className={`${styles.details}`}>
                                    <div className="flex justify-between items-center">
                                        <div className={`${styles["btn-sec"]}`}>
                                            <button onClick={() => router.push(`/userinfo/${jobData.user._id}`)} className="mr-3">View Company Info</button>
                                            <button className="mr-3"><Link href={jobData.website}>Visit website</Link></button>
                                            <button onClick={onApply} disabled={userRole === "Employer" || applications.length > 0} className={userRole === "Employer" || applications.length > 0 ? "cursor-not-allowed" : ""}>Apply</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className={`${styles.dt}`}>
                                        <div className={`${styles.info}`}>
                                            <p className='mt-1'><b className={styles.description}>Job Description:</b></p>
                                            <p className="">{` ${jobData.description}`}</p>
                                        </div>
                                        <div className={`${styles.right}`}>

                                            <p><b>Salary: </b>{`$${jobData.salary}`}</p>
                                            <p className={`flex items-center ${styles.location}`}><span className='mr-2'>
                                                <b>Location: </b>
                                            </span>{jobData.location}</p>
                                            <p><b>Job Type: </b>{` ${jobData.type}`}</p>
                                            <p><b>Experience: </b>{` ${jobData.experience}`}</p>
                                            <p><b>Work Mode: </b>{` ${jobData.workmode}`}</p>
                                        </div>


                                    </div>
                                    {applications.length > 0 && (
                                        <div className={` ${styles["status-info"]}`}>
                                            You have already applied for this job. Please wait for the
                                            employer to respond.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            )}
        </>
    )
}

export default JobDetails