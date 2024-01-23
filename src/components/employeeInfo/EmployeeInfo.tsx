import React from "react";
import styles from "./EmployeeInfo.module.css";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

function EmployeeInfo({ employeeInfo }: { employeeInfo: any }) {
    return (
        <div className={`pb-5 ${styles.container}`}>
            {employeeInfo && (
                <div>
                    <div className={`${styles.wrapper}`}>
                        <div className={styles.pic}>
                            <img src="/avatarr.png" alt="image" width={230} />
                        </div>
                        <div className={`${styles.details}`}>
                            <div className={`${styles["employer-name"]}`}>
                                <h2>{employeeInfo.name}</h2>
                                {/* <p>{employeeInfo.role}</p> */}
                                <p>Seeking Employment</p>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.left}>
                                    <div className="flex justify-between">
                                        <span className="flex items-center">
                                            <MdOutlineEmail size={18} className="mr-1" />{" "}
                                            {employeeInfo.email}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="flex items-center">
                                            <FaPhone size={14} className="mr-1" />{" "}
                                            {employeeInfo.phone}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-3 mb-3" />

                    <div className={styles.about}>
                        <h1 className="text-md">
                            <b> Career Objective</b>
                        </h1>
                        <span>{employeeInfo.careerobjective}</span>
                    </div>
                    <hr className="mt-3 mb-3" />

                    <div className="my-3">
                        <h1 className="text-md">
                            <b>Education</b>
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Qualification</th>
                                    <th>Institution</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeInfo.education.map((edu: any, index: number) => (
                                    <tr key={index}>
                                        <td>{edu.qualification}</td>
                                        <td>{edu.institution}</td>
                                        <td>{edu.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="my-3">
                        <h1 className="text-md">
                            <b>Skills</b>
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Technology</th>
                                    <th>Rating (Out of 10)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeInfo.skills.map((skill: any, index: number) => (
                                    <tr key={index}>
                                        <td>{skill.technology}</td>
                                        <td>{skill.rating}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="my-3">
                        <h1 className="text-md">
                            <b>Experience</b>
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Role</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeInfo.experience.map((exp: any, index: number) => (
                                    <tr key={index}>
                                        <td>{exp.company}</td>
                                        <td>{exp.role}</td>
                                        <td>{exp.period}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmployeeInfo;
