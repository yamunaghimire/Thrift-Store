import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const CategoryPage = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // console.log("Category from URL:", category); // Log the category value
    const fetchProducts = async () => {
      try {
        console.log("Fetching products for category:", category);
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/products?category=${category}`);
        const data = await response.json();

        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.message || "Failed to load products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Fetch products whenever the category changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 pt-[55px] text-center">{category.charAt(0).toUpperCase() + category.slice(1)} Section</h1>

      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
