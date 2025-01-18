import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#ff957a] text-white py-8 px-[150px]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-bold mb-4">About Us</h3>
          <ul>
            <li className="mb-2"><a href="#">Our Story</a></li>
            <li className="mb-2"><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Customer Service</h3>
          <ul>
            <li className="mb-2"><a href="#">Contact Us</a></li>
            <li className="mb-2"><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Socials</h3>
          <ul>
            <li className="mb-2"><a href="#">Facebook</a></li>
            <li className="mb-2"><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Policies</h3>
          <ul>
            <li className="mb-2"><a href="#">Privacy Policy</a></li>
            <li className="mb-2"><a href="#">Terms of Service</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs mt-8 border-t border-gray-700 pt-4">
        © 2024 ThriftStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
