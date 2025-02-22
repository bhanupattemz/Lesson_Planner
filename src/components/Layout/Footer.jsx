import React from 'react';
import './Footer.css'; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AI Lesson Planner. All rights reserved.</p>
      </div>
    </footer>
  );
};
