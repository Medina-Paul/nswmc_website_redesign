import React from 'react';
import { useState } from 'react';
import Layout from '../components/Layout';
import swmd_logo from '../assets/swmd_logo.png';
import dwight_ramos from '../assets/dwight_ramos.png';
import peter_quintana from '../assets/peter_quintana.png';
import joseph_jocson from '../assets/joseph_jocson.png';
import marlon_era from '../assets/marlon_era.png';
import marlon_pareja from '../assets/marlon_pareja.png';
import {PDFViewer} from '../components/PdfViewer.jsx';
import Citizen_Charter from '../pdf_files/Citizen-Charter.pdf';

// ==========================================
// REUSABLE SUB-COMPONENTS FOR THE ORG CHART
// ==========================================
const GradientPill = ({ text, small = false }) => {
  const pillClasses = small
    ? "px-8 py-2 text-[.75rem]  drop-shadow-sm max-w-[280px] " // Smaller, policy-level pill
    : "px-10 py-3 text-xs max-w-[320px] drop-shadow-sm"; // Section-level pill

  return (
    <div className={`min-h-[2.5rem] mx-auto w-full uppercase drop-shadow-lg font-raleway font-bold text-center text-white bg-gradient-to-r from-emb-blue to-emb-green-light rounded-lg my-6 flex items-center justify-center leading-tight shadow-md border border-[#467405]/50 ${pillClasses}`}>
      {text}
    </div>
  );
};

const StaffProfile = ({ name, title, additional = null }) => {
  return (
    <div className="text-center space-y-1 my-6 px-2">
      <p className="font-black drop-shadow-sm font-raleway text-[#1a5b8c] text-[1.2rem] leading-tight">{name}</p>
      {/* dangerouslySetInnerHTML allows us to use <br/> tags in the strings to match the exact line breaks in the picture */}
      <p className="text-[.95rem] font-medium font-merriweather drop-shadow-sm text-gray-800 leading-snug" dangerouslySetInnerHTML={{ __html: title }}></p>
      {additional && <p className="text-[.9rem] font-medium text-gray-600">{additional}</p>}
    </div>
  );
};


// ==========================================
// DATA FOR COMMISSIONERS (Now with bios!)
// ==========================================
const commissionersData = [
  {
    name: "Atty. Dwight Ramos",
    role: "Private Sector Representative",
    img: dwight_ramos,
    bio: [
      "Atty. Dwight Ramos serves as Private Sector Representative in the National Solid Waste Management Commission (NSWMC) coming from nongovernment organizations (NGOs) with a track record on solid waste management and waste reduction, recycling and resource recovery, particularly, the Coalition of Solid Waste Management Providers (CSWMP).",
      "He started his career in 1990 with the Tax Division of SGV & Co., and became in-house legal and business development head, forming part of the senior management team of leading companies in the country for more than 30 years. He is Senior Vice President of Basic Environmental Systems & Technologies, Inc. and Director of Metro Clark Waste Management Corporation.",
      "Atty. Dwight was Governor of Rotary International District 3780 in RY 2016-17 and is a member of the Rotary Club of Quezon City since 2004. He is a Paul Harris Vocational Excellence Awardee on Waste Management in 2013."
    ]
  },
  {
    name: "Peter T. Quintana",
    role: "Alternate Commissioner",
    img: peter_quintana,
    bio: [
      "Peter T. Quintana acts as an Alternate Commissioner, bringing years of dedicated service in environmental policy and alternative dispute resolution regarding municipal solid waste.",
      "His background includes extensive work with local government units (LGUs) to streamline waste collection systems and implement sustainable segregation practices at the barangay level.",
      "He holds a master's degree in Environmental Science and has authored several papers on the economic impacts of circular economy models in Southeast Asia."
    ]
  },
  {
    name: "Dr. Joseph Jocson",
    role: "Private Sector Representative",
    img: joseph_jocson,
    bio: [
      "Dr. Joseph Jocson is a Private Sector Representative specializing in industrial waste management and the integration of new recycling technologies into the manufacturing sector.",
      "Before joining the NSWMC, Dr. Jocson served as the head of sustainability for a major multinational corporation, where he successfully reduced factory landfill contributions by 85% over five years.",
      "He is a frequent speaker at international environmental summits and passionately advocates for Extended Producer Responsibility (EPR) frameworks."
    ]
  },
  {
    name: "Dr. Marlon Era",
    role: "Commissioner",
    img: marlon_era,
    bio: [
      "Dr. Marlon Era is a dedicated Commissioner with a strong academic background in urban planning and ecological governance.",
      "He currently serves as a professor at a leading university, teaching courses on environmental impact assessments and solid waste management planning. His research focuses on the sociological aspects of community recycling compliance.",
      "Dr. Era has been instrumental in drafting key guidelines for the establishment of modern Materials Recovery Facilities (MRFs) nationwide."
    ]
  },
  {
    name: "Marlon Pareja",
    role: "Private Sector Representative",
    img: marlon_pareja,
    bio: [
      "Marlon Pareja represents the private sector with a focus on grassroots environmental initiatives and community-driven waste reduction campaigns.",
      "He founded a successful social enterprise that upcycles single-use plastics into durable building materials, providing both environmental solutions and local employment.",
      "Recognized for his innovative approach to the plastic crisis, Marlon works closely with the Commission to bridge the gap between national policy and actionable local entrepreneurship."
    ]
  },
];

const CommissionersSlider = () => {

}


const About = () => {

  // 1. State to track which commissioner is featured
  const [activeIndex, setActiveIndex] = useState(0);

  // 2. Navigation Functions for the arrows
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % commissionersData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + commissionersData.length) % commissionersData.length);
  };

  // 3. Grab the active commissioner's data
  const featuredComm = commissionersData[activeIndex];



  return (
    <Layout>
      {/* ========================================== */}
      {/* 1. YOUR ORIGINAL TOP CARDS                 */}
      {/* ========================================== */}
      <div className="font-raleway flex flex-col md:flex-row justify-center gap-4 mb-12">
        <a href='#commissioners' className="scroll-smooth bg-[#1a5b8c] opacity-90 text-white rounded-2xl p-6 w-full md:w-64 cursor-pointer hover:bg-blue-800 transition shadow-md flex flex-col justify-between h-32">
          <h3 className="font-bold text-xl leading-tight">NSWMC<br />Commissioners</h3>
          <span className="text-sm mt-auto">View more &rarr;</span>
        </a>
        <a href='#organizational-chart' className="bg-[#8cc63f] opacity-90 text-white rounded-2xl p-6 w-full md:w-64 cursor-pointer hover:bg-green-500 transition shadow-md flex flex-col justify-between h-32">
          <h3 className="font-bold text-xl leading-tight">Organizational Chart</h3>
          <span className="text-sm mt-auto">View more &rarr;</span>
        </a>
        <a href='#citizens-charter' className="bg-[#467405] opacity-90 text-white rounded-2xl p-6 w-full md:w-64 cursor-pointer hover:bg-green-900 transition shadow-md flex flex-col justify-between h-32">
          <h3 className="font-bold text-xl leading-tight">Citizen's Charter<br />on SWM</h3>
          <span className="text-sm mt-auto">View more &rarr;</span>
        </a>
      </div>

      {/* ========================================== */}
      {/* 2. YOUR ORIGINAL TEXT CONTENT              */}
      {/* ========================================== */}
      <div id='solid-waste-division' className="max-w-5xl mx-auto px-4 md:px-12 text-gray-800 mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-[#1a5b8c] text-center mb-8 tracking-tight font-raleway">
          SOLID WASTE<br />MANAGEMENT DIVISION
        </h1>

        <p className="text-justify mb-8 leading-relaxed font-merriweather">
          The Solid Waste Management Division of the Environmental Management Bureau-DENR shall develop policy and programs on solid waste management; provide secretariat support to the National Solid Waste Management Commission and provide technical services to stakeholders.
        </p>

        <p className="mb-6 font-medium text-center md:text-left font-merriweather">
          The Division shall be composed of the following Sections, namely:
        </p>

        {/* Section 1: Policy and Program */}
        <div className="mb-10 font-merriweather">
          <h2 className="font-bold text-lg mb-2 text-gray-900">Solid Waste Policy and Program Development Section</h2>
          <p className="italic font-bold mb-4 text-gray-800">This section shall develop policy, program and guideline for the implementation of the provisions of the Act:</p>
          <ul className="list-disc pl-6 space-y-2 text-justify text-gray-700">
            <li>Formulate policies and guidelines in support to the implementation of RA 9003;</li>
            <li>Establish and manage a comprehensive SWM information, database and dissemination system;</li>
            <li>Facilitate coordination with stakeholders on policy development that were formulated and finalized by the office;</li>
            <li>Develop model waste minimization and reduction auditing procedures for evaluation options;</li>
            <li>Profiling, Identification, Analysis, and Evaluation of current state, gaps, trends projection to update the National Solid Waste Management Framework;</li>
            <li>Promote the development of the recycling market;</li>
            <li>Package SWM project proposals for funding;</li>
            <li>Program Development on Technical and other Capability Building Assistance to various stakeholders;</li>
            <li>Develop a program on investments resource recovery-based livelihood for local communities.</li>
            <li>Serve as the clearinghouse for all projects/programs for implementation by the LGUs and/or the public or private sector</li>
          </ul>
        </div>

        {/* Section 2: Secretariat and Technical Services */}
        <div className="font-merriweather">
          <h2 className="font-bold text-lg mb-2 text-gray-900">NSWMC-Secretariat and Technical Services</h2>
          <p className="italic font-bold mb-4 text-gray-800">This section shall provide secretariat support to the Commission and technical expertise to LGUs and other stakeholders for the implementation of the provisions of the Act:</p>
          <ul className="list-disc pl-6 space-y-2 text-justify text-gray-700">
            <li>Prepare all pertinent documents for deliberation by the Commission;</li>
            <li>Record and document all the proceedings of the meetings; Handle all the administrative requisites of the Commission;</li>
            <li>Index and keep all records used and referenced by the Commission;</li>
            <li>Serve as the clearinghouse for all projects/programs for implementation by the LGUs and/or the public or private sector;</li>
            <li>Evaluate and review proposals submitted for funding support from the Solid Waste Management Fund;</li>
            <li>Evaluate and recommend for approval the 10 year solid waste management plans;</li>
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


      {/* ========================================== */}
      {/* 4. NEW: NSWMC COMMISSIONERS SECTION        */}
      {/* ========================================== */}
      <div id='commissioners' className="w-full max-w-6xl mx-auto px-4 pb-24">

        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="font-raleway text-5xl md:text-7xl font-black text-[#1a5b8c] leading-none">NSWMC</h2>
            <h3 className="font-raleway text-4xl md:text-5xl font-light text-[#8cc63f] tracking-tight">COMMISSIONERS</h3>
          </div>
        </div>

        {/* Commissioner Cards Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {commissionersData.map((person, idx) => (
            <div key={idx} className="w-64 bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:-translate-y-1 transition-transform duration-300">
              {/* Gradient Image Background */}
              <div className="h-44 bg-gradient-to-b from-emb-green-light to-emb-blue flex items-end drop-shadow-lg justify-center pt-6 px-4 relative overflow-hidden">
                <img src={person.img} alt={person.name} className="w-100 h-43 object-cover object-top rounded-t-full drop-shadow-xl relative z-10" />
              </div>
              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="font-raleway font-bold text-xl text-[#1a5b8c] leading-tight mb-1">{person.name}</h4>
                <p className="font-merriweather italic text-xs text-[#8cc63f] mb-6">{person.role}</p>
                <button className="mt-auto text-xs font-bold text-gray-800 flex items-center justify-between w-full hover:text-[#1a5b8c] transition">
                  Learn more <span className="text-gray-400 text-lg leading-none">&gt;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* The Dynamic Featured Slider */}
        <div className="w-full bg-gradient-to-br from-[#cff1c2] via-[#6ed89c] to-[#3a93a1] rounded-[40px] p-8 md:p-12 relative flex flex-col-reverse md:flex-row items-center gap-8 shadow-inner overflow-hidden group">

          <div className="absolute inset-0 bg-white opacity-20"></div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="hidden md:block absolute left-4 text-5xl font-light text-[#1a5b8c] opacity-50 hover:opacity-100 hover:-translate-x-1 transition z-20 cursor-pointer"
          >
            &lt;
          </button>

          {/* Dynamic Text Content */}
          <div className="flex flex-col md:flex-1 md:px-12 relative z-10 space-y-4 md:min-h-[450px]">
            <h3 className="text-md font-bold text-gray-700 italic font-merriweather mb-9">ABOUT NSWMC COMMISSIONERS</h3>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a5b8c] font-raleway">{featuredComm.name}</h2>
            <p className="text-[#154a15] italic font-bold font-merriweather">{featuredComm.role}</p>

            <div className="space-y-4 drop-shadow-sm  text-md text-gray-800 text-justify leading-relaxed mt-6">
              {featuredComm.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Dynamic Image */}
          <div key={activeIndex} className="w-full mr-8 md:w-72 h-[400px] rounded-[30px] overflow-hidden shadow-2xl bg-white shrink-0 relative z-10 animate-fade-in">
            <img src={featuredComm.img} alt={featuredComm.name} className="w-full h-full mt-10 object-cover object-top" />
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="hidden md:block absolute right-4 text-5xl font-light text-blue opacity-50 hover:opacity-100 hover:translate-x-1 transition z-20 cursor-pointer"
          >
            &gt;
          </button>
        </div>

        {/* ========================================== */}
      {/* 3. NEW: SWMD ORGANIZATIONAL CHART          */}
      {/* ========================================== */}
      <div id='organizational-chart' className="w-full max-w-5xl mx-auto px-4 mb-24">

        {/* Abstract "SWMD" Dot Graphic Placeholder */}
        <div className="pt-16 flex flex-col items-center justify-center mb-12">
          <div className="flex items-center w-full max-w-lg mb-4 mr-10 drop-shadow-xl">
            <img src={swmd_logo} alt="SWMD Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Division Chief */}
        <div className="mb-12">
          <StaffProfile
            name="MARIA DELIA CRISTINA M. VALDEZ"
            title="Chief, Solid Waste Management Division"
          />
        </div>

        {/* Side-by-Side Under Chief */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-center">
          <StaffProfile name="CLARINA S. CAPISTRANO" title="Project Development Officer I" />
          <StaffProfile name="GERARD JAHN D. ALCON" title="Computer Programmer IV <br/> National SWM Database Manager" />
        </div>

        {/* The Two Main Branches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-start">

          {/* LEFT BRANCH */}
          <div className="flex flex-col items-center">
            <GradientPill text="SOLID WASTE POLICY AND PROGRAM DEVELOPMENT SECTION" />
            <StaffProfile name="JOAN FRANCES F. LABORTE" title="Senior Environmental Management <br/> Specialist | OIC Section Chief" />

            <GradientPill text="POLICY DEVELOPMENT" small={true} />
            <StaffProfile name="ENGR. ENRICO P. MEDINA" title="Technical Specialist" />
            <StaffProfile name="ENGR. ERIC M. NAGUM" title="Environmental Management Specialist I <br/> Climate Change - Solid Waste Sector Focal <br/> Team Leader-Old San Mateo SLF Activities" />
            <StaffProfile name="ENGR. MOHAMMAD I. ABUHANTASH" title="Environmental Management Specialist I" />

            <GradientPill text="PROGRAM DEVELOPMENT AND IMPLEMENTATION" small={true} />
            <StaffProfile name="RAYMOND MAREON P. BLAQUERA" title="Environmental Management Specialist I" />
            <StaffProfile name="BEN HUR V. MALANA" title="Administrative Officer V <br/> San Mateo SLF and MRF Support" />
            <StaffProfile name="RAMIL B. SOTOZA" title="Administrative Support IV <br/> MRF Operator" />
          </div>

          {/* RIGHT BRANCH */}
          <div className="flex flex-col items-center">
            <GradientPill text="NSWMC SECRETARIAT AND TECHNICAL SERVICES SECTION" />
            <StaffProfile name="JUVINIA P. SERAFIN, MDM" title="Senior Environmental Management <br/> Specialist | OIC Section Chief" />

            <GradientPill text="NSWMC SECRETARIAT AND EVALUATION" small={true} />
            <StaffProfile name="RACHEL C. PASION" title="Senior Environmental Management <br/> Specialist | Evaluator, Focal - Region 2" />
            <StaffProfile name="CYNTHIA C. EVARDONE" title="Environmental Management Specialist I <br/> Evaluator, Focal- Region 1, Caraga" />
            <StaffProfile name="GABRIELLE RAINE G. AGUZAR" title="Environmental Management <br/> Specialist I | SWMD-EPR Support / <br/> 10yr. SWM Plan Evaluator - Region 8" />
            <StaffProfile name="GIOVANNI R. MIÑAS" title="Project Documentation Officer I <br/> Evaluator, Focal-MIMAROPA, Region 6/ <br/> NSWMC Coordinator" />
            <StaffProfile name="HOMER A. DELOS SANTOS" title="Project Documentation Officer I <br/> Evaluator, Focal- CAR, Region 8" />
            <StaffProfile name="ARNIEL M. MALLARI" title="Project Evaluation Officer I <br/> Evaluator, Focal - Region 3, BARMM" />
            <StaffProfile name="RODETH F. ANTONIO" title="Project Documentation Officer I <br/> Administrative Support" />
            <StaffProfile name="ENGR. AHMED FADEL A. SAWADJAAN" title="Engineer II" />

            <GradientPill text="TECHNICAL SERVICES AND INSPECTION" small={true} />
            <StaffProfile name="JEPP V. FARRALES, EnP" title="Environmental Management Specialist I <br/> Field Inspection Focal/ Evaluator, Focal <br/> - NCR, CALABARZON, Region 7/ SWMD-<br/>EPR Support" />
            <StaffProfile name="REY JOHN L. ESQUIVEL" title="Environmental Management Specialist I <br/> Field Inspection Focal/ MRF Manager" />
            <StaffProfile name="GIO D. CABUNTOCAN" title="Project Development Officer I | Evaluator, <br/> Focal - Region 5, Region 11, Region 12" />
          </div>

        </div>
      </div>

      <div id='citizens-charter' className="w-full max-w-5xl mx-auto px-4 mb-24 border-t border-gray-200 pt-16">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="font-raleway text-5xl md:text-7xl font-black text-[#1a5b8c] leading-none">CITIZEN'S CHARTER</h2>
            <h3 className="font-raleway text-4xl md:text-5xl font-light text-[#8cc63f] tracking-tight">ON SWM</h3>
          </div>
        </div>

      <PDFViewer fileLink={Citizen_Charter} title={'CITIZEN\'S CHARTER ON SWM'}/>

      </div>


      </div>

    </Layout>
  );
};

export default About;