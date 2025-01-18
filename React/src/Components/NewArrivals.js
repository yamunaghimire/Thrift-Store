import React from 'react';

const NewArrivals = () => {
    const products = [
        {
            title: "Y2k skirt",
            price: "Rs 1300.33",
            image: "./images/smartwatch.png",
        },
        {
            title: "Shower Jacket",
            price: "Rs 700.70",
            image: "./images/headphones.png",
        },
        {
            title: "Tweed Set",
            price: "Rs 1100.53",
            image: "./images/tablets.png",
        },
        {
            title: "Y2K belt",
            price: "Rs 1100.53",
            image: "./images/tablets.png",
        },
        
    ];

    return (
        <div className="flex flex-col  bg-white py-10  px-[150px]">
            <h1 className="text-2xl font-bold text-gray-800 mb-10">New Arrivals</h1>
            
            <div className="flex  space-x-7 flex-wrap ">
                {products.map((product, index) => (
                    <div key={index} className="w-[250px] h-auto rounded-lg shadow-md ">
                        <div className="bg-[#f9f5ec] px-4 flex  rounded-t-lg">
                            <img src={product.image} alt={product.title} className="h-40" />
                        </div>
                        <div className="p-1 text-center">
                            <h2 className="text-medium font-semibold text-gray-800 ">{product.title}</h2>
                            <p className="text-blue-500 font-bold mb-4">{product.price}</p>
                            <button className="px-4 py-1 bg-black text-white rounded-full hover:bg-gray-400 mb-2 text-sm">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;
