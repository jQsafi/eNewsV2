import React from 'react';
import { useTranslation } from 'react-i18next';

const PublishSettings = ({ formData, onInputChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="publishDate" className="block text-sm font-medium text-black mb-2">
          {t('createEpaper.publishDate') || 'Publish Date'}
        </label>
        <input
          type="datetime-local"
          id="publishDate"
          name="publishDate"
          value={formData.publishDate}
          onChange={onInputChange}
          className="input w-full"
        />
      </div>

      <div>
        <label htmlFor="visibility" className="block text-sm font-medium text-black mb-2">
          {t('createEpaper.visibility') || 'Visibility'}
        </label>
        <select
          id="visibility"
          name="visibility"
          value={formData.visibility}
          onChange={onInputChange}
          className="input w-full"
        >
          <option value="public">{t('createEpaper.public') || 'Public'}</option>
          <option value="private">{t('createEpaper.private') || 'Private'}</option>
        </select>
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-black mb-2">
          {t('createEpaper.author') || 'Author'}
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={onInputChange}
          className="input w-full"
          placeholder={t('createEpaper.authorPlaceholder') || 'Enter author name'}
        />
      </div>
    </div>
  );
};

export default PublishSettings;