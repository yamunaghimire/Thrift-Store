import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",  
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate= useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { fullname, email, phone, password, confirmPassword } = formData;

    if (!fullname || !email || !phone || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Invalid email format!");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be 10 digits!");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8080/register", formData);
        console.log('User details:', response.data);
        toast.success("Registration successful!Please Login in");
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");

      } catch (error) {
        const errorMsg = error.response?.data?.message || "Something went wrong!";
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your full name"
            />
          </div>

         
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegistrationForm;
