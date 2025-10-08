import React from 'react';
import { useTranslation } from 'react-i18next';

const PreviewAndReview = ({ formData, imageInfos }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{t('createEpaper.summary') || 'Summary'}</h3>
      <div className="bg-gray-50 p-4 rounded">
        <p><strong>{t('createEpaper.title') || 'Title'}:</strong> {formData.title}</p>
        <p><strong>{t('createEpaper.publicationDate') || 'Publication Date'}:</strong> {formData.publicationDate}</p>
        <p><strong>{t('createEpaper.publicationType') || 'Publication Type'}:</strong> {formData.publicationType === 'daily' ? (t('createEpaper.publicationTypeOptions.daily') || 'Daily newspaper') : formData.publicationType === 'special' ? (t('createEpaper.publicationTypeOptions.special') || 'Special Edition') : ''}</p>
        <p><strong>{t('createEpaper.additionalPageName') || 'Additional Page Name'}:</strong> {formData.additionalPageName || (t('common.none') || 'None')}</p>
        <p><strong>{t('createEpaper.category') || 'Category'}:</strong> {formData.category}</p>
        <p><strong>{t('createEpaper.tags') || 'Tags'}:</strong> {formData.tags}</p>
        <p><strong>{t('createEpaper.metaTitle') || 'Meta Title'}:</strong> {formData.metaTitle}</p>
        <p><strong>{t('createEpaper.metaDescription') || 'Meta Description'}:</strong> {formData.metaDescription}</p>
        <p><strong>{t('createEpaper.keywords') || 'Keywords'}:</strong> {formData.keywords}</p>
        <p><strong>{t('createEpaper.slug') || 'Slug'}:</strong> {formData.slug}</p>
        <p><strong>{t('createEpaper.content') || 'Content'}:</strong> {formData.content.substring(0, 100)}...</p>
        <p><strong>{t('createEpaper.template') || 'Template'}:</strong> {formData.template}</p>
      </div>

      {/* Separate Preview Panels */}
      {formData.publicationType && (
        <div className="space-y-4">
          <h4 className="text-md font-semibold">{t('createEpaper.summary.pagesPreview') || 'Pages Preview'}</h4>
          {formData.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imageInfos.map((info, idx) => (
                <div key={idx} className="border rounded bg-white p-3 flex flex-col items-center">
                  <div className="w-full h-48 bg-gray-100 rounded overflow-hidden flex items-center justify-center mb-2">
                    <img src={info.preview} alt={info.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="w-full text-xs text-center">
                    <div className="font-medium text-black truncate">{info.name}</div>
                    <div className="text-gray-500">Size: {info.sizeMB} MB</div>
                    <div className="text-gray-500">Dimensions: {info.width ? `${info.width}×${info.height}` : '—'}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">{formData.publicationType === 'daily' ? (t('createEpaper.summary.noImagesDaily') || 'No images uploaded for daily pages.') : (t('createEpaper.summary.noImagesSpecial') || 'No images uploaded for special edition pages.')}</p>
          )}
        </div>
      )}


    </div>
  );
};

export default PreviewAndReview;
