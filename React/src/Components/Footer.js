import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#14141a] text-white py-8 px-20">
      <div className="container mx-auto grid grid-cols-4 gap-8 text-sm ">
      {/* Contact Section */}
      <div>
          <h3 className="font-bold text-lg mb-4">Contact</h3>
          <ul>
            <li className="mb-2">+977 9829324407</li>
            <li>(10AM - 7PM)</li>
          </ul>
        </div>
        

        {/* Info Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">INFO</h3>
          <ul>
            <li className="mb-2">
              <Link to="/about" className="hover:text-gray-500">
                About Us
              </Link>
            </li>
          
            <li>
              <Link to="/catalog" className="hover:text-gray-500">
                Sell on THRIFTVERSE
              </Link>
            </li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">HELP</h3>
          <ul>
            <li className="mb-2">
              <Link to="/shipping-details" className="hover:text-gray-500">
                Terms and Conditions
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/faq" className="hover:text-gray-500">
                Policies
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Socials Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Socials</h3>
          <ul>
            <li className="mb-2">
              <Link to="/tiktok" className="hover:text-gray-500">
                TikTok
              </Link>
            </li>
            <li>
              <Link to="/instagram" className="hover:text-gray-500">
                Instagram
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center text-xs mt-8 border-t border-gray-200 pt-4">
        © 2025 <span className="font-semibold">THRIFTVERSE</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
