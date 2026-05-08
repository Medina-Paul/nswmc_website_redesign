import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import tablet_icon from '../assets/tablet_icon.png';

const Dashboards = () => {
  const { dashboardType } = useParams();
  const navigate = useNavigate();
  
  // Dashboard configuration mapped by URL slug
  const dashboardsConfig = {
    '10-year-plan': {
      title: "10-Year Solid Waste Management Plan",
      url: "https://app.powerbi.com/view?r=eyJrIjoiZThkMDJiMjctMjkwMC00Y2I3LTk4ZDEtOWI1ZDQ5YWFmMjZlIiwidCI6ImY2ZjRhNjkyLTQzYjMtNDMzYi05MmIyLTY1YzRlNmNjZDkyMCIsImMiOjEwfQ%3D%3D"
    },
    'operational-landfills': {
      title: "Operational Sanitary Landfills",
      url: "https://app.powerbi.com/view?r=eyJrIjoiZjdhNDE3YzMtZGIxNi00MjZhLTlhNmItNTQ4YWUyYTIzMDYzIiwidCI6ImY2ZjRhNjkyLTQzYjMtNDMzYi05MmIyLTY1YzRlNmNjZDkyMCIsImMiOjEwfQ%3D%3D"
    },
    'projected-waste': {
      title: "Projected Waste Generation",
      url: "https://app.powerbi.com/view?r=eyJrIjoiMDhiZmU4YzktNzk3Mi00ODIwLWFkNGQtNDIzMWZhNWNiNWNiIiwidCI6ImY2ZjRhNjkyLTQzYjMtNDMzYi05MmIyLTY1YzRlNmNjZDkyMCIsImMiOjEwfQ%3D%3D"
    }
  };

  const dashboardsList = Object.entries(dashboardsConfig).map(([slug, config]) => ({
    slug,
    ...config
  }));

  // Get the current dashboard or default to first one
  const currentDashboard = dashboardType 
    ? dashboardsConfig[dashboardType] 
    : dashboardsList[0];

  const currentIndex = dashboardsList.findIndex(d => d.slug === dashboardType) >= 0 
    ? dashboardsList.findIndex(d => d.slug === dashboardType)
    : 0;

  // Navigation Functions
  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + dashboardsList.length) % dashboardsList.length;
    navigate(`/dashboards/${dashboardsList[newIndex].slug}`);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % dashboardsList.length;
    navigate(`/dashboards/${dashboardsList[newIndex].slug}`);
  };

  const goToDashboard = (slug) => {
    navigate(`/dashboards/${slug}`);
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-6 md:space-y-8 mb-12 w-full max-w-7xl mx-auto px-2 sm:px-4">
        
        {/* Banner - Animated Fade In */}
        <div className="w-full mb-6 md:mb-8 max-w-6xl mx-auto rounded-xl md:rounded-[30px] shadow-lg bg-gradient-to-r from-gray-50 via-emb-blue to-emb-blue relative overflow-hidden flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-14 py-6 sm:py-10 md:py-12 animate-fade-in">
          
          {/* Left Side: Text Content */}
          <div className="flex flex-col z-10 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-raleway font-black text-white tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)] mb-2 md:mb-3">
              DASHBOARD
            </h1>
            <p className="text-white font-merriweather italic text-xs sm:text-sm md:text-base lg:text-lg leading-snug font-medium drop-shadow-sm opacity-95">
              Explore SWMD's Data reports through <br />
              microsoft graphs
            </p>
          </div>
    
          {/* Right Side: Image */}
          <div className="absolute right-[-15px] bottom-[-15px] sm:right-[-20px] sm:bottom-[-20px] md:relative md:right-0 md:bottom-0 opacity-20 sm:opacity-30 md:opacity-100 pointer-events-none">
            <img 
              src={tablet_icon} 
              alt="Tablet Icon" 
              className="w-40 sm:w-60 md:w-70 lg:w-200 object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Dashboard Navigation Controls - Smooth Transitions */}
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-slate-800 rounded-lg md:rounded-2xl shadow-md border border-gray-200 dark:border-slate-700 p-3 sm:p-4 gap-2 sm:gap-0 transition-all duration-300 hover:shadow-lg">
          
          <button 
            onClick={handlePrev}
            className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-[#8cc63f] dark:hover:bg-green-600 hover:text-white text-[#1a5b8c] dark:text-gray-300 font-bold rounded-lg md:rounded-xl transition-all duration-300 text-xs sm:text-sm hover:scale-105 active:scale-95"
          >
            <span>&larr;</span> <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Dashboard Title with Smooth Fade */}
          <div className="text-center flex-1 min-h-[50px] flex flex-col justify-center">
            <h3 className="font-raleway font-bold text-xs sm:text-lg text-[#1a5b8c] dark:text-blue-300 line-clamp-2 animate-fade-in transition-all duration-500">
              {currentDashboard?.title || 'Select a Dashboard'}
            </h3>
            <p className="text-[0.65rem] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">
              Dashboard {currentIndex + 1} of {dashboardsList.length}
            </p>
          </div>

          <button 
            onClick={handleNext}
            className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-[#8cc63f] dark:hover:bg-green-600 hover:text-white text-[#1a5b8c] dark:text-gray-300 font-bold rounded-lg md:rounded-xl transition-all duration-300 text-xs sm:text-sm hover:scale-105 active:scale-95"
          >
            <span className="hidden sm:inline">Next</span> <span>&rarr;</span>
          </button>

        </div>

        {/* Dashboard Selector Tabs */}
        <div className="w-full max-w-6xl mx-auto flex flex-wrap gap-2 sm:gap-3 justify-start md:justify-center">
          {dashboardsList.map((dashboard) => (
            <button
              key={dashboard.slug}
              onClick={() => goToDashboard(dashboard.slug)}
              className={`px-3 sm:px-4 py-2 rounded-lg md:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                dashboardType === dashboard.slug || (!dashboardType && dashboard.slug === dashboardsList[0].slug)
                  ? 'bg-[#8cc63f] dark:bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-slate-700 text-[#1a5b8c] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              {dashboard.title.split(' ')[0]}...
            </button>
          ))}
        </div>

        {/* Power BI Iframe Container - Smooth Fade In */}
        <div className="w-full max-w-6xl mx-auto bg-gray-50 dark:bg-slate-900 rounded-lg md:rounded-3xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden h-[400px] sm:h-[500px] md:h-[75vh] min-h-[300px] flex justify-center items-center relative transition-all duration-500 animate-fade-in">
          
          <div className="absolute inset-0 flex items-center justify-center -z-10">
             <span className="text-gray-400 font-medium animate-pulse flex flex-col items-center text-xs sm:text-base">
               <svg className="animate-spin h-6 sm:h-8 w-6 sm:w-8 mb-2 sm:mb-3 text-[#8cc63f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Loading Dashboard...
             </span>
          </div>

          {currentDashboard ? (
            <iframe
              key={currentDashboard.url}
              title={currentDashboard.title}
              className="w-full h-full border-none z-10 bg-transparent fade-in"
              src={currentDashboard.url}
              allowFullScreen={true}
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <p>Please select a dashboard</p>
            </div>
          )}
          
        </div>

      </div>
    </Layout>
  );
};

export default Dashboards;