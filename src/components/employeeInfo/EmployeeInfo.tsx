// import { Col, Row } from "antd";
import React from "react";
import styles from "./EmployeeInfo.module.css"
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { Row, Col, Table } from "antd";

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
                                        <span className="flex items-center"><MdOutlineEmail size={18} className="mr-1" /> {employeeInfo.email}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="flex items-center"><FaPhone size={14} className="mr-1" /> {employeeInfo.phone}</span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <hr className="mt-3 mb-3" />

                    <div className={styles.about}>
                        <h1 className="text-md">
                            <b> Career Cbjective</b>
                        </h1>

                        <span>{employeeInfo.careerobjective}</span>
                    </div>
                    <hr className="mt-3 mb-3" />

                    <Row>
                        <Col span={24} className="my-3">
                            <h1 className="text-md">
                                <b>Education</b>
                            </h1>
                            <Table
                                dataSource={employeeInfo.education}
                                columns={[
                                    {
                                        title: "Qualification",
                                        dataIndex: "qualification",
                                    },
                                    {
                                        title: "Institution",
                                        dataIndex: "institution",
                                    },
                                    {
                                        title: "Grade",
                                        dataIndex: "grade",
                                    },
                                ]}
                                pagination={false}
                            />
                        </Col>

                        <Col span={24} className="my-3">
                            <h1 className="text-md">
                                <b>Skills</b>
                            </h1>
                            <Table
                                dataSource={employeeInfo.skills}
                                columns={[
                                    {
                                        title: "Technology",
                                        dataIndex: "technology",
                                    },
                                    {
                                        title: "Rating (Out of 10)",
                                        dataIndex: "rating",
                                    },
                                ]}
                                pagination={false}
                            />
                        </Col>

                        <Col span={24} className="my-3">
                            <h1 className="text-md">
                                <b>Experience</b>
                            </h1>
                            <Table
                                dataSource={employeeInfo.experience}
                                columns={[
                                    {
                                        title: "Company",
                                        dataIndex: "company",
                                    },
                                    {
                                        title: "Role",
                                        dataIndex: "role",
                                    },
                                    {
                                        title: "Period (from - to)",
                                        dataIndex: "period",
                                    },
                                ]}
                                pagination={false}
                            />
                        </Col>
                    </Row>

                </div>
            )}
        </div>
    );
}

export default EmployeeInfo