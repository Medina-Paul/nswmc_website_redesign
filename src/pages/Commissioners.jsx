import Layout from '../components/Layout'
import React, { useState } from 'react'
import dwight_ramos from '../assets/dwight_ramos.png';
import peter_quintana from '../assets/peter_quintana.png';
import joseph_jocson from '../assets/joseph_jocson.png';
import marlon_era from '../assets/marlon_era.png';
import marlon_pareja from '../assets/marlon_pareja.png';
import { Info, X } from 'lucide-react';

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

const Commissioners = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showBio, setShowBio] = useState(false);

    const featuredComm = commissionersData[activeIndex];

    // Smooth transition handling for the slider
    const triggerAnimation = (newIndex) => {
        if (newIndex === activeIndex) return;
        setShowBio(false); // Always hide bio when changing profiles
        setActiveIndex(newIndex);
    };

    const handleNext = () => {
        const nextIndex = (activeIndex + 1) % commissionersData.length;
        triggerAnimation(nextIndex);
    };

    const handlePrev = () => {
        const prevIndex = (activeIndex - 1 + commissionersData.length) % commissionersData.length;
        triggerAnimation(prevIndex);
    };

    const toggleBio = (e) => {
        e.stopPropagation(); // Prevent clicking the info button from triggering the card click
        setShowBio(!showBio);
    };

    return (
        <Layout>
            <div id='commissioners' className="w-full relative min-h-screen pb-24 overflow-hidden flex flex-col items-center px-2 sm:px-4">

                <div className="relative z-10 w-full max-w-6xl mx-auto pt-8 md:pt-16 flex flex-col items-center">

                    {/* Header */}
                    <div className="w-full text-center md:text-left mb-8 md:mb-12">
                        <h2 className="font-raleway text-2xl sm:text-4xl md:text-7xl font-black text-[#1a5b8c] dark:text-blue-400 leading-none drop-shadow-sm transition-colors">NSWMC</h2>
                        <h3 className="font-raleway text-xl sm:text-3xl md:text-5xl font-light text-[#8cc63f] dark:text-green-400 tracking-tight transition-colors">COMMISSIONERS</h3>
                    </div>

                    {/* 1. TOP CARDS DIRECTORY */}
                    <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12 md:mb-20">
                        {commissionersData.map((person, idx) => (
                            <div
                                key={idx}
                                onClick={() => triggerAnimation(idx)}
                                className={`w-40 sm:w-52 md:w-64 bg-white dark:bg-slate-800 rounded-xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border flex flex-col cursor-pointer transition-all duration-300 group
                                    ${activeIndex === idx ? 'border-[#8cc63f] dark:border-green-400 ring-2 ring-[#8cc63f]/30 scale-[1.02]' : 'border-gray-100 dark:border-slate-700 hover:-translate-y-2'}`}
                            >
                                {/* Gradient Image Background */}
                                <div className="h-32 sm:h-40 md:h-44 bg-gradient-to-b from-[#cff1c2] to-[#3a93a1] dark:from-green-900 dark:to-blue-900 flex items-end justify-center pt-4 md:pt-6 px-3 md:px-4 relative overflow-hidden transition-colors">
                                    <img src={person.img} alt={person.name} className="w-28 sm:w-32 md:w-100 h-28 sm:h-36 md:h-43 object-cover object-top rounded-t-full drop-shadow-xl relative z-10 group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                {/* Card Content */}
                                <div className="p-3 md:p-6 flex flex-col flex-grow">
                                    <h4 className="font-raleway font-bold text-xs sm:text-sm md:text-xl text-[#1a5b8c] dark:text-blue-300 leading-tight mb-1 transition-colors">{person.name}</h4>
                                    <p className="font-merriweather italic text-[0.65rem] sm:text-[0.7rem] md:text-xs text-[#8cc63f] dark:text-green-400 mb-3 md:mb-6 transition-colors">{person.role}</p>
                                    <div className="mt-auto text-[0.6rem] sm:text-[0.65rem] md:text-xs font-bold text-gray-800 dark:text-gray-300 flex items-center justify-between w-full group-hover:text-[#1a5b8c] dark:group-hover:text-blue-400 transition-colors">
                                        View Profile <span className="text-gray-400 group-hover:translate-x-1 transition-transform text-lg leading-none">&gt;</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 2. THE HORIZONTAL LOOPING FEATURED SPOTLIGHT */}
                    <div className="relative w-full flex flex-col items-center pt-8 md:pt-12 border-t border-gray-200 dark:border-slate-800">

                        <h3 className="text-xs md:text-lg font-bold text-gray-500 dark:text-gray-400 italic font-merriweather mb-8 md:mb-12 z-10">FEATURED SPOTLIGHT</h3>

                        {/* Background Blurred Blob for the Slider */}
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-0 opacity-20 dark:opacity-10 blur-[80px] transition-all duration-1000 bg-cover bg-center pointer-events-none"
                            style={{ backgroundImage: `url(${featuredComm.img})` }}
                        ></div>

                        {/* 3D Carousel Container (Using exact requested layout logic) */}
                        <div className="relative w-full h-[280px] sm:h-[380px] md:h-[520px] lg:h-[600px] flex justify-center items-center overflow-visible z-10">

                            {commissionersData.map((item, idx) => {
                                const diff = (idx - activeIndex + commissionersData.length) % commissionersData.length;

                                // Reset position classes back to the Guide Section logic
                                let positionClasses = "opacity-0 scale-75 z-0 pointer-events-none";

                                if (diff === 0) {
                                    positionClasses = "translate-x-0 scale-100 z-30 opacity-100 shadow-2xl cursor-default";
                                } else if (diff === 1) {
                                    positionClasses = "translate-x-[90%] sm:translate-x-[105%] md:translate-x-[110%] scale-[0.85] z-20 opacity-50 hover:opacity-90 cursor-pointer";
                                } else if (diff === commissionersData.length - 1) {
                                    positionClasses = "-translate-x-[90%] sm:-translate-x-[105%] md:-translate-x-[110%] scale-[0.85] z-20 opacity-50 hover:opacity-90 cursor-pointer";
                                }

                                const isActive = diff === 0;

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => !isActive && triggerAnimation(idx)}
                                        className={`absolute transition-all duration-700 ease-in-out w-[220px] sm:w-[300px] md:w-[420px] h-[260px] sm:h-[380px] md:h-[550px] rounded-xl md:rounded-[2rem] overflow-hidden group border-2 md:border-4 border-white dark:border-slate-800 bg-gray-100 dark:bg-slate-800 ${positionClasses}`}
                                    >
                                        {/* Image */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="w-full h-full object-cover object-top"
                                            />
                                            {/* Bottom Gradient Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
                                        </div>

                                        {/* Expandable Bio Section (Glassmorphism + Styled Scrollbar) */}
                                        <div
                                            className={`absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 md:p-8 overflow-y-auto transition-transform duration-500 ease-in-out z-20 
                                            [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#1a5b8c]/30 dark:[&::-webkit-scrollbar-thumb]:bg-blue-400/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#1a5b8c]/60 dark:hover:[&::-webkit-scrollbar-thumb]:bg-blue-400/60
                                            ${(isActive && showBio) ? 'translate-y-0' : 'translate-y-full'}`}
                                        >
                                            <button onClick={toggleBio} className="absolute top-2 md:top-4 right-2 md:right-4 bg-gray-200 dark:bg-slate-700 p-1 md:p-2 rounded-full text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600 transition">
                                                <X size={16} className="md:w-5 md:h-5" />
                                            </button>
                                            <h3 className="text-sm md:text-2xl font-bold text-gray-900 dark:text-white mt-2 md:mt-4 font-raleway leading-tight">{item.name}</h3>
                                            <p className="text-[#8cc63f] dark:text-green-400 font-semibold mb-3 md:mb-6 font-merriweather text-xs md:text-base">{item.role}</p>
                                            <div className="space-y-2 md:space-y-4 text-xs md:text-sm text-gray-800 dark:text-gray-200 leading-relaxed text-justify pb-2 md:pb-4">
                                                {item.bio.map((paragraph, index) => (
                                                    <p key={index}>{paragraph}</p>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Profile Info Overlay (Bottom) */}
                                        <div className={`absolute bottom-0 inset-x-0 p-3 md:p-8 flex flex-col justify-end transition-opacity duration-300 z-10 ${showBio && isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                            <div className="flex items-end justify-between">
                                                <div className="flex-1">
                                                    <h2 className="text-white text-xs sm:text-lg md:text-3xl font-bold font-raleway drop-shadow-md leading-tight mb-1 md:mb-2">
                                                        {item.name}
                                                    </h2>
                                                    <div className="text-green-400 text-[0.6rem] sm:text-xs md:text-base font-medium drop-shadow-md font-merriweather italic">
                                                        {item.role}
                                                    </div>
                                                </div>

                                                {/* Info Button - Only active on the center card */}
                                                {isActive && (
                                                    <button
                                                        onClick={toggleBio}
                                                        className="bg-white/20 backdrop-blur-md p-1.5 md:p-4 rounded-full text-white border border-white/30 hover:bg-white/40 transition-all shadow-xl shrink-0 ml-2 md:ml-4 group-hover:scale-110 group-hover:-translate-y-1"
                                                    >
                                                        <Info size={16} className="md:w-6 md:h-6" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Guide Controls Style Navigation */}
                        <div className="flex justify-center items-center gap-3 md:gap-6 text-[#1a5b8c] dark:text-blue-400 mt-8 md:mt-12 relative z-10">
                            <button onClick={handlePrev} className="text-xl md:text-3xl hover:-translate-x-2 transition-transform font-black px-2 md:px-4 drop-shadow-md">&lt;</button>
                            <div className="flex gap-2 md:gap-4 items-center">
                                {commissionersData.map((_, idx) => (
                                    <span
                                        key={idx}
                                        onClick={() => triggerAnimation(idx)}
                                        className={`rounded-full cursor-pointer transition-all duration-500 ${activeIndex === idx ? 'bg-[#1a5b8c] dark:bg-blue-400 shadow-md w-6 md:w-8 h-2 md:h-3' : 'border-2 border-[#1a5b8c] dark:border-blue-400 bg-transparent hover:bg-[#1a5b8c]/50 dark:hover:bg-blue-400/50 w-2 md:w-3 h-2 md:h-3'}`}
                                    ></span>
                                ))}
                            </div>
                            <button onClick={handleNext} className="text-xl md:text-3xl hover:translate-x-2 transition-transform font-black px-2 md:px-4 drop-shadow-md">&gt;</button>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Commissioners