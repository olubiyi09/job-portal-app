"use client";
import { Col, Form, Row } from "antd";
import React from "react";
import styles from './EmployerForm.module.css';
import { MdDelete } from "react-icons/md";

function EmployerForm() {
    return (
        <div className={styles["em-form"]}>
            <Row gutter={[8, 0]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <input type="text" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <input type="email" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Phone" name="phone">
                        <input type="text" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[8, 0]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Established Year"
                        name="establishmentYear"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <input type="text" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Company Size"
                        name="companySize"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <input type="number" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Website" name="website">
                        <input type="text" />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col xs={24}>
                    <Form.Item label="About" name="about">
                        <textarea />
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item label="Address" name="address">
                        <textarea />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );
}

export default EmployerForm;
