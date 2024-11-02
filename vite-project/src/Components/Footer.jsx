import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-200 hidden md:block w-full fixed bottom-0 text-black py-1 mt-10">
      <div className="container mx-auto text-center">
        <div className="mb-2">
          <p className="text-sm">
            © {new Date().getFullYear()} You Tube. All rights reserved.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <a href='#' className="text-sm hover:underline">
            Terms of Service
          </a>
          <a  href='#' className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a  href='#' className="text-sm hover:underline">
            Help Center
          </a>
          <a  href='#' className="text-sm hover:underline">
            Contact Us
          </a>
        </div>
        <div className="mt-2">
          <p className="text-xs">
            This site is not affiliated with YouTube, LLC. YouTube is a trademark of Google Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
