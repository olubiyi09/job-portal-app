import React from 'react'
import styles from "./How.module.css"
import { RiContactsFill } from "react-icons/ri";
import { MdFormatAlignLeft } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const myData = [
    { icon: <RiContactsFill size={34} />, title: 'Create Account', description: 'It’s very easy to open an account and start your journey.' },
    { icon: <MdFormatAlignLeft size={34} />, title: 'Complete your profile', description: 'Complete your profile with all the info to get attention of client.' },
    { icon: <FaPen size={32} />, title: 'Apply job or hire', description: 'Apply & get your preferable jobs with all the requirements and get it.' },
];

const How = () => {
    return (
        <div className={styles["main-wrapper"]}>
            <div className={styles.wrapper}>
                <h1 className={styles.head}>How it works?</h1>
                <div className={styles["how-details"]}>
                    {myData.map((item, index) => (
                        <div key={index} className={styles["card"]}>
                            <span className={styles.icon}>{item.icon}</span>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default How