import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Shield, 
  Upload, 
  Settings,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { path: '/create-epaper', icon: FileText, label: t('nav.createEpaper') },
    { path: '/moderate', icon: Shield, label: t('nav.moderate') },
    { path: '/publish', icon: Upload, label: t('nav.publish') },
    { path: '/settings', icon: Settings, label: t('nav.settings') },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        sidebar fixed lg:static top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-black">
          <h2 className="text-lg font-semibold text-black">Navigation</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-black text-white shadow-md' 
                        : 'text-black hover:bg-gray-100 hover:shadow-sm'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
