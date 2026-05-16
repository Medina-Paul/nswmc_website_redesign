// src/pages/Laws.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Eye, EyeOff } from "lucide-react";
import Layout from "../components/Layout";
import laws_icon from "../assets/laws_icon.png";

// ---- Adobe Embed config ---------------------------------------------------
const ADOBE_CLIENT_ID = "5b4f7d150d9445a9a472ed3adfa9714e";
const ADOBE_SCRIPT_SRC = "https://acrobatservices.adobe.com/view-sdk/viewer.js";

// Eagerly grab every local PDF URL so we can match by basename.
const PDF_URL_MAP = import.meta.glob("../pdf_files/*.pdf", {
  eager: true,
  query: "?url",
  import: "default",
});

const getLocalPdfUrl = (link) => {
  if (!link) return null;
  const base = link.split("/").pop();
  const entry = Object.entries(PDF_URL_MAP).find(([k]) => k.endsWith("/" + base));
  return entry ? entry[1] : null;
};

// Single shared loader for the Adobe SDK.
let adobeReadyPromise = null;
const loadAdobeSdk = () => {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.AdobeDC) return Promise.resolve(window.AdobeDC);
  if (adobeReadyPromise) return adobeReadyPromise;

  adobeReadyPromise = new Promise((resolve) => {
    const done = () => resolve(window.AdobeDC);
    if (document.querySelector(`script[src="${ADOBE_SCRIPT_SRC}"]`)) {
      if (window.AdobeDC) return done();
      document.addEventListener("adobe_dc_view_sdk.ready", done, { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = ADOBE_SCRIPT_SRC;
    s.async = true;
    document.body.appendChild(s);
    document.addEventListener("adobe_dc_view_sdk.ready", done, { once: true });
  });
  return adobeReadyPromise;
};

// ---- Inline Adobe viewer (one per opened tile) ----------------------------
function InlineAdobeViewer({ url, fileName, divId }) {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    let cancelled = false;
    loadAdobeSdk().then((AdobeDC) => {
      if (cancelled || !AdobeDC) return;
      const view = new AdobeDC.View({
        clientId: ADOBE_CLIENT_ID,
        divId,
      });
      view.previewFile(
        {
          content: { location: { url } },
          metaData: { fileName: fileName || "document.pdf" },
        },
        {
          embedMode: "SIZED_CONTAINER",
          defaultViewMode: "FIT_WIDTH",
          showAnnotationTools: false,
          showLeftHandPanel: false,
          showDownloadPDF: true,
          showPrintPDF: true,
          showZoomControl: true,
        }
      );
    });

    return () => {
      cancelled = true;
    };
  }, [url, fileName, divId]);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-green-200 dark:ring-green-900 bg-white">
      {/* Green header strip — matches Laws page palette */}
      <div className="bg-gradient-to-r from-[#6b9e15] via-[#8ac926] to-[#5b8712] px-4 py-2 flex items-center justify-between">
        <span className="text-white font-raleway font-semibold text-xs md:text-sm tracking-wide truncate">
          {fileName}
        </span>
        <span className="hidden sm:inline text-[10px] md:text-xs text-white/90 font-semibold bg-white/15 px-2 py-0.5 rounded-full">
          POWERED BY ADOBE
        </span>
      </div>
      {/* Tight height — minimizes the gray gutter Adobe renders around the page */}
      <div
        id={divId}
        className="w-full h-[70vh] min-h-[420px] max-h-[760px] bg-neutral-100"
      />
    </div>
  );
}

// ---- External-source SVG (the link icon the user uploaded) ----------------
const LinkIcon = ({ className = "" }) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-hidden="true">
    <path d="M212.853,122.34277l-30.28418,30.28516a56.06576,56.06576,0,0,1-79.19629,0,12.0001,12.0001,0,0,1,16.9707-16.9707,32.03673,32.03673,0,0,0,45.25488,0l30.28418-30.28516a31.99969,31.99969,0,1,0-45.25488-45.25391L140.978,69.76562a11.99941,11.99941,0,1,1-16.96875-16.9707l9.64746-9.64746A55.99989,55.99989,0,1,1,212.853,122.34277Zm-97.834,63.89356-9.64648,9.64551a31.99969,31.99969,0,0,1-45.25488-45.25391l30.28418-30.28516a32.03673,32.03673,0,0,1,45.25488,0,12.0001,12.0001,0,0,0,16.9707-16.9707,56.06459,56.06459,0,0,0-79.19629,0L43.147,133.65723a55.99956,55.99956,0,0,0,79.19532,79.19531l9.64648-9.64551a11.99975,11.99975,0,1,0-16.96973-16.9707Z" />
  </svg>
);

// ---- Data ----------------------------------------------------------------
const lawsData = [
  {
    type: "Presidential Decree",
    items: [
      {
        date: "November 7, 1975",
        code: "PD 825",
        description:
          "Providing penalty for improper disposal of garbage and other forms of uncleanliness and for other purposes",
        link: "https://emb.gov.ph/wp-content/uploads/2015/12/PD-825.pdf",
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
          "An act providing for an Ecological Solid Waste Management Program, creating the necessary institutional mechanisms and incentives, declaring certain Acts as Prohibited and Providing Penalties, Appropriating Funds Therefor, and for other purposes",
        link: "https://emb.gov.ph/wp-content/uploads/2015/12/RA-9003.pdf",
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
        link: "https://emb.gov.ph/wp-content/uploads/2015/12/AO-1993-90.pdf",
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
          "Providing Fees for the Registration of Extended Producer Responsibility Programs in Relation to Republic Act No. 11898, Otherwise known as the Extended Producer Responsibility Act of 2022 and its Implementing Rules and Regulations",
        link: "https://emb.gov.ph/wp-content/uploads/2026/02/DAO-2025-26-Extended-Producer-Responsibility-Act-of-2022.pdf",
      },
      {
        date: "November 26, 2019",
        code: "DAO 2019-21",
        description:
          "Guidelines Governing Waste-To-Energy (WtE) Facilities for the Integrated Management of Municipal Solid Wastes",
        link: "https://emb.gov.ph/wp-content/uploads/2020/01/Guidelines-Governing-Waste-To-Energy-WtE-Facilities-for-the-Integrated-Management-of-Municipal-Solid-Wastes.pdf",
      },
      {
        date: "September 14, 2006",
        code: "DAO 2006-10",
        description:
          "Guidelines on the Categorized Final Disposal Facilities (Sanitary Landfills)",
        link: "https://emb.gov.ph/wp-content/uploads/2023/06/DAO-2006-10.pdf",
      },
      {
        date: "September 14, 2006",
        code: "DAO 2006-09",
        description:
          "General Guidelines in the Closure and Rehabilitation of Open Dumpsite and Controlled Dump Facilities",
        link: "https://emb.gov.ph/wp-content/uploads/2023/06/DAO-2006-09.pdf",
      },
      {
        date: "December 20, 2001",
        code: "DAO 2001-34",
        description: "Implementing Rules and Regulations of Republic Act 9003",
        link: "https://emb.gov.ph/wp-content/uploads/2015/12/DAO-2001-34.pdf",
      },
      {
        date: "1998",
        code: "DAO 1998-50",
        description:
          "Adopting the Landfill Site Identification and Screening Criteria for Municipal Solid Waste Disposal Facilities",
        link: "https://emb.gov.ph/wp-content/uploads/2015/12/DAO-1998-50.pdf",
      },
      {
        date: "1998",
        code: "DAO 1998-49",
        description: "Technical Guidelines For Municipal Solid Waste Disposal",
        link: "https://emb.gov.ph/wp-content/uploads/2015/12/DAO-1998-491.pdf",
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
          "Adoption of the National Plan of Action for the Prevention, Reduction, and Management of Marine Litter (NPOA-ML)",
        link: "https://emb.gov.ph/wp-content/uploads/2022/11/DMC-2021-10_NPOA-FOR-MARINE-LITTER.pdf",
      },
    ],
  },
  {
    type: "EMB Memorandum Circular",
    items: [
      {
        date: "September 16, 2019",
        code: "EMB MC 2019-008",
        description:
          'Adopting the National Solid Waste Management Commission (NSWMC) Resolution No. 669 Series of 2016 "Guidelines Governing the Establishment and Operation of Waste-to-Energy Technologies for Municipal Solid Waste"',
        link: "https://emb.gov.ph/wp-content/uploads/2019/11/EMB-MC-NO.-2019-008.pdf",
      },
      {
        date: "March 21, 1994",
        code: "EMB MC 1988-39A",
        description:
          "Amending Memorandum Circular No. 39-A, Dated January 19, 1988. By Reconstituting The Presidential Task Force On Waste Management",
        link: "https://emb.gov.ph/wp-content/uploads/2015/12/MC-1988-39A.pdf",
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
          "Resolution Directing the Department of Environment and Natural Resources (DENR) to Prepare and Implement the Banning of the Use of Unnecessary Single-use Plastics by National Government Agencies (NGAs), Local Government Units (LGUs) Offices and All Other Government Controlled Offices",
        link: "https://emb.gov.ph/wp-content/uploads/2020/02/2020-NSWMC-RESO-NO.-1363-SERIES-OF-2020-SINGLE-USE-PLASTICS.pdf",
      },
    ],
  },
];

// ---- Search helpers -------------------------------------------------------
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const codeNumber = (code) => {
  const m = code.match(/[0-9][0-9\-\u2013]*/g);
  return m ? m.join(" ") : "";
};

// ---- Page ----------------------------------------------------------------
export default function Laws() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");
  const [lawNumber, setLawNumber] = useState("");
  const [applied, setApplied] = useState({ keyword: "", category: "All", lawNumber: "" });
  const [openPreview, setOpenPreview] = useState(null); // unique key of opened tile

  const categories = useMemo(() => ["All", ...lawsData.map((s) => s.type)], []);

  const filtered = useMemo(() => {
    const kw = applied.keyword.trim().toLowerCase();
    const ln = normalize(applied.lawNumber);
    const cat = applied.category;

    return lawsData
      .filter((section) => cat === "All" || section.type === cat)
      .map((section) => {
        const items = section.items.filter((item) => {
          const haystack =
            `${item.code} ${item.description} ${section.type} ${item.date}`.toLowerCase();
          const matchesKeyword = !kw || haystack.includes(kw);
          const codeNorm = normalize(item.code);
          const numNorm = normalize(codeNumber(item.code));
          const matchesNumber = !ln || codeNorm.includes(ln) || numNorm.includes(ln);
          return matchesKeyword && matchesNumber;
        });
        return { ...section, items };
      })
      .filter((section) => section.items.length > 0);
  }, [applied]);

  const totalResults = useMemo(
    () => filtered.reduce((acc, s) => acc + s.items.length, 0),
    [filtered]
  );

  const hasActiveFilter =
    applied.keyword.trim() !== "" ||
    applied.lawNumber.trim() !== "" ||
    applied.category !== "All";

  const liveApply = (next) => setApplied({ keyword, category, lawNumber, ...next });
  const runSearch = () => setApplied({ keyword, category, lawNumber });
  const clearSearch = () => {
    setKeyword("");
    setCategory("All");
    setLawNumber("");
    setApplied({ keyword: "", category: "All", lawNumber: "" });
  };

  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 min-h-screen">
        {/* Banner */}
        <div className="w-full mb-8 md:mb-12 max-w-6xl mx-auto rounded-xl md:rounded-[30px] shadow-lg bg-gradient-to-r from-[#6b9e15] via-[#8ac926] to-[#5b8712] relative overflow-hidden flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-14 py-6 sm:py-10 md:py-12">
          <div className="flex flex-col z-10 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-raleway font-black text-white tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)] mb-2 md:mb-3">
              LAWS & POLICIES
            </h1>
            <p className="text-white font-merriweather italic text-xs sm:text-sm md:text-base lg:text-lg leading-snug font-medium drop-shadow-sm opacity-95">
              Environmental Management Bureau <br />
              SWMD's passed laws and policies
            </p>
          </div>
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
            <h2 className="font-semibold mb-2 md:mb-3 text-sm md:text-base transition-colors dark:text-white">
              Search
            </h2>
            <div className="flex items-center border rounded-lg px-2 mb-3 md:mb-4 dark:border-slate-700 dark:bg-slate-900">
              <input
                type="text"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  liveApply({ keyword: e.target.value });
                }}
                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                placeholder="Type a keyword (e.g. plastic, landfill)"
                className="w-full p-2 outline-none text-xs md:text-sm bg-transparent dark:text-white transition-colors"
              />
              <Search size={16} className="dark:text-gray-400" />
            </div>

            <label className="block text-xs md:text-sm font-medium mb-1 dark:text-gray-300">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                liveApply({ category: e.target.value });
              }}
              className="w-full border rounded-lg p-2 mb-3 md:mb-4 text-xs md:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="block text-xs md:text-sm font-medium mb-1 dark:text-gray-300">
              Law Number
            </label>
            <input
              value={lawNumber}
              onChange={(e) => {
                setLawNumber(e.target.value);
                liveApply({ lawNumber: e.target.value });
              }}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
              placeholder="e.g. RA 9003 or 9003"
              className="w-full border rounded-lg p-2 mb-3 md:mb-4 text-xs md:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />

            <button
              onClick={runSearch}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-xs md:text-sm font-medium transition"
            >
              SEARCH
            </button>

            {hasActiveFilter && (
              <button
                onClick={clearSearch}
                className="w-full mt-2 border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 py-2 rounded-lg text-xs md:text-sm font-medium transition"
              >
                Clear filters
              </button>
            )}

            {hasActiveFilter && (
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 font-raleway">
                {totalResults === 0
                  ? "No matching laws found."
                  : `Found ${totalResults} matching ${
                      totalResults === 1 ? "issuance" : "issuances"
                    }.`}
              </p>
            )}
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            {filtered.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                No laws match your search. Try a different keyword or clear the filters.
              </div>
            ) : (
              filtered.map((section, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold text-sm md:text-lg mb-2 md:mb-3 font-raleway dark:text-white transition-colors">
                    {section.type}
                  </h3>

                  <div className="space-y-2 md:space-y-3">
                    {section.items.map((item, i) => {
                      const tileKey = `${section.type}-${item.code}-${i}`;
                      const isOpen = openPreview === tileKey;
                      const localUrl = getLocalPdfUrl(item.link);
                      const fileName = (item.link || "").split("/").pop();

                      return (
                        <div
                          key={i}
                          className="bg-white dark:bg-slate-800 p-3 md:p-4 shadow-sm rounded-lg transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 min-w-0">
                              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-raleway">
                                {item.date} |
                              </p>
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 font-raleway font-semibold text-xs md:text-sm hover:underline truncate"
                              >
                                &nbsp;{item.code}
                              </a>
                            </div>

                            {/* Action buttons — Preview (Adobe) + External source */}
                            <div className="flex items-center gap-2 shrink-0">
                              {localUrl && (
                                <button
                                  type="button"
                                  onClick={() => setOpenPreview(isOpen ? null : tileKey)}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold font-raleway transition shadow-sm ${
                                    isOpen
                                      ? "bg-green-700 text-white hover:bg-green-800"
                                      : "bg-gradient-to-r from-[#6b9e15] to-[#8ac926] text-white hover:from-[#5b8712] hover:to-[#6b9e15]"
                                  }`}
                                  aria-expanded={isOpen}
                                  aria-controls={`pdf-${tileKey}`}
                                  title={isOpen ? "Hide preview" : "Preview here (Adobe)"}
                                >
                                  {isOpen ? <EyeOff size={14} /> : <Eye size={14} />}
                                  <span className="hidden sm:inline">
                                    {isOpen ? "Hide preview" : "Preview"}
                                  </span>
                                </button>
                              )}
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold font-raleway border border-green-600 text-green-700 dark:text-green-300 dark:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 transition"
                                title="Open original source (emb.gov.ph)"
                              >
                                <LinkIcon className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Source</span>
                              </a>
                            </div>
                          </div>

                          <p className="text-xs md:text-sm mt-1 md:mt-2 text-gray-700 dark:text-gray-300 font-merriweather transition-colors">
                            {item.description}
                          </p>

                          {/* Inline Adobe PDF preview, appears directly beneath the tile */}
                          {isOpen && localUrl && (
                            <div id={`pdf-${tileKey}`} className="mt-3 md:mt-4">
                              <InlineAdobeViewer
                                url={localUrl}
                                fileName={fileName}
                                divId={`adobe-dc-${tileKey.replace(/[^a-zA-Z0-9_-]/g, "_")}`}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
          <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg md:rounded-xl shadow-sm transition-colors">
            <h4 className="font-bold text-orange-500 mb-2 font-raleway text-sm md:text-base">
              MISSION
            </h4>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-merriweather transition-colors">
              To protect, restore and enhance environmental quality towards good public health,
              environmental integrity and economic viability.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg md:rounded-xl shadow-sm transition-colors">
            <h4 className="font-bold text-green-600 dark:text-green-400 mb-2 font-raleway text-sm md:text-base">
              VISION
            </h4>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-merriweather transition-colors">
              A nation empowered to protect our natural resources, attuned to the pursuit of
              sustainable development.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
