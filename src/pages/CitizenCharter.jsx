import Layout from '../components/Layout'
import React from 'react'
import {PDFViewer} from '../components/PdfViewer.jsx';
import Citizen_Charter from '../pdf_files/Citizen-Charter.pdf';

const CitizenCharter = () => {
  return (
    <Layout>
      <div id='citizens-charter' className="w-full max-w-5xl mx-auto px-2 sm:px-4 mb-24 pt-8 md:pt-16">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
             {/* Header */}
                    <div className="w-full text-center md:text-left mb-8 md:mb-0">
                        <h2 className="font-raleway text-2xl sm:text-4xl md:text-7xl font-black text-[#1a5b8c] dark:text-blue-400 leading-none drop-shadow-sm transition-colors">CITIZEN'S</h2>
                        <h3 className="font-raleway text-xl sm:text-3xl md:text-5xl font-light text-[#8cc63f] dark:text-green-400 tracking-tight transition-colors">CHARTER</h3>
                    </div>
        </div>

      <PDFViewer fileLink={Citizen_Charter} title={'CITIZEN\'S CHARTER ON SWM'}/>

      </div></Layout>
  )
}

export default CitizenCharter