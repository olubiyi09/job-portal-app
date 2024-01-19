"use client"
import React, { useEffect } from 'react'
import Navbar from "./navbar/Navbar"
import { Toaster } from 'sonner'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { setCurrentUser, setUserRole } from '@/redux/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './loader/Loader'
import { setLoading } from '@/redux/loaderSlide'


const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state: any) => state.loaders)
  const { currentUser } = useSelector((state: any) => state.users)

  const getCurrentUser = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get("/api/users/currentuser");
      dispatch(setCurrentUser(response.data.data))
      dispatch(setUserRole(response.data.data.role))
    } catch (error: any) {

    } finally {
      dispatch(setLoading(false))
    }
  }


  useEffect(() => {
    // if (pathname === "/") {
    //   getCurrentUser();
    // }
    if (pathname !== "/login" && pathname !== "/register" && !currentUser) {
      getCurrentUser();
    }

  }, [pathname]);





  return (
    <html lang="en">
      <body>
        {isLoading && <Loader />}
        <Toaster richColors position="top-right" />
        <Navbar />
        {children}
      </body>
    </html>
  )
}

export default LayoutProvider


// import React, { useEffect } from 'react';
// import Navbar from "./navbar/Navbar";
// import { Toaster, toast } from 'sonner';
// import { usePathname, useRouter } from 'next/navigation';
// import axios from 'axios';
// import { setCurrentUser, setUserRole } from '@/redux/usersSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from './loader/Loader';
// import { setLoading } from '@/redux/loaderSlide';
// import Cookies from 'js-cookie';  // Import Cookies library

// const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
//   const pathname = usePathname();
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { isLoading } = useSelector((state: any) => state.loaders);
//   const { currentUser } = useSelector((state: any) => state.users);

//   const getCurrentUser = async () => {
//     try {
//       dispatch(setLoading(true));
//       const response = await axios.get("/api/users/currentuser");
//       dispatch(setCurrentUser(response.data.data));
//       dispatch(setUserRole(response.data.data.role));
//     } catch (error: any) {
//       // Handle error
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const onLogout = async () => {
//     try {
//       dispatch(setLoading(true));
//       await axios.post("/api/users/logout");
//       // toast.success("Session expired");
//       dispatch(setCurrentUser(null));
//       dispatch(setUserRole(null));
//       router.push("/");
//     } catch (error: any) {
//       console.error("Logout error:", error);
//       // toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     const token = Cookies.get('token'); // Retrieve token from cookies

//     // Check if token exists and is not expired
//     if (token && !isTokenExpired(token) && (pathname !== "/login" && pathname !== "/register" && !currentUser)) {
//       getCurrentUser();
//     } else {
//       // Token is expired or doesn't exist, perform logout
//       const token: any = Cookies.get('token');
//       if (!token && isTokenExpired(token) && (pathname !== "/login" && pathname !== "/register" && pathname !== "/")) {
//         onLogout()
//         router.push("/")
//       }
//     }
//   }, [pathname]);

//   // Function to check if a token is expired
//   const isTokenExpired = (token: string) => {
//     let res;
//     if (token) {
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       const currentTime = Math.floor(Date.now() / 1000);
//       res = decodedToken.exp < currentTime;
//     }
//     return res

//   };


//   return (
//     <html lang="en">
//       <body>
//         {isLoading && <Loader />}
//         <Toaster richColors position="top-right" />
//         <Navbar />
//         {children}
//       </body>
//     </html>
//   );
// };

// export default LayoutProvider;
