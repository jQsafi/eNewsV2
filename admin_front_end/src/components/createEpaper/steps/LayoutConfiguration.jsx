import React from 'react';
import { useTranslation } from 'react-i18next';

const LayoutConfiguration = ({ formData, onInputChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="template" className="block text-sm font-medium text-black mb-2">
          {t('createEpaper.template') || 'Template'}
        </label>
        <select
          id="template"
          name="template"
          value={formData.template}
          onChange={onInputChange}
          className="input w-full"
        >
          <option value="default">{t('createEpaper.template.options.default') || 'Default'}</option>
          <option value="modern">{t('createEpaper.template.options.modern') || 'Modern'}</option>
          <option value="classic">{t('createEpaper.template.options.classic') || 'Classic'}</option>
        </select>
      </div>

      <div>
        <label htmlFor="layoutOptions" className="block text-sm font-medium text-black mb-2">
          {t('createEpaper.layoutOptions') || 'Layout Options'}
        </label>
        <textarea
          id="layoutOptions"
          name="layoutOptions"
          value={formData.layoutOptions}
          onChange={onInputChange}
          className="input w-full h-32"
          placeholder={t('createEpaper.layoutOptionsPlaceholder') || 'Describe layout preferences...'}
        />
      </div>
    </div>
  );
};

export default LayoutConfiguration;