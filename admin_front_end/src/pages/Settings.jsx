import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Globe, Bell, Shield, User } from 'lucide-react';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({
    language: i18n.language,
    notifications: true,
    emailNotifications: true,
    autoPublish: false,
    moderationRequired: true,
    theme: 'light'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    i18n.changeLanguage(settings.language);
    // Add save logic here
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">
          {t('nav.settings')}
        </h1>
        <p className="text-gray-600">
          Configure your admin panel settings
        </p>
      </div>

      {/* Language Settings */}
      <div className="card">
        <h2 className="text-xl font-semibold text-black mb-4 flex items-center space-x-2">
          <Globe size={20} />
          <span>Language Settings</span>
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-black mb-2">
              Default Language
            </label>
            <select
              id="language"
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="input w-full max-w-md"
            >
              <option value="bn">বাংলা (Bengali)</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <h2 className="text-xl font-semibold text-black mb-4 flex items-center space-x-2">
          <Bell size={20} />
          <span>Notification Settings</span>
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-black">Enable Notifications</h3>
              <p className="text-sm text-gray-600">Receive notifications for important events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-black">Email Notifications</h3>
              <p className="text-sm text-gray-600">Receive email notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Publishing Settings */}
      <div className="card">
        <h2 className="text-xl font-semibold text-black mb-4 flex items-center space-x-2">
          <Shield size={20} />
          <span>Publishing Settings</span>
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-black">Auto Publish</h3>
              <p className="text-sm text-gray-600">Automatically publish approved content</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoPublish}
                onChange={(e) => handleSettingChange('autoPublish', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-black">Require Moderation</h3>
              <p className="text-sm text-gray-600">All content must be moderated before publishing</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.moderationRequired}
                onChange={(e) => handleSettingChange('moderationRequired', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* User Settings */}
      <div className="card">
        <h2 className="text-xl font-semibold text-black mb-4 flex items-center space-x-2">
          <User size={20} />
          <span>User Settings</span>
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-black mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              defaultValue="admin"
              className="input w-full max-w-md"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue="admin@epaper.com"
              className="input w-full max-w-md"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Save size={16} />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
