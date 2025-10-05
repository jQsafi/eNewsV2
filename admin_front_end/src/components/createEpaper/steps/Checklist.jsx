import React from 'react';
import { useTranslation } from 'react-i18next';

const Checklist = ({ formData, onInputChange }) => {
  const { t } = useTranslation();

  const checklistItems = [
    { id: 'checklist-item-1', label: 'Checklist Item 1' },
    { id: 'checklist-item-2', label: 'Checklist Item 2' },
    { id: 'checklist-item-3', label: 'Checklist Item 3' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-black mb-4">{t('createEpaper.checklist') || 'Checklist'}</h3>
      <div className="space-y-2">
        {checklistItems.map((item) => (
          <div key={item.id} className="flex items-center">
            <input
              type="checkbox"
              id={item.id}
              name={item.id}
              checked={formData[item.id] || false}
              onChange={onInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor={item.id} className="ml-2 block text-sm text-gray-900">
              {t(item.label) || item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
