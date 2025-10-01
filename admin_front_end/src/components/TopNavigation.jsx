import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Globe, Plus, Edit, Upload } from 'lucide-react';

const TopNavigation = ({ onMenuClick, onLanguageToggle, currentLanguage }) => {
  const { t } = useTranslation();

  return (
    <header className="top-nav flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <h1 className="text-xl font-bold text-black">Epaper Admin</h1>
        </div>
      </div>

      <nav className="hidden md:flex items-center space-x-3">
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus size={16} />
          <span className="hidden sm:inline">{t('nav.createEpaper')}</span>
        </button>
        
        <button className="btn flex items-center space-x-2">
          <Edit size={16} />
          <span className="hidden sm:inline">{t('nav.moderate')}</span>
        </button>
        
        <button className="btn flex items-center space-x-2">
          <Upload size={16} />
          <span className="hidden sm:inline">{t('nav.publish')}</span>
        </button>

        <button
          onClick={onLanguageToggle}
          className="btn flex items-center space-x-2"
          title={t('common.language')}
        >
          <Globe size={16} />
          <span className="hidden sm:inline">{currentLanguage === 'bn' ? 'বাংলা' : 'English'}</span>
        </button>
      </nav>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={onLanguageToggle}
          className="btn flex items-center space-x-2"
          title={t('common.language')}
        >
          <Globe size={16} />
          <span>{currentLanguage === 'bn' ? 'বাংলা' : 'EN'}</span>
        </button>
      </div>
    </header>
  );
};

export default TopNavigation;
