"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from "./Navbar.module.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import { setLoading } from '@/redux/loaderSlide';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { setCurrentUser, setUserRole } from '@/redux/usersSlice';
import axios from 'axios';

function NavBar() {
    const { isLoggedIn } = useSelector((state) => state.users)
    const { userRole } = useSelector((state) => state.users)
    const { currentUser } = useSelector((state) => state.users)
    const { isLoading } = useSelector((state) => state.loaders)
    const [navbar, setNavbar] = useState(false);
    const dispatch = useDispatch()
    const router = useRouter();


    const [pageLoaded, setPageLoaded] = useState(true);

    useEffect(() => {
        setPageLoaded(false);
    }, []);


    const onLogout = async () => {
        try {
            dispatch(setLoading(true));
            await axios.post("/api/users/logout");
            toast.success("Logged out successfully");
            dispatch(setCurrentUser(null));
            dispatch(setUserRole(null));
            window.location.reload();
            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");

        } finally {
            dispatch(setLoading(false));
        }
    };


    return (
        <div>
            {pageLoaded && <Loader />}
            <nav className={`w-full top-0 left-0 right-0 z-10  ${styles.header}`}>
                <div className={`justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 ${styles.wrapper}`}>
                    <div>
                        <div className={`flex items-center justify-between py-3 md:py-5 md:block ${styles.logo}`}>
                            <Link href="/">
                                <h2 className="text-3xl font-bold ">MyJobs</h2>
                            </Link>
                            <div className="md:hidden">
                                <button
                                    className="p-2"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <div className={`focus:border-none active:border-none${styles["hamburger-icon"]}`}>
                                            <FaTimes size={36} color="#eee" />
                                        </div>
                                    ) : (
                                        <div className={`focus:border-none active:border-none${styles["hamburger-icon"]}`}>
                                            <GiHamburgerMenu size={36} color="#eee" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">

                        <div
                            className={`flex-1 justify-self-center items-center md:block md:pb-0 md:mt-0 ${navbar ? 'p-12 md:p-0 block' : 'hidden'}`}
                        >
                            <ul className={`h-screen md:h-auto  md:flex items-center justify-center ${styles.ul}`}>
                                <li className="pb-6 text-white py-2 md:px-4 text-center border-b-2 md:border-b-0 border-white md:hover:bg-transparent">
                                    <Link href="/" onClick={() => setNavbar(!navbar)}>
                                        Home
                                    </Link>
                                </li>


                                <li className="pb-6 text-white py-2 px-4 text-center  border-b-2 md:border-b-0 border-white md:hover:bg-transparent">
                                    <Link href="/displayJobs" onClick={() => setNavbar(!navbar)}>
                                        Find a job
                                    </Link>
                                </li>


                                {isLoggedIn && userRole === "Employer" && (
                                    <li className="pb-6 text-white py-2 px-4 text-center  border-b-2 md:border-b-0 border-white md:hover:bg-transparent">
                                        <Link href="/jobs" onClick={() => setNavbar(!navbar)}>
                                            Post a job
                                        </Link>
                                    </li>
                                )}

                                {isLoggedIn && userRole === "Employee" && (

                                    <li className="pb-6 text-white py-2 px-4 text-center  border-b-2 md:border-b-0 border-white md:hover:bg-transparent">
                                        <Link href="/applications" onClick={() => setNavbar(!navbar)}>
                                            My Applications
                                        </Link>
                                    </li>
                                )
                                }


                                {isLoggedIn &&
                                    <li className="pb-6 text-white py-2 px-4 text-center  border-b-2 md:border-b-0 border-white md:hover:bg-transparent">
                                        <Link href="/profile" onClick={() => setNavbar(!navbar)}>
                                            Profile
                                        </Link>
                                    </li>
                                }

                                <li className="pb-6 text-white py-2 px-4 text-center  border-b-2 md:border-b-0  border-white md:hover:bg-transparent">
                                    <Link href="/contact" onClick={() => setNavbar(!navbar)}>
                                        Contact
                                    </Link>
                                </li>
                                {!isLoading && !pageLoaded && (
                                    <>
                                        {!isLoggedIn &&
                                            <li className="pb-6 text-white py-2 px-4 text-center border-b-2 md:border-b-0 border-white md:hover:bg-transparent">
                                                <Link href="/register" onClick={() => setNavbar(!navbar)}>
                                                    <div className={`rounded ${styles.btn}`}>
                                                        Register
                                                    </div>
                                                </Link>
                                            </li>
                                        }
                                        {!isLoggedIn ? (
                                            <li className="pb-6 text-white py-2 px-4 text-center  border-b-2 md:border-b-0  border-white md:hover:bg-transparent">
                                                <Link href="/login" onClick={() => setNavbar(!navbar)}>
                                                    <div className={`rounded ${styles.btn}`}>
                                                        Login
                                                    </div>
                                                </Link>
                                            </li>
                                        ) : (
                                            <li className="pb-6 text-white py-2 px-4 text-center  border-b-2 md:border-b-0  border-white md:hover:bg-transparent">
                                                <div onClick={() => onLogout()}>
                                                    <div className={`rounded ${styles.btn}`}>
                                                        Logout
                                                    </div>
                                                </div>
                                            </li>
                                        )

                                        }
                                    </>
                                )
                                }

                            </ul>
                        </div>

                    </div>
                </div>
            </nav >
            <hr />

        </div >
    );
}

export default NavBar;
