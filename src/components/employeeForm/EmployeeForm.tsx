"use client"
import React from "react";
import { Button, Form, Row, Col } from "antd";
import { MdDelete } from "react-icons/md";
import styles from './EmployeeForm.module.css';

function EmployeeForm() {
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

            <Col xs={24}>
                <Form.Item label="Career Objective" name="careerobjective">
                    <textarea />
                </Form.Item>
            </Col>

            {/* education */}
            <div className="mb-2">
                <h1 className="font-bold text-md">Education</h1>
                <Form.List name="education">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key}>
                                    <Row gutter={[16, 16]} align="bottom">
                                        <Col xs={24} md={8}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "qualification"]}
                                                rules={[{ required: true, message: "Required" }]}
                                                label="Qualification"
                                            >
                                                <input type="text" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={8}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "institution"]}
                                                rules={[{ required: true, message: "Required" }]}
                                                label="Institution"
                                            >
                                                <input type="text" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={6}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "grade"]}
                                                rules={[{ required: true, message: "Required" }]}
                                                label="Grade"
                                            >
                                                <input type="text" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={2} className={styles["delete-icon-col"]}>
                                            <MdDelete
                                                className="cursor-pointer"
                                                size={24}
                                                color="red"
                                                onClick={() => remove(name)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                            <Form.Item className={` bg-white ${styles["my-2"]}`}>
                                <Button type="dashed" onClick={() => add()} block>
                                    Add Education
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </div>

            {/* skills */}
            <div className={`mb-2`}>
                <h1 className={`font-bold ${styles["text-md"]}`}>Skills</h1>
                <Form.List name="skills">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key}>
                                    <Row gutter={[16, 16]} align="bottom">
                                        <Col xs={24} md={8}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "technology"]}
                                                rules={[{ required: true, message: "Required" }]}
                                                label="Technology"
                                            >
                                                <input type="text" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={6}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "rating"]}
                                                rules={[{ required: true, message: "Required" }]}
                                                label="Rating"
                                            >
                                                <input type="text" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={6} className={styles["delete-icon-col"]}>
                                            <MdDelete
                                                className="cursor-pointer"
                                                size={24}
                                                color="red"
                                                onClick={() => remove(name)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                            <Form.Item className={` bg-white ${styles["my-2"]}`}>
                                <Button type="dashed" onClick={() => add()} block>
                                    Add Skill
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </div>

            {/* experience */}
            <div className={`mb-2`}>
                <h1 className={`font-bold ${styles["text-md"]}`}>Experience</h1>
                <Form.List name="experience">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key}>
                                    <Row gutter={[16, 16]} align="bottom">
                                        <Col xs={24} md={8}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "company"]}
                                                rules={[{ required: true, message: "Required" }]}
                                                label="Company"
                                            >
                                                <input type="text" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={8}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "role"]}
                                                rules={[{ required: true, message: "Required" }]}
                                                label="Role"
                                            >
                                                <input type="text" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={6}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "period"]}
                                                rules={[{ required: true, message: "Required" }]}
                                                label="Period of Work"
                                            >
                                                <input type="text" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={2} className={styles["delete-icon-col"]}>
                                            <MdDelete
                                                className="cursor-pointer"
                                                size={24}
                                                color="red"
                                                onClick={() => remove(name)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                            <Form.Item className={` bg-white ${styles["my-2"]}`}>
                                <Button type="dashed" onClick={() => add()} block>
                                    Add Experience
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </div>
        </div >
    );
}

export default EmployeeForm;
