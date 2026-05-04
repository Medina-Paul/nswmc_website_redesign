import React from 'react';
import Layout from '../components/Layout';
import { Search } from 'lucide-react';

const ELibrary = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-black text-emb-blue tracking-tight font-raleway">E-LIBRARY</h1>
        <div className="w-96 relative">
          <input type="text" placeholder="SEARCH" className="w-full border border-gray-300 text-black font-raleway placeholder:text-gray-500 py-2 px-4 rounded-full font-bold focus:outline-none" />
          <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="space-y-8">
        {/* Section Block */}
        <div className="bg-gray-100 rounded-md overflow-hidden">
          <div className="bg-emb-green-light text-white font-bold px-4 py-2 font-raleway">
            Annotated Outline (30-Year Solid Waste Management Plan)
          </div>
          <ul className="flex flex-col text-sm text-emb-blue font-medium">
            <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-200 cursor-pointer transition">For LGUs</li>
            <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-200 cursor-pointer transition">For Provinces</li>
            <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-200 cursor-pointer transition">The Ecological Solid Waste Management Act of 2000 (RA 9003)</li>
            <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-200 cursor-pointer transition">The Implementing Rules and Regulations (IRR) of the Ecological Solid Waste Management Act</li>
          </ul>
        </div>

        {/* Section Block */}
        <div className="bg-gray-100 rounded-md overflow-hidden">
          <div className="bg-emb-green-light text-white font-bold px-4 py-2 font-raleway">
            ABD Project
          </div>
          <ul className="flex flex-col text-sm text-emb-blue font-medium font-merriweather" >
            <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-200 cursor-pointer transition">Report 1 — Summary</li>
            <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-200 cursor-pointer transition">Report 2 — Public Awareness Survey</li>
            <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-200 cursor-pointer transition">Report 3 — WACS</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ELibrary;