// Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto text-center px-4">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="httpss://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
            <FaFacebookF size={24} />
          </a>
          <a href="httpss://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
            <FaTwitter size={24} />
          </a>
          <a href="httpss://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-600">
            <FaInstagram size={24} />
          </a>
          <a href="httpss://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
            <FaLinkedinIn size={24} />
          </a>
        </div>

        {/* Legal and Policies */}
        <div className="mb-6">
          <a href="/terms" className="text-white hover:text-gray-400 mx-2">Terms of Service</a>
          <a href="/privacy" className="text-white hover:text-gray-400 mx-2">Privacy Policy</a>
          <a href="/refund" className="text-white hover:text-gray-400 mx-2">Refund Policy</a>
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-6">
          <p className="text-lg mb-2">Subscribe to our Newsletter</p>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-4 py-2 rounded-l-md text-black"
          />
          <button className="px-4 py-2 rounded-r-md bg-blue-600 text-white hover:bg-blue-700">
            Subscribe
          </button>
        </div>

        {/* Copyright Information */}
        <div className="mb-6">
          <p>&copy; {new Date().getFullYear()} CureConnect. All rights reserved.</p>
        </div>

        {/* About Us Section */}
        <div className="mb-6">
          <p className="text-lg mb-2">About Us</p>
          <p className="text-sm">CureConnect is your one-stop solution for health-related resources and support.</p>
          <a href="/about" className="text-white hover:text-gray-400">Learn More</a>
        </div>

        {/* Quick Links */}
        <div>
          <a href="/" className="text-white hover:text-gray-400 mx-2">Home</a>
          <a href="/login" className="text-white hover:text-gray-400 mx-2">Login</a>
          <a href="/new-movies" className="text-white hover:text-gray-400 mx-2">New Movies</a>
          <a href="/upcoming-movies" className="text-white hover:text-gray-400 mx-2">Upcoming Movies</a>
          <a href="/movies" className="text-white hover:text-gray-400 mx-2">Movies</a>
          <a href="/my-ticket" className="text-white hover:text-gray-400 mx-2">My Ticket</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
