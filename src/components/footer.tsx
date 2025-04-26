import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8 px-4 text-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left Section */}
        <div className="space-y-4">
          <div className="text-black font-bold">
            <div>the</div>
            <div className="text-blue-800 text-2xl">freelance pm club</div>
          </div>
          <p className="text-sm text-gray-600 max-w-xs">
            Your complete resource hub for freelance project management success.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="text-blue-800">
              <FaFacebookF />
            </a>
            <a href="#" className="text-blue-800">
              <FaInstagram />
            </a>
            <a href="#" className="text-blue-800">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap gap-12 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Resources</h4>
            <ul className="space-y-1">
              <li>
                <a href="#">Templates</a>
              </li>
              <li>
                <a href="#">Courses</a>
              </li>
              <li>
                <a href="#">Job Board</a>
              </li>
              <li>
                <a href="#">Quizzes</a>
              </li>
              <li>
                <a href="#">Testimonial</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Membership</h4>
            <ul className="space-y-1">
              <li>
                <a href="#">Join Now</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Benefits</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-1">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t mt-8 pt-4 text-center text-xs text-gray-500">
        © 2025 The Freelance PM Club. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
