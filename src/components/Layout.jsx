import React from 'react';
import { Link } from 'react-router-dom';
import SWMDLogo from '../assets/SWMD_LOGO 1.png';
import bagong_pilipinas_icon from '../assets/bagong_pilipinas_icon.png';
import coat_of_arms_icon from '../assets/coat_of_arms_icon.png';

const Layout = ({ children }) => {
  return (
    <div className="font-raleway min-h-screen flex flex-col font-sans text-gray-800">

      {/* HEADER */}
      <header className="w-full bg-white py-4 px-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          {/* Placeholder for EMB Logo */}
          <div className="w-16 h-16 flex items-center justify-center text-emb-blue font-bold text-xs text-center">
            <img src={SWMDLogo} alt="SWMD Logo" />
          </div>
          <div>
            <h1 className="font-raleway text-emb-blue text-sm uppercase tracking-wide underline">Environmental Management Bureau</h1>
            <h2 className="font-raleway text-emb-blue text-xs font-light uppercase">Solid Waste Management Division</h2>
          </div>
        </div>

      </header>

      {/* NAVIGATION BAR */}
      <nav className="font-raleway max-w-6xl mx-auto w-full px-2 mb-8 text-[.5rem] md:text-lg">
        <div className="font-raleway bg-emb-bg shadow-sm border border-blue-100 rounded-xl px-3 md:px-10 py-2 flex justify-between items-center">
          <Link to="/" className="hover:font-bold hover:text-emb-blue transition">HOME</Link>
          <Link to="/about" className="hover:font-bold hover:text-emb-blue transition">ABOUT US</Link>
          <Link to="/laws" className="hover:font-bold hover:text-emb-blue transition">LAWS AND POLICY</Link>
          <Link to="/dashboards" className="hover:font-bold hover:text-emb-blue transition">DASHBOARDS</Link>
          <Link to="/elibrary" className="hover:font-bold hover:text-emb-blue transition">E-LIBRARY</Link>
          <Link to="/contacts" className="hover:font-bold hover:text-emb-blue transition">CONTACTS</Link>
        </div>
      </nav>

      {/* MAIN CONTENT YIELDS HERE */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 mb-16">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t-4 border-emb-blue relative mt-auto">
        <div className="absolute top-0 left-1/3 right-1/3 h-1 bg-emb-green -mt-1"></div>
        <div className="absolute top-0 right-0 left-2/3 h-1 bg-emb-yellow -mt-1"></div>

        <div className="max-w-7xl mx-auto px-16 py-8 grid grid-cols-1 md:grid-cols-5 gap-2 bg-footer-bg">
          <div className="flex flex-col items-start space-y-4">
            {/* Footer Logos */}
            <div className="flex flex-col w-full items-end gap-4 px-8">
              <div className="w-20 h-20 bg-gray-200 rounded-full"><img src={coat_of_arms_icon} alt="Coat of Arms" className="w-full h-full object-contain" /></div>
              <div className="w-20 h-20 bg-gray-200 rounded-full"><img src={bagong_pilipinas_icon} alt="Bagong Pilipinas" className="w-full h-full object-contain" /></div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">About GovPH</h3>
            <p className="text-xs text-gray-600 mb-2">Learn more about the Philippine government, its structure, how government works and the people behind it.</p>
            <ul className="text-xs text-gray-500 space-y-1 underline">
              <li>GOV.PH</li>
              <li>Open Data Portal</li>
              <li>Official Gazette</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Copyrights</h3>
            <p className="text-xs text-gray-600">© © 2026 National Solid Waste Management Commission. All rights reserved. All content, documents, and materials on this website are for public information purposes and may not be reproduced, distributed, or used without proper acknowledgment.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Government Links</h3>
            <ul className="text-xs text-gray-500 space-y-1 underline">
              <li>Office of the President</li>
              <li>Office of the Vice President</li>
              <li>Senate of the Philippines</li>
              <li>House of Representatives</li>
              <li>Supreme Court</li>
              <li>Court of Appeals</li>
              <li>Sandigan Bayan</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Follow Us On</h3>
            <ul className="text-xs text-gray-500 space-y-1 underline">
              <li>Office of the President</li>
              <li>Office of the Vice President</li>
              <li>Senate of the Philippines</li>
              <li>House of Representatives</li>
              <li>Supreme Court</li>
              <li>Court of Appeals</li>
              <li>Sandigan Bayan</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;