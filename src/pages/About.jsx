import React from 'react';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      {/* ========================================== */}
      {/* 2. ORIGINAL TEXT CONTENT (ENHANCED)          */}
      {/* ========================================== */}

      {/* Header */}
      <div className="w-full ml-0 md:ml-15 text-center md:text-left mt-8 md:mt-16 mb-6 md:mb-8 px-3 md:px-0">
        <h2 className="font-raleway text-3xl sm:text-5xl md:text-7xl font-black text-[#1a5b8c] dark:text-blue-400 leading-none drop-shadow-sm transition-colors">SOLID</h2>
        <h3 className="font-raleway text-xl sm:text-4xl md:text-5xl font-light text-[#8cc63f] dark:text-green-400 tracking-tight transition-colors">WASTE MANAGEMENT</h3>
      </div>

      <div className="max-w-5xl mt-8 md:mt-16 mx-auto px-3 sm:px-6 md:px-12 mb-24 transition-colors duration-500">
        {/* Lead Paragraph */}
        <p className="text-justify mb-6 md:mb-8 text-xs sm:text-base md:text-lg leading-relaxed font-merriweather text-gray-800 dark:text-gray-200 transition-colors">
          The Solid Waste Management Division of the Environmental Management Bureau-DENR shall develop policy and programs on solid waste management; provide secretariat support to the National Solid Waste Management Commission and provide technical services to stakeholders.
        </p>

        <p className="mb-8 md:mb-12 text-xs sm:text-base md:text-lg font-medium text-center md:text-left font-merriweather text-gray-800 dark:text-gray-200 transition-colors">
          The Division shall be composed of the following Sections, namely:
        </p>

        {/* Content Sections Wrapper */}
        <div className="space-y-12 md:space-y-16">
          {/* Section 1: Policy and Program */}
          <div className="relative">
            <h2 className="font-raleway font-black text-lg sm:text-2xl md:text-3xl mb-2 md:mb-3 text-[#1a5b8c] dark:text-blue-300 transition-colors">
              Solid Waste Policy and Program Development Section
            </h2>
            <p className="font-merriweather italic font-bold mb-4 md:mb-6 text-[0.7rem] sm:text-sm md:text-base text-[#8cc63f] dark:text-green-400 transition-colors">
              This section shall develop policy, program and guideline for the implementation of the provisions of the Act:
            </p>
            <ul className="list-disc pl-4 md:pl-8 space-y-2 md:space-y-3 text-justify font-merriweather text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 marker:text-[#8cc63f] transition-colors leading-relaxed">
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

          {/* Divider line for visual separation in long text */}
          <hr className="border-gray-200 dark:border-slate-800 transition-colors" />

          {/* Section 2: Secretariat and Technical Services */}
          <div className="relative">
            <h2 className="font-raleway font-black text-lg sm:text-2xl md:text-3xl mb-2 md:mb-3 text-[#1a5b8c] dark:text-blue-300 transition-colors">
              NSWMC-Secretariat and Technical Services
            </h2>
            <p className="font-merriweather italic font-bold mb-4 md:mb-6 text-[0.7rem] sm:text-sm md:text-base text-[#8cc63f] dark:text-green-400 transition-colors">
              This section shall provide secretariat support to the Commission and technical expertise to LGUs and other stakeholders for the implementation of the provisions of the Act:
            </p>
            <ul className="list-disc pl-4 md:pl-8 space-y-2 md:space-y-3 text-justify font-merriweather text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 marker:text-[#8cc63f] transition-colors leading-relaxed">
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
    </Layout>
  );
};

export default About;