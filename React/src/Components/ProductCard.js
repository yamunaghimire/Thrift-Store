import React from "react";

const ProductCard = ({ product }) => {
  if (!product) return <div>Product data is not available</div>;

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img
        src={product.image || "/path/to/default-image.jpg"} // Add a fallback image if the product image is missing
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-700 text-sm mb-2">{product.description}</p>
      <p className="font-bold text-lg text-blue-600">${product.price}</p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
