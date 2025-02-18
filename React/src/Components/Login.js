

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/AuthContext";  // Import useAuth

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();  // Destructure the login function from useAuth
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", formData);

      // Check if the login was successful
      if (response.data.token) {
        toast.success("Login successful!");

        // Call login function from AuthContext to store user and token in AuthContext
        login(response.data.user, response.data.token);

        navigate("/"); // Navigate to the homepage
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      // Handle different error statuses from the server
      if (error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          toast.error("User not found. Please check your email.");
        } else if (status === 401) {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error(data.message || "An unexpected error occurred.");
        }
      } else {
        // Handle network or other unexpected errors
        toast.error("Unable to connect to the server. Please try again later.");
      }
    }
  };

  return (
    
    <div className="flex justify-center items-center h-screen ">
      <div className=" text-black mr-12">
   
      <h1 className=" font-bold text-3xl text-black ">Style  Sustainably, Shop Smartly!</h1>
      
        <ul className="mt-2 text-[20px]">
          <li>✨Handpicked items for every style and occasion.</li>
          <li>🌱Reduce waste, reuse resources, and shop sustainably.</li>
          <li>💸Quality items at prices you’ll love.</li>
        </ul>
      </div>
      
      

      
      <div className="w-full max-w-lg p-6 pb-5 bg-white rounded-lg shadow-md ml-19 mt-10" >
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* <label className="block text-sm font-medium text-gray-700">Email</label> */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            {/* <label className="block text-sm font-medium text-gray-700">Password</label> */}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#f06595] font-medium text-white text-[20px] p-3 rounded hover:bg-[#cd3c71]"
          >
            LOGIN
          </button>
          <div className="text-center mt-4">
            <span className="text-black">Do not have an account?</span>
            <Link to="/register" className="text-[#f06595] pl-2">
              Register
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
