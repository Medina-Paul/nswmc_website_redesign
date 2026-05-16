// cSpell:disable
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import transparent_seal from '../assets/transparency_seal.svg';
import foi_seal from '../assets/foi.svg';
import { Search, ArrowDown, X } from 'lucide-react';
import hero_banner_2 from '../assets/hero_banner_2.svg';
import guide_icon_1 from '../assets/guide_icon_1.png';
import guide_icon_2 from '../assets/guide_icon_2.png';
import guide_icon_3 from '../assets/guide_icon_3.png';
import guide_icon_4 from '../assets/guide_icon_4.png';
import guide_icon_5 from '../assets/guide_icon_5.png';
import guide_icon_6 from '../assets/guide_icon_6.png';
import jicaWacsManual from '../pdf_files/JICA-WACS-Manual-Centerfold-20Jun13-FINAL.pdf';

// adobe embed config
const ADOBE_CLIENT_ID = '5b4f7d150d9445a9a472ed3adfa9714e';
const ADOBE_SCRIPT_SRC = 'https://acrobatservices.adobe.com/view-sdk/viewer.js';

// load the adobe view sdk once and resolve when AdobeDC is ready
const loadAdobeViewSDK = () => {
  if (typeof window === 'undefined') return Promise.reject(new Error('SSR'));
  if (window.AdobeDC) return Promise.resolve(window.AdobeDC);
  const existing = document.querySelector(`script[src="${ADOBE_SCRIPT_SRC}"]`);
  if (!existing) {
    const s = document.createElement('script');
    s.src = ADOBE_SCRIPT_SRC;
    s.async = true;
    document.head.appendChild(s);
  }
  return new Promise((resolve, reject) => {
    if (window.AdobeDC) return resolve(window.AdobeDC);
    document.addEventListener('adobe_dc_view_sdk.ready', () => resolve(window.AdobeDC), { once: true });
    setTimeout(() => {
      if (window.AdobeDC) resolve(window.AdobeDC);
      else reject(new Error('Adobe View SDK failed to load'));
    }, 15000);
  });
};

// popup pdf viewer using adobe embed
const PdfLightbox = ({ open, onClose, fileUrl, title }) => {
  const divId = 'adobe-dc-view-lightbox';
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // close on escape and lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // render the pdf when the lightbox opens
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setErr(null);

    loadAdobeViewSDK()
      .then((AdobeDC) => {
        if (cancelled) return;
        const host = document.getElementById(divId);
        if (host) host.innerHTML = '';
        const view = new AdobeDC.View({ clientId: ADOBE_CLIENT_ID, divId });
        view.previewFile(
          {
            content: { location: { url: fileUrl } },
            metaData: { fileName: title || 'document.pdf' },
          },
          {
            embedMode: 'SIZED_CONTAINER',
            defaultViewMode: 'FIT_WIDTH',
            showAnnotationTools: false,
            showLeftHandPanel: false,
            showDownloadPDF: true,
            showPrintPDF: true,
            showFullScreen: true,
          }
        );
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setErr(e.message || 'Failed to load PDF viewer');
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [open, fileUrl, title]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl h-[85vh] bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#1a5b8c] to-[#35a4cc] text-white px-4 md:px-6 py-3 flex items-center justify-between">
          <span className="font-raleway font-bold text-sm md:text-base tracking-widest truncate pr-4">
            {title}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 hover:bg-white/15 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative flex-1 bg-slate-50 dark:bg-slate-900">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-[#1a5b8c]/20 border-t-[#1a5b8c] rounded-full animate-spin" />
              <p className="mt-4 font-raleway font-bold text-[#1a5b8c] dark:text-blue-400 animate-pulse">
                Loading Document...
              </p>
            </div>
          )}
          {err && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
              <p className="font-bold text-red-600">Could not load the PDF.</p>
              <p className="mt-2 text-xs text-gray-600">{err}</p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-[#1a5b8c] hover:bg-[#15486f] text-white font-bold rounded-full text-xs"
              >
                Open PDF in new tab
              </a>
            </div>
          )}
          <div id={divId} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

const HERO_BG = "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=2000&auto=format&fit=crop";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const aboutRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(currentTime);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    weekday: 'long',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(currentTime);

  const dashboardCards = [
    { title: 'SWM Data Dashboards', description: 'The dashboard provides real-time waste collection updates, monitors major village bins, and supports composting decisions....', link: '/dashboards/10-year-plan' },  // ideally it should have main page but for now i will just link to the 10 year plan dashboard
    { title: 'NSWMC Resolutions', description: 'NSWMC resolutions provide policies and guidelines that strengthen waste management practices and support sustainable environmental programs.', link: 'https://drive.google.com/drive/folders/1T_HAuUuTbOOplqcPoxx5Ec-53ul13d_j' },
    { title: 'EPR Registry', description: "The Extended Producer Responsibility Registry tracks and monitors producers' compliance with waste recovery and sustainability obligations.", link: 'https://epr.emb.gov.ph/' },
    { title: 'Junk Shops and Recycling Facilities', description: 'Directory and information hub for recycling centers and junk shops.', link: 'https://drive.google.com/file/d/1vn3dvEkg9f8RVKPUqOBCimQCe8vMgZ98' },
    { title: 'SWM Facility Designs', description: 'Standardized plans and layouts for solid waste management facilities.', link: 'https://drive.google.com/drive/folders/1nckZ0KgsjI7wu9M4YKQd9taiey1ODk7x' },
    { title: 'National Plan of Action for Marine Litter', description: 'Strategies to reduce and manage marine litter nationwide.', link: 'https://drive.google.com/drive/folders/1Nc6hyMx0DJuJKI75HnFlbcyanoUqwqoc' },
    { title: 'Non-Environmentally Acceptable Products', description: 'List and guidelines on products harmful to the environment.', link: 'https://drive.google.com/drive/folders/1GBSyu_WHXGoZ1NWB8lBLuv9baENUPNtH' },
    { title: 'Waste Analysis Characterization Study Manual', description: 'Reference guide for conducting waste analysis studies.', link: 'https://drive.google.com/drive/folders/1SsdmPRoDOBFqVh81xsMA78Bs2aJ9S5G-' },
    { title: 'World Bank Group Plastic Roadmap', description: 'Framework for reducing plastic waste and improving circularity.', link: 'https://drive.google.com/drive/folders/1GIlsPnQGbb914aUnhDBrnah2O7sWC6QA' },
    { title: 'UN-Habitat Marine Litter Learning Kit', description: 'Educational resources on preventing marine litter.', link: 'https://unhabitat.org.ph/wp-content/uploads/2023/07/HOCCI_Marine-Litter-Learning-Kit_with-DENR_digital.pdf' },
    { title: 'UNIDO Open Burning Project PH', description: 'Initiative addressing the impacts of open waste burning in the Philippines.', link: 'https://drive.google.com/drive/folders/15LvvNKHMMzDPafgk91fqAecvkFukHVWU' },
    { title: 'JICA TCP Outputs', description: 'Reports and deliverables from JICA technical cooperation projects.', link: 'https://drive.google.com/drive/folders/1TryMCsd8vbtohTYxwCv86WJbrkQVg5Wr' },
    { title: 'SMEC Waste-to-Energy Study', description: 'Research on converting waste into usable energy solutions.', link: 'https://drive.google.com/drive/folders/1R2xFrdwoqY9yn1QXaIOocKXGsJql2EE0' },
    { title: 'Nestle Student Modules', description: 'Learning materials on sustainability and responsible waste practices.', link: 'https://drive.google.com/drive/folders/1z5L_1ejrgNw8KzfZ-spWyVBY1YTllX9U' },
    { title: 'LGU Good Practices', description: 'Collection of successful waste management initiatives by local governments.', link: 'https://drive.google.com/drive/folders/1rE2VulXT9_GGsEBnlUyj_AGNOKCi-lCH' },
    { title: 'Climate Change Reports', description: 'Collection of national and global reports focused on climate change.', link: 'https://drive.google.com/drive/folders/1aBF3E3_Jtn-xmW-UHQDwzUq7OLAtYnUD' }
  ];
  
  const newsItems = [
    { title: 'DENR-EMB Continues Air Quality Monitoring Following Navotas Landfill Fire', date: '29 April 2026', type: 'NEWS', img: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=300&h=200&fit=crop' },
    { title: 'Earth Day 2026: "Our Power, Our Planet"', date: '22 April 2026', type: 'NEWS', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop' },
    { title: 'Earth Day 2026: "Our Power, Our Planet"', date: '22 April 2026', type: 'NEWS', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop' },
    { title: 'Earth Day 2026: "Our Power, Our Planet"', date: '22 April 2026', type: 'NEWS', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop' },
  ];

  const projectItems = [
    { title: 'DENR-EMB Continues Air Quality Monitoring Following Navotas Landfill Fire', date: '29 April 2026', type: 'PROJECTS', img: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=300&h=200&fit=crop' },
    { title: 'Earth Day 2026: "Our Power, Our Planet"', date: '22 April 2026', type: 'PROJECTS', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop' },
    { title: 'Earth Day 2026: "Our Power, Our Planet"', date: '22 April 2026', type: 'PROJECTS', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop' },
    { title: 'Earth Day 2026: "Our Power, Our Planet"', date: '22 April 2026', type: 'PROJECTS', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop' },
  ];

  const guideItems = [
    {
      type: 'BIODEGRADABLE',
      desc: 'This category primarily includes kitchen waste, garden waste, agricultural waste, and livestock waste. By identifying these specific organic streams, the guide facilitates efficient waste diversion and ensures that biodegradable matter is properly managed alongside recyclables, residuals, and special waste.',
      text: 'text-[#2e6b12]',
      bgOpen: 'lg:bg-[linear-gradient(to_right,#6ca924_0%,#dcf589_35%,#ffffff_45%)]',
      bgOpenMobile: 'bg-[linear-gradient(to_bottom,#6ca924_0%,#dcf589_40%,#ffffff_60%)]',
      bgClose: 'bg-gradient-to-br from-[#3b5914] to-[#6ca924]'
    },
    {
      type: 'RECYCLABLE',
      desc: 'The Recyclables category identifies materials for recovery, including paper, various plastic resins, glass bottles or cullets, and metals like aluminum and copper. These items are categorized to help identify salable materials that can be diverted from landfills and reintegrated into the circular economy.',
      text: 'text-[#1b6b98]',
      bgOpen: 'lg:bg-[linear-gradient(to_right,#1b6b98_0%,#85bfe0_35%,#ffffff_45%)]',
      bgOpenMobile: 'bg-[linear-gradient(to_bottom,#1b6b98_0%,#85bfe0_40%,#ffffff_60%)]',
      bgClose: 'bg-gradient-to-br from-[#0c3954] to-[#1b6b98]'
    },
    {
      type: 'RESIDUALS FOR POTENTIAL RECYCLING',
      desc: 'Residuals with Potential for Recycling consist of items not typically salable in local junk shops, such as tetra packs, sachets, and rubber mats, which can still be processed through treatment technologies.',
      text: 'text-black',
      bgOpen: 'lg:bg-[linear-gradient(to_right,#4a4a4a_0%,#b3b3b3_35%,#ffffff_45%)]',
      bgOpenMobile: 'bg-[linear-gradient(to_bottom,#4a4a4a_0%,#b3b3b3_40%,#ffffff_60%)]',
      bgClose: 'bg-gradient-to-br from-[#242424] to-[#4a4a4a]'
    },
    {
      type: 'RESIDUALS FOR DISPOSAL',
      desc: 'Residuals for Disposal cover non-recoverable waste intended for landfills, including items like cigarette butts, soiled tissue, diapers, and sanitary napkins.',
      text: 'text-black',
      bgOpen: 'lg:bg-[linear-gradient(to_right,#1a1a1a_0%,#808080_35%,#ffffff_45%)]',
      bgOpenMobile: 'bg-[linear-gradient(to_bottom,#1a1a1a_0%,#808080_40%,#ffffff_60%)]',
      bgClose: 'bg-gradient-to-br from-[#000000] to-[#1a1a1a]'
    },
    {
      type: 'HAZARDOUS WASTE',
      desc: 'Hazardous Waste encompasses toxic materials that require special handling and permits, including paints, used oils, dry cell batteries, cleaning chemicals, and consumer electronics.',
      text: 'text-[#d90404]',
      bgOpen: 'lg:bg-[linear-gradient(to_right,#8a0d0d_0%,#f58787_35%,#ffffff_45%)]',
      bgOpenMobile: 'bg-[linear-gradient(to_bottom,#8a0d0d_0%,#f58787_40%,#ffffff_60%)]',
      bgClose: 'bg-gradient-to-br from-[#4a0606] to-[#8a0d0d]'
    },
    {
      type: 'HEALTHCARE WASTE FROM HOSPITAL',
      desc: 'Healthcare Waste from Hospitals involves clinical materials like expired medicines, syringes, and surgical gloves, which must be strictly managed and properly disposed of according to Department of Health guidelines.',
      text: 'text-[#d1a704]',
      bgOpen: 'lg:bg-[linear-gradient(to_right,#c49c02_0%,#fae17a_35%,#ffffff_45%)]',
      bgOpenMobile: 'bg-[linear-gradient(to_bottom,#c49c02_0%,#fae17a_40%,#ffffff_60%)]',
      bgClose: 'bg-gradient-to-br from-[#7a6000] to-[#c49c02]'
    }
  ];

  const icons = [guide_icon_1, guide_icon_2, guide_icon_3, guide_icon_4, guide_icon_5, guide_icon_6];

  const [activeGuide, setActiveGuide] = useState(0);
  const [archiveQuery, setArchiveQuery] = useState('');
  const [pdfOpen, setPdfOpen] = useState(false);

  const filteredDashboardCards = useMemo(() => {
    const q = archiveQuery.trim().toLowerCase();
    if (!q) return dashboardCards;
    const tokens = q.split(/\s+/);
    return dashboardCards.filter((card) => {
      const haystack = `${card.title} ${card.description}`.toLowerCase();
      return tokens.every((t) => haystack.includes(t));
    });
  }, [archiveQuery]);

  return (
    <Layout>
      <div className="flex flex-col w-full justify-center z-0 bg-white dark:bg-gray-950 shadow-lg font-raleway">

        {/* ========================================= */}
        {/* 1. HERO BANNER                            */}
        {/* ========================================= */}
        <div className="relative h-[450px] font-raleway md:h-[500px] lg:h-[600px] 2xl:h-[850px] mt-6 mx-5 md:mx-10 lg:mx-6 mb-12 rounded-tl-[2.5rem] md:rounded-tl-[3rem] rounded-br-[2.5rem] md:rounded-br-[3rem] overflow-hidden">
          <img
            src={hero_banner_2}
            alt="Solid Waste Management Truck"
            className="absolute inset-0 w-screen h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none"></div>

          <div className="absolute top-0 right-0 bg-white dark:bg-gray-950 p-2 md:p-4 rounded-bl-[1.5rem] md:rounded-bl-[2rem] transition-colors duration-500 z-20">
            <svg className="absolute top-0 -left-8 w-8 h-8 text-white dark:text-gray-950 transition-colors duration-500 pointer-events-none translate-x-[1px]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M 100 0 L 100 100 A 100 100 0 0 0 0 0 Z" />
            </svg>
            <svg className="absolute -bottom-8 right-0 w-7 h-9 text-white dark:text-gray-950 transition-colors duration-500 pointer-events-none -translate-y-[1px]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M 100 0 L 100 100 A 100 100 0 0 0 0 0 Z" />
            </svg>
            <div className="border border-green-600 rounded-full flex items-center justify-center px-6 py-2 md:py-3 shadow-sm transition-colors duration-500 shrink-0">
              <p className="font-medium text-[0.6rem] text-xs md:text-sm transition-colors duration-500 tracking-wide">
                <span className="mr-2">PHILIPPINES STANDARD TIME:</span>
                <span className="inline-block tabular-nums min-w-[100px] md:min-w-[200px] text-left">
                  {formattedTime} , {formattedDate}
                </span>
              </p>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 pointer-events-none z-10">
            <h1 className="text-white font-bold text-4xl text-5xl md:text-[5rem] lg:text-[6rem] uppercase leading-[0.9] tracking-tight drop-shadow-md">
              Solid Waste<br />
              Management<br />
              Division
            </h1>
            <p className="mt-4 md:mt-0 md:absolute md:bottom-[3rem] md:left-[16rem] lg:left-[17.5rem] text-white/95 text-base md:text-[1rem] lg:text-[1.15rem] font-serif italic max-w-xs sm:max-w-md md:max-w-2xl drop-shadow-lg pointer-events-auto">
              Empowering communities and institutions to achieve sustainable and effective solid waste management for a cleaner, healthier Philippines.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 bg-white dark:bg-gray-950 p-2 md:p-4 rounded-tr-[1.5rem] md:rounded-tr-[2rem] transition-colors duration-500 z-20">
            <svg className="absolute -top-8 left-0 w-8 h-8 text-white dark:text-gray-950 transition-colors duration-500 pointer-events-none translate-y-[1px]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M 0 100 L 100 100 A 100 100 0 0 1 0 0 Z" />
            </svg>
            <svg className="absolute bottom-[-1px] -right-8 w-8 h-8 text-white dark:text-gray-950 transition-colors duration-500 pointer-events-none -translate-x-[1px]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M 0 100 L 100 100 A 100 100 0 0 1 0 0 Z" />
            </svg>
            <button
              onClick={() => {
                if (aboutRef.current) {
                  aboutRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-[#416B19] hover:bg-[#325213] hover:cursor-pointer text-white px-6 py-3.5 md:px-9 md:py-5 rounded-[1rem] md:rounded-[1.5rem] font-bold flex items-center justify-center gap-2 transition-all text-sm md:text-lg shadow-md pointer-events-auto w-full h-full"
            >
              Get Started
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================= */}
        {/* 2. RIBBON BAR                             */}
        {/* ========================================= */}
        <section className="w-full flex justify-around md:gap-8 py-6 bg-white dark:bg-gray-950 text-[#365E02] dark:text-blue-400 font-bold text-[0.8rem] md:text-[1.2rem] lg:text-[1.5rem] transition-colors duration-500">
          <a
            href="http://www.gov.ph/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-200 hover:opacity-80 hover:scale-105"
          >
            GOVPH
          </a>
          <a
            href="https://www.foi.gov.ph/requests/?status=&category=&q=Environmental+Management+Bureau"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-200 hover:opacity-80 hover:scale-105"
          >
            <img className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10' src={foi_seal} alt="FOI" /> FREEDOM OF INFORMATION
          </a>
          <a
            href="https://emb.gov.ph/transparency-seal-2/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-200 hover:opacity-80 hover:scale-105"
          >
            <img className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10' src={transparent_seal} alt="Transparency" /> TRANSPARENCY SEAL
          </a>
        </section>

        {/* ========================================= */}
        {/* 3. ABOUT SWMD SECTION                     */}
        {/* ========================================= */}
        <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <div ref={aboutRef} id='about_swmd' className="grid grid-cols-1 lg:grid-cols-[2fr_500px] gap-12 md:gap-20 items-center w-full">
            <div>
              <h2 className="font-raleway text-5xl md:text-6xl lg:text-[5rem] font-bold text-[#04578F] dark:text-blue-400 mb-6 tracking-tight">
                ABOUT SWMD
              </h2>
              <p className="text-[#04578F] dark:text-gray-300 text-sm md:text-[1.3rem] 2xl:text-[1.8rem] leading-relaxed text-justify font-medium">
                The National Solid Waste Management Commission (NSWMC) is the lead body responsible for formulating policies, strategies, and programs to ensure the effective implementation of ecological solid waste management in the Philippines. In partnership with national agencies, local government units, and stakeholders, the Commission works to promote sustainable practices, reduce environmental impact, and safeguard public health. Guided by the principles of environmental stewardship and shared responsibility, NSWMC drives nationwide efforts toward a cleaner, healthier, and more sustainable future for every Filipino.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Solid Waste Management Division', link: '/about' },
                { title: 'Organizational Chart', link: '/about/org-chart' },
                { title: 'NSWMC Commissioners', link: '/about/commissioners' },
                { title: 'Citizen Charter\'s On SWM', link: '/about/citizens-charter' },
              ].map((item, i) => (
                <a key={i} href={item.link} className="bg-white dark:bg-gray-800 border-2 border-[#04578F]/20 hover:border-[#04578F] rounded-2xl p-6 flex flex-col justify-between md:min-h-[200px] lg:min-h-[250px] group transition-all shadow-sm hover:shadow-md">
                  <h3 className="font-bold text-[#04578F] dark:text-blue-300 text-[1rem] md:text-[1.5rem] leading-tight group-hover:scale-[1.02] transition-transform">{item.title}</h3>
                  <div className="flex justify-between items-center text-[#04578F]/70 text-xs font-semibold mt-4">
                    <span className="group-hover:text-[#04578F]">View page</span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform">›</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 4. ARCHIVES DASHBOARD                     */}
        {/* ========================================= */}
        <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="w-full">
            {/* Header Section */}
            <div className="mb-12 md:mb-14">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-8">
                <div className="flex-1">
                  <h2 className="text-[#04578F] dark:text-blue-300 text-5xl md:text-6xl lg:text-[5rem] font-black uppercase tracking-tight leading-[0.9] mb-4">
                    Archives <br /> Dashboard
                  </h2>
                  <p className="text-[#04578F] dark:text-gray-300 text-sm md:text-[1.3rem] 2xl:text-[1.8rem] max-w-2xl leading-relaxed font-medium">
                    Explore tools, data, and resources designed to support better waste management. From dashboards and policy guides to facility designs and best practices, discover solutions that drive progress toward sustainable waste management.
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-96 ml-auto">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0B4C8C] dark:text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={archiveQuery}
                  onChange={(e) => setArchiveQuery(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border-2 border-[#0B4C8C]/20 dark:border-blue-500/20 text-[#0B4C8C] dark:text-white placeholder-[#0B4C8C]/50 dark:placeholder-gray-400 pl-16 pr-6 py-3.5 md:py-4 rounded-full outline-none focus:border-[#0B4C8C] dark:focus:border-blue-400 focus:ring-2 focus:ring-[#0B4C8C]/10 dark:focus:ring-blue-400/10 transition-all text-sm md:text-base shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {/* Cards Grid */}
            {filteredDashboardCards.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 w-16 h-16 bg-[#04578F] dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-white dark:text-blue-400 opacity-50" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#0B4C8C] dark:text-blue-300 mb-2">No Results Found</h3>
                <p className="text-[#0B4C8C]/70 dark:text-gray-400 max-w-md text-sm md:text-base">
                  Nothing matches <span className="font-bold">"{archiveQuery}"</span>. Try adjusting your search terms.
                </p>
              </div>
            ) : (
              <div className="bg-[#04578F] dark:bg-blue-900 rounded-3xl p-8 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                  {filteredDashboardCards.map((item, i) => (
                    <a
                      key={i}
                      href={item.link}
                      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-7 overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
                    >
                      {/* Background gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0B4C8C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Content */}
                      <div className="flex-1 relative z-10 mb-4">
                        <h3 className="font-black text-[#0B4C8C] dark:text-blue-300 text-base md:text-lg leading-tight mb-3 group-hover:text-[#0B4C8C] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[#0B4C8C]/75 dark:text-gray-400 text-xs md:text-sm line-clamp-4 leading-relaxed group-hover:text-[#0B4C8C]/85 transition-colors">
                          {item.description}
                        </p>
                      </div>

                      {/* Footer button */}
                      <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#0B4C8C] dark:text-blue-400 group-hover:gap-3 transition-all duration-300 relative z-10 mt-auto">
                        <span>Learn More</span>
                        <span className="text-base group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>

                      {/* Border animation */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-[#0B4C8C]/0 group-hover:border-[#0B4C8C]/20 transition-colors duration-300 pointer-events-none" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================= */}
        {/* 5. FEATURED CONTENTS                      */}
        {/* ========================================= */}
        <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20 font-merriweather">
          <h2 className="text-4xl md:text-5xl mb-12">
            <span className="font-black font-raleway text-[#04578F] dark:text-blue-400">FEATURED</span> <span className="font-black font-raleway text-[#365E02] dark:text-green-400">CONTENTS</span>
          </h2>

          <div className="mb-16">
            <h3 className="font-raleway font-bold text-[#365E02] text-xl mb-6 uppercase tracking-wider">NEWS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsItems.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform cursor-pointer flex flex-col">
                  <div className="relative h-40">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute top-[-10px] left-[10px] bg-[#365E02] text-white text-[0.6rem] font-bold px-3 py-1.5 text-center leading-tight shadow-md">
                      {item.date.split(' ')[0]} <br /> <div className="border-b py-1 relative top-[-4px]"></div> {item.date.split(' ')[1]} <br /> {item.date.split(' ')[2]}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <h4 className="font-bold text-[#04578F] dark:text-blue-300 text-sm leading-snug mb-4 line-clamp-3">{item.title}</h4>
                    <span className="text-[#60b613] text-[0.65rem] font-bold font-raleway">Read More</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-raleway font-bold text-[#04578F] text-xl mb-6 uppercase tracking-wider">PROJECTS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projectItems.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform cursor-pointer flex flex-col">
                  <div className="relative h-40">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute top-[-10px] left-[10px] bg-[#04578F] text-white text-[0.6rem] font-bold px-3 py-1.5 text-center leading-tight shadow-md">
                      {item.date.split(' ')[0]} <br /> <div className="border-b py-1 relative top-[-4px]"></div> {item.date.split(' ')[1]} <br /> {item.date.split(' ')[2]}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <h4 className="font-bold text-[#365E02] dark:text-blue-300 text-sm leading-snug mb-4 line-clamp-3">{item.title}</h4>
                    <span className="text-[#04578F] text-[0.65rem] font-bold font-raleway">Read More</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 6. A GUIDE ON SOLID WASTE MANAGEMENT      */}
        {/* ========================================= */}
        <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-[#365E02] uppercase leading-tight">
                A Guide on Solid <br /> Waste Management
              </h2>
              <p className="mt-4 font-merriweather italic text-emb-green">
                A quick visual guide to waste segregation, covering six categories from recyclables to hazardous waste with color-coded cards for easy identification.
              </p>
            </div>
            {/* Nav Arrows */}
            <div className="flex gap-4">
              <button onClick={() => setActiveGuide(p => (p === 0 ? 5 : p - 1))} className="p-3 bg-[#365E02] text-white rounded-xl hover:scale-105 transition-transform shadow-lg">
                <ArrowDown className="rotate-90 w-6 h-6" />
              </button>
              <button onClick={() => setActiveGuide(p => (p === 5 ? 0 : p + 1))} className="p-3 bg-[#365E02] text-white rounded-xl hover:scale-105 transition-transform shadow-lg">
                <ArrowDown className="-rotate-90 w-6 h-6" />
              </button>
            </div>
          </div>

          {/* ACCORDION SLIDER */}
          <div className="flex flex-col lg:flex-row w-full gap-3 md:gap-4 min-h-[500px] lg:h-[500px] 2xl:h-[750px]">
            {guideItems.map((item, idx) => {
              const isActive = activeGuide === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveGuide(idx)}
                  className={`
                    relative overflow-hidden cursor-pointer shadow-xl
                    transition-all duration-700 ease-[cubic-bezier(0.4, 0, 0.2, 1)]
                    flex flex-col
                    ${isActive
                      ? `lg:flex-[12] h-[550px] lg:h-full rounded-[1.5rem] md:rounded-[1.5rem] ${item.bgOpenMobile} ${item.bgOpen}`
                      : `lg:flex-[1.2] h-[64px] md:h-[80px] lg:h-full hover:scale-[1.02] rounded-[1.5rem] md:rounded-[1.5rem] ${item.bgClose}`
                    }
                  `}
                >
                  {/* CLOSED STATE MOBILE TEXT (Horizontal Bar) */}
                  <div className={`
                    lg:hidden absolute inset-0 flex items-center justify-between w-full px-6 md:px-8 text-white
                    transition-opacity duration-300
                    ${isActive ? 'opacity-0 pointer-events-none z-0' : 'opacity-100 z-10'}
                  `}>
                    <span className="font-extrabold text-sm md:text-base tracking-widest uppercase truncate pr-4">{item.type}</span>
                    <span className="text-xl shrink-0">★</span>
                  </div>

                  {/* OPEN STATE CONTENT */}
                  <div className={`
                    flex flex-col lg:flex-row absolute top-0 left-0 w-full h-[550px] lg:h-full
                    transition-all duration-500
                    ${isActive ? 'z-10 pointer-events-auto opacity-100' : 'z-0 pointer-events-none opacity-0'}
                  `}>

                    {/* ICON SIDE */}
                    <div className={`
                      flex-[4.5] lg:flex-[4] p-6 lg:p-8 flex flex-col justify-center lg:justify-between items-center lg:items-start relative
                      transition-opacity duration-500 delay-100
                      ${isActive ? 'opacity-100' : 'opacity-0'}
                    `}>
                      <span className="text-white text-3xl hidden lg:block absolute top-8 left-8">★</span>
                      <div className="flex-1 flex items-center justify-center w-full">
                        <img
                          src={icons[idx]}
                          alt={`${item.type} icon`}
                          className={`
                            transition-all duration-700 delay-100 object-contain drop-shadow-2xl
                            ${isActive ? 'w-44 lg:w-64 scale-110' : 'w-10 lg:w-16 grayscale opacity-40'}
                          `}
                        />
                      </div>
                    </div>

                    {/* TEXT SIDE */}
                    <div className={`
                      flex-[5.5] lg:flex-[6] flex flex-col justify-end lg:justify-center p-3 sm:p-5 lg:p-12 overflow-hidden
                      transition-all duration-700 ease-[cubic-bezier(0.4, 0, 0.2, 1)]
                      ${isActive ? 'translate-y-0 lg:translate-x-0 opacity-100 delay-200' : 'translate-y-12 lg:translate-y-0 lg:translate-x-12 opacity-0 delay-0'}
                    `}>
                      <div className="px-6 py-8 lg:p-10 xl:p-12 flex flex-col justify-center w-full lg:w-[380px] xl:w-[450px] h-full lg:h-auto shrink-0 ">
                        <h3 className={`font-black text-2xl lg:text-3xl xl:text-4xl mb-3 lg:mb-4 leading-tight uppercase ${item.text}`}>
                          {item.type}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-5 lg:mb-6 leading-relaxed">
                          {item.desc}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPdfOpen(true); }}
                          className={`font-black flex items-center gap-2 uppercase tracking-widest text-[10px] md:text-xs hover:gap-4 transition-all w-max cursor-pointer ${item.text}`}
                        >
                          Learn More <span className="text-lg md:text-xl">→</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* VERTICAL TITLE (Desktop Closed) */}
                  {!isActive && (
                    <div className="hidden lg:flex absolute inset-0 items-center justify-center transition-opacity duration-300 delay-300 pointer-events-none">
                      <span className="text-white font-black text-lg tracking-[0.3em] uppercase whitespace-nowrap -rotate-90 origin-center opacity-80">
                        {item.type.split(' ')[0]}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-12 w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#365E02] transition-all duration-700 ease-out rounded-full"
              style={{ width: `${((activeGuide + 1) / 6) * 100}%` }}
            />
          </div>
        </section>

      </div>

      <PdfLightbox
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
        fileUrl={jicaWacsManual}
        title="JICA WACS Manual"
      />
    </Layout>
  );
};

export default Home;
