import React from 'react';

const Footer = () => (
  <>
    <footer
      className="footer-custom text-center py-3"
      style={{
        background: 'linear-gradient(90deg,rgb(2, 31, 58) 0%, #1a3d7c 100%)',
        color: '#e3ffe6',
        fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
        letterSpacing: '0.5px',
        fontSize: '1.05rem',
        boxShadow: '0 -2px 16px 0 rgba(10,2,78,0.08)', 
      }}
    >
      <p className="mb-0">
        &copy; 2025 <span style={{ fontWeight: 600, color: '#e3ffe6' }}>CarRental</span>. All rights reserved.
      </p>
    </footer>
    <style>
      {`
        .footer-custom {
          min-height: 60px;
        }
        .footer-custom a {
          color: #e3ffe6;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .footer-custom a:hover {
          color: #fff;
        }
      `}
    </style>
  </>
);

export default Footer;