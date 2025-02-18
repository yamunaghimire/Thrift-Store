import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState({}); // To track which product is in edit mode
  const [editPrice, setEditPrice] = useState({}); // To store the updated price

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/products/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Price Change
  const handlePriceChange = (id, price) => {
    setEditPrice((prev) => ({ ...prev, [id]: price }));
  };

  // Toggle Edit Mode
  const toggleEditMode = (id) => {
    setEditMode((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle Price Update
  const handleUpdatePrice = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/products/${id}`,
        { price: editPrice[id] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Price updated successfully");
      fetchProducts();
      toggleEditMode(id);
    } catch (error) {
      console.error("Error updating price:", error);
      alert("Error updating price");
    }
  };

  // Handle Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product");
      }
    }
  };

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category?.name]) {
      acc[product.category?.name] = [];
    }
    acc[product.category?.name].push(product);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center mt-[100px]">Admin Product Management</h2>

      {/* Render Products Grouped by Category */}
      {Object.keys(groupedProducts).map((categoryName) => (
        <div key={categoryName} className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">{categoryName}</h3>
          <table className="min-w-full m-auto bg-white border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-2 px-4 border-b text-left w-20">Image</th>
                <th className="py-2 px-4 border-b text-left w-64">Name</th> {/* Fixed width */}
                <th className="py-2 px-4 border-b text-left w-32">Category</th>
                <th className="py-2 px-4 border-b text-left w-32">Price</th>
                <th className="py-2 px-4 border-b text-left w-48">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedProducts[categoryName].map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 text-ellipsis overflow-hidden whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="py-2 px-4">{product.category?.name}</td>
                  <td className="py-2 px-4">
                    {editMode[product._id] ? (
                      <input
                        type="number"
                        value={editPrice[product._id] ?? product.price}
                        onChange={(e) =>
                          handlePriceChange(product._id, e.target.value)
                        }
                        className="border rounded p-2 w-24"
                      />
                    ) : (
                      `Rs ${product.price}`
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editMode[product._id] ? (
                      <button
                        onClick={() => handleUpdatePrice(product._id)}
                        className="bg-blue-50 hover:bg-blue-300 text-white font-bold py-1 px-3 rounded mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleEditMode(product._id)}
                        className="bg-[#f06595] hover:bg-[#ee407d] text-white font-bold py-1 px-3 rounded mr-2"
                      >
                        Edit Price
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AdminProductManagement;
