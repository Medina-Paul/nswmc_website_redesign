import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all your page components
import Home from './pages/Home';
import About from './pages/About';
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
        <Route path="/laws" element={<Laws />} />
        <Route path="/dashboards" element={<Dashboards />} />
        <Route path="/elibrary" element={<ELibrary />} />
        <Route path="/contacts" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;