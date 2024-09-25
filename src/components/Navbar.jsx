// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          Form Schemas
        </Link>
        <div className="flex space-x-4">
          <Link to="/form_schemas" className="flex items-center space-x-2">
            Form Schemas
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;