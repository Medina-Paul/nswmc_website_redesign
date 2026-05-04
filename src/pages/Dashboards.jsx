import React, { useState } from 'react';
import Layout from '../components/Layout';
import tablet_icon from '../assets/tablet_icon.png';

const Dashboards = () => {
  // 1. Create an array of your Power BI dashboards
  // You can add as many as you want here!
  const dashboardsList = [
    {
      title: "10-Year Solid Waste Management Plan",
      url: "https://app.powerbi.com/view?r=eyJrIjoiZThkMDJiMjctMjkwMC00Y2I3LTk4ZDEtOWI1ZDQ5YWFmMjZlIiwidCI6ImY2ZjRhNjkyLTQzYjMtNDMzYi05MmIyLTY1YzRlNmNjZDkyMCIsImMiOjEwfQ%3D%3D"
    },
    {
      title: "Operational Sanitary Landfills",
      url: "https://app.powerbi.com/view?r=eyJrIjoiZjdhNDE3YzMtZGIxNi00MjZhLTlhNmItNTQ4YWUyYTIzMDYzIiwidCI6ImY2ZjRhNjkyLTQzYjMtNDMzYi05MmIyLTY1YzRlNmNjZDkyMCIsImMiOjEwfQ%3D%3D" // Paste your second link here
    },
    {
      title: "Projected Waste Generation",
      url: "https://app.powerbi.com/view?r=eyJrIjoiMDhiZmU4YzktNzk3Mi00ODIwLWFkNGQtNDIzMWZhNWNiNWNiIiwidCI6ImY2ZjRhNjkyLTQzYjMtNDMzYi05MmIyLTY1YzRlNmNjZDkyMCIsImMiOjEwfQ%3D%3D" // Paste your third link here
    }
  ];

  // 2. State to track the currently active dashboard index
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. Navigation Functions
  const handlePrev = () => {
    // If we are on the first one, loop back to the last one. Otherwise, go back 1.
    setCurrentIndex((prev) => (prev === 0 ? dashboardsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    // If we are on the last one, loop back to the first one. Otherwise, go forward 1.
    setCurrentIndex((prev) => (prev === dashboardsList.length - 1 ? 0 : prev + 1));
  };

  // Grab the current dashboard based on the state
  const activeDashboard = dashboardsList[currentIndex];

  return (
    <Layout>
      <div className="flex flex-col space-y-8 mb-12 w-full max-w-7xl mx-auto px-4">
        
        {/* Banner */}
        <div className="w-full mb-8 max-w-6xl mx-auto rounded-[30px] shadow-lg bg-gradient-to-r from-gray-50 via-emb-blue to-emb-blue relative overflow-hidden flex items-center justify-between px-8 py-10 md:px-14 md:py-12">
          
          {/* Left Side: Text Content */}
          <div className="flex flex-col z-10 max-w-2xl">
            <h1 className="text-6xl font-raleway lg:text-8xl font-black text-white tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)] mb-3">
              DASHBOARD
            </h1>
            <p className="text-white font-merriweather italic text-sm md:text-base lg:text-lg leading-snug font-medium drop-shadow-sm opacity-95">
              Explore SWMD's Data reports through <br />
              microsoft graphs
            </p>
          </div>
    
          {/* Right Side: Image */}
          <div className="absolute right-[-20px] bottom-[-20px] md:relative md:right-0 md:bottom-0 opacity-30 md:opacity-100 pointer-events-none">
            <img 
              src={tablet_icon} 
              alt="Tablet Icon" 
              className="w-70 ml-10 md:w-200 object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Dashboard Navigation Controls */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          
          <button 
            onClick={handlePrev}
            className="flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-[#8cc63f] hover:text-white text-[#1a5b8c] font-bold rounded-xl transition duration-300"
          >
            <span>&larr;</span> Prev
          </button>

          <div className="text-center">
            <h3 className="font-raleway font-bold text-lg text-[#1a5b8c]">
              {activeDashboard.title}
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Dashboard {currentIndex + 1} of {dashboardsList.length}
            </p>
          </div>

          <button 
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-[#8cc63f] hover:text-white text-[#1a5b8c] font-bold rounded-xl transition duration-300"
          >
            Next <span>&rarr;</span>
          </button>

        </div>

        {/* Power BI Iframe Container */}
        {/* Added a key tied to the URL so React knows to fully reload the iframe when the link changes */}
        <div className="w-full max-w-6xl mx-auto bg-gray-50 rounded-3xl shadow-lg border border-gray-200 overflow-hidden h-[75vh] min-h-[600px] flex justify-center items-center relative">
          
          <div className="absolute inset-0 flex items-center justify-center -z-10">
             <span className="text-gray-400 font-medium animate-pulse flex flex-col items-center">
               <svg className="animate-spin h-8 w-8 mb-3 text-[#8cc63f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Loading Dashboard...
             </span>
          </div>

          <iframe
            key={activeDashboard.url} // Forces the iframe to refresh when the URL changes
            title={activeDashboard.title}
            className="w-full h-full border-none z-10 bg-transparent"
            src={activeDashboard.url}
            allowFullScreen={true}
          ></iframe>
          
        </div>

      </div>
    </Layout>
  );
};

export default Dashboards;