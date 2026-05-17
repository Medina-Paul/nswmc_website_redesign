import React from 'react'
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';


// --- Staff portraits (drop the matching PNGs into src/assets/orgpics/) ---
import valdez_img from '../assets/orgpics/maria.png';
import clarina_img from '../assets/orgpics/clarina.png';
import gerard_img from '../assets/orgpics/gerard.png';
import joan_img from '../assets/orgpics/joan.png';
import enrico_img from '../assets/orgpics/enrico.png';
import eric_img from '../assets/orgpics/eric.png';
import mohammad_img from '../assets/orgpics/mohammad.png';
import raymond_img from '../assets/orgpics/raymond.png';
import benhur_img from '../assets/orgpics/benhur.png';
import ramil_img from '../assets/orgpics/ramil.png';
import juvinia_img from '../assets/orgpics/juvinia.png';
import rachel_img from '../assets/orgpics/rachel.png';
import cynthia_img from '../assets/orgpics/cynthia.png';
import gabrielle_img from '../assets/orgpics/gabrielle.png';
import giovanni_img from '../assets/orgpics/giovanni.png';
import homer_img from '../assets/orgpics/homer.png';
import arniel_img from '../assets/orgpics/arniel.png';
import rodeth_img from '../assets/orgpics/rodeth.png';
import sawadjaan_img from '../assets/orgpics/ahmed.png';
import jepp_img from '../assets/orgpics/jepp.png';
import rey_img from '../assets/orgpics/rey.png';
import gio_img from '../assets/orgpics/gio.png';
import about_org_chart_bg from '../assets/about_org_chart_bg.png';
import commissioner_small_icon from '../assets/commissioner_small_icon.svg';
import solar_chart_bold from '../assets/solar_chart_bold.svg';

import leaf_icon from '../assets/leaf_icon.svg'
import denr from '../assets/denr.svg';
import NSWMC_ORG_CHART from '../assets/NSWMC_ORG_CHART.svg';

// ==========================================
// REUSABLE SUB-COMPONENTS FOR THE ORG CHART
// ==========================================

const StaffProfile = ({ name, title, additional = null, isChief = false, img = null }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl w-full max-w-[340px] mx-auto border z-10
      ${isChief
        ? 'bg-gradient-to-b from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 border-blue-200 dark:border-blue-500/30 shadow-lg ring-1 ring-blue-500/10'
        : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 shadow-sm'
      }`}
    >
      {/* Portrait — same gradient + rounded-top look used in Commissioners.jsx */}
      {img && (
        <div className={`${isChief ? 'h-40 w-40 md:h-48 md:w-48' : 'h-32 w-32 md:h-36 md:w-36'} text-raleway mb-4 rounded-full overflow-hidden bg-gradient-to-b from-[#C4FFF6] to-[#0582D6] flex items-end justify-center shadow-md ring-2 ring-white dark:ring-slate-700 transition-colors`}>
          <img
            src={img}
            alt={name}
            className="w-[110%] h-[110%] object-cover object-top drop-shadow-lg"
          />
        </div>
      )}

      <h3 className={`font-black drop-shadow-sm font-raleway leading-tight mb-3 text-center transition-colors
        ${isChief ? 'text-[#1a5b8c] dark:text-blue-400 text-[1.25rem]' : 'text-[#1a5b8c] dark:text-blue-300 text-[1.1rem]'}`}>
        {name}
      </h3>
      {/* dangerouslySetInnerHTML allows us to use <br/> tags in the strings to match the exact line breaks in the picture */}
      <p className="text-[.9rem] font-medium font-merriweather text-gray-700 dark:text-gray-300 leading-relaxed text-center transition-colors" dangerouslySetInnerHTML={{ __html: title }}></p>
    </div>
  );
};

const GradientPill = ({ text, small = false }) => {
  const pillClasses = small
    ? "px-6 py-2.5 text-[0.75rem] min-h-[3.3rem] max-w-[280px]" // Smaller, policy-level pill
    : "px-8 py-3.5 text-[0.85rem] max-w-[340px]"; // Section-level pill

  return (
    <div className={`relative mx-auto w-full uppercase drop-shadow-md font-raleway font-bold text-center text-white bg-gradient-to-r from-[#04578F]/90 via-[#BFDF03]/90 to-[#365E02]/80 rounded-xl my-8 flex items-center justify-center leading-tight shadow-md text-shadow-md border border-white/20 dark:border-slate-800/50 z-10 transition-transform hover:scale-105 duration-300 ${pillClasses}`}>
      {text}
    </div>
  );
};

const OrgChart = () => {
  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        {/* 3. NEW: SWMD ORGANIZATIONAL CHART */}


        {/* Hero Section */}
        <div className="relative font-raleway w-full mt-8 md:mt-12 rounded-2xl overflow-hidden shadow-md flex items-center justify-center h-48 px-4 md:px-6 lg:px-8">
          <img
            src={about_org_chart_bg}
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
              Learn more about the Organizational Chart through this page.
            </p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="w-full mt-8 md:mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center">

            {/* Link 1: Solid Waste Management Division */}
            <Link to="/about/solid-waste-management" className="flex items-center justify-between group gap-2 md:gap-0 px-2 py-4 rounded-lg hover:bg-[#BDE28E] transition-colors w-full">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#469038] flex items-center justify-center shrink-0 text-white ">
                  <div className="w-6 h-6 md:w-7 md:h-7">
                    <img className="w-full h-full" src={leaf_icon} alt="Solar Chart Icon" />
                  </div>
                </div>
                <span className="font-semibold text-[#469038] text-[.75rem] md:text-[1rem] leading-tight ">
                  Solid Waste <br /> Management Division
                </span>
              </div>
              <svg className="hidden md:block w-5 h-5 text-[#469038] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Link 2: Citizen's Charter on SWM */}
            <Link to="/about/citizens-charter" className="flex items-center justify-between group gap-2 md:gap-0 px-2 py-4 rounded-lg hover:bg-[#BDE28E] transition-colors w-full">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#469038] flex items-center justify-center shrink-0 text-white ">
                  <div className="w-6 h-6 md:w-7 md:h-7">
                    <img className="w-full h-full" src={solar_chart_bold} alt="Organizational Chart Icon" />
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

            {/* Link 3: NSWMC Commissioners */}
            <Link to="/about/commissioners" className="flex items-center justify-between group gap-2 md:gap-0 px-2 py-4 rounded-lg hover:bg-[#BDE28E] transition-colors w-full">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#469038] flex items-center justify-center shrink-0 text-white">
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
            Organizational <br /> Chart
          </h2>
          <img src={NSWMC_ORG_CHART} alt="Org Chart Logo" className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain shrink-0" />
        </div>

        <p className="font-merriweather text-justify italic mt-4 mb-4 md:mb-6 text-[0.7rem] sm:text-sm md:text-base dark:text-green-400 transition-colors">
          This is the organizational chart of the Solid Waste Management Division (SWMD), headed by Maria Delia Cristina M. Valdez as Chief. The division is structured into two main sections: the Solid Waste Policy and Program Development Section and the NSWMC Secretariat and Technical Services Section, each containing specialized units covering policy development, project implementation, evaluation, and technical inspection, staffed by environmental management specialists and technical personnel.
        </p>


        <div id='organizational-chart' className="w-full max-w-6xl mx-auto px-2 sm:px-4 mb-24 relative py-8 md:py-12">
          {/* --- TREE STRUCTURE START --- */}
          <div className="relative flex flex-col items-center">

            {/* ===== DIVISION CHIEF ===== */}
            <div className="mb-8 md:mb-12 w-full relative">
              <StaffProfile
                name="MARIA DELIA CRISTINA M. VALDEZ"
                title="Chief, Solid Waste Management Division"
                isChief={true}
                img={valdez_img}
              />
              {/* Connector line from Chief down to Clarina/Gerard pair */}
              <div className="absolute w-px h-8 md:h-12 bg-blue-200 dark:bg-slate-700 left-1/2 -bottom-8 md:-bottom-12 -translate-x-1/2 z-0"></div>
            </div>

            {/* ===== CLARINA & GERARD (UNDER CHIEF) ===== */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-31 mb-12 md:mb-16 relative">
              {/* Horizontal line connecting both vertical lines */}
              <div className="hidden md:block absolute h-px w-full md:w-[calc(50%+3.875rem)] md:translate-x-[calc(43%-1.9380rem)] lg:w-[32rem] lg:translate-x-0 bg-blue-200 dark:bg-slate-700 lg:left-[12rem] top-0 z-0"></div>

              {/* Left column: Clarina */}
              <div className="pt-6 md:pt-8 flex justify-center relative">
                {/* Vertical line from horizontal line to Clarina card (ALL SIZES) */}
                <div className="absolute w-px h-6 md:h-8 bg-blue-200 dark:bg-slate-700 left-1/2 top-0 -translate-x-1/2 z-0"></div>
                <StaffProfile name="CLARINA S. CAPISTRANO" title="Project Development Officer I" img={clarina_img} />
              </div>

              {/* Right column: Gerard */}
              <div className="pt-6 md:pt-8 flex justify-center relative">
                {/* Vertical line from horizontal line to Gerard card (ALL SIZES) */}
                <div className="absolute w-px h-14 md:h-8 bg-blue-200 dark:bg-slate-700 left-1/2 top-[-2rem] md:top-0 -translate-x-1/2 z-0"></div>
                <StaffProfile name="GERARD JAHN D. ALCON" title="Computer Programmer IV <br/> National SWM Database Manager" img={gerard_img} />
              </div>

              {/* Mobile: Vertical connector from Clarina/Gerard down to branches */}
            </div>

            {/* ===== TWO MAIN BRANCHES (LEFT & RIGHT) ===== */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-0 items-start relative mt-6 md:mt-8">

              {/* ===== LEFT BRANCH: POLICY & PROGRAM DEVELOPMENT ===== */}
              <div className="flex flex-col items-center p-3 sm:p-4 md:p-6 lg:p-8 relative w-full">
                {/* === DESKTOP CONNECTORS FOR LEFT BRANCH === */}
                <div className="hidden lg:block absolute w-px h-40 bg-blue-200 dark:bg-slate-700 left-1/2 -top-24 -translate-x-1/2 z-0"></div>
                <div className="hidden lg:block absolute h-px w-[8rem] bg-blue-200 dark:bg-slate-700 left-[-0.5rem] -top-[-33.8rem] z-0"></div>
                <div className="hidden lg:block absolute w-px h-[2rem] bg-blue-200 dark:bg-slate-700 left-1/2 -top-[-8rem] -translate-x-1/2 z-0"></div>

                <GradientPill text="SOLID WASTE POLICY AND PROGRAM DEVELOPMENT SECTION" />

                <div className="w-full mb-6 md:mb-8">
                  <StaffProfile name="JOAN FRANCES F. LABORTE" title="Senior Environmental Management <br/> Specialist | OIC Section Chief" img={joan_img} />
                </div>
                <div className="hidden lg:block absolute w-px h-[99rem] bg-blue-200 dark:bg-slate-700 left-[-0.5rem] -top-[-6rem] -translate-x-1/2 z-0"></div>
                <div className="hidden lg:block absolute h-px w-[6rem] bg-blue-200 dark:bg-slate-700 left-[-0.5rem] -top-[-6rem] z-0"></div>
                <div className="hidden lg:block absolute w-px h-[46rem] bg-blue-200 dark:bg-slate-700 left-1/2 -top-[-34rem] -translate-x-1/2 z-0"></div>
                <div className="lg:hidden absolute w-px h-8 md:h-12 bg-blue-200 dark:bg-slate-700 left-1/2 top-[7rem] -translate-x-1/2 z-0"></div>



                <GradientPill text="POLICY DEVELOPMENT" small={true} />
                <div className="w-full space-y-4 md:space-y-6 mb-6 md:mb-8 relative">
                  <StaffProfile name="ENGR. ENRICO P. MEDINA" title="Technical Specialist" img={enrico_img} />
                  <StaffProfile name="ENGR. ERIC M. NAGUM" title="Environmental Management Specialist I <br/> Climate Change - Solid Waste Sector Focal <br/> Team Leader-Old San Mateo SLF Activities" img={eric_img} />
                  <StaffProfile name="ENGR. MOHAMMAD I. ABUHANTASH" title="Environmental Management Specialist I" img={mohammad_img} />
                  {/* Mobile: Vertical connector to next subsection */}
                  <div className="absolute w-px h-[46rem] bg-blue-200 dark:bg-slate-700 left-1/2 top-[-2rem] -translate-x-1/2 z-0"></div>
                </div>

                <div className="hidden lg:block absolute h-px w-[8rem] bg-blue-200 dark:bg-slate-700 left-[-0.5rem] top-[105rem] z-0"></div>

                <GradientPill text="PROGRAM DEVELOPMENT AND IMPLEMENTATION" small={true} />
                <div className="w-full space-y-4 md:space-y-6 relative">
                  <StaffProfile name="RAYMOND MAREON P. BLAQUERA" title="Environmental Management Specialist I" img={raymond_img} />
                  <StaffProfile name="BEN HUR V. MALANA" title="Administrative Officer V <br/> San Mateo SLF and MRF Support" img={benhur_img} />
                  <StaffProfile name="RAMIL B. SOTOZA" title="Administrative Support IV <br/> MRF Operator" img={ramil_img} />
                  {/* Mobile: Vertical connector to next subsection */}
                  <div className="absolute w-px h-200 bg-blue-200 dark:bg-slate-700 left-1/2 top-[-2rem] -translate-x-1/2 z-0"></div>

                </div>
              </div>


              {/* ===== RIGHT BRANCH: NSWMC SECRETARIAT & TECHNICAL SERVICES ===== */}
              <div className="flex flex-col items-center sm:p-4 md:p-6 lg:p-8 relative w-full">
                {/* === DESKTOP CONNECTORS FOR RIGHT BRANCH === */}
                <div className="hidden lg:block absolute w-px h-40 bg-blue-200 dark:bg-slate-700 left-1/2 -top-24 -translate-x-1/2 z-0"></div>
                <div className="hidden lg:block absolute w-px h-[197.3rem] bg-blue-200 dark:bg-slate-700 left-[-0.5rem] -top-[-6rem] -translate-x-1/2 z-0"></div>
                <div className="hidden lg:block absolute w-px h-[2rem] bg-blue-200 dark:bg-slate-700 left-1/2 -top-[-8rem] -translate-x-1/2 z-0"></div>
                <div className="hidden lg:block absolute h-px w-[8rem] bg-blue-200 dark:bg-slate-700 left-[-.5rem] -top-[-33.8rem] z-0"></div>
                <div className="hidden lg:block absolute h-px w-[8rem] bg-blue-200 dark:bg-slate-700 left-[-.5rem] -top-[-203.3rem] z-0"></div>
                <div className="hidden lg:block absolute h-px w-[8rem] bg-blue-200 dark:bg-slate-700 left-[-.5rem] -top-[-6rem] z-0"></div>
                <div className="hidden lg:block absolute w-px h-[145rem] bg-blue-200 dark:bg-slate-700 left-1/2 -top-[-34rem] -translate-x-1/2 z-0"></div>

                {/* Section Title */}
                <GradientPill text="NSWMC SECRETARIAT AND TECHNICAL SERVICES SECTION" />

                {/* Section Chief */}
                <div className="w-full mb-6 md:mb-8 relative">
                  <StaffProfile name="JUVINIA P. SERAFIN, MDM" title="Senior Environmental Management <br/> Specialist | OIC Section Chief" img={juvinia_img} />
                  {/* Mobile: Vertical connector from Chief to subsections */}
                  <div className="absolute w-px h-10 bg-blue-200 dark:bg-slate-700 left-1/2 top-[-2rem] -translate-x-1/2 z-0"></div>
                </div>

                {/* === SUBSECTION 1: NSWMC SECRETARIAT & EVALUATION STAFF === */}
                <GradientPill text="NSWMC SECRETARIAT AND EVALUATION" small={true} />
                <div className="w-full space-y-4 md:space-y-6 mb-6 md:mb-8 relative">
                  <StaffProfile name="RACHEL C. PASION" title="Senior Environmental Management <br/> Specialist | Evaluator, Focal - Region 2" img={rachel_img} />
                  <StaffProfile name="CYNTHIA C. EVARDONE" title="Environmental Management Specialist I <br/> Evaluator, Focal- Region 1, Caraga" img={cynthia_img} />
                  <StaffProfile name="GABRIELLE RAINE G. AGUZAR" title="Environmental Management <br/> Specialist I | SWMD-EPR Support / <br/> 10yr. SWM Plan Evaluator - Region 8" img={gabrielle_img} />
                  <StaffProfile name="GIOVANNI R. MIÑAS" title="Project Documentation Officer I <br/> Evaluator, Focal-MIMAROPA, Region 6/ <br/> NSWMC Coordinator" img={giovanni_img} />
                  <StaffProfile name="HOMER A. DELOS SANTOS" title="Project Documentation Officer I <br/> Evaluator, Focal- CAR, Region 8" img={homer_img} />
                  <StaffProfile name="ARNIEL M. MALLARI" title="Project Evaluation Officer I <br/> Evaluator, Focal - Region 3, BARMM" img={arniel_img} />
                  <StaffProfile name="RODETH F. ANTONIO" title="Project Documentation Officer I <br/> Administrative Support" img={rodeth_img} />
                  <StaffProfile name="ENGR. AHMED FADEL A. SAWADJAAN" title="Engineer II" img={sawadjaan_img} />
                  {/* Mobile: Vertical connector to next subsection */}
                  <div className="absolute w-px h-[144rem] bg-blue-200 dark:bg-slate-700 left-1/2 -top-[2rem] -translate-x-1/2 z-0"></div>
                </div>

                {/* === SUBSECTION 2: TECHNICAL SERVICES & INSPECTION STAFF === */}
                <GradientPill text="TECHNICAL SERVICES AND INSPECTION" small={true} />
                <div className="w-full space-y-4 md:space-y-6 relative">
                  <StaffProfile name="JEPP V. FARRALES, EnP" title="Environmental Management Specialist I <br/> Field Inspection Focal/ Evaluator, Focal <br/> - NCR, CALABARZON, Region 7/ SWMD-<br/>EPR Support" img={jepp_img} />
                  <StaffProfile name="REY JOHN L. ESQUIVEL" title="Environmental Management Specialist I <br/> Field Inspection Focal/ MRF Manager" img={rey_img} />
                  <StaffProfile name="GIO D. CABUNTOCAN" title="Project Development Officer I | Evaluator, <br/> Focal - Region 5, Region 11, Region 12" img={gio_img} />
                  <div className="absolute w-px h-[46rem] bg-blue-200 dark:bg-slate-700 left-1/2 top-[-2rem] -translate-x-1/2 z-0"></div>


                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default OrgChart;