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
    <div className="flex justify-center items-center min-h-screen">
        <div className="text-4xl font-bold text-black mr-8">Join us <br /> on this journey <br /> to make fashion sustainable <br />and stylish. </div>
      
      <div className="w-full max-w-lg bg-white p-8 mt-[62px] rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Register </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
           
            <input
              id="fullname"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Your full name"
            />
          </div>

         
          <div className="mb-4">
            
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4">
            
            <input
              id="phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Your phone number"
            />
          </div>
          <div className="mb-4">
            
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Your password"
            />
          </div>
          <div className="mb-4">
            
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white font-medium text-[20px] bg-[#f06595] p-3 rounded hover:bg-[#cd3c71] transition duration-300"
          >
            REGISTER MY ACCOUNT
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegistrationForm;
