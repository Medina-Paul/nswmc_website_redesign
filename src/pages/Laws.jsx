import React from "react";
import { Search } from "lucide-react";
import Layout from '../components/Layout';
import laws_icon from '../assets/laws_icon.png';


const lawsData = [
  {
    type: "Presidential Decree",
    items: [
      {
        date: "November 7, 1975",
        code: "PD 825",
        description:
          "Providing penalty for improper disposal of garbage and other forms of uncleanliness and for other purposes",
        link: "https://www.officialgazette.gov.ph/1975/11/07/presidential-decree-no-825-s-1975/"
      },
    ],
  },
  {
    type: "Republic Act",
    items: [
      {
        date: "January 26, 2001",
        code: "RA 9003",
        description:
          "An act providing for an Ecological Solid Waste Management Program, creating the necessary institutional mechanisms and incentives...",
        link: "https://www.officialgazette.gov.ph/2001/01/26/republic-act-no-9003/"
      },
    ],
  },
  {
    type: "Administrative Order",
    items: [
      {
        date: "October 19, 1993",
        code: "AO 1993-90",
        description:
          "Creating a project management office on Solid Waste Management under the presidential task force on waste management",
        link: "https://www.officialgazette.gov.ph/1993/10/19/administrative-order-no-1993-90/"
      },
    ],
  },
  {
    type: "Department Administrative Order",
    items: [
      {
        date: "August 27, 2025",
        code: "DAO 2025-26",
        description:
          "Providing Fees for the Registration of Extended Producer Responsibility Programs...",
        link: "https://www.officialgazette.gov.ph/2025/08/27/department-administrative-order-no-2025-26/"
      },
      {
        date: "November 26, 2019",
        code: "DAO 2019-21",
        description:
          "Guidelines Governing Waste-To-Energy (WTE) Facilities...",
        link: "https://www.officialgazette.gov.ph/2019/11/26/department-administrative-order-no-2019-21/"
      },
    ],
  },
  {
    type: "DENR Memorandum Circular",
    items: [
      {
        date: "August 5, 2021",
        code: "DMC 2021-10",
        description:
          "Adoption of the National Plan of Action for the Prevention, Reduction, and Management of Marine Litter",
        link: "https://www.officialgazette.gov.ph/2021/08/05/denr-memorandum-circular-no-2021-10/"
      },
    ],
  },
  {
    type: "Resolution",
    items: [
      {
        date: "February 12, 2020",
        code: "NSWMC Resolution No. 1363",
        description:
          "Resolution directing DENR to prepare and implement banning of unnecessary single-use plastics",
        link: "https://www.officialgazette.gov.ph/2020/02/12/nswmc-resolution-no-1363/"
      },
    ],
  },
];

export default function Laws() {
  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 min-h-screen">
        {/* Banner */}
       <div className="w-full mb-8 md:mb-12 max-w-6xl mx-auto rounded-xl md:rounded-[30px] shadow-lg bg-gradient-to-r from-[#6b9e15] via-[#8ac926] to-[#5b8712] relative overflow-hidden flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-14 py-6 sm:py-10 md:py-12">
      
      {/* Left Side: Text Content */}
      <div className="flex flex-col z-10 max-w-2xl">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-raleway font-black text-white tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)] mb-2 md:mb-3">
          LAWS & POLICIES
        </h1>
        
        {/* Subtitle */}
        <p className="text-white font-merriweather italic text-xs sm:text-sm md:text-base lg:text-lg leading-snug font-medium drop-shadow-sm opacity-95">
          Environmental Management Bureau <br />
          SWMD's passed laws and policies
        </p>
      </div>

      {/* Right Side: Image */}
      <div className="absolute right-[-15px] bottom-[-15px] sm:right-[-20px] sm:bottom-[-20px] md:relative md:right-0 md:bottom-0 opacity-20 sm:opacity-30 md:opacity-100 pointer-events-none">
        <img 
          src={laws_icon} 
          alt="Gavel and Law Book" 
          className="w-40 sm:w-48 md:w-64 lg:w-72 object-contain drop-shadow-2xl"
        />
      </div>

    </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 font-raleway">
        {/* LEFT FILTER PANEL */}
        <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 shadow-sm h-fit rounded-lg md:rounded-xl transition-colors">
          <h2 className="font-semibold mb-2 md:mb-3 text-sm md:text-base transition-colors dark:text-white">Search</h2>
          <div className="flex items-center border rounded-lg px-2 mb-3 md:mb-4 dark:border-slate-700 dark:bg-slate-900">
            <input
              type="text"
              placeholder="Type a keyword"
              className="w-full p-2 outline-none text-xs md:text-sm bg-transparent dark:text-white transition-colors"
            />
            <Search size={16} className="dark:text-gray-400" />
          </div>

          <label className="block text-xs md:text-sm font-medium mb-1 dark:text-gray-300">Category</label>
          <select className="w-full border rounded-lg p-2 mb-3 md:mb-4 text-xs md:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white">
            <option>Category</option>
          </select>

          <label className="block text-xs md:text-sm font-medium mb-1 dark:text-gray-300">
            Law Number
          </label>
          <input className="w-full border rounded-lg p-2 mb-3 md:mb-4 text-xs md:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white" />

          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-xs md:text-sm font-medium transition">
            SEARCH
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-2 space-y-4 md:space-y-6">
          {lawsData.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-sm md:text-lg mb-2 md:mb-3 font-raleway dark:text-white transition-colors">
                {section.type}
              </h3>

              <div className="space-y-2 md:space-y-3">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-800 p-3 md:p-4 shadow-sm rounded-lg transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-raleway">
                        {item.date} |
                      </p>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-raleway font-semibold text-xs md:text-sm">
                         &nbsp; {item.code}
                      </a>
                    </div>
                    <p className="text-xs md:text-sm mt-1 md:mt-2 text-gray-700 dark:text-gray-300 font-merriweather transition-colors">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
        <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg md:rounded-xl shadow-sm transition-colors">
          <h4 className="font-bold text-orange-500 mb-2 font-raleway text-sm md:text-base">MISSION</h4>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-merriweather transition-colors">
            To protect, restore and enhance environmental quality towards good
            public health, environmental integrity and economic viability.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg md:rounded-xl shadow-sm transition-colors">
          <h4 className="font-bold text-green-600 dark:text-green-400 mb-2 font-raleway text-sm md:text-base">VISION</h4>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-merriweather transition-colors">
            A nation empowered to protect our natural resources, attuned to the
            pursuit of sustainable development.
          </p>
        </div>
      </div>
    </div>
    </Layout>
  );
}