import React from 'react';
import { useRef, useState } from 'react';
import Layout from '../components/Layout';
import hero_icon_1 from '../assets/hero_icon_1.png';
import transparent_seal from '../assets/transparent_seal.png';
import foi_seal from '../assets/foi_seal.png';
import about_us_bg from '../assets/about_us_bg.png';
import guide_icon_1 from '../assets/guide_icon_1.png';
import guide_icon_2 from '../assets/guide_icon_2.png';
import guide_icon_3 from '../assets/guide_icon_3.png';
import { Search } from "lucide-react";

const Home = () => {
  const dashboardCards = [
    {
      title: 'SWM Data Dashboards',
      description: 'The dashboard provides real-time waste collection updates, monitors major village bins, and supports composting decisions....',
      link: '/swm-data-dashboards' // Placeholder link
    },
    {
      title: 'NSWMC Resolutions',
      description: 'NSWMC resolutions provide policies and guidelines that strengthen waste management practices and support sustainable environmental programs.',
      link: '/nswmc-resolutions'
    },
    {
      title: 'EPR Registry',
      description: "The Extended Producer Responsibility Registry tracks and monitors producers' compliance with waste recovery and sustainability obligations.",
      link: '/epr-registry'
    },
    {
      title: 'Junk Shops and Recycling Facilities',
      description: 'Directory and information hub for recycling centers and junk shops.',
      link: '/junk-shops-recycling'
    },
    {
      title: 'SWM Facility Designs',
      description: 'Standardized plans and layouts for solid waste management facilities.',
      link: '/swm-facility-designs'
    },
    {
      title: 'National Plan of Action for Marine Litter',
      description: 'Strategies to reduce and manage marine litter nationwide.',
      link: '/marine-litter-action-plan'
    },
    {
      title: 'Non-Environmentally Acceptable Products',
      description: 'List and guidelines on products harmful to the environment.',
      link: '/neap-guidelines'
    },
    {
      title: 'Waste Analysis Characterization Study Manual',
      description: 'Reference guide for conducting waste analysis studies.',
      link: '/wacs-manual'
    },
    {
      title: 'World Bank Group Plastic Roadmap',
      description: 'Framework for reducing plastic waste and improving circularity.',
      link: '/wb-plastic-roadmap'
    },
    {
      title: 'UN-Habitat Marine Litter Learning Kit',
      description: 'Educational resources on preventing marine litter.',
      link: '/un-habitat-learning-kit'
    },
    {
      title: 'UNIDO Open Burning Project PH',
      description: 'Initiative addressing the impacts of open waste burning in the Philippines.',
      link: '/unido-open-burning'
    },
    {
      title: 'JICA TCP Outputs',
      description: 'Reports and deliverables from JICA technical cooperation projects.',
      link: '/jica-tcp-outputs'
    },
    {
      title: 'SMEC Waste-to-Energy Study',
      description: 'Research on converting waste into usable energy solutions.',
      link: '/smec-wte-study'
    },
    {
      title: 'Nestle Student Modules',
      description: 'Learning materials on sustainability and responsible waste practices.',
      link: '/nestle-modules'
    },
    {
      title: 'LGU Good Practices',
      description: 'Collection of successful waste management initiatives by local governments.',
      link: '/lgu-good-practices'
    }
  ];

  // --- YOUR DATA ARRAYS REMAIN THE SAME ---
  // --- DATA ARRAYS ---
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
    { type: 'RESIDUALS FOR DISPOSAL', desc: 'This disposal cover non-recyclable waste intended for landfilling items like cigarette butts, tissue, diapers, and wrappers.', color: 'from-gray-500', text: 'text-gray-800', icon: guide_icon_1 },
    { type: 'BIODEGRADABLE', desc: 'This category primarily includes kitchen waste, garden waste, agricultural waste, and livestock waste. By identifying these specific organic streams, the guide facilitates efficient waste diversion.', color: 'from-[#60b613]', text: 'text-[#467405]', icon: guide_icon_2 },
    { type: 'RECYCLABLE', desc: 'The Recyclables category identifies materials to be recovered including paper, cardboard, plastics, resins, glass bottles, and scrap metals like aluminum and tin cans.', color: 'from-[#35a4cc]', text: 'text-[#1a5b8c]', icon: guide_icon_3 },
  ];

  // 1. REFS FOR SCROLLING
  const newsRef = useRef(null);
  const projectRef = useRef(null);
  const guideRef = useRef(null);

  // 2. STATE TO TRACK ACTIVE DOTS
  const [activeNews, setActiveNews] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [activeGuide, setActiveGuide] = useState(0);

  // 3. SMART SCROLL FUNCTION (Calculates exact width dynamically)
  const scrollContainer = (ref, direction) => {
    if (ref.current && ref.current.children.length > 0) {
      // Get exact width of one card + the CSS gap
      const cardWidth = ref.current.children[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(ref.current).gap) || 0;
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);

      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // 4. SCROLL LISTENER (Updates dots when user swipes or clicks arrows)
  const handleScroll = (ref, setIndex, totalItems) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      const cardWidth = ref.current.children[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(ref.current).gap) || 0;

      // THE FIX: Check if the user has hit the absolute right edge of the scroll container.
      // We use Math.ceil and subtract 2 to account for browser floating-point pixel rounding.
      if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 2) {
        setIndex(totalItems - 1);
      } else {
        // Otherwise, calculate the active card normally
        const currentIndex = Math.round(scrollLeft / (cardWidth + gap));
        setIndex(currentIndex);
      }
    }
  };



  return (
    <Layout>
      <div className="flex flex-col space-y-5">

        {/* 1. HERO SECTION */}
        <section className="relative w-full overflow-hidden bg-gradient-to-tr from-[#b6def4] via-[#e2f1e2] to-[#f6f8d8] shadow-sm flex flex-col-reverse gap-2 md:flex-row items-center p-8 md:p-12 min-h-[500px]">

          {/* Left Side: Content */}
          <div className="w-full md:w-[55%] z-10 space-y-6 mb-8 md:mb-0 md:pr-4 text-center mt-6 md:mt-0 md:text-left">
            {/* 3D Green Title */}
            <h1 className="font-raleway text-5xl md:text-[3.5rem] text-emb-green font-black leading-[1.05] drop-shadow-md/30 opacity-70">
              Solid Waste <br />
              Management <br />
              Division
            </h1>

            {/* Serif Body Text */}
            <p className="font-merriweather text-[#2e5e2e] text-lg md:text-xl leading-relaxed text-center md:text-left">
              Empowering communities and institutions to achieve sustainable and effective solid waste management for a cleaner, healthier Philippines.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <button className="font-raleway bg-[#35a4cc] text-white px-5 py-1 rounded-full font-md shadow-md hover:bg-sky-500 transition border border-[#2b8fb3]">
                Get Started
              </button>

              <div className="relative w-64 md:w-72 group">
                <input
                  type="text"
                  placeholder="Search"
                  className="font-raleway w-full bg-[#467405] text-white placeholder-white/80 px-6 py-1 rounded-full focus:outline-none shadow-md"
                />
                <Search className="w-5 h-5 absolute right-5 top-1.5 text-white/90 stroke-2" />
              </div>
            </div>
          </div>

          {/* Right Side: Single Pre-made Collage Image */}
          {/* The FIX: Removed fixed heights. w-full and h-auto ensures the entire image displays exactly as it is. */}
          <div className="w-full md:w-[45%] flex justify-center items-center relative pl-0 md:pl-4">
            <img
              src={hero_icon_1}
              alt="SWMD Collage"
              className="w-full max-w-[500px] h-auto object-contain drop-shadow-xl"
            />
          </div>

        </section>

        {/* 2. RIBBON BAR */}
        <section className="font-raleway flex flex-wrap justify-center gap-12 border-y-2 border-gray-100 py-4 text-emb-blue font-bold text-sm text-center bg-gradient-to-tr from-blue-50 via-blue-50 to-blue-100">
          <div className="flex items-center space-x-2"> <span>GOV PH</span></div>
          <div className="flex items-center space-x-2"><img className='w-10 h-10' src={foi_seal} alt="FOI Seal" /> <span>FREEDOM OF INFORMATION</span></div>
          <div className="flex items-center space-x-2"><img className='w-10 h-10' src={transparent_seal} alt="Transparency Seal" /> <span>TRANSPARENCY SEAL</span></div>
        </section>

        {/* 3. ABOUT SWMD SECTION */}
        <section className="font-raleway text-center px-4 py-10 md:px-24 space-y-8" style={{ backgroundImage: `url(${about_us_bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h2 className="text-7xl font-light text-emb-blue">
            ABOUT <span className="font-bold text-emb-blue">SWMD</span>
          </h2>
          <p className="text-emb-blue leading-relaxed max-w-4xl mx-auto">
            The National Solid Waste Management Commission (NSWMC) is the lead body responsible for formulating policies, strategies, and programs to ensure the effective implementation of ecological solid waste management in the Philippines. In partnership with national agencies, local government units, and stakeholders, the Commission works to promote sustainable practices, reduce environmental impact, and safeguard public health. Guided by the principles of environmental stewardship and shared responsibility, NSWMC drives nationwide efforts toward a cleaner, healthier, and more sustainable future for every Filipino.
          </p>
          <button className="border border-emb-blue text-emb-blue px-6 py-2 rounded-lg font-bold hover:bg-emb-blue hover:text-white transition">Learn More!</button>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 opacity-80">
            {[
              { title: 'Solid Waste Management Division', color: 'bg-[#315502]' },
              { title: 'Organizational Chart', color: 'bg-[#4B8004]' },
              { title: 'NSWMC Commissioners', color: 'bg-[#74C609]' },
              { title: "Citizen Charter's On SWM", color: 'bg-[#BFDF03]' },
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.color} shadow-lg hover:brightness-105 transition cursor-pointer px-4 py-7 rounded-xl shadow-lg flex flex-col justify-between text-left h-44 border border-white/10`}
              >
                {/* Title with white/light text to match the image */}
                <h3 className="font-bold text-white text-md leading-tight">
                  {item.title}
                </h3>

                {/* Footer link with arrow */}
                <div className="flex justify-between items-center text-white/80 text-sm">
                  <span>View page</span>
                  <span className="text-xl">›</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. ARCHIVES DASHBOARD */}
        <section className="font-raleway bg-blue-50 rounded-3xl p-8 md:p-12 text-center shadow-inner">
          <h2 className="text-5xl font-black text-emb-green-light mb-4">ARCHIVES <br /><span className="text-emb-green font-light">DASHBOARD</span></h2>
          <p className="text-emb-blue mb-8 max-w-3xl mx-auto text-sm">Explore tools, data, and resources designed to support better waste management. From dashboards and policy guides to facility designs and best practices, this section helps you discover solutions, track progress, and take action toward a cleaner, more sustainable future.</p>

          <div className="relative w-full px-42 group my-7">
            <input
              type="text"
              placeholder="Search"
              className="font-raleway w-full bg-emb-blue opacity-50 text-white placeholder-white/80 px-6 py-1 rounded-full focus:outline-none shadow-md"
            />
            <Search className="w-5 h-5 absolute right-48 top-1.5 text-white/90 stroke-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {dashboardCards.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-56 text-left hover:shadow-md hover:border-emb-green transition group decoration-transparent"
              >
                <div>
                  <h3 className="font-bold text-emb-blue text-md leading-tight">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-3 line-clamp-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-auto pt-4 text-xs text-emb-blue font-bold flex items-center group-hover:text-emb-green transition-colors">
                  View Page <span className="ml-1">&rarr;</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ========================================= */}
        {/* FEATURED CONTENTS SECTION              */}
        {/* ========================================= */}
        <section className="w-full py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="font-raleway text-4xl md:text-5xl mb-12">
            <span className="font-black text-[#1a5b8c]">FEATURED</span> <span className="font-light text-[#60b613]">CONTENTS</span>
          </h2>

          {/* NEWS BLOCK */}
          <div className="mb-12">
            <h3 className="font-raleway font-bold text-[#1a5b8c] text-xl mb-4">NEWS</h3>

            <div
              ref={newsRef}
              onScroll={() => handleScroll(newsRef, setActiveNews, newsItems.length)}
              className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden scroll-smooth"
            >
              {newsItems.map((item, idx) => (
                <div key={idx} className="snap-start shrink-0 w-[350px] md:w-[400px] flex items-center bg-white border border-[#b6def4] rounded-2xl p-2 shadow-sm hover:shadow-md transition">
                  <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="pl-4 pr-2">
                    <h4 className="font-bold text-[#1a5b8c] text-sm leading-tight line-clamp-3 mb-2">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.date}</p>
                  </div>
                </div>
              ))}
              {/* Invisible spacer so the last card isn't hugging the edge */}
              <div className="shrink-0 w-2 md:w-4"></div>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-[#1a5b8c]">
                <button onClick={() => scrollContainer(newsRef, 'left')} className="hover:text-[#35a4cc] transition font-bold text-lg px-2">&lt;</button>
                <div className="flex gap-1.5">
                  {/* Dynamic Dots Array mapping over items */}
                  {newsItems.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${activeNews === idx ? 'bg-[#1a5b8c] scale-110' : 'border border-[#1a5b8c] bg-transparent'}`}
                    ></span>
                  ))}
                </div>
                <button onClick={() => scrollContainer(newsRef, 'right')} className="hover:text-[#35a4cc] transition font-bold text-lg px-2">&gt;</button>
              </div>
              <button className="text-xs font-bold text-[#1a5b8c] border border-[#b6def4] rounded-full px-4 py-1 hover:bg-[#b6def4]/30 transition">
                View All &rarr;
              </button>
            </div>
          </div>

          {/* FEATURED PROJECT BLOCK */}
          <div>
            <h3 className="font-raleway font-bold text-[#1a5b8c] text-xl mb-4">FEATURED PROJECT</h3>

            <div
              ref={projectRef}
              onScroll={() => handleScroll(projectRef, setActiveProject, projectItems.length)}
              className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden scroll-smooth"
            >
              {projectItems.map((item, idx) => (
                <div key={idx} className="snap-start shrink-0 w-[350px] md:w-[400px] flex items-center bg-white border border-[#b6def4] rounded-2xl p-2 shadow-sm hover:shadow-md transition">
                  <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="pl-4 pr-2">
                    <h4 className="font-bold text-[#1a5b8c] text-sm leading-tight line-clamp-3 mb-2">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.date}</p>
                  </div>
                </div>
              ))}
              <div className="shrink-0 w-2 md:w-4"></div>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-[#1a5b8c]">
                <button onClick={() => scrollContainer(projectRef, 'left')} className="hover:text-[#35a4cc] transition font-bold text-lg px-2">&lt;</button>
                <div className="flex gap-1.5">
                  {projectItems.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${activeProject === idx ? 'bg-[#1a5b8c] scale-110' : 'border border-[#1a5b8c] bg-transparent'}`}
                    ></span>
                  ))}
                </div>
                <button onClick={() => scrollContainer(projectRef, 'right')} className="hover:text-[#35a4cc] transition font-bold text-lg px-2">&gt;</button>
              </div>
              <button className="text-xs font-bold text-[#1a5b8c] border border-[#b6def4] rounded-full px-4 py-1 hover:bg-[#b6def4]/30 transition">
                View All &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* THE GUIDE SECTION                      */}
        {/* ========================================= */}
        <section className="w-full bg-gradient-to-b from-[#eaffd9] to-[#35a4cc] rounded-[40px] py-16 px-4 md:px-8 relative overflow-hidden shadow-inner my-12">

          <div className="text-center mb-12">
            <h2 className="font-raleway text-3xl md:text-5xl text-[#467405] tracking-wide">
              A <span className="font-black">GUIDE</span> ON SOLID WASTE <br /> MANAGEMENT
            </h2>
          </div>

          <div
            ref={guideRef}
            // FIX: Added guideItems.length here!
            onScroll={() => handleScroll(guideRef, setActiveGuide, guideItems.length)}
            className="flex overflow-x-auto gap-6 md:gap-8 snap-x snap-mandatory pb-12 pt-4 pl-4 md:pl-12 [&::-webkit-scrollbar]:hidden scroll-smooth"
          >
            {guideItems.map((item, idx) => (
              <div
                key={idx}
                // Fix: Added snap-start here to stop the center-snapping issue
                className={`snap-start shrink-0 w-[300px] md:w-[340px] bg-white rounded-3xl shadow-xl overflow-hidden relative border border-white/50 group hover:-translate-y-2 transition-transform duration-300`}
              >
                <div className={`absolute top-0 w-full h-48 bg-gradient-to-b ${item.color} to-transparent opacity-80`}></div>
                <div className="absolute top-4 right-4 text-white text-2xl drop-shadow-md">★</div>

                <div className="relative z-10 p-8 flex flex-col h-full mt-16">
                  <div className="w-30 h-20 mx-auto mb-10 flex items-center justify-center">
                    <img src={item.icon} alt="guide icon" className="" />
                  </div>

                  <h3 className={`font-raleway font-black text-2xl my-4 ${item.text}`}>{item.type}</h3>
                  <p className="font-merriweather text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                    {item.desc}
                  </p>

                  <button className={`font-bold text-sm ${item.text} flex items-center gap-2 group-hover:translate-x-1 transition-transform w-fit`}>
                    Learn more &rarr;
                  </button>
                </div>
              </div>
            ))}
            {/* Fix: This invisible box adds padding to the end of the scroll container so the last item can be fully scrolled into view without cutting off */}
            <div className="shrink-0 w-8 md:w-16"></div>
          </div>

          <div className="flex justify-center items-center gap-4 text-white">
            <button onClick={() => scrollContainer(guideRef, 'left')} className="text-2xl hover:scale-125 transition font-black px-4">&lt;</button>
            <div className="flex gap-2">
              {guideItems.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeGuide === idx ? 'bg-white scale-125' : 'border-2 border-white bg-transparent'}`}
                ></span>
              ))}
            </div>
            <button onClick={() => scrollContainer(guideRef, 'right')} className="text-2xl hover:scale-125 transition font-black px-4">&gt;</button>
          </div>

        </section>


      </div>
    </Layout>
  );
};

export default Home;