"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { Card } from 'antd';
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/loaderSlide";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key in keyof FormData]?: string }>({});

  const dispatch = useDispatch()
  const cardBackgroundColor = '#fff';
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });

    setErrors({
      ...errors,
      [field]: undefined,
    });
  };

  const validateForm = () => {
    const newErrors: { [key in keyof FormData]?: string } = {};
    let isValid = true;

    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return isValid;
    } else {
      alert("Error");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Data:", formData);

      try {
        dispatch(setLoading(true))
        const response = await axios.post("/api/users/login", formData);
        toast.success(response.data.message)
        router.push("/")
        setFormData({
          email: '',
          password: '',
        });
      } catch (error: any) {
        toast.error(error.response.data.message || "Something went wrong")
      } finally {
        dispatch(setLoading(false))
      }
    }
  };

  return (
    <div className={`flex items-center justify-center py-2 ${styles.cont}`}>
      <div className={`flex items-center justify-center ${styles.wrapper}`}>
        <Card style={{ background: cardBackgroundColor }} bordered={true}>
          <div className={`lg:w-96 md:w-96 sm:w-auto s p-6 rounded-md ${styles.form}`}>
            <form className="mt-3" onSubmit={handleFormSubmit}>
              <h1 className="text-3xl block text-center font-semibold">Login</h1>
              <hr className="mt-3 mb-3" />
              <label htmlFor="email" className="block">Email</label>
              <input
                className={`p-2 px-2 w-full text-base border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${errors.email ? 'border-red-500' : ''}`}
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange(e, "email")}
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <label htmlFor="password" className="block">Password</label>
              <input
                className={`p-2 px-2 w-full text-base border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${errors.password ? 'border-red-500' : ''}`}
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange(e, "password")}
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}

              <button className="border-2 text-white py-2 w-full rounded-md hover:bg-transparent font-semibold" type="submit">Login</button>

              <div className={`mt-3 flex items-center ${styles.option}`}>
                Don't have an account? <p className="ml-1 cursor-pointer">
                  <Link href="/register">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
