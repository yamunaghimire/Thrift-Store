import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">About Our Thrift Store</h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover the story behind our store and the values that make us unique.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Story Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800">Our Story</h3>
            <p className="mt-4 text-gray-700">
              At [Store Name], we believe in sustainable fashion and giving pre-loved items a second chance. Our thrift store started as a humble project to provide affordable, eco-friendly clothing while promoting the concept of circular fashion. We source quality items from local donations and bring them to you at a fraction of the price of new clothing.
            </p>
            <p className="mt-4 text-gray-700">
              Our mission is to create a space where everyone can shop guilt-free while contributing to a greener planet. Join us on this journey to reduce waste, save money, and find unique pieces that tell a story.
            </p>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800">Our Values</h3>
            <ul className="mt-4 space-y-4 text-gray-700">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6" />
                </svg>
                Sustainability - We believe in reducing waste and giving new life to secondhand items.
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6" />
                </svg>
                Affordability - Quality items at prices that everyone can afford.
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6" />
                </svg>
                Community - We work with local organizations and donors to make a positive impact.
              </li>
            </ul>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">Join Our Community</h3>
          <p className="mt-4 text-lg text-gray-600">
            Whether you’re shopping for yourself or donating, you’re part of something bigger. Together, we can make a difference and create a more sustainable future for all.
          </p>
          <div className="mt-6">
            <a href="/shop" className="inline-block px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-md">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
