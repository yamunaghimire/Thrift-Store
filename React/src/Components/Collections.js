import React from "react";
import { useNavigate } from "react-router-dom";
import westernImage from "../assests/images/western.jpg";
import traditionalsImage from "../assests/images/traditional.jpg";
import accessoriesImage from "../assests/images/accesories.jpg";
import makeupImage from "../assests/images/makeup.jpg";

const Collections = () => {
  const navigate = useNavigate();

  const items = [
    { name: "Western", image: westernImage, path: "/categories/western" },
    { name: "Traditional", image: traditionalsImage, path: "/categories/traditional" },
  { name: "Accessories", image: accessoriesImage, path: "/categories/accessories" },
  { name: "Makeup", image: makeupImage, path: "/categories/makeup" },
    // { name: "Skinc", image: makeupImage, path: "/makeup" },
  ];

  return (
    <div className="bg-white px-24 mb-[50px]">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center mt-[50px]">
      Discover Thrifted Collections
      </h1>

      {/* Collection Grid */}
      <div className="grid grid-cols-4 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="group relative cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            {/* Rectangular Box */}
            <div className="relative bg-white w-full h-[300px] rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-45 flex items-center justify-center">
                <span className="text-white text-xl font-semibold tracking-wide">
                  {item.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
