import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import { Search, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

// subLabel: true → renders category name as a muted divider row, not a green header
const libraryData = [
  {
    category: 'Annotated Outline (10-Year Solid Waste Management Plan)',
    items: [
      { label: 'For LGUs', url: 'https://embco-my.sharepoint.com/:w:/g/personal/swmdco_emb_gov_ph/EXbUxUMQhM5FntSWBHe50UwBhLIgkpj1rgWQAQPlb6ol3w?e=0VvgJ0' },
      { label: 'For Provinces', url: 'https://embco-my.sharepoint.com/:w:/g/personal/swmdco_emb_gov_ph/EcoSSSyHObZOr_B0hUtIks4BPPXNbaBhSPyIZgiVBn_PWg?e=IUUyhI' },
    ],
  },
  {
    category: 'Solid Waste Management Policies & Guidelines',
    items: [
      { label: 'The Ecological Solid Waste Management Act of 2000 (RA 9003)', url: 'http://nswmc.emb.gov.ph/wp-content/uploads/2025/04/RA-9003.pdf' },
      { label: 'The Implementing Rules and Regulations (IRR) of the Ecological Solid Waste Management Act of 2000 (Republic Act No. 9003)', url: 'http://nswmc.emb.gov.ph/wp-content/uploads/2025/04/RA-9003-IRR.pdf' },
      { label: 'National Solid Waste Management Framework', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2017/11/NSWMC-FRAMEWORK-PDF.pdf' },
      { label: 'National Solid Waste Management Strategy 2012-2016', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/07/NSWM-Strategy-2012-2016.pdf' },
      { label: 'National Solid Waste Management Status Report 2008-2018', url: 'https://eeid.emb.gov.ph/wp-content/uploads/2020/07/SOLIDWASTE-LAYOUT_final.pdf' },
      { label: 'National State of the Brown Environment Report 2016-2021', url: 'https://drive.google.com/file/d/1y3ECTmObf11vjhOu1HgV6mXM3NXFldvG/view' },
      { label: 'National Framework Plan for the Informal Waste Sector in Solid Waste Management', url: 'https://drive.google.com/file/d/1zbERYSMEHA-81ohyOQzj5Da7Mf80R9MH/view' },
      { label: 'Waste Analysis and Characterization Study Manual', url: 'https://drive.google.com/drive/folders/1OdnqdaR65m1s5rRRJmthG2CQsAuSJQiM' },
      { label: 'National Strategy to Reduce Short-Lived Climate Pollutants from the Municipal Solid Waste Sector in the Philippines', url: 'https://drive.google.com/drive/folders/1UpJOmcnWPkKtTUBJO9K__KrNa2Dinjg0?usp=sharing' },
      { label: 'Life Cycle Assessment Study of Packaging Materials in the Metro Manila', url: 'https://drive.google.com/drive/folders/1rAetmlAUyI47-cilKbesA94YKWicHKwJ?usp=sharing' },
      { label: 'Guidebook for Formulation of Solid Wastes Management Plan', url: 'https://drive.google.com/drive/folders/1rAetmlAUyI47-cilKbesA94YKWicHKwJ?usp=sharing' },
      { label: 'Guidebook for Safe Closure of Disposal Sites', url: 'https://drive.google.com/file/d/1Rb417uOK1JuNNCHfS8O7CPAdP9RbXDZG/view' },
      { label: 'Technical Guidebook on Solid Wastes Disposal Design, Operation, and Management', url: 'https://drive.google.com/file/d/115T11ZDbOVTVDuepIG18bx5l32BOuQwR/view' },
      { label: 'The Garbage Book: Solid Waste Management in Metro Manila', url: 'https://www.adb.org/sites/default/files/publication/29301/garbage-book.pdf' },
    ],
  },
  {
    category: 'ADB Project',
    items: [
      { label: 'Report 1 — Summary', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/08/Report-1-Summary.pdf' },
      { label: 'Report 2 — Public Awareness Survey', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/07/Report-2-Public-Awareness-Survey.pdf' },
      { label: 'Report 3 — WACS', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/07/Report-3-WACS.pdf' },
      { label: 'Report 4 — Waste Disposal', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/08/Report-4-Waste-Disposal.pdf' },
      { label: 'Report 5a — Community Based Recycling', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/07/Report-5a-Community-Based-Recycling.pdf' },
      { label: 'Report 5b — Junk Shop Survey', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/07/Report-5b-Junk-Shop-Survey.pdf' },
      { label: 'Report 5c — Markets for Recycled SW', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/08/Report-5c-Markets-for-recycled-SW.pdf' },
      { label: 'Report 6 — Laws and Regulations', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/07/Report-6-Laws-Regulations.pdf' },
      { label: 'Report 7 — Institutional', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/08/Report-7-Institutional.pdf' },
      { label: 'Report 8 — Capacity Building', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/08/Report-8-Capacity-Building.pdf' },
      { label: 'Report 9 — Financial', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/07/Report-9-Financial.pdf' },
      { label: 'Report 10 — Community Awareness', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/08/Report-10-Community-Awareness.pdf' },
      { label: 'Report 11 — Medical Waste', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/08/Report-11-medical-waste.pdf' },
      { label: 'Report 12 — Sector Coordination', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/07/Report-12-Sector-Coordination.pdf' },
    ],
  },
  {
    category: 'JICA Recycling Study',
    items: [
      { label: 'Volume 1', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2018/03/Final-Report-Volume-I.pdf' },
      { label: 'Volume 2', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2018/03/Final-Report-Volume-II.pdf' },
      { label: 'Volume 3', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2018/03/Final-Report-Volume-III.pdf' },
      { label: 'Volume 4', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2018/03/Final-Report-Volume-IV.pdf' },
      { label: 'Summary of Final Report', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2018/03/Summary-of-Final-Report-_complete_.pdf' },
      { label: 'Table of Contents', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2018/03/Table-of-Contents-for-Printing-Final.pdf' },
    ],
  },
  {
    category: 'Marine Litter & Landfill Methane Gas Emissions',
    items: [
      { label: 'Manila Bay Task Force KRA:2 Solid Waste Management Cluster (KRA-2)', url: 'https://embco-my.sharepoint.com/:f:/g/personal/swmdco_emb_gov_ph/IgC7ADOZUmyzS5J9b7KcUuGvAWil0pqPBKvF5f5iwFi5Yos?e=TYO7zA' },
      { label: 'National Plan of Action for the Prevention, Reduction, and Management of Marine Litter (NPOA-ML)', url: 'https://embco-my.sharepoint.com/:f:/g/personal/swmdco_emb_gov_ph/IgCLHGqHoFD6QL4UluVkgFw6AR1-DwvWr589AjqBOh71uZg?e=Y9lW0n' },
      { label: 'GHG Inventory Management and Reporting System', url: 'https://drive.google.com/drive/folders/1usAARWM8AI4Po4gB3pxhlpUL-yXjEZfg?usp=sharing' },
      { label: 'Training on the Use of the Methane Gas Analyzer', url: 'https://drive.google.com/drive/folders/1O7YErhy3FoeYbKIyQjRxAdAcEn2aGCix?usp=sharing' },
      { label: 'Informal Waste Sector (IWS) Conference and Capacity Building', url: 'https://embco-my.sharepoint.com/:f:/g/personal/swmdco_emb_gov_ph/IgAPAbvlEUC4T4xhPOXHpvi1AdiIhq6v4WrBRHhvd6VxQf0?e=kE0n3t' },
    ],
  },
  {
    category: 'Webinars',
    items: [
      { label: '2025 Webinars', url: 'https://embco-my.sharepoint.com/:f:/g/personal/swmdco_emb_gov_ph/IgBG4QbZPtUNTad-kWY_spJyAYVQQOEN4A_K6Cc4chheC8U?e=xtM7pI' },
      { label: 'Webinar on Waste to Energy, Renewable Energy and Environmental Sustainability', url: 'https://drive.google.com/drive/folders/1ntfw3DfjW2TnVguEwdih2sshxN3NOyb_?usp=sharing' },
      { label: 'Webinar on Social Behavior Change for LGUs towards Circular Economy', url: 'https://embco-my.sharepoint.com/:f:/g/personal/swmdco_emb_gov_ph/Etna9GhMk_hBttSUDaWbtn0ByveFMzvLPimqCG3FVX1V9w?e=axnAec' },
      { label: 'Webinar on Environmental Health Risks of the Informal Waste Sector and Measure to Address this Concern', url: 'https://embco-my.sharepoint.com/:f:/g/personal/swmdco_emb_gov_ph/EjrHoAz1gx9GmLT2iUp1XS8B_7wnpD4DCfzWzZMS0suiQA?e=uXpxo3' },
      { label: '"Rethinking Plastics" Reducing Single-Use Plastic (SUP) in Food Consumption, Takeaway, and Delivery', url: 'https://drive.google.com/drive/folders/1zc47p5MtLENxUviebKw_3QVWF0bS6taT?usp=sharing' },
      { label: 'Marine Litter Webinar', url: 'https://drive.google.com/drive/folders/1v15ktndOGJS8InzHmk36khElsLsn8yIW?usp=sharing' },
      { label: 'Enhancement/Updating of the LGU-SWM-SCMAR', url: 'https://drive.google.com/drive/folders/1ox26BCk_VdxltGMi1JXRWcigKIN17yyt?usp=sharing' },
      { label: 'Orientation on Waste-to-Energy and Waste Analysis and Characterization Study', url: 'https://drive.google.com/drive/folders/1znos0qLPPBQeutEg58FIAyYp62XfAt_S?usp=sharing' },
      { label: 'Partners Forum on Best Practices, Alternative Process and Technologies on SWM with LGUs, Private Sector, and Other Stakeholders in the Manila Bay Region', url: 'https://drive.google.com/drive/folders/1VioYlum_i79wufhQwEyJqbtavKBw7yeo?usp=sharing' },
      { label: 'Partners Forum on Alternative Technology', url: 'https://drive.google.com/drive/folders/1dm1QYRovRBOVuhAkxRCRmKPaJ_dG4Hgo?usp=sharing' },
      { label: 'Webinar – Zero Waste Month 2022', url: 'https://drive.google.com/drive/folders/105bQEpnKIxrNrmyNWeccJuneOtEPj6M1?usp=sharing' },
      { label: 'Webinar on Best Practices 2024', url: 'https://embco-my.sharepoint.com/:f:/g/personal/swmdco_emb_gov_ph/Evg0U_o3qn1BnihjfVp8cdwBenPuu3jmH6uZ4TwUSMmJYA?e=wvmLF7' },
      { label: 'Webinar on Best Practices 2023', url: 'https://embco-my.sharepoint.com/:f:/g/personal/swmdco_emb_gov_ph/EncuX70thSROg_Vkyo4vvtoBTcM0WG_8SoJClylhKPeMzw?e=kWRX0h' },
    ],
  },
  {
    category: 'Anniversary Events & Seminars',
    items: [
      { label: '24th Anniversary "Integrating Sustainability and Circularity into the Informal Waste Sector"', url: 'https://drive.google.com/drive/folders/1t9yNL6FddI0u6OR-QkS1KWsoT5mJAbDv?usp=sharing' },
      { label: '23rd Anniversary "Sustainable Waste Management in Livable Communities"', url: 'https://drive.google.com/drive/folders/1BC6V9NQqwWBQrK-Wqd1iSHPzNMZzGPGN?usp=sharing' },
      { label: "22nd Anniversary \"Stepping Up Solid Waste Management through Efficient Extended Producers' Responsibility\"", url: 'https://drive.google.com/drive/folders/1oubaPk9tyGgXGrEFTaOP5HzxmPzKGNPq?usp=sharing' },
      { label: 'Re-echo Seminar on SWM Projects', url: 'https://embco-my.sharepoint.com/:f:/g/personal/swmdco_emb_gov_ph/EipjF6qV7_lGkGdRd3_mqXcBvpZTZLmk4N50tVsW4mWJXA?e=Kl6Myj' },
    ],
  },
  {
    category: 'Other Resources',
    items: [
      { label: 'List of Recyclers', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/06/LIST_OF_RECYCLERS__REVISED_.pdf' },
      { label: 'Price of Recyclables', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2016/08/Price-of-Recyclables.pdf' },
      { label: 'Cost Sharing Framework for Solid Waste Management', url: 'https://nswmc.emb.gov.ph/wp-content/uploads/2017/05/cost-sharing-framework-for-swm.pdf' },
    ],
  },
];

const SectionBlock = ({ category, items, subLabel, searchQuery }) => {
  const [collapsed, setCollapsed] = useState(false);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(item => item.label.toLowerCase().includes(q));
  }, [items, searchQuery]);

  if (searchQuery.trim() && filteredItems.length === 0) return null;

  return (
    <div className="bg-gray-100 dark:bg-slate-800 rounded-md overflow-hidden transition-colors">

      {/* Green category header — hidden when subLabel is true */}
      {!subLabel && (
        <button
          onClick={() => setCollapsed(c => !c)}
          className="w-full flex items-center justify-between bg-emb-green-light dark:bg-green-900 text-white font-bold px-3 sm:px-4 py-2 md:py-3 font-raleway text-xs sm:text-sm md:text-base text-left hover:brightness-110 transition"
        >
          <span>{category}</span>
          <span className="flex items-center gap-1.5 shrink-0 ml-2">
            <span className="text-[10px] font-normal opacity-75">{filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}</span>
            {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </span>
        </button>
      )}

      {(!collapsed || subLabel) && (
        <ul className="flex flex-col text-xs sm:text-sm text-emb-blue dark:text-blue-300 font-medium transition-colors">

          {/* Muted sub-label row shown instead of green header */}
          {subLabel && (
            <li className="px-3 sm:px-4 py-2 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-400 dark:text-slate-500 italic text-[10px] sm:text-xs font-normal select-none">
              {category}
            </li>
          )}

          {filteredItems.map((item, idx) => (
            <li
              key={idx}
              className="border-b border-gray-200 dark:border-slate-700 last:border-b-0 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 sm:px-4 py-2 md:py-3 w-full group"
              >
                <span className="flex-1">{item.label}</span>
                <ExternalLink
                  size={12}
                  className="ml-3 shrink-0 opacity-0 group-hover:opacity-50 transition text-emb-blue dark:text-blue-300"
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ELibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const totalResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return libraryData.reduce((acc, sec) =>
      acc + sec.items.filter(i => i.label.toLowerCase().includes(q)).length, 0
    );
  }, [searchQuery]);

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-3 sm:gap-4 px-2 sm:px-0">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-emb-blue dark:text-blue-400 tracking-tight font-raleway">E-LIBRARY</h1>
        <div className="w-full sm:w-96 relative">
          <input
            type="text"
            placeholder="SEARCH"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-700 text-black dark:text-white font-raleway placeholder:text-gray-500 dark:placeholder:text-gray-400 py-2 px-3 sm:px-4 rounded-full font-bold focus:outline-none text-xs sm:text-sm bg-white dark:bg-slate-800 transition-colors"
          />
          <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      {searchQuery.trim() && (
        <p className="px-2 sm:px-0 mb-4 text-xs text-gray-500 dark:text-gray-400 font-raleway">
          {totalResults === 0
            ? 'No documents found.'
            : `Found ${totalResults} document${totalResults !== 1 ? 's' : ''} matching "${searchQuery}"`}
        </p>
      )}

      <div className="space-y-4 md:space-y-8 px-2 sm:px-0">
        {libraryData.map((section, idx) => (
          <SectionBlock
            key={idx}
            category={section.category}
            items={section.items}
            subLabel={section.subLabel}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </Layout>
  );
};

export default ELibrary;
