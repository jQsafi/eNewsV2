import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TopNavigation from '../components/TopNavigation';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { i18n } = useTranslation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'bn' ? 'en' : 'bn';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <TopNavigation 
        onMenuClick={toggleSidebar}
        onLanguageToggle={toggleLanguage}
        currentLanguage={i18n.language}
      />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-6 lg:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
