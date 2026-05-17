// cSpell:disable
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SWMDLogo from '../assets/denr.svg';
import bagong_pilipinas_icon from '../assets/bagong_pilipinas.svg';
import coat_of_arms_icon from '../assets/coat_of_arms.svg';
import ACCESSIBILITY_BUTTON from '../assets/ACCESSIBILITY_BUTTON.svg'
import NSWMC_1 from '../assets/NSWMC_1.svg';

const Layout = ({ children }) => {
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDashboardsOpen, setIsDashboardsOpen] = useState(false);

  // --- Scroll tracking state ---
  const [showNav, setShowNav] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  // --- FIX 1: Safely hide horizontal overflow globally without breaking sticky ---
  useEffect(() => {
    document.body.classList.add('overflow-x-hidden');
    return () => {
      document.body.classList.remove('overflow-x-hidden');
    };
  }, []);

  // --- FIX 2: Optimized Scroll Event Listener ---
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // Hide if scrolling down and past 50px (prevents bouncing at the very top)
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setShowNav(false);
          closeAllDropdowns();
          setIsAccessibilityOpen(false);
        }
        // Show instantly if scrolling UP
        else if (currentScrollY < lastScrollY) {
          setShowNav(true);
        }

        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      <div
        className={`sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out shadow-sm bg-white dark:bg-gray-900 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <header className="w-full max-w-[1600px] mx-auto flex flex-col relative transition-colors duration-300">

          {/* ROW 1: LOGO & ACCESSIBILITY BUTTON */}
          <div className="flex justify-between items-center w-full py-3 px-4 md:px-8">

            {/* LEFT: LOGO & TITLE */}
            <div className="flex items-center space-x-2 md:space-x-3 shrink-0">
              <div className="flex items-center justify-center gap-1 sm:gap-2 shrink-0">
                <a
                  href="https://nswmc-website-redesign-wpa5.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="NSWMC homepage"
                  className="inline-block transition-transform duration-200 ease-out hover:scale-105"
                >
                  <img src={NSWMC_1} alt="NSWMC Logo" className="w-12 h-14 md:w-15 md:h-15 object-contain" />
                </a>
                <a
                  href="https://denr.gov.ph/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DENR website"
                  className="inline-block transition-transform duration-200 ease-out hover:scale-105"
                >
                  <img src={SWMDLogo} alt="DENR Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                </a>
              </div>
              <div className="flex flex-col justify-center">
                <h1 className=" mb-0.5 font-raleway dark:text-white text-[0.5rem] md:text-[0.6rem] font-extrabold uppercase tracking-wide leading-tight">
                  Republic of the Philippines <br />
                  <a
                    href="https://nswmc-website-redesign-wpa5.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emb-blue dark:hover:text-blue-400 transition-colors"
                  >
                    Department of Environment and Natural Resources
                  </a>
                </h1>
                <div className="relative  h-[2px] overflow-hidden bg-white dark:bg-gray-900 shadow-md">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0020EE] to-[#30D700]"></div>
                </div>
                <div className="mt-0.5">
                  <h2 className="font-raleway text-black dark:text-white text-[0.55rem] md:text-[0.65rem] font-medium uppercase tracking-widest leading-tight">
                    <a
                      href="https://emb.gov.ph/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emb-blue dark:hover:text-blue-400 transition-colors"
                    >
                      Environmental Management Bureau
                    </a>
                    <br />
                  </h2>
                  <h2 className="text-[0.55rem] md:text-[0.65rem] font-bold">
                    <a
                      href="https://nswmc-website-redesign-wpa5.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emb-blue dark:hover:text-blue-400 transition-colors"
                    >
                      SOLID WASTE MANAGEMENT DIVISION
                    </a>
                  </h2>
                </div>
              </div>
            </div>

            {/* RIGHT: ACCESSIBILITY TOGGLE */}
            <div className="flex items-center justify-end shrink-0 relative">
              <img
                title="Accessibility Options"
                aria-expanded={isAccessibilityOpen}
                onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
                className="w-12 h-8 md:w-16 md:h-10 rounded-md md:rounded-xl bg-emb-blue text-white flex items-center justify-center cursor-pointer hover:bg-blue-800 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                src={ACCESSIBILITY_BUTTON}
                alt="Accessibility Options"
              />

              {isAccessibilityOpen && (
                <div className="absolute right-0 top-full mt-4 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden z-50 border border-gray-100 dark:border-gray-700 flex flex-col">
                  <button
                    onClick={handleDarkModeToggle}
                    className="px-4 py-3 text-sm text-left font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition border-b border-gray-50 dark:border-gray-700"
                  >
                    {isDarkMode ? 'Enable Light Mode' : 'Enable Dark Mode'}
                  </button>
                  <a
                    href="#main-content"
                    onClick={() => setIsAccessibilityOpen(false)}
                    className="block px-4 py-3 text-sm text-left font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition border-b border-gray-50 dark:border-gray-700"
                  >
                    Skip to Main Content
                  </a>
                  <a
                    href="#footer"
                    onClick={() => setIsAccessibilityOpen(false)}
                    className="block px-4 py-3 text-sm text-left font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition"
                  >
                    Skip to Footer
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* ROW 2: NAVIGATION LINKS (NEW LINE) */}
          <div className="w-full flex justify-center pb-3 pt-3 px-4">
            <nav className="font-raleway flex flex-wrap items-center justify-center gap-4 md:gap-8 w-full text-[0.6rem] md:text-[0.85rem] font-bold tracking-tight sm:tracking-normal">
              <Link to="/" className="hover:text-emb-blue dark:hover:text-blue-400 transition">HOME</Link>

              {/* ABOUT US Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsAboutOpen(!isAboutOpen);
                    setIsDashboardsOpen(false);
                  }}
                  className="px-1 flex items-center uppercase hover:text-emb-blue dark:hover:text-blue-400 transition focus:outline-none bg-transparent border-none cursor-pointer"
                >
                  ABOUT US
                  <svg className={`w-3 h-3 ml-1 shrink-0 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isAboutOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden z-50 border border-gray-100 dark:border-gray-700 text-left tracking-normal flex flex-col">
                    <Link to="/about/solid-waste-management" onClick={closeAllDropdowns} className="block px-4 py-3 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">Solid Waste Management Division</Link>
                    <Link to="/about/org-chart" onClick={closeAllDropdowns} className="block px-4 py-3 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">Organizational Chart</Link>
                    <Link to="/about/commissioners" onClick={closeAllDropdowns} className="block px-4 py-3 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">NSWMC Commissioners</Link>
                    <Link to="/about/citizens-charter" onClick={closeAllDropdowns} className="block px-4 py-3 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">Citizen's Charter on SWM</Link>
                  </div>
                )}
              </div>

              <Link to="/laws" className="hover:text-emb-blue dark:hover:text-blue-400 transition whitespace-nowrap">LAWS & POLICY</Link>

              {/* DASHBOARDS Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsDashboardsOpen(!isDashboardsOpen);
                    setIsAboutOpen(false);
                  }}
                  className="px-1 flex items-center uppercase hover:text-emb-blue dark:hover:text-blue-400 transition focus:outline-none bg-transparent border-none cursor-pointer"
                >
                  DASHBOARDS
                  <svg className={`w-3 h-3 ml-1 shrink-0 transition-transform ${isDashboardsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isDashboardsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden z-50 border border-gray-100 dark:border-gray-700 text-left tracking-normal flex flex-col">
                    <Link to="/dashboards/10-year-plan" onClick={closeAllDropdowns} className="block px-4 py-3 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">10-Year Solid Waste Management Plan</Link>
                    <Link to="/dashboards/operational-landfills" onClick={closeAllDropdowns} className="block px-4 py-3 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">Operational Sanitary Landfills</Link>
                    <Link to="/dashboards/projected-waste" onClick={closeAllDropdowns} className="block px-4 py-3 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-emb-blue dark:hover:text-blue-400 transition">Projected Solid Waste Generation</Link>
                  </div>
                )}
              </div>

              <Link to="/elibrary" className="hover:text-emb-blue dark:hover:text-blue-400 transition">E-LIBRARY</Link>
              <Link to="/contacts" className="hover:text-emb-blue dark:hover:text-blue-400 transition">CONTACTS</Link>
            </nav>
          </div>

        </header>
      </div>

      <main id="main-content" className="flex-grow w-full mx-auto relative z-0 scroll-mt-6">
        {children}
      </main>

      {/* FOOTER */}
      <footer id="footer" className="w-full relative mt-auto transition-colors duration-300">

        <div className="relative top-0 w-full h-[.3rem] bg-gradient-to-r from-emb-blue via-emb-green to-emb-green-light"></div>

        <div className="w-full mx-auto px-6 md:px-16 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 bg-footer-bg dark:bg-gray-900">
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <div className="flex flex-row md:flex-col items-center sm:items-start gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20">
                <img src={coat_of_arms_icon} alt="Coat of Arms" className="w-full h-full object-contain p-1" />
              </div>
              <div className="w-16 h-16 md:w-20 md:h-20">
                <img src={bagong_pilipinas_icon} alt="Bagong Pilipinas" className="w-full h-full object-contain p-1" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">About GovPH</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">Learn more about the Philippine government, its structure, how government works and the people behind it.</p>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
              <li>
                <a href="http://www.gov.ph/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors duration-200 hover:text-[#365E02] dark:hover:text-[#6ca924]">
                  GOV.PH
                </a>
              </li>
              <li>
                <a href="https://www.gov.ph/data" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors duration-200 hover:text-[#365E02] dark:hover:text-[#6ca924]">
                  Open Data Portal
                </a>
              </li>
              <li>
                <a href="https://www.officialgazette.gov.ph/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors duration-200 hover:text-[#365E02] dark:hover:text-[#6ca924]">
                  Official Gazette
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Copyrights</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">© 2026 National Solid Waste Management Commission. All rights reserved. All content, documents, and materials on this website are for public information purposes and may not be reproduced, distributed, or used without proper acknowledgment.</p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Government Links</h3>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
              <li>
                <a href="https://op-proper.gov.ph/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors duration-200 hover:text-[#365E02] dark:hover:text-[#6ca924]">
                  Office of the President
                </a>
              </li>
              <li>
                <a href="https://ovp.gov.ph/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors duration-200 hover:text-[#365E02] dark:hover:text-[#6ca924]">
                  Office of the Vice President
                </a>
              </li>
              <li>
                <a href="https://www.senate.gov.ph/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors duration-200 hover:text-[#365E02] dark:hover:text-[#6ca924]">
                  Senate of the Philippines
                </a>
              </li>
              <li>
                <a href="https://www.congress.gov.ph/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors duration-200 hover:text-[#365E02] dark:hover:text-[#6ca924]">
                  House of Representatives
                </a>
              </li>
              <li>
                <a href="https://sc.judiciary.gov.ph/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors duration-200 hover:text-[#365E02] dark:hover:text-[#6ca924]">
                  Supreme Court
                </a>
              </li>
              <li>
                <a href="https://ca.judiciary.gov.ph/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors duration-200 hover:text-[#365E02] dark:hover:text-[#6ca924]">
                  Court of Appeals
                </a>
              </li>
              <li>
                <a href="https://sb.judiciary.gov.ph/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors duration-200 hover:text-[#365E02] dark:hover:text-[#6ca924]">
                  Sandigan Bayan
                </a>
              </li>
            </ul>
          </div>

          {/* social icons */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Follow Us On</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/DENREnviBureau" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-black dark:bg-gray-800 flex items-center justify-center text-emb-blue dark:text-blue-400 hover:bg-[#365E02] hover:text-white dark:hover:bg-[#6ca924] dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>

              <a href="https://www.instagram.com/denrofficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-black dark:bg-gray-800 flex items-center justify-center text-emb-blue dark:text-blue-400 hover:bg-[#365E02] hover:text-white dark:hover:bg-[#6ca924] dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>

              <a href="https://x.com/DENROfficial" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="w-10 h-10 rounded-full bg-black dark:bg-gray-800 flex items-center justify-center text-emb-blue dark:text-blue-400 hover:bg-[#365E02] hover:text-white dark:hover:bg-[#6ca924] dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
