// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8080/login", formData);

//       // Server response
//       if (response.data === "Success") {
//         toast.success("Login successful!");
//         navigate("/"); 
//       } else if (response.data === "The password is incorrect") {
//         toast.error("Incorrect password!");
//       } else if (response.data === "No record existed") {
//         toast.error("No user found with this email.");
//       }
//     } catch (error) {
//       toast.error("An error occurred during login.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center">Login</h2>
//         <form className="mt-4" onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               placeholder="Enter your password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//           >
//             Login
//           </button>
//           <div className="text-center">
//             Do not have an Account? <Link to="/register"> <span className="text-gray-400 underline">Register</span></Link>
//           </div>
//         </form>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", formData);

      // Server response
      if (response.data.token) { // Check if token is present
        toast.success("Login successful!");
        localStorage.setItem("token", response.data.token); // Store the JWT token in localStorage
        navigate("/upload"); // Redirect to homepage or dashboard
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <div className="text-center">
            Do not have an Account? <Link to="/register"> <span className="text-gray-400 underline">Register</span></Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
