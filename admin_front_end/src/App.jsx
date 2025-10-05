import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import CreateEpaper from './pages/CreateEpaper';
import Moderate from './pages/Moderate';
import Publish from './pages/Publish';
import Settings from './pages/Settings';
import DropZoneTest from './components/createEpaper/__tests__/DropZoneTest';
import './i18n';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-epaper" element={<CreateEpaper />} />
          <Route path="/moderate" element={<Moderate />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/test-dropzone" element={<DropZoneTest />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
