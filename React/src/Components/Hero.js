import React from 'react';
import phone from '../images/phone.png';

const Hero = () => {
    return (
        <div className="h-[500px] flex items-center justify-between bg-[#f9f5ec] px-[150px]  pt-20">
            <div className="w-1/2 space-y-6">
                <h1 className="text-4xl font-bold text-[#ff957a] leading-snug">Unique Finds<br />Affordable Trends, Timeless Impact.</h1>
                <p className="text-lg text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, debitis pariatur dolores dolorum inventore similique, at magnam fugiat ipsam necessitatibus expedita! Autem labore esse saepe, dolor qui culpa id. Nisi.</p>
                <button className="px-6 py-3 text-lg bg-[#ff957a] text-white rounded-full hover:bg-[#e76848]">See Collection</button>
            </div>
            <div className="flex justify-center">
                <img src={phone} alt="Watch" className="w-[500px]" />
            </div>
        </div>
    );
};

export default Hero;
