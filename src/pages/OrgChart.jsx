import React from 'react'
import Layout from '../components/Layout';
import swmd_logo from '../assets/swmd_logo.png';

// ==========================================
// REUSABLE SUB-COMPONENTS FOR THE ORG CHART
// ==========================================

const StaffProfile = ({ name, title, additional = null, isChief = false }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl w-full max-w-[340px] mx-auto border z-10
      ${isChief
        ? 'bg-gradient-to-b from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 border-blue-200 dark:border-blue-500/30 shadow-lg ring-1 ring-blue-500/10'
        : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 shadow-sm'
      }`}
    >
      <h3 className={`font-black drop-shadow-sm font-raleway leading-tight mb-3 text-center transition-colors
        ${isChief ? 'text-[#1a5b8c] dark:text-blue-400 text-[1.25rem]' : 'text-[#1a5b8c] dark:text-blue-300 text-[1.1rem]'}`}>
        {name}
      </h3>
      {/* dangerouslySetInnerHTML allows us to use <br/> tags in the strings to match the exact line breaks in the picture */}
      <p className="text-[.9rem] font-medium font-merriweather text-gray-700 dark:text-gray-300 leading-relaxed text-center transition-colors" dangerouslySetInnerHTML={{ __html: title }}></p>
      {additional && <p className="text-[.85rem] mt-3 font-medium text-gray-500 dark:text-gray-400 text-center transition-colors">{additional}</p>}
    </div>
  );
};

const GradientPill = ({ text, small = false }) => {
  const pillClasses = small
    ? "px-6 py-2.5 text-[0.75rem] max-w-[280px]" // Smaller, policy-level pill
    : "px-8 py-3.5 text-[0.85rem] max-w-[340px]"; // Section-level pill

  return (
    <div className={`relative mx-auto w-full uppercase drop-shadow-md font-raleway font-bold text-center text-white bg-gradient-to-r from-[#2A7B9B] via-[#57C785] to-[#EDDD53] rounded-xl my-8 flex items-center justify-center leading-tight shadow-md border border-white/20 dark:border-slate-800/50 z-10 transition-transform hover:scale-105 duration-300 ${pillClasses}`}>
      {text}
    </div>
  );
};

const OrgChart = () => {
  return (
    <Layout>
      {/* 3. NEW: SWMD ORGANIZATIONAL CHART */}

      {/* Header */}
      <div className="w-full ml-0 md:ml-15 text-center md:text-left mt-8 md:mt-16 mb-6 md:mb-8 px-3 md:px-0">
        <h2 className="font-raleway text-3xl sm:text-5xl md:text-7xl font-black text-[#1a5b8c] dark:text-blue-400 leading-none drop-shadow-sm transition-colors">ORGANIZATIONAL</h2>
        <h3 className="font-raleway text-xl sm:text-3xl md:text-5xl font-light text-[#8cc63f] dark:text-green-400 tracking-tight transition-colors">CHART</h3>
      </div>

      <div id='organizational-chart' className="w-full max-w-6xl mx-auto px-2 sm:px-4 mb-24 relative py-8 md:py-12">
        {/* --- TREE STRUCTURE START --- */}
        <div className="relative flex flex-col items-center">

          {/* Division Chief */}
          <div className="mb-8 md:mb-12 w-full relative">
            <StaffProfile
              name="MARIA DELIA CRISTINA M. VALDEZ"
              title="Chief, Solid Waste Management Division"
              isChief={true}
            />
            {/* Vertical Connector Line */}
            <div className="hidden md:block absolute w-px h-12 bg-blue-200 dark:bg-slate-700 left-1/2 -bottom-12 -translate-x-1/2 z-0"></div>
          </div>

          {/* Side-by-Side Under Chief */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 relative">
            {/* Horizontal Connector Line (Desktop only) */}
            <div className="hidden md:block absolute h-px w-1/2 bg-blue-200 dark:bg-slate-700 left-1/4 top-0 z-0"></div>

            <div className="pt-0 md:pt-8 flex justify-center relative">
              {/* Vertical Connector Line */}
              <div className="hidden md:block absolute w-px h-8 bg-blue-200 dark:bg-slate-700 left-1/2 top-0 -translate-x-1/2 z-0"></div>
              <StaffProfile name="CLARINA S. CAPISTRANO" title="Project Development Officer I" />
            </div>
            <div className="pt-0 md:pt-8 flex justify-center relative">
              {/* Vertical Connector Line */}
              <div className="hidden md:block absolute w-px h-8 bg-blue-200 dark:bg-slate-700 left-1/2 top-0 -translate-x-1/2 z-0"></div>
              <StaffProfile name="GERARD JAHN D. ALCON" title="Computer Programmer IV <br/> National SWM Database Manager" />
            </div>
          </div>

          {/* The Two Main Branches Wrapper */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-start relative mt-6 md:mt-8">
            {/* Horizontal Connector Line for branches */}
            <div className="hidden lg:block absolute h-px w-[50%] bg-blue-200 dark:bg-slate-700 left-1/4 -top-16 z-0"></div>

            {/* --- LEFT BRANCH --- */}
            <div className="flex flex-col items-center bg-white/50 dark:bg-slate-800/30 p-3 sm:p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-slate-800/80 shadow-sm relative">
              {/* Vertical branch line */}
              <div className="hidden lg:block absolute w-px h-16 bg-blue-200 dark:bg-slate-700 left-1/2 -top-16 -translate-x-1/2 z-0"></div>

              <GradientPill text="SOLID WASTE POLICY AND PROGRAM DEVELOPMENT SECTION" />
              <div className="w-full mb-6 md:mb-8">
                <StaffProfile name="JOAN FRANCES F. LABORTE" title="Senior Environmental Management <br/> Specialist | OIC Section Chief" />
              </div>

              <GradientPill text="POLICY DEVELOPMENT" small={true} />
              <div className="w-full space-y-4 md:space-y-6 mb-6 md:mb-8">
                <StaffProfile name="ENGR. ENRICO P. MEDINA" title="Technical Specialist" />
                <StaffProfile name="ENGR. ERIC M. NAGUM" title="Environmental Management Specialist I <br/> Climate Change - Solid Waste Sector Focal <br/> Team Leader-Old San Mateo SLF Activities" />
                <StaffProfile name="ENGR. MOHAMMAD I. ABUHANTASH" title="Environmental Management Specialist I" />
              </div>

              <GradientPill text="PROGRAM DEVELOPMENT AND IMPLEMENTATION" small={true} />
              <div className="w-full space-y-4 md:space-y-6">
                <StaffProfile name="RAYMOND MAREON P. BLAQUERA" title="Environmental Management Specialist I" />
                <StaffProfile name="BEN HUR V. MALANA" title="Administrative Officer V <br/> San Mateo SLF and MRF Support" />
                <StaffProfile name="RAMIL B. SOTOZA" title="Administrative Support IV <br/> MRF Operator" />
              </div>
            </div>

            {/* --- RIGHT BRANCH --- */}
            <div className="flex flex-col items-center bg-white/50 dark:bg-slate-800/30 p-3 sm:p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-slate-800/80 shadow-sm relative">
              {/* Vertical branch line */}
              <div className="hidden lg:block absolute w-px h-16 bg-blue-200 dark:bg-slate-700 left-1/2 -top-16 -translate-x-1/2 z-0"></div>

              <GradientPill text="NSWMC SECRETARIAT AND TECHNICAL SERVICES SECTION" />
              <div className="w-full mb-6 md:mb-8">
                <StaffProfile name="JUVINIA P. SERAFIN, MDM" title="Senior Environmental Management <br/> Specialist | OIC Section Chief" />
              </div>

              <GradientPill text="NSWMC SECRETARIAT AND EVALUATION" small={true} />
              <div className="w-full space-y-4 md:space-y-6 mb-6 md:mb-8">
                <StaffProfile name="RACHEL C. PASION" title="Senior Environmental Management <br/> Specialist | Evaluator, Focal - Region 2" />
                <StaffProfile name="CYNTHIA C. EVARDONE" title="Environmental Management Specialist I <br/> Evaluator, Focal- Region 1, Caraga" />
                <StaffProfile name="GABRIELLE RAINE G. AGUZAR" title="Environmental Management <br/> Specialist I | SWMD-EPR Support / <br/> 10yr. SWM Plan Evaluator - Region 8" />
                <StaffProfile name="GIOVANNI R. MIÑAS" title="Project Documentation Officer I <br/> Evaluator, Focal-MIMAROPA, Region 6/ <br/> NSWMC Coordinator" />
                <StaffProfile name="HOMER A. DELOS SANTOS" title="Project Documentation Officer I <br/> Evaluator, Focal- CAR, Region 8" />
                <StaffProfile name="ARNIEL M. MALLARI" title="Project Evaluation Officer I <br/> Evaluator, Focal - Region 3, BARMM" />
                <StaffProfile name="RODETH F. ANTONIO" title="Project Documentation Officer I <br/> Administrative Support" />
                <StaffProfile name="ENGR. AHMED FADEL A. SAWADJAAN" title="Engineer II" />
              </div>

              <GradientPill text="TECHNICAL SERVICES AND INSPECTION" small={true} />
              <div className="w-full space-y-4 md:space-y-6">
                <StaffProfile name="JEPP V. FARRALES, EnP" title="Environmental Management Specialist I <br/> Field Inspection Focal/ Evaluator, Focal <br/> - NCR, CALABARZON, Region 7/ SWMD-<br/>EPR Support" />
                <StaffProfile name="REY JOHN L. ESQUIVEL" title="Environmental Management Specialist I <br/> Field Inspection Focal/ MRF Manager" />
                <StaffProfile name="GIO D. CABUNTOCAN" title="Project Development Officer I | Evaluator, <br/> Focal - Region 5, Region 11, Region 12" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default OrgChart