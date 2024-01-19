"use client"
import React, { useEffect, useState } from 'react';
import styles from "../../components/jobs/MyJobs.module.css";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/loaderSlide';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { FILTER_BY_LOCATION } from '@/redux/filterSlice';


const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams()

    const title = searchParams.get('title')
    const country = searchParams.get("country")

    const { filteredJobs } = useSelector((state) => state.filter)

    const fetchJobs = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get("/api/genjobs");
            setJobs(response.data.data);
            dispatch(FILTER_BY_LOCATION({ jobs: response.data.data, search: title || country || '' }));

        } catch (error) {
            toast.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);



    const limitDescription = (description, maxLetters) => {
        if (description.length <= maxLetters) {
            return description;
        }

        const truncatedDescription = description.slice(0, maxLetters);
        const lastSpaceIndex = truncatedDescription.lastIndexOf(' ');

        if (lastSpaceIndex !== -1) {
            return truncatedDescription.slice(0, lastSpaceIndex) + '...';
        }

        return truncatedDescription + '...';
    };

    // Check if the current pathname is "/"
    const isHomePage = typeof window !== 'undefined' && window.location.pathname === "/";

    const renderJob = (jobz, index) => (
        <div className={`${styles.first} ${styles.wrap}`} key={index}>
            <div className={`hover:cursor-pointer ${styles.job}`} onClick={() => router.push(`/jobdetails/${jobz._id}`)}>
                <div className={`${styles.details}`}>
                    <h1>{jobz.title}</h1>
                    <div className={`flex ${styles.dt}`}>
                        <div className={`${styles.info}`}>
                            <p className={`${styles.company}`}>{`Company: ${jobz.user.name}`}</p>
                            <p className={`${styles.link}`}>{jobz.website}</p>
                            <p className='flex'><span>
                                <RiMoneyDollarCircleFill size={18} color="brown" />
                            </span>{`$${jobz.salary}`}</p>
                            <p className={`flex items-center ${styles.location}`}><span>
                                <FaLocationDot size={18} color="brown" />
                            </span>{jobz.location}</p>
                            <p className='pl-6'>{limitDescription(jobz.description, 140)}</p>
                        </div>
                        <div className={`${styles["btn-sec"]}`}>
                            <button onClick={() => router.push(`/jobdetails/${jobz._id}`)}>Apply</button>
                            <button>{jobz.type}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderJobs = (jobList) => jobList.map((jobz, index) => renderJob(jobz, index));
    console.log(filteredJobs)

    return (
        <section className={`pt-1 ${styles.section}`}>
            <div className={`flex justify-center items-center flex-col ${styles.container}`}>
                <div className={styles["title-bg"]}>
                    <p className={styles.title}>Available Jobs</p>
                </div>

                {/* 
                <div className={`${styles.wrapper}`}>
                    {isHomePage ? renderJobs(filteredJobs.slice(0, 4)) : renderJobs(filteredJobs)}
                </div> */}
                {filteredJobs.length < 1 ? (
                    <div className={`${styles.wrapper}`}>
                        <p>No job matches the search criteria.</p>
                    </div>
                ) : (
                    <div className={`${styles.wrapper}`}>
                        {isHomePage ? renderJobs(filteredJobs.slice(0, 4)) : renderJobs(filteredJobs)}
                    </div>
                )}



            </div>
        </section>
    );
}

export default Jobs;
