import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SWMDLogo from '../assets/denr.svg';
import bagong_pilipinas_icon from '../assets/bagong_pilipinas.svg';
import coat_of_arms_icon from '../assets/coat_of_arms.svg';

const Layout = ({ children }) => {
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDashboardsOpen, setIsDashboardsOpen] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
    setIsAccessibilityOpen(false); 
  };

  const closeAllDropdowns = () => {
    setIsAboutOpen(false);
    setIsDashboardsOpen(false);
  };

  return (
    <div className="font-raleway min-h-screen flex flex-col font-sans text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* HEADER */}
      <header className="w-full bg-white dark:bg-gray-900 py-4 px-4  sm:px-4 md:px-8 lg:px-20 flex justify-between items-center z-20 relative transition-colors duration-300">
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center text-emb-blue font-bold text-xs text-center shrink-0">
            <img src={SWMDLogo} alt="SWMD Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-raleway text-emb-blue dark:text-blue-400 text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] uppercase tracking-wide underline">
              Environmental Management Bureau
            </h1>
            <h2 className="font-raleway text-emb-blue dark:text-blue-300 text-[0.5rem] sm:text-[0.65rem] md:text-xs font-light uppercase">
              Solid Waste Management Division
            </h2>
          </div>
        </div>

        <div className="flex items-center">
          {/* Accessibility Dropdown Wrapper */}
          <div className="relative">
            <button 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-emb-blue"
              title="Accessibility Options"
              aria-expanded={isAccessibilityOpen}
              onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
            >
              <span className="w-3 sm:w-4 h-[2px] bg-emb-blue dark:bg-blue-400 rounded"></span>
              <span className="w-3 sm:w-4 h-[2px] bg-emb-blue dark:bg-blue-400 rounded"></span>
              <span className="w-3 sm:w-4 h-[2px] bg-emb-blue dark:bg-blue-400 rounded"></span>
            </button>

            {isAccessibilityOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50 border border-gray-100 dark:border-gray-700 flex flex-col">
                <button 
                  onClick={handleDarkModeToggle} 
                  className="px-4 py-3 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition border-b border-gray-50 dark:border-gray-700"
                >
                  {isDarkMode ? 'Enable Light Mode' : 'Enable Dark Mode'}
                </button>
                <a 
                  href="#main-content" 
                  onClick={() => setIsAccessibilityOpen(false)}
                  className="block px-4 py-3 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition border-b border-gray-50 dark:border-gray-700"
                >
                  Skip to Main Content
                </a>
                <a 
                  href="#footer" 
                  onClick={() => setIsAccessibilityOpen(false)}
                  className="block px-4 py-3 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition"
                >
                  Skip to Footer
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* HORIZONTAL NAVIGATION BAR (Always visible, responsive text) */}
      <nav className="w-full px-2 sm:px-4 md:px-8 lg:px-20 mb-6 md:mb-8 relative z-10">
        <div className="font-raleway bg-emb-bg dark:bg-gray-800 shadow-sm border border-blue-100 dark:border-gray-700 rounded-lg md:rounded-xl px-2 sm:px-4 md:px-8 py-2 md:py-3 flex flex-row justify-between items-center w-full text-[0.55rem] sm:text-[0.65rem] md:text-[0.8rem] lg:text-[1.2rem] font-semibold tracking-tighter sm:tracking-normal">
          
          <Link to="/" className="px-2 hover:font-bold hover:text-emb-blue dark:hover:text-blue-400 transition">HOME</Link>
          
          {/* ABOUT US Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsAboutOpen(!isAboutOpen);
                setIsDashboardsOpen(false);
              }}
              className="px-2 flex items-center uppercase hover:font-bold hover:text-emb-blue dark:hover:text-blue-400 transition focus:outline-none md:py-2 bg-transparent border-none cursor-pointer"
            >
              ABOUT US
              <svg className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ml-0.5 shrink-0 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isAboutOpen && (
              <div className="px-2 flex flex-col absolute top-full left-0 sm:-left-4 mt-0 w-48 md:w-64 bg-white dark:bg-gray-800 shadow-lg rounded-b-md overflow-hidden z-50 border border-gray-100 dark:border-gray-700 text-left tracking-normal">
                <Link to="/about" onClick={closeAllDropdowns} className="block px-3 py-2 md:px-4 md:py-3 text-[0.65rem] md:text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">Solid Waste Management Division</Link>
                <Link to="/about/org-chart" onClick={closeAllDropdowns} className="block px-3 py-2 md:px-4 md:py-3 text-[0.65rem] md:text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">Organizational Chart</Link>
                <Link to="/about/commissioners" onClick={closeAllDropdowns} className="block px-3 py-2 md:px-4 md:py-3 text-[0.65rem] md:text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">NSWMC Commissioners</Link>
                <Link to="/about/citizens-charter" onClick={closeAllDropdowns} className="block px-3 py-2 md:px-4 md:py-3 text-[0.65rem] md:text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">Citizen's Charter on SWM</Link>
              </div>
            )}
          </div>

          <Link to="/laws" className="px-2 hover:font-bold hover:text-emb-blue dark:hover:text-blue-400 transition">LAWS & POLICY</Link>
          
          {/* DASHBOARDS Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsDashboardsOpen(!isDashboardsOpen);
                setIsAboutOpen(false);
              }}
              className="px-2 flex items-center uppercase hover:font-bold hover:text-emb-blue dark:hover:text-blue-400 transition focus:outline-none md:py-2 bg-transparent border-none cursor-pointer"
            >
              DASHBOARDS
              <svg className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ml-0.5 shrink-0 transition-transform ${isDashboardsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isDashboardsOpen && (
              <div className="px-2 flex flex-col absolute top-full right-0 sm:right-auto sm:left-0 mt-0 w-52 md:w-[300px] bg-white dark:bg-gray-800 shadow-lg rounded-b-md overflow-hidden z-50 border border-gray-100 dark:border-gray-700 text-left tracking-normal">
                <Link to="/dashboards/10-year-plan" onClick={closeAllDropdowns} className="block px-3 py-2 md:px-4 md:py-3 text-[0.65rem] md:text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">10-Year Solid Waste Management Plan</Link>
                <Link to="/dashboards/operational-landfills" onClick={closeAllDropdowns} className="block px-3 py-2 md:px-4 md:py-3 text-[0.65rem] md:text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">Operational Sanitary Landfills</Link>
                <Link to="/dashboards/projected-waste" onClick={closeAllDropdowns} className="block px-3 py-2 md:px-4 md:py-3 text-[0.65rem] md:text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">Projected Solid Waste Generation</Link>
              </div>
            )}
          </div>

          <Link to="/elibrary" className="px-2 hover:font-bold hover:text-emb-blue dark:hover:text-blue-400 transition">E-LIBRARY</Link>
          
          <Link to="/contacts" className="px-2 hover:font-bold hover:text-emb-blue dark:hover:text-blue-400 transition">CONTACTS</Link>
        </div>
      </nav>

      {/* MAIN CONTENT YIELDS HERE */}
      <main id="main-content" className="flex-grow w-full px-4 md:px-8 mx-auto mb-16 relative z-0 scroll-mt-6">
        {children}
      </main>

      {/* FOOTER */}
      <footer id="footer" className="w-full border-t-4 border-emb-blue dark:border-blue-500 relative mt-auto transition-colors duration-300">
        <div className="absolute top-0 left-1/3 right-1/3 h-1 bg-emb-green -mt-1"></div>
        <div className="absolute top-0 right-0 left-2/3 h-1 bg-emb-yellow -mt-1"></div>

        <div className="w-full mx-auto px-6 md:px-16 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 bg-footer-bg dark:bg-gray-900">
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <div className="flex flex-row md:flex-col items-center sm:items-start gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full shadow-sm">
                <img src={coat_of_arms_icon} alt="Coat of Arms" className="w-full h-full object-contain p-1" />
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full shadow-sm">
                <img src={bagong_pilipinas_icon} alt="Bagong Pilipinas" className="w-full h-full object-contain p-1" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">About GovPH</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">Learn more about the Philippine government, its structure, how government works and the people behind it.</p>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-2 underline cursor-pointer hover:text-emb-blue dark:hover:text-blue-400">
              <li>GOV.PH</li>
              <li>Open Data Portal</li>
              <li>Official Gazette</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Copyrights</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">© 2026 National Solid Waste Management Commission. All rights reserved. All content, documents, and materials on this website are for public information purposes and may not be reproduced, distributed, or used without proper acknowledgment.</p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Government Links</h3>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-2 underline cursor-pointer hover:text-emb-blue dark:hover:text-blue-400">
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
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Follow Us On</h3>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-2 underline cursor-pointer hover:text-emb-blue dark:hover:text-blue-400">
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