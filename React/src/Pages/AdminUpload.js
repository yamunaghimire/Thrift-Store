
import React, { useState, useEffect } from "react";

const AdminUpload = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [categories, setCategories] = useState([]); 
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/categories");
    
        // Check if the response is JSON
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format. Expected JSON.");
        }
    
        const result = await response.json();
        console.log("Fetched categories:", result);
    
        if (response.ok) {
          setCategories(result); 
        } else {
          setMessage("Error fetching categories.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setMessage("An error occurred while fetching categories.");
      }
    };
    

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.name || !formData.description || !formData.price || !formData.category || !image) {
      setMessage("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You must be logged in to upload products.");
        setLoading(false);
        return;
      }

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("price", parseFloat(formData.price));
      payload.append("category", formData.category); 
      payload.append("image", image);

      const response = await fetch("http://localhost:8080/api/products/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: payload,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Product uploaded successfully!");
        setFormData({ name: "", description: "", price: "", category: "" });
        setImage(null);
      } else {
        setMessage(result.message || "Error uploading product.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while uploading the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6  p-3 text-black ">Admin Panel - Upload Product</h1>
      <form className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">Select Category</option>
          {categories.length === 0 ? (
            <option value="">No categories available</option>
          ) : (
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))
          )}
        </select>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-[#f06595] text-white rounded hover:bg-[#ea4981] disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminUpload;
