import React from 'react';
import { useTranslation } from 'react-i18next';
import DropZone from '../DropZone';
import MainFileList from '../MainFileList';

const UploadStep = ({
  formData,
  setFormData,
  handleFilesSelected,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-black mb-4">{t('createEpaper.upload.title') || 'Upload Pages'}</h3>
        <DropZone onFilesSelected={handleFilesSelected} inputId="file-input-main" />
        <MainFileList
          files={formData.images}
          onRemove={(index) => setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
          }))}
          onReorder={(newFiles) => setFormData(prev => ({
            ...prev,
            images: newFiles
          }))}
        />
      </div>
    </div>
  );
};

export default UploadStep;