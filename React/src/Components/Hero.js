import React from "react";
import productImage from "../images/phone.png"; 
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div className="h-[600px] flex items-center justify-between bg-gradient-to-r from-[#fff5f5] to-[#ffe8e8] px-[150px] pt-20">
      {/* Left Section: Product Details */}
      <div className="w-1/2 space-y-6">
        
        <h1 className="text-[42px] font-bold text-[#ff6b6b] leading-snug">
          A new life<br />To your Pre-Loved Products
        </h1>
        <p className="text-[20px] text-gray-600">
        Find unique treasures and timeless style without breaking the bank. Shop your favorites at our thrift store today!
        </p>
        <p className="text-[20px] text-gray-600">Shop our luxury preloved finds.</p>
        <Link to='/categories/luxuryfinds'>  <button className="px-6 py-3 mt-5 text-lg bg-[#ff6b6b] text-white rounded-full hover:bg-[#e76848]">
          Shop Now
        </button>
        </Link>
      </div>

      {/* Right Section: Product Image */}
      <div className="flex justify-center items-center">
        <img
          src={productImage}
          alt="Most Selling Product"
          className="w-[470px]  mt-[43px]"
        />
      </div>
    </div>
  );
};

export default Hero;
