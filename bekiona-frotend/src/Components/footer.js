import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div>

<footer className="bg-gradient-to-br from-[#FFE5EC] via-[#FDE7FF] to-[#E6F0FF] pt-14 pb-8 text-gray-700">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">

    {/* Footer Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

      {/* Categories */}
      <div>
        <h3 className="text-xl font-bold text-[#B0228C] mb-4">All Categories</h3>
        <ul className="space-y-2">
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer transition">Vitamin C Face Wash</li>
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">Anti-Acne Face Wash</li>
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">Gold Scrub Face Wash</li>
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">Anti Hair Fall Shampoo</li>
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">Rosemary Hair Oil</li>
        </ul>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-6">
          {[
            { icon: "facebook-f", color: "#1877F2" },
            { icon: "twitter", color: "#1DA1F2" },
            { icon: "instagram", color: "#E4405F" },
            { icon: "linkedin-in", color: "#0A66C2" },
          ].map((item, i) => (
            <a key={i}
              className="p-3 bg-white shadow-md rounded-full hover:shadow-xl transition transform hover:scale-110"
              href="#"
              style={{ color: item.color }}
            >
              <i className={`fab fa-${item.icon}`}></i>
            </a>
          ))}
        </div>
      </div>

      {/* Popular */}
      <div>
        <h3 className="text-xl font-bold text-[#B0228C] mb-4">Popular Categories</h3>
        <ul className="space-y-2">
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">Anti Hair Fall Shampoo</li>
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">Rosemary Hair Oil</li>
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">Anti-Acne Face Wash</li>
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">Beauty</li>
        </ul>
      </div>

      {/* Account */}
      <div>
        <h3 className="text-xl font-bold text-[#B0228C] mb-4">Customer Account</h3>
        <ul className="space-y-2">
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">My Account</li>
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">My Orders</li>
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">Wishlist</li>
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">Delivery Addresses</li>
          <li className="hover:text-[#B0228C] hover:font-semibold cursor-pointer">Wallet</li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="text-xl font-bold text-[#B0228C] mb-4">Help & Support</h3>
        <ul className="space-y-2">
          <li><Link className="hover:text-[#B0228C] hover:font-semibold" to="/aboutus">About Us</Link></li>
          <li><Link className="hover:text-[#B0228C] hover:font-semibold" to="/faq">FAQ</Link></li>
          <li><Link className="hover:text-[#B0228C] hover:font-semibold" to="/term&condition">Terms & Conditions</Link></li>
          <li><Link className="hover:text-[#B0228C] hover:font-semibold" to="/privacypolicy">Privacy Policy</Link></li>
          <li><Link className="hover:text-[#B0228C] hover:font-semibold" to="/ewaste">E-Waste Policy</Link></li>
          <li><Link className="hover:text-[#B0228C] hover:font-semibold" to="/cancelpolicy">Cancellation Policy</Link></li>
          <li><Link className="hover:text-[#B0228C] hover:font-semibold" to="/deliverycancel">Delivery Policy</Link></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-xl font-bold text-[#B0228C] mb-4">Contact Us</h3>
        <p className="mb-1">support@kiona.com</p>
        <p className="mb-1">10:00 AM – 6:00 PM</p>
        <p className="mb-3">We are here to help you.</p>

        <a href="/Contactus" className="text-[#B0228C] font-semibold hover:underline">
          Contact Us →
        </a>

        <h3 className="text-xl font-bold text-[#B0228C] mt-6 mb-3">Download the App</h3>
        <div className="flex gap-4">
          <img className="w-32 cursor-pointer drop-shadow"
            src="https://www.jiomart.com/assets/ds2web/jds-icons/google-play-icon.svg"
          />
          <img className="w-28 cursor-pointer drop-shadow"
            src="https://www.jiomart.com/assets/ds2web/jds-icons/ios_app_icon.svg"
          />
        </div>
      </div>

    </div>
  </div>

  {/* Footer Bottom */}
  <div className="text-center text-gray-600 text-sm mt-10 pt-4 border-t border-pink-200">
    © (2020 - 2024) Kiona India Private Limited. All rights reserved.
  </div>
</footer>



    </div>
  )
}

export default Footer