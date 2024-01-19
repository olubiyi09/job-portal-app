"use client"
import React from "react"
import styles from "./Trust.module.css"
import { FaLongArrowAltRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Trust = () => {
    const router = useRouter();
    const { userRole } = useSelector((state) => state.users)
    return (
        <section className={styles.section}>
            <div className={`flex justify-center items-center ${styles.container}`}>
                <div className={`flex ${styles["image-section"]}`}>
                    <img src="./1.jpg" alt="image" />
                    <img src="./3.jpg" alt="image" />
                    <div className={`px-10 py-6 ${styles.trust}`}>100% Trusted</div>
                </div>

                <div className={styles["content-section"]}>
                    <h1>Trusted & Popular Job Portal</h1>
                    <p>
                        Discover your dream job with <span className={styles.span}>My Jobs</span> your trusted and popular job portal. Benefit from an extensive network, user-friendly interface, and exclusive partnerships. Your future begins here.
                    </p>

                    <div className={`flex justify-start py-4 ${styles["btn-section"]}`}>
                        <button className={`flex justify-center items-center hover:bg-amber-900`} onClick={userRole === "Employer" ? () => router.push("/jobs") : () => alert("You're not an employer")}>Post a Job <span>< FaLongArrowAltRight size={18} /></span></button>
                        <button className={`flex justify-center items-center hover:bg-amber-900`} onClick={() => router.push("/displayJobs")}>Apply Now <span>< FaLongArrowAltRight size={18} /></span></button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Trust