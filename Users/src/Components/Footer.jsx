import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-32" src={assets.WAREWISE} alt="" />
          <p className="w-full md:w2/3 text-gray-600">
            We are dedicated to bringing you high-quality products with
            exceptional customer service. Our mission is to provide a seamless
            shopping experience while delivering premium items that exceed your
            expectations. Thank you for choosing us as your trusted shopping
            destination.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link
                to="/"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                Delivery
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+9471 65 22 935</li>
            <li>warewise@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ forever.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
