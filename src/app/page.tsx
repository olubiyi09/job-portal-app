"use client"

import React from "react";
import styles from "./Home.module.css"
import { FaUser } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import MyJobs from "@/components/jobs/MyJobs"
import Trust from "@/components/trust/Trust"
import Footer from "@/components/footer/Footer"
import Link from "next/link";
import How from "@/components/how/How";
import { useRouter } from "next/navigation";
import { toast } from "sonner";




export default function Home() {
  const [filters, setFilters] = React.useState({
    title: "",
    location: "",
  });
  const router = useRouter();



  const handleSearch = () => {
    if (!filters.title && !filters.location) {
      toast.error("Please fill in at least one of the fields");
      return;
    }

    router.push(`/filterJobs?title=${filters.title || ''}&city=${filters.location || ''}`);
  };


  return (
    <>
      <div className="flex flex-col justify-center items-center h-fit">

        <div className={`flex justify-between items-center pt-8 ${styles["header-section"]}`}>
          <div className={`pl-20 ${styles.wrapper}`}>
            <h1>Search For Your <span style={{ color: "#844d36" }}>Dream Job</span> Here </h1>
            <p>Jobs, Employment & Future Career Opportunities</p>
            <div className={`flex items-center space-x-2 w-fit pl-4 ${styles.left}`}>
              <div className={`relative ${styles.input}`}>
                <FaUser className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-900 ${styles["input-icon"]}`} />
                <input
                  type="text"
                  placeholder="Job Title"
                  className="pl-10 pr-2 py-1border-none rounded focus:outline-none m-0"
                  value={filters.title}
                  onChange={(e) =>
                    setFilters({ ...filters, title: e.target.value })
                  }
                />

              </div>
              <div className="relative">
                <FaLocationDot className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-900 ${styles["input-icon"]}`} size={18} />
                <input
                  type="text"
                  placeholder="City"
                  className="pl-10 pr-2 py-1 border-l-2 rounded focus:outline-none m-0"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                />
              </div>
              <button
                type="button"
                className={`text-white px-10 py-6 focus:outline-none hover:bg-amber-900 m-0 ${styles.btn}`}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          <div className={`${styles.image}`}>
            <img src="./4.png" alt="header image" />
          </div>

        </div>
        <div className={`flex justify-between items-center pl-20 pr-20 pt-10 pb-10 ${styles.box}`}>
          <h1>Create your profile to find thousands Jobs, Build your Career & Employment</h1>
          <button className={`px-10 py-6 focus:outline-none bg-white text-amber-900 font-medium ${styles["banner-btn"]}`}>Create Profile</button>
        </div>
      </div>

      <div className={`mt-20 ${styles["my-job"]}`}>
        <MyJobs />

        <div className={`${styles.more}`}>
          <Link href="/displayJobs">View More Jobs</Link>
        </div>
      </div>
      <How />
      <Trust />
      <Footer />


    </>
  )
}


