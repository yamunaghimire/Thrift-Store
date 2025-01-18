import React from 'react';
import westernImage from '../assests/images/western.jpg';
import traditionalsImage from '../assests/images/traditional.png';
import accessoriesImage from '../assests/images/accesories.jpg';
import skincareImage from '../assests/images/skincare.png';
import makeupImage from '../assests/images/makeup.png';

const Collections = () => {
    const items = [
        { name: "Western", image: westernImage },
        { name: "Traditionals", image: traditionalsImage },
        { name: "Accessories", image: accessoriesImage },
        { name: "Skincare", image: skincareImage },
        { name: "Makeup", image: makeupImage },
    ];

    return (
        <div className="flex flex-col py-10 px-[150px]">
            <h1 className="text-2xl font-bold text-gray-800 mb-10">Featured Categories</h1>
            <div className="flex space-x-12 flex-wrap">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        {/* Image Container */}
                        <div className="bg-[#f9f5ec] w-[200px] h-[200px] flex items-center justify-center rounded-full shadow-md overflow-hidden">
                            {/* Image with Classes */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        {/* Item Name */}
                        <span className="mt-4 text-lg font-semibold text-center text-gray-800">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collections;
