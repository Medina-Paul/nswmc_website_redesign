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
      <div className="p-4 md:p-6 min-h-screen">
        {/* Banner */}
       <div className="w-full mb-12 max-w-6xl mx-auto rounded-[30px] shadow-lg bg-gradient-to-r from-[#6b9e15] via-[#8ac926] to-[#5b8712] relative overflow-hidden flex items-center justify-between px-8 py-10 md:px-14 md:py-12">
      
      {/* Left Side: Text Content */}
      <div className="flex flex-col z-10 max-w-2xl">
        {/* 
            Main Title 
            Using a custom drop-shadow to match the heavy 3D text effect in your image 
        */}
        <h1 className="text-5xl font-raleway md:text-6xl lg:text-7xl font-black text-white tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)] mb-3">
          LAWS & POLICIES
        </h1>
        
        {/* Subtitle */}
        <p className="text-white font-merriweather italic text-sm md:text-base lg:text-lg leading-snug font-medium drop-shadow-sm opacity-95">
          Environmental Management Bureau <br />
          SWMD's passed laws and policies
        </p>
      </div>

      {/* 
          Right Side: Image 
          Using absolute positioning on mobile so it doesn't squish the text, 
          and relative positioning on larger screens.
      */}
      <div className="absolute right-[-20px] bottom-[-20px] md:relative md:right-0 md:bottom-0 opacity-30 md:opacity-100 pointer-events-none">
        <img 
          // REPLACE THIS SRC WITH YOUR ACTUAL GAVEL IMAGE PATH
          src={laws_icon} 
          alt="Gavel and Law Book" 
          className="w-48 md:w-64 lg:w-72 object-contain drop-shadow-2xl"
        />
      </div>

    </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-raleway">
        {/* LEFT FILTER PANEL */}
        <div className="bg-white p-4 shadow-sm h-fit">
          <h2 className="font-semibold mb-3">Search</h2>
          <div className="flex items-center border rounded-lg px-2 mb-4">
            <input
              type="text"
              placeholder="Type a keyword"
              className="w-full p-2 outline-none"
            />
            <Search size={18} />
          </div>

          <label className="block text-sm font-medium mb-1">Category</label>
          <select className="w-full border rounded-lg p-2 mb-4">
            <option>Category</option>
          </select>

          <label className="block text-sm font-medium mb-1">
            Law Number
          </label>
          <input className="w-full border rounded-lg p-2 mb-4" />

          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
            SEARCH
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-2 space-y-6">
          {lawsData.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-lg mb-3 font-raleway">
                {section.type}
              </h3>

              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 shadow-sm"
                  >
                    <div className="flex flex-row md:items-center">
                      <p className="text-sm text-gray-600 font-raleway">
                        {item.date} |
                      </p>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-raleway font-semibold">
                         &nbsp; {item.code}
                      </a>
                    </div>
                    <p className="text-sm mt-2 text-gray-700 font-merriweather">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h4 className="font-bold text-orange-500 mb-2 font-raleway">MISSION</h4>
          <p className="text-sm text-gray-600 font-merriweather">
            To protect, restore and enhance environmental quality towards good
            public health, environmental integrity and economic viability.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h4 className="font-bold text-green-600 mb-2 font-raleway">VISION</h4>
          <p className="text-sm text-gray-600 font-merriweather">
            A nation empowered to protect our natural resources, attuned to the
            pursuit of sustainable development.
          </p>
        </div>
      </div>
    </div>
    </Layout>
  );
}