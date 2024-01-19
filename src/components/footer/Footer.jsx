import React from 'react'
import styles from "./Footer.module.css"
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";


const Footer = () => {
    const aIcon = <IoIosArrowForward size={18} color="#844d36" />
    const currentYear = new Date().getFullYear();
    return (
        <footer className={`${styles.footer}`}>
            <div className={`pt-14 ${styles.container}`}>
                <div className={`flex justify-between pb-16 ${styles.wrapper}`}>
                    <div className={`${styles["footer-logo"]}`}>
                        <h1 className={`${styles.logo}`}>
                            MyJobs
                        </h1>
                        <p className={`${styles["footer-about"]}`}>
                            Discover your dream job with My Jobs your trusted and popular job portal.
                        </p>
                        <div className={`flex mt-4 ${styles["social-icon"]}`}>
                            <FaYoutube size={24} color="#844d36" />
                            <FaFacebookF size={24} color="#844d36" />
                            <FaInstagram size={24} color="#844d36" />
                            <FaXTwitter size={24} color="#844d36" />
                        </div>
                    </div>
                    <div className={`${styles["footer-category"]}`}>
                        <h1>Category</h1>

                        <div>
                            <p className="flex items-center">{aIcon} Software Development</p>
                            <p className="flex items-center">{aIcon} Web Development</p>
                            <p className="flex items-center">{aIcon} Technical Support</p>
                            <p className="flex items-center">{aIcon} Finance & Banking Service</p>
                            <p className="flex items-center">{aIcon} Restaurant Services</p>
                        </div>
                    </div>
                    <div className={`${styles["footer-links"]}`}>
                        <h1>Quick Links</h1>
                        <div>
                            <p className="flex items-center">{aIcon}Home</p>
                            <p className="flex items-center">{aIcon} Find a Job</p>
                            <p className="flex items-center">{aIcon} Contact</p>
                        </div>
                    </div>
                    <div className={`${styles["footer-contact"]}`}>
                        <h1>Find Us</h1>
                        <div className={``}>
                            <p className="flex items-center"><FaLocationDot size={16} color="#844d36" style={{ marginRight: '7px' }} /> 10/B Street, ABC City</p>
                            <p className="flex items-center"><IoCallSharp size={16} color="#844d36" style={{ marginRight: '7px' }} /> +1 234 567 890</p>
                            <p className="flex items-center"><MdAlternateEmail size={16} color="#844d36" style={{ marginRight: '7px' }} /> example@mail.com</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="flex justify-center items-center pt-8 pb-8">
                    <p>&copy; {currentYear} All rights reserved. Designed By DevSeyi</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer