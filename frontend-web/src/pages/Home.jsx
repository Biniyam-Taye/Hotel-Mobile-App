// src/components/Navbar.jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm px-6 py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            V
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-none">VILLA ALPHA</h1>
            <p className="text-[10px] text-gray-500 tracking-widest">INTERNATIONAL HOTEL</p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700">
          <a href="/rooms" className="hover:text-yellow-600 transition text-sm font-medium">Rooms</a>
          <a href="/hospitality" className="hover:text-yellow-600 transition text-sm font-medium">Hospitality</a>
          <a href="/experience" className="hover:text-yellow-600 transition text-sm font-medium">Experience</a>
          <a href="/about" className="hover:text-yellow-600 transition text-sm font-medium">About</a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition">
            Login
          </a>
          <a href="/signup" className="px-5 py-2 bg-yellow-600 text-white text-sm font-medium rounded-full hover:bg-yellow-700 transition">
            Sign Up
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-gray-50 rounded-2xl p-6 space-y-4">
          <a href="/rooms" className="block text-gray-700 hover:text-yellow-600 transition">Rooms</a>
          <a href="/hospitality" className="block text-gray-700 hover:text-yellow-600 transition">Hospitality</a>
          <a href="/experience" className="block text-gray-700 hover:text-yellow-600 transition">Experience</a>
          <a href="/about" className="block text-gray-700 hover:text-yellow-600 transition">About</a>
          <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
            <a href="/login" className="block text-center px-5 py-2 text-gray-700 hover:text-yellow-600 transition">
              Login
            </a>
            <a href="/signup" className="block text-center px-5 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition">
              Sign Up
            </a>
          </div>
        </div>
        
      )}
    </nav>
  );
};

export default Navbar;