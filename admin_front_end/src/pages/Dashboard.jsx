import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Eye, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('dashboard.totalEpaper'),
      value: '24',
      icon: FileText,
      color: 'text-black'
    },
    {
      title: t('dashboard.published'),
      value: '18',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: t('dashboard.pending'),
      value: '4',
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      title: t('dashboard.draft'),
      value: '2',
      icon: Eye,
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-black mb-3">
          {t('dashboard.title')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('dashboard.welcome')} to the Epaper Admin Panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-black">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color === 'text-black' ? 'bg-gray-100' : 'bg-gray-50'}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-black mb-6 flex items-center">
          <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
          <p className="text-sm font-medium text-black">{t('dashboard.newEpaperPublished', { title: '"Daily News"' })}</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
          <p className="text-sm font-medium text-black">{t('dashboard.epaperPendingModeration', { title: '"Sports Weekly"' })}</p>
              <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
          <p className="text-sm font-medium text-black">{t('dashboard.newDraftCreated', { title: '"Tech Review"' })}</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
