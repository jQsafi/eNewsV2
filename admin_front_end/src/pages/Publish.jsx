import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Eye, Calendar, CheckCircle, Clock } from 'lucide-react';

const Publish = () => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState('');

  const publishedItems = [
    {
      id: 1,
      title: 'Daily News - Morning Edition',
      publishedAt: '2024-01-15 06:00',
      status: 'published',
      views: 1250,
      category: 'News'
    },
    {
      id: 2,
      title: 'Sports Weekly - Championship Special',
      publishedAt: '2024-01-14 18:00',
      status: 'published',
      views: 890,
      category: 'Sports'
    },
    {
      id: 3,
      title: 'Tech Review - AI Special',
      publishedAt: '2024-01-14 12:00',
      status: 'published',
      views: 2100,
      category: 'Technology'
    }
  ];

  const scheduledItems = [
    {
      id: 4,
      title: 'Evening News Update',
      scheduledFor: '2024-01-15 20:00',
      status: 'scheduled',
      category: 'News'
    },
    {
      id: 5,
      title: 'Weekend Sports Roundup',
      scheduledFor: '2024-01-16 10:00',
      status: 'scheduled',
      category: 'Sports'
    }
  ];

  const handlePublishNow = (id) => {
    console.log('Publishing now:', id);
    // Add publish logic here
  };

  const handleSchedule = (id) => {
    console.log('Scheduling:', id, 'for', selectedDate);
    // Add schedule logic here
  };

  const handleUnpublish = (id) => {
    console.log('Unpublishing:', id);
    // Add unpublish logic here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">
          {t('nav.publish')}
        </h1>
        <p className="text-gray-600">
          Manage published and scheduled content
        </p>
      </div>

      {/* Published Content */}
      <div className="card">
        <h2 className="text-xl font-semibold text-black mb-4 flex items-center space-x-2">
          <CheckCircle size={20} className="text-green-600" />
          <span>Published Content</span>
        </h2>
        
        <div className="space-y-4">
          {publishedItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Published:</span> {item.publishedAt}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {item.category}
                    </div>
                    <div>
                      <span className="font-medium">Views:</span> {item.views.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle size={14} className="text-green-600" />
                      <span className="text-green-600">Published</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="btn flex items-center space-x-1">
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                  
                  <button
                    onClick={() => handleUnpublish(item.id)}
                    className="btn flex items-center space-x-1 text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <span>Unpublish</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Content */}
      <div className="card">
        <h2 className="text-xl font-semibold text-black mb-4 flex items-center space-x-2">
          <Clock size={20} className="text-yellow-600" />
          <span>Scheduled Content</span>
        </h2>
        
        <div className="space-y-4">
          {scheduledItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Scheduled for:</span> {item.scheduledFor}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {item.category}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} className="text-yellow-600" />
                      <span className="text-yellow-600">Scheduled</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="btn flex items-center space-x-1">
                    <Eye size={16} />
                    <span>Preview</span>
                  </button>
                  
                  <button
                    onClick={() => handlePublishNow(item.id)}
                    className="btn btn-primary flex items-center space-x-1"
                  >
                    <Upload size={16} />
                    <span>Publish Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule New Content */}
      <div className="card">
        <h2 className="text-xl font-semibold text-black mb-4 flex items-center space-x-2">
          <Calendar size={20} />
          <span>Schedule New Content</span>
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="schedule-date" className="block text-sm font-medium text-black mb-2">
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              id="schedule-date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input w-full max-w-md"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => handleSchedule('new')}
              className="btn btn-primary flex items-center space-x-2"
              disabled={!selectedDate}
            >
              <Calendar size={16} />
              <span>Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
