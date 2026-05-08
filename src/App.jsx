import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all your page components
import Home from './pages/Home';
import About from './pages/About';
import OrgChart from './pages/OrgChart';
import Commissioners from './pages/Commissioners';
import CitizenCharter from './pages/CitizenCharter';
import Laws from './pages/Laws';
import Dashboards from './pages/Dashboards';
import ELibrary from './pages/Elibrary';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      {/* The Routes component switches between pages based on the URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/org-chart" element={<OrgChart />} />
        <Route path="/about/commissioners" element={<Commissioners />} />
        <Route path="/about/citizens-charter" element={<CitizenCharter />} />
        <Route path="/laws" element={<Laws />} />
        <Route path="/dashboards" element={<Dashboards />} />
        <Route path="/dashboards/:dashboardType" element={<Dashboards />} />
        <Route path="/elibrary" element={<ELibrary />} />
        <Route path="/contacts" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;