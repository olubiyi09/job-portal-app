import React from "react";
import styles from "./EmployerInfo.module.css"
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { RiHomeOfficeLine } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
import { RiNumbersFill } from "react-icons/ri";

function EmployerInfo({ employerInfo }: { employerInfo: any }) {

    return (
        <div className={`pb-8 ${styles.container}`}>
            {employerInfo && (

                <div>
                    <div className={`${styles.wrapper}`}>

                        <div className={styles.pic}>
                            <img src="/avatarr.png" alt="image" width={230} />
                        </div>
                        <div className={`${styles.details}`}>
                            <div className={`${styles["employer-name"]}`}>
                                <h2>{employerInfo.name}</h2>
                                <p>{employerInfo.role}</p>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.left}>
                                    <div className="flex justify-between">
                                        <span className="flex items-center"><MdOutlineEmail size={18} className="mr-1" /> {employerInfo.email}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="flex items-center"><FaPhone size={14} className="mr-1" /> {employerInfo.phone}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="flex items-center"><TbWorld size={18} className="mr-1" />  {employerInfo.website}</span>
                                    </div>
                                </div>


                                <div className={styles.right}>
                                    <div className="flex justify-between">
                                        <span className="flex items-center"><RiHomeOfficeLine size={18} className="mr-1" /> {employerInfo.address}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="flex items-center"><FaCalendarAlt size={18} className="mr-1" /> {employerInfo.establishmentYear}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="flex items-center"><RiNumbersFill size={18} className="mr-1" /> {employerInfo.companySize} workers</span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <hr className="mt-3 mb-3" />

                    <div className={styles.about}>
                        <h1 className="text-md">
                            <b>About</b>
                        </h1>

                        <span>{employerInfo.about}</span>
                    </div>

                </div>
            )}
        </div>
    );
}

export default EmployerInfo;