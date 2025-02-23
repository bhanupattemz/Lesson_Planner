import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white py-10 px-5 text-center font-sans">
      <div className="flex justify-center gap-5 mb-5">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-200 transition-colors text-2xl"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-200 transition-colors text-2xl"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-200 transition-colors text-2xl"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-200 transition-colors text-2xl"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      <div className="mt-5 pt-5 border-t border-gray-700 text-gray-300 text-sm">
        <p>&copy; {new Date().getFullYear()} AI Lesson Planner. All rights reserved.</p>
      </div>
    </footer>
  );
}