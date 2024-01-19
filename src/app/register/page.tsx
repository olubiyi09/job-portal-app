"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, message } from 'antd';
import styles from './Register.module.css';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loaderSlide';

interface FormData {
  name: string;
  email: string;
  role: string;
  password: string;
}

const Register: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch()
  const cardBackgroundColor = '#fff';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for the corresponding input field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 6) {
      newErrors.name = 'Name is required and must be at least 6 characters';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password is required and must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(formData);

      try {
        dispatch(setLoading(true))
        const response = await axios.post("/api/users/register", formData);
        toast.success(response.data.message)
        router.push("/login")
        setFormData({
          name: '',
          email: '',
          role: '',
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
    <div className={`flex items-center justify-center ${styles.cont}`}>
      <div className={`flex items-center justify-center ${styles.wrapper}`}>
        <Card style={{ background: cardBackgroundColor }} bordered={true}>
          <div className={`lg:w-96 md:w-96 sm:w-auto s px-6 rounded-md ${styles.form}`}>
            {Object.keys(errors).length > 0 && (
              <div className="text-red-500 mb-4">
                {Object.values<string>(errors).map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <h1 className="text-3xl block text-center font-semibold">Sign up</h1>
              <hr className="mt-3" />

              <label htmlFor="name" className="block">
                Name
              </label>
              <input
                className="p-2 px-2 w-full text-base border border-gray-400 rounded-lg mb-4 bg-transparent focus:outline-none focus:border-gray-600"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />

              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                className="p-2 px-2 w-full text-base border border-gray-400 rounded-lg mb-4 bg-transparent focus:outline-none focus:border-gray-600"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />

              <label htmlFor="role" className="block">
                Role
              </label>
              <select
                className="p-2 px-2 w-full text-base border border-gray-400 rounded-lg mb-4 bg-transparent focus:outline-none focus:border-gray-600"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your role</option>
                <option value="Employee">Employee</option>
                <option value="Employer">Employer</option>
              </select>

              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                className="p-2 px-2 w-full text-base border border-gray-400 rounded-lg mb-4 bg-transparent focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />

              <button
                type="submit"
                className="border-2 text-white py-2 w-full rounded-md hover:bg-transparent font-semibold"
              >
                Signup
              </button>

              <div className={`mt-3 flex items-center ${styles.option}`}>
                Already have an account?{' '}
                <p className="ml-1 cursor-pointer">
                  <Link href="/login">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
