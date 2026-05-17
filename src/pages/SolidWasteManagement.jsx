import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import about_swm_bg from '../assets/about_swm_bg.png';
import denr from '../assets/denr.svg';
import commissioner_small_icon from '../assets/commissioner_small_icon.svg';
import org_chart_small_icon from '../assets/org_chart_small_icon.svg';
import solar_chart_bold from '../assets/solar_chart_bold.svg';

const SolidWasteManagement = () => {
  return (
    <Layout>
      <div className="w-full overflow-hidden font-raleway">

        {/* Master Wrapper: Handles max-width, perfect centering (mx-auto), and responsive side margins (px) */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12">

          {/* Hero Section */}
          <div className="relative w-full mt-8 md:mt-12 rounded-2xl overflow-hidden shadow-md flex items-center justify-center h-48 px-4 md:px-6 lg:px-8">
            <img
              src={about_swm_bg}
              alt="About SWM Background"
              className="absolute inset-0 object-cover w-full h-full"
            />
            {/* Dark Green Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#71C405]/80 via-[#0a2305]/60 to-[#0a2305]/80 pointer-events-none mix-blend-multiply"></div>

            {/* Hero Text */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-bold text-white tracking-wide mb-2 md:mb-4 drop-shadow-md">
                ABOUT US
              </h1>
              <p className="text-gray-200 text-[0.6rem] md:text-base lg:text-lg italic font-merriweather opacity-90 drop-shadow-sm">
                Learn more about the Solid Waste Management Division through this page.
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="w-full mt-8 md:mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center">

              {/* Link 1: Citizen's Charter */}
              <Link to="/about/citizens-charter" className="flex items-center justify-between group gap-2 md:gap-0 px-2 py-4 rounded-lg hover:bg-[#BDE28E] transition-colors w-full">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#469038] flex items-center justify-center shrink-0 text-white">
                    <div className="w-6 h-6 md:w-7 md:h-7">
                      <img className="w-full h-full" src={solar_chart_bold} alt="Solar Chart Icon" />
                    </div>
                  </div>
                  <span className="font-semibold text-[#469038] text-[.75rem] md:text-[1rem] leading-tight">
                    Citizen's Charter on <br /> SWM
                  </span>
                </div>
                <svg className="hidden md:block w-5 h-5 text-[#469038] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Link 2: Organizational Chart */}
              <Link to="/about/org-chart" className="flex items-center justify-between group gap-2 md:gap-0 px-2 py-4 rounded-lg hover:bg-[#BDE28E] transition-colors w-full">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#469038] flex items-center justify-center shrink-0 text-white">
                    <div className="w-6 h-6 md:w-7 md:h-7">
                      <img className="w-full h-full" src={org_chart_small_icon} alt="Organizational Chart Icon" />
                    </div>
                  </div>
                  <span className="font-semibold text-[#469038] text-[.75rem] md:text-[1rem] leading-tight">
                    Organizational <br /> Chart
                  </span>
                </div>
                <svg className="hidden md:block w-5 h-5 text-[#469038] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Link 3: NSWMC Commissioners */}
              <Link to="/about/commissioners" className="flex items-center justify-between group gap-2 md:gap-0 px-2 py-4 rounded-lg hover:bg-[#BDE28E] transition-colors w-full">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#469038] flex items-center justify-center shrink-0 text-white shadow-sm">
                    <div className="w-6 h-6 md:w-7 md:h-7">
                      <img className="w-full h-full" src={commissioner_small_icon} alt="NSWMC Commissioners Icon" />
                    </div>
                  </div>
                  <span className="font-semibold text-[#469038] text-[.75rem] md:text-[1rem] leading-tight">
                    NSWMC <br /> Commissioners
                  </span>
                </div>
                <svg className="hidden md:block w-5 h-5 text-[#469038] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

            </div>

            {/* Gradient Border Line */}
            <div className="w-full mt-10 h-[2px] bg-gradient-to-r from-[#2477B5] via-[#48953C] to-[#A0B920]"></div>
          </div>

          {/* Title and Logo Section */}
          <div className="w-full mt-12 mb-6 flex justify-between items-center gap-4">
            <h2 className="font-raleway text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#04578F] dark:text-blue-400 leading-none drop-shadow-sm transition-colors text-left">
              Solid Waste <br /> Management Division
            </h2>
            <img src={denr} alt="DENR Logo" className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain shrink-0" />
          </div>

          {/* Content Paragraphs */}
          <div className="w-full mt-8 md:mt-12 mb-8 md:mb-12 transition-colors duration-500">
            <p className="text-justify mb-6 md:mb-8 text-xs sm:text-sm md:text-base leading-relaxed font-merriweather dark:text-gray-200 transition-colors">
              &emsp;&emsp;&emsp; The Solid Waste Management Division of the Environmental Management Bureau-DENR shall develop policy and programs on solid waste management; provide secretariat support to the National Solid Waste Management Commission and provide technical services to stakeholders.
            </p>

            <p className="mb-8 md:mb-12 text-xs sm:text-sm md:text-base font-medium text-center md:text-left font-merriweather text-gray-800 dark:text-gray-200 transition-colors">
              The Division shall be composed of the following Sections, namely:
            </p>

            <div className="space-y-12 md:space-y-16">

              {/* Section 1 */}
              <div className="relative">
                <h2 className="font-raleway font-black text-lg sm:text-2xl md:text-3xl mb-2 md:mb-3 text-[#469038] dark:text-blue-300 transition-colors">
                  Solid Waste Policy and Program Development Section
                </h2>
                <p className="font-merriweather italic mb-4 md:mb-6 text-[0.7rem] sm:text-sm md:text-base dark:text-green-400 transition-colors">
                  &emsp;&emsp;&emsp;This section shall develop policy, program and guideline for the implementation of the provisions of the Act:
                </p>
                <ul className="list-disc pl-4 md:pl-8 space-y-2 md:space-y-3 text-justify font-merriweather text-xs sm:text-sm md:text-base dark:text-gray-300 transition-colors leading-relaxed">
                  <li>Formulate policies and guidelines in support to the implementation of RA 9003;</li>
                  <li>Establish and manage a comprehensive SWM information, database and dissemination system;</li>
                  <li>Facilitate coordination with stakeholders on policy development that were formulated and finalized by the office;</li>
                  <li>Develop model waste minimization and reduction auditing procedures for evaluation options;</li>
                  <li>Profiling, Identification, Analysis, and Evaluation of current state, gaps, trends projection to update the National Solid Waste Management Framework;</li>
                  <li>Promote the development of the recycling market;</li>
                  <li>Package SWM project proposals for funding;</li>
                  <li>Program Development on Technical and other Capability Building Assistance to various stakeholders;</li>
                  <li>Develop a program on investments resource recovery-based livelihood for local communities;</li>
                  <li>Serve as the clearinghouse for all projects/programs for implementation by the LGUs and/or the public or private sector.</li>
                </ul>
              </div>

              <hr className="border-gray-200 dark:border-slate-800 transition-colors" />

              {/* Section 2 */}
              <div className="relative">
                <h2 className="font-raleway font-black text-lg sm:text-2xl md:text-3xl mb-2 md:mb-3 text-[#469038] dark:text-blue-300 transition-colors">
                  NSWMC-Secretariat and Technical Services
                </h2>
                <p className="font-merriweather italic mb-4 md:mb-6 text-[0.7rem] sm:text-sm md:text-base dark:text-green-400 transition-colors">
                  &emsp;&emsp;&emsp;This section shall provide secretariat support to the Commission and technical expertise to LGUs and other stakeholders for the implementation of the provisions of the Act:
                </p>
                <ul className="list-disc pl-4 md:pl-8 space-y-2 md:space-y-3 text-justify font-merriweather text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 transition-colors leading-relaxed">
                  <li>Prepare all pertinent documents for deliberation by the Commission;</li>
                  <li>Record and document all the proceedings of the meetings; Handle all the administrative requisites of the Commission;</li>
                  <li>Index and keep all records used and referenced by the Commission;</li>
                  <li>Serve as the clearinghouse for all projects/programs for implementation by the LGUs and/or the public or private sector;</li>
                  <li>Evaluate and review proposals submitted for funding support from the Solid Waste Management Fund;</li>
                  <li>Evaluate and recommend for approval the 10-year solid waste management plans;</li>
                  <li>Conduct studies to support the implementation of RA 9003;</li>
                  <li>Develop a continuing education and information campaign on solid waste management;</li>
                  <li>Evaluate and review proposals submitted for funding support from the SWM fund; Provide guidance and assistance to the Regional Offices in the monitoring, enforcement and implementation activities;</li>
                  <li>Provide expert assistance in pilot modeling of SWM facilities;</li>
                  <li>Facilitate training and education in integrated ecological solid waste management;</li>
                  <li>Act as the hub for networking of LGUs, NGOs and industry on voluntary compliance of the pertinent provisions of the Act; and</li>
                  <li>Perform all other functions as may be deemed necessary by the Commission.</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default SolidWasteManagement;