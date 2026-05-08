import React from 'react';
import Layout from '../components/Layout';
import { Search } from 'lucide-react';

const ELibrary = () => {
  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-3 sm:gap-4 px-2 sm:px-0">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-emb-blue dark:text-blue-400 tracking-tight font-raleway">E-LIBRARY</h1>
        <div className="w-full sm:w-96 relative">
          <input type="text" placeholder="SEARCH" className="w-full border border-gray-300 dark:border-slate-700 text-black dark:text-white font-raleway placeholder:text-gray-500 dark:placeholder:text-gray-400 py-2 px-3 sm:px-4 rounded-full font-bold focus:outline-none text-xs sm:text-sm bg-white dark:bg-slate-800 transition-colors" />
          <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      <div className="space-y-4 md:space-y-8 px-2 sm:px-0">
        {/* Section Block */}
        <div className="bg-gray-100 dark:bg-slate-800 rounded-md overflow-hidden transition-colors">
          <div className="bg-emb-green-light dark:bg-green-900 text-white font-bold px-3 sm:px-4 py-2 md:py-3 font-raleway text-xs sm:text-sm md:text-base">
            Annotated Outline (30-Year Solid Waste Management Plan)
          </div>
          <ul className="flex flex-col text-xs sm:text-sm text-emb-blue dark:text-blue-300 font-medium transition-colors">
            <li className="px-3 sm:px-4 py-2 md:py-3 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer transition">For LGUs</li>
            <li className="px-3 sm:px-4 py-2 md:py-3 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer transition">For Provinces</li>
            <li className="px-3 sm:px-4 py-2 md:py-3 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer transition">The Ecological Solid Waste Management Act of 2000 (RA 9003)</li>
            <li className="px-3 sm:px-4 py-2 md:py-3 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer transition">The Implementing Rules and Regulations (IRR) of the Ecological Solid Waste Management Act</li>
          </ul>
        </div>

        {/* Section Block */}
        <div className="bg-gray-100 dark:bg-slate-800 rounded-md overflow-hidden transition-colors">
          <div className="bg-emb-green-light dark:bg-green-900 text-white font-bold px-3 sm:px-4 py-2 md:py-3 font-raleway text-xs sm:text-sm md:text-base">
            ABD Project
          </div>
          <ul className="flex flex-col text-xs sm:text-sm text-emb-blue dark:text-blue-300 font-medium font-merriweather transition-colors" >
            <li className="px-3 sm:px-4 py-2 md:py-3 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer transition">Report 1 — Summary</li>
            <li className="px-3 sm:px-4 py-2 md:py-3 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer transition">Report 2 — Public Awareness Survey</li>
            <li className="px-3 sm:px-4 py-2 md:py-3 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer transition">Report 3 — WACS</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ELibrary;