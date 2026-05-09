// cSpell:disable
import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import hero_icon_1 from '../assets/hero_icon_1.png';
import transparent_seal from '../assets/transparency_seal.svg';
import foi_seal from '../assets/foi.svg';
import about_us_bg from '../assets/about_us_bg.png';
import guide_icon_1 from '../assets/guide_icon_1.png';
import guide_icon_2 from '../assets/guide_icon_2.png';
import guide_icon_3 from '../assets/guide_icon_3.png';
import { Search } from "lucide-react";


const Home = () => {
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
    { title: 'Earth Day 2026: "Our Power, Our Planet"', date: '22 April 2026', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=150&h=150&fit=crop' },
    { title: 'DENR-EMB Continues Air Quality Monitoring Following Navotas Landfill Fire', date: '29 April 2026', img: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=150&h=150&fit=crop' },
    { title: 'NSWMC Approves 10-Year Solid Waste Plans for 5 LGUs', date: '15 April 2026', img: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?w=150&h=150&fit=crop' },
  ];

  const projectItems = [
    { title: 'DENR-EMB Permitting on Wheels Brings Easier Environmental Compliance Services', date: '07 April 2026', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&h=150&fit=crop' },
    { title: 'EMB and Japanese Experts Strengthen Monitoring of Persistent Organic Pollutants in the Philippines', date: '24 March 2026', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop' },
    { title: 'Coastal Cleanup Drive 2026 Launched in Manila Bay', date: '10 March 2026', img: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=150&h=150&fit=crop' },
  ];

  const guideItems = [
    { type: 'RESIDUALS FOR DISPOSAL', desc: 'This disposal cover non-recyclable waste intended for landfilling items like cigarette butts, tissue, diapers, and wrappers.', color: 'from-gray-500', text: 'text-gray-800 dark:text-gray-200', icon: guide_icon_1 },
    { type: 'BIODEGRADABLE', desc: 'This category primarily includes kitchen waste, garden waste, agricultural waste, and livestock waste. By identifying these specific organic streams, the guide facilitates efficient waste diversion.', color: 'from-[#60b613]', text: 'text-[#467405] dark:text-[#8ae434]', icon: guide_icon_2 },
    { type: 'RECYCLABLE', desc: 'The Recyclables category identifies materials to be recovered including paper, cardboard, plastics, resins, glass bottles, and scrap metals like aluminum and tin cans.', color: 'from-[#35a4cc]', text: 'text-[#1a5b8c] dark:text-[#6ecdf2]', icon: guide_icon_3 },
  ];

  const [activeNews, setActiveNews] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [activeGuide, setActiveGuide] = useState(0);
  const [archiveQuery, setArchiveQuery] = useState('');

  const filteredDashboardCards = useMemo(() => {
    const q = archiveQuery.trim().toLowerCase();
    if (!q) return dashboardCards;
    // split into tokens so "marine plastic" matches cards containing both words
    const tokens = q.split(/\s+/);
    return dashboardCards.filter((card) => {
      const haystack = `${card.title} ${card.description}`.toLowerCase();
      return tokens.every((t) => haystack.includes(t));
    });
  }, [archiveQuery]);

  // Helper functions for infinite looping navigation
  const nextSlide = (setter, length) => setter((prev) => (prev + 1) % length);
  const prevSlide = (setter, length) => setter((prev) => (prev - 1 + length) % length);

  return (
    <Layout>
      <div className="flex flex-col space-y-5 w-full relative z-0 transition-colors duration-500">

        {/* 1. HERO SECTION */}
        <section
          className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-screen flex items-center shadow-sm bg-[#f4fbf9] dark:bg-slate-950 transition-colors duration-500"
        >
          {/* Background Gradients Fix */}
          <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#52BAFF]/50 dark:bg-[#1e3a8a]/40 rounded-full blur-[120px] pointer-events-none transition-colors duration-500"></div>
          <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#B4CE1F]/40 dark:bg-[#064e3b]/40 rounded-full blur-[120px] pointer-events-none transition-colors duration-500"></div>

          <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-6 sm:gap-12 py-10 sm:py-16 relative z-10">
            <div className="w-full md:w-1/2 z-10 space-y-4 sm:space-y-6 text-center md:text-left mt-6 sm:mt-10 md:mt-0">
              <h1 className="font-raleway text-2xl sm:text-4xl md:text-6xl lg:text-[4.5rem] text-emb-green dark:text-green-400 font-black leading-[1.05] drop-shadow-md/30 opacity-80 dark:opacity-90 transition-all">
                Solid Waste <br />
                Management <br />
                Division
              </h1>
              <p className="font-merriweather text-[#2e5e2e] dark:text-green-100 text-xs sm:text-base md:text-lg lg:text-xl leading-relaxed mx-auto md:mx-0 max-w-2xl transition-colors">
                Empowering communities and institutions to achieve sustainable and effective solid waste management for a cleaner, healthier Philippines.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 pt-2 sm:pt-4">
                <button className="font-raleway bg-[#35a4cc] dark:bg-sky-600 text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-lg shadow-md hover:bg-sky-500 dark:hover:bg-sky-500 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border border-[#2b8fb3] dark:border-sky-500">
                  Get Started
                </button>
                <div className="relative w-48 sm:w-72 md:w-80 group">
                  <input
                    type="text"
                    placeholder="Search"
                    className="font-raleway w-full bg-[#467405] dark:bg-green-700 text-white placeholder-white/80 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md text-xs sm:text-lg transition-all duration-300"
                  />
                  <Search className="w-4 sm:w-5 h-4 sm:h-5 absolute right-3 sm:right-5 top-2 sm:top-3 text-white/90 stroke-2 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center relative group">
              <img src={hero_icon_1} alt="SWMD Collage" className="w-full max-w-[250px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[750px] xl:max-w-[900px] h-auto object-contain drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-700 ease-out" />
            </div>
          </div>
        </section>

        {/* 2. RIBBON BAR */}
        <section
          className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] font-raleway flex flex-wrap justify-center gap-12 border-y-2 border-gray-100 dark:border-slate-800 py-4 text-emb-blue dark:text-blue-200 font-bold text-sm text-center bg-gradient-to-tr from-blue-50 via-blue-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500"
        >
          <div className="flex items-center space-x-2 hover:opacity-80 cursor-pointer transition-opacity"> <span>GOV PH</span></div>
          <div className="flex items-center space-x-2 hover:opacity-80 cursor-pointer transition-opacity"><img className='w-10 h-10' src={foi_seal} alt="FOI Seal" /> <span>FREEDOM OF INFORMATION</span></div>
          <div className="flex items-center space-x-2 hover:opacity-80 cursor-pointer transition-opacity"><img className='w-10 h-10' src={transparent_seal} alt="Transparency Seal" /> <span>TRANSPARENCY SEAL</span></div>
        </section>

        {/* 3. ABOUT SWMD SECTION */}
        <section
          className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] font-raleway text-center py-16 min-h-[600px] lg:min-h-screen flex flex-col justify-center items-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-100 dark:opacity-30 transition-opacity duration-500" style={{ backgroundImage: `url(${about_us_bg})` }}></div>
          <div className="absolute inset-0 z-0 bg-transparent dark:bg-slate-900/80"></div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 w-full relative z-10">
            <h2 className="text-6xl md:text-7xl font-light text-emb-blue dark:text-blue-300 drop-shadow-sm transition-colors">
              ABOUT <span className="font-bold text-emb-blue dark:text-blue-400">SWMD</span>
            </h2>
            <p className="text-emb-blue dark:text-slate-300 font-medium leading-relaxed max-w-4xl mx-auto transition-colors">
              The National Solid Waste Management Commission (NSWMC) is the lead body responsible for formulating policies, strategies, and programs to ensure the effective implementation of ecological solid waste management in the Philippines. In partnership with national agencies, local government units, and stakeholders, the Commission works to promote sustainable practices, reduce environmental impact, and safeguard public health. Guided by the principles of environmental stewardship and shared responsibility, NSWMC drives nationwide efforts toward a cleaner, healthier, and more sustainable future for every Filipino.
            </p>
            <button className="border-2 border-emb-blue dark:border-blue-400 text-emb-blue dark:text-blue-400 px-8 py-3 rounded-xl font-bold hover:bg-emb-blue hover:text-white dark:hover:bg-blue-400 dark:hover:text-slate-900 active:scale-95 transition-all duration-300 shadow-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              Learn More!
            </button>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 opacity-95">
              {[
                { title: 'Solid Waste Management Division', color: 'bg-[#315502] dark:bg-green-900', link: '/about' },
                { title: 'Organizational Chart', color: 'bg-[#4B8004] dark:bg-green-800', link: '/about/org-chart' },
                { title: 'NSWMC Commissioners', color: 'bg-[#74C609] dark:bg-green-700', link: '/about/commissioners' },
                { title: 'Citizen Charter on SWM', color: 'bg-[#BFDF03] dark:bg-lime-600', link: '/about/citizens-charter' },
              ].map((item, i) => (
                <a key={i} href={item.link} className={`${item.color} shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer px-5 py-8 rounded-2xl flex flex-col justify-between text-left h-48 border border-white/20 dark:border-white/10 group`}>
                  <h3 className="font-bold text-white text-lg leading-tight group-hover:scale-[1.02] transition-transform">{item.title}</h3>
                  <div className="flex justify-between items-center text-white/90 text-sm font-semibold">
                    <span className="group-hover:text-white transition-colors">View page</span>
                    <span className="text-2xl group-hover:translate-x-1 transition-transform">›</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 4. ARCHIVES DASHBOARD */}
        <section className="font-raleway bg-blue-50 dark:bg-slate-900 rounded-3xl p-4 sm:p-8 md:p-12 text-center shadow-inner mt-8 border border-transparent dark:border-slate-800 transition-colors duration-500">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-emb-green-light dark:text-green-400 mb-3 sm:mb-4 transition-colors">ARCHIVES <br /><span className="text-emb-green dark:text-green-500 font-light">DASHBOARD</span></h2>
          <p className="text-emb-blue dark:text-slate-400 mb-6 sm:mb-8 max-w-3xl mx-auto text-xs sm:text-sm transition-colors">Explore tools, data, and resources designed to support better waste management. From dashboards and policy guides to facility designs and best practices, this section helps you discover solutions, track progress, and take action toward a cleaner, more sustainable future.</p>

          <div className="relative w-full max-w-3xl mx-auto group my-4 sm:my-7">
            <input
              type="text"
              placeholder="Search"
              value={archiveQuery}
              onChange={(e) => setArchiveQuery(e.target.value)}
              className="font-raleway w-full bg-emb-blue dark:bg-slate-800 opacity-50 text-white placeholder-white/80 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full focus:outline-none focus:opacity-80 focus:ring-2 focus:ring-blue-400 shadow-md transition-all duration-300 text-xs sm:text-base"
            />
            <Search className="w-4 sm:w-5 h-4 sm:h-5 absolute right-3 sm:right-5 top-2.5 sm:top-3 text-white/90 stroke-2 group-hover:scale-110 transition-transform" />
          </div>

          {filteredDashboardCards.length === 0 ? (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 py-8">
              No dashboards match &ldquo;{archiveQuery}&rdquo;.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {filteredDashboardCards.map((item, i) => (
                <a key={i} href={item.link} className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-between min-h-[240px] sm:h-56 text-left hover:-translate-y-2 hover:shadow-xl hover:border-emb-green dark:hover:border-green-500 transition-all duration-300 group">
                  <div>
                    <h3 className="font-bold text-emb-blue dark:text-blue-300 text-xs sm:text-md leading-tight transition-colors">{item.title}</h3>
                    <p className="text-[0.65rem] sm:text-xs text-gray-500 dark:text-gray-400 mt-2 sm:mt-3 line-clamp-4 leading-relaxed transition-colors">{item.description}</p>
                  </div>
                  <div className="mt-auto pt-3 sm:pt-4 text-xs text-emb-blue dark:text-blue-400 font-bold flex items-center group-hover:text-emb-green dark:group-hover:text-green-400 transition-colors">
                    View Page <span className="ml-1 group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* FEATURED CONTENTS SECTION */}
        <section className="w-full py-8 sm:py-12 max-w-[1600px] mx-auto overflow-hidden px-2 sm:px-4">
          <h2 className="font-raleway text-2xl sm:text-4xl md:text-5xl mb-8 sm:mb-12 px-2 sm:px-4 md:px-8">
            <span className="font-black text-[#1a5b8c] dark:text-blue-400 transition-colors">FEATURED</span> <span className="font-light text-[#60b613] dark:text-green-400 transition-colors">CONTENTS</span>
          </h2>

          {/* NEWS BLOCK */}
          <div className="mb-12 sm:mb-16 relative">
            <h3 className="font-raleway font-bold text-[#1a5b8c] dark:text-blue-300 text-sm sm:text-xl mb-6 sm:mb-8 px-2 sm:px-4 md:px-8 text-center md:text-left transition-colors">NEWS</h3>

            <div className="relative w-full h-[120px] sm:h-[150px] flex justify-center items-center overflow-visible">
              {newsItems.map((item, idx) => {
                const diff = (idx - activeNews + newsItems.length) % newsItems.length;
                let positionClasses = "opacity-0 scale-75 z-0 pointer-events-none";

                if (diff === 0) {
                  positionClasses = "translate-x-0 scale-100 z-30 opacity-100 shadow-2xl";
                } else if (diff === 1) {
                  positionClasses = "translate-x-[95%] sm:translate-x-[105%] md:translate-x-[110%] scale-[0.85] z-20 opacity-50 hover:opacity-80";
                } else if (diff === newsItems.length - 1) {
                  positionClasses = "-translate-x-[95%] sm:-translate-x-[105%] md:-translate-x-[110%] scale-[0.85] z-20 opacity-50 hover:opacity-80";
                }

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveNews(idx)}
                    className={`absolute transition-all duration-700 ease-in-out cursor-pointer w-[260px] sm:w-[340px] md:w-[400px] flex items-center bg-white dark:bg-slate-800 border border-[#b6def4] dark:border-slate-700 rounded-lg sm:rounded-2xl p-1.5 sm:p-2 ${positionClasses}`}
                  >
                    <div className="w-20 sm:w-32 h-16 sm:h-24 rounded-md sm:rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-slate-700">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="pl-2 sm:pl-4 pr-1 sm:pr-2">
                      <h4 className="font-bold text-[#1a5b8c] dark:text-blue-300 text-[0.6rem] sm:text-sm leading-tight line-clamp-2 sm:line-clamp-3 mb-1 transition-colors">{item.title}</h4>
                      <p className="text-[0.5rem] sm:text-xs text-gray-500 dark:text-gray-400 font-medium transition-colors">{item.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6 sm:mt-8">
              <button onClick={() => prevSlide(setActiveNews, newsItems.length)} className="text-[#1a5b8c] dark:text-blue-400 hover:text-[#35a4cc] hover:-translate-x-1 transition-all font-black text-lg sm:text-xl px-2">&lt;</button>
              <div className="flex gap-2 sm:gap-3 items-center">
                {newsItems.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setActiveNews(idx)}
                    className={`rounded-full cursor-pointer transition-all duration-500 ${activeNews === idx ? 'bg-[#1a5b8c] dark:bg-blue-400 w-4 sm:w-6 h-2 sm:h-3' : 'border-2 border-[#1a5b8c] dark:border-blue-400 bg-transparent hover:bg-[#1a5b8c]/30 dark:hover:bg-blue-400/30 w-2 sm:w-3 h-2 sm:h-3'}`}
                  ></span>
                ))}
              </div>
              <button onClick={() => nextSlide(setActiveNews, newsItems.length)} className="text-[#1a5b8c] dark:text-blue-400 hover:text-[#35a4cc] hover:translate-x-1 transition-all font-black text-lg sm:text-xl px-2">&gt;</button>
            </div>
          </div>

          {/* FEATURED PROJECT BLOCK */}
          <div className="mb-16 relative">
            <h3 className="font-raleway font-bold text-[#1a5b8c] dark:text-blue-300 text-xl mb-8 px-4 md:px-8 text-center md:text-left transition-colors">FEATURED PROJECT</h3>

            <div className="relative w-full h-[150px] flex justify-center items-center overflow-visible">
              {projectItems.map((item, idx) => {
                const diff = (idx - activeProject + projectItems.length) % projectItems.length;
                let positionClasses = "opacity-0 scale-75 z-0 pointer-events-none";

                if (diff === 0) {
                  positionClasses = "translate-x-0 scale-100 z-30 opacity-100 shadow-2xl";
                } else if (diff === 1) {
                  positionClasses = "translate-x-[105%] md:translate-x-[110%] scale-[0.85] z-20 opacity-50 hover:opacity-80";
                } else if (diff === projectItems.length - 1) {
                  positionClasses = "-translate-x-[105%] md:-translate-x-[110%] scale-[0.85] z-20 opacity-50 hover:opacity-80";
                }

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveProject(idx)}
                    className={`absolute transition-all duration-700 ease-in-out cursor-pointer w-[340px] md:w-[400px] flex items-center bg-white dark:bg-slate-800 border border-[#b6def4] dark:border-slate-700 rounded-2xl p-2 ${positionClasses}`}
                  >
                    <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-slate-700">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="pl-4 pr-2">
                      <h4 className="font-bold text-[#1a5b8c] dark:text-blue-300 text-sm leading-tight line-clamp-3 mb-2 transition-colors">{item.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium transition-colors">{item.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative flex justify-center gap-4 mt-8">
              <button onClick={() => prevSlide(setActiveProject, projectItems.length)} className="text-[#1a5b8c] dark:text-blue-400 hover:text-[#35a4cc] hover:-translate-x-1 transition-all font-black text-xl px-2">&lt;</button>
              <div className="flex gap-3 items-center">
                {projectItems.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setActiveProject(idx)}
                    className={`rounded-full cursor-pointer transition-all duration-500 ${activeProject === idx ? 'bg-[#1a5b8c] dark:bg-blue-400 w-6 h-3' : 'border-2 border-[#1a5b8c] dark:border-blue-400 bg-transparent hover:bg-[#1a5b8c]/30 dark:hover:bg-blue-400/30 w-3 h-3'}`}
                  ></span>
                ))}
              </div>
              <button onClick={() => nextSlide(setActiveProject, projectItems.length)} className="text-[#1a5b8c] dark:text-blue-400 hover:text-[#35a4cc] hover:translate-x-1 transition-all font-black text-xl px-2">&gt;</button>
            </div>
          </div>
        </section>

        {/* THE GUIDE SECTION (3D State Carousel) */}
        <section className="bg-gradient-to-b from-[#eaffd9] to-[#35a4cc] dark:from-green-950 dark:to-slate-900 rounded-3xl py-16 overflow-hidden shadow-inner my-12 transition-colors duration-500">
          <div className="text-center mb-16 px-4">
            <h2 className="font-raleway text-3xl md:text-5xl text-[#467405] dark:text-green-400 tracking-wide transition-colors">
              A <span className="font-black">GUIDE</span> ON SOLID WASTE <br /> MANAGEMENT
            </h2>
          </div>

          <div className="relative w-full h-[520px] md:h-[580px] flex justify-center items-center overflow-visible">
            {guideItems.map((item, idx) => {
              const diff = (idx - activeGuide + guideItems.length) % guideItems.length;
              let positionClasses = "opacity-0 scale-75 z-0 pointer-events-none";

              if (diff === 0) {
                positionClasses = "translate-x-0 scale-100 z-30 opacity-100 shadow-2xl";
              } else if (diff === 1) {
                positionClasses = "translate-x-[105%] md:translate-x-[110%] scale-[0.85] z-20 opacity-50 hover:opacity-90";
              } else if (diff === guideItems.length - 1) {
                positionClasses = "-translate-x-[105%] md:-translate-x-[110%] scale-[0.85] z-20 opacity-50 hover:opacity-90";
              }

              return (
                <div
                  key={idx}
                  onClick={() => setActiveGuide(idx)}
                  className={`absolute transition-all duration-700 ease-in-out cursor-pointer w-[350px] md:w-[450px] h-[500px] md:h-[550px] bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-white/50 dark:border-slate-700 ${positionClasses}`}
                >
                  <div className={`absolute top-0 w-full h-56 bg-gradient-to-b ${item.color} to-transparent opacity-80 dark:opacity-60`}></div>
                  <div className="absolute top-6 right-6 text-white text-3xl drop-shadow-md">★</div>

                  <div className="relative z-10 p-10 flex flex-col h-full mt-20">
                    <div className="w-36 h-28 mx-auto mb-10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                      <img src={item.icon} alt="guide icon" className="w-full h-full object-contain" />
                    </div>
                    <h3 className={`font-raleway font-black text-3xl my-4 ${item.text} transition-colors`}>{item.type}</h3>
                    <p className="font-merriweather text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8 flex-grow transition-colors">{item.desc}</p>
                    <button className={`font-bold text-base ${item.text} flex items-center gap-2 group transition-transform w-fit`}>
                      Learn more <span className="group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guide Controls */}
          <div className="flex justify-center items-center gap-6 text-white mt-12 relative z-10">
            <button onClick={() => prevSlide(setActiveGuide, guideItems.length)} className="text-3xl hover:-translate-x-2 transition-transform font-black px-4 drop-shadow-md">&lt;</button>
            <div className="flex gap-4 items-center">
              {guideItems.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => setActiveGuide(idx)}
                  className={`rounded-full cursor-pointer transition-all duration-500 ${activeGuide === idx ? 'bg-white shadow-md w-8 h-3' : 'border-2 border-white bg-transparent hover:bg-white/50 w-3 h-3'}`}
                ></span>
              ))}
            </div>
            <button onClick={() => nextSlide(setActiveGuide, guideItems.length)} className="text-3xl hover:translate-x-2 transition-transform font-black px-4 drop-shadow-md">&gt;</button>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Home;
