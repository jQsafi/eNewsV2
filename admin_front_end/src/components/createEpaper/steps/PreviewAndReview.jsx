import React from 'react';
import { useTranslation } from 'react-i18next';

const PreviewAndReview = ({ formData }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{t('createEpaper.summary') || 'Summary'}</h3>
      <div className="bg-gray-50 p-4 rounded">
        <p><strong>{t('createEpaper.title') || 'Title'}:</strong> {formData.title}</p>
        <p><strong>{t('createEpaper.publicationDate') || 'Publication Date'}:</strong> {formData.publicationDate}</p>
        <p><strong>{t('createEpaper.publicationType') || 'Publication Type'}:</strong> {formData.publicationType === 'daily' ? (t('createEpaper.publicationTypeOptions.daily') || 'Daily newspaper') : formData.publicationType === 'special' ? (t('createEpaper.publicationTypeOptions.special') || 'Special Edition') : ''}</p>
        <p><strong>{t('createEpaper.additionalPageName') || 'Additional Page Name'}:</strong> {formData.additionalPageName || (t('common.none') || 'None')}</p>
        <p><strong>{t('createEpaper.tags') || 'Tags'}:</strong> {formData.tags}</p>
        <p><strong>{t('createEpaper.metaTitle') || 'Meta Title'}:</strong> {formData.metaTitle}</p>
        <p><strong>{t('createEpaper.metaDescription') || 'Meta Description'}:</strong> {formData.metaDescription}</p>
        <p><strong>{t('createEpaper.keywords') || 'Keywords'}:</strong> {formData.keywords}</p>
        <p><strong>{t('createEpaper.template') || 'Template'}:</strong> {formData.template}</p>
      </div>

      {formData.publicationType && (
        <div className="space-y-4">
          <h4 className="text-md font-semibold">{t('createEpaper.summary.mainPagesPreview') || 'Main Pages Preview'}</h4>
          {formData.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.images.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={typeof file === 'object' && file.preview ? file.preview : URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-2 rounded-b-lg">
                    <p className="truncate">{file.name}</p>
                    <p className="text-gray-300">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">{formData.publicationType === 'daily' ? (t('createEpaper.summary.noImagesDaily') || 'No images uploaded for daily pages.') : (t('createEpaper.summary.noImagesSpecial') || 'No images uploaded for special edition pages.')}</p>
          )}
        </div>
      )}

      <div className="space-y-4">
        <h4 className="text-md font-semibold">{t('createEpaper.summary.additionalPagesPreview') || 'Additional Pages Preview'}</h4>
        {formData.additionalImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.additionalImages.map((file, index) => (
              <div key={index} className="relative group">
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Attachment Preview ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-2 rounded-b-lg">
                  <p className="truncate">{file.name}</p>
                  <p className="text-gray-300">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{t('createEpaper.summary.noAdditionalAttachments') || 'No additional attachments uploaded.'}</p>
        )}
      </div>
    </div>
  );
};

export default PreviewAndReview;