"use client"
import { Col, Form, Row } from 'antd'
import React from 'react'
import styles from "../stylesheets/Form.module.css"


const JobPostForm = () => {
    return (
        <div className={styles["job-form"]}>
            <Row gutter={[16, 0]}>
                <Col span={24}>
                    <Form.Item
                        label="Title"
                        rules={[{ required: true, message: "Please enter job title" }]}
                        name="title">
                        <input type="text" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        label="Description"
                        rules={[{ required: true, message: "Please enter job description" }]}
                        name="description">
                        <textarea />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        label="Type"
                        rules={[{ required: true, message: "Please select job type" }]}
                        name="type">
                        <select>
                            <option value="" selected disabled>--- Select Job Type ---</option>
                            <option value="full-time">Full time</option>
                            <option value="part-time">Part time</option>
                            <option value="contract">Contract</option>
                        </select>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        label="Work Mode"
                        name="workmode">
                        <select>
                            <option value="" selected disabled>--- Select a work Mode ---</option>
                            <option value="remote">Remote</option>
                            <option value="onsite">On site</option>
                        </select>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        label="Experience"
                        name="experience">
                        <select>
                            <option value="" selected disabled>--- Select Required Experience ---</option>
                            <option value="entry-level">Entry Level</option>
                            <option value="mid-level">Mid Level</option>
                            <option value="senior-level">Senior Level</option>
                        </select>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        label="City"
                        name="location">
                        <input />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        label="Salary"
                        name="salary">
                        <input />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        label="Website"
                        name="website">
                        <input />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}

export default JobPostForm