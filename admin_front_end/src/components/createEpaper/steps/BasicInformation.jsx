import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const BasicInformation = ({ formData, onInputChange, onOpenDatePicker, displayPublicationDate }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="publicationDate" className="block text-sm font-medium text-black mb-2">
          {t('createEpaper.publicationDate') || 'Publication Date'}
        </label>
        <input
          type="text"
          id="publicationDate"
          name="publicationDate"
          value={displayPublicationDate || formData.publicationDate}
          onFocus={onOpenDatePicker}
          onClick={onOpenDatePicker}
          readOnly
          className="input w-full"
          placeholder={t('createEpaper.publicationDate') || 'Publication Date'}
          required
        />
      </div>

      <div>
        <label htmlFor="publicationType" className="block text-sm font-medium text-black mb-2">
          {t('createEpaper.publicationType') || 'Publication Type'}
        </label>
        <select
          id="publicationType"
          name="publicationType"
          value={formData.publicationType}
          onChange={onInputChange}
          className="input w-full"
          required
        >
          <option value="">{t('common.select') || 'Select type'}</option>
          <option value="daily">{t('createEpaper.publicationTypeOptions.daily') || 'Daily newspaper'}</option>
          <option value="special">{t('createEpaper.publicationTypeOptions.special') || 'Special Edition'}</option>
        </select>
      </div>

      <div>
        <label htmlFor="additionalPageName" className="block text-sm font-medium text-black mb-2">
          {t('createEpaper.additionalPageName') || 'Additional Page Name'}
        </label>
        <input
          type="text"
          id="additionalPageName"
          name="additionalPageName"
          value={formData.additionalPageName}
          onChange={onInputChange}
          className="input w-full"
          placeholder={t('createEpaper.additionalPageNamePlaceholder') || 'Enter additional page name'}
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-black mb-2">
          {t('createEpaper.tags') || 'Tags'}
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={onInputChange}
          className="input w-full"
          placeholder={t('createEpaper.tagsPlaceholder') || 'Enter tags separated by commas'}
        />
      </div>

      <div>
        <label htmlFor="metaTitle" className="block text-sm font-medium text-black mb-2">
          {t('createEpaper.metaTitle') || 'Meta Title'}
        </label>
        <input
          type="text"
          id="metaTitle"
          name="metaTitle"
          value={formData.metaTitle}
          onChange={onInputChange}
          className="input w-full"
          placeholder={t('createEpaper.metaTitlePlaceholder') || 'Enter meta title for SEO'}
        />
      </div>

      <div>
        <label htmlFor="metaDescription" className="block text-sm font-medium text-black mb-2">
          {t('createEpaper.metaDescription') || 'Meta Description'}
        </label>
        <textarea
          id="metaDescription"
          name="metaDescription"
          value={formData.metaDescription}
          onChange={onInputChange}
          className="input w-full h-20"
          placeholder={t('createEpaper.metaDescriptionPlaceholder') || 'Enter meta description for SEO'}
        />
      </div>

      <div>
        <label htmlFor="keywords" className="block text-sm font-medium text-black mb-2">
          {t('createEpaper.keywords') || 'Keywords'}
        </label>
        <input
          type="text"
          id="keywords"
          name="keywords"
          value={formData.keywords}
          onChange={onInputChange}
          className="input w-full"
          placeholder={t('createEpaper.keywordsPlaceholder') || 'Enter keywords separated by commas'}
        />
      </div>
    </div>
  );
};

BasicInformation.propTypes = {
  formData: PropTypes.shape({
    publicationDate: PropTypes.string,
    publicationType: PropTypes.string,
    additionalPageName: PropTypes.string,
    tags: PropTypes.string,
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    keywords: PropTypes.string
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onOpenDatePicker: PropTypes.func.isRequired,
  displayPublicationDate: PropTypes.string
};

export default BasicInformation;