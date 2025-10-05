import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DropZone from '../DropZone';
import MainFileList from '../MainFileList';
import AdditionalFileList from '../AdditionalFileList';

const UploadStep = ({ 
  formData, 
  setFormData, 
  imageInfos, 
  additionalImageInfos, 
  getDynamicTitle,
  groupInfos,
  showPreviews = true
}) => {
  const { t } = useTranslation();

  const renderFileInfoPanel = (infos, title) => {
    const { images: imgs, pdfs, others } = groupInfos(infos);
    return (
      <div className="mt-4 space-y-4 border rounded-lg p-4 bg-gray-50">
        {title && <h4 className="text-lg font-semibold mb-4">{title}</h4>}
        {imgs.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2">{t('createEpaper.upload.images') || 'Images'}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {imgs.filter(info => info.name !== 'সংশোধনের সময়').map((info, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-3 border rounded bg-white">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    <img src={info.preview} alt={info.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-medium text-black truncate">{info.name}</div>
                    <div className="text-gray-500 text-xs mt-1">{t('createEpaper.meta.type') || 'Type'}: {info.type}</div>
                    <div className="text-gray-500 text-xs">{t('createEpaper.meta.size') || 'Size'}: {info.sizeMB} MB</div>
                    <div className="text-gray-500 text-xs">{t('createEpaper.meta.dimensions') || 'Dimensions'}: {info.width ? `${info.width}×${info.height}` : '—'}</div>
                    <div className="text-gray-500 text-xs">{t('createEpaper.meta.modified') || 'Modified'}: {new Date(info.lastModified).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pdfs.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2">{t('createEpaper.upload.pdfs') || 'PDFs'}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pdfs.map((info, idx) => (
                <div key={idx} className="p-3 border rounded bg-white text-sm">
                  <div className="font-medium text-black truncate">{info.name}</div>
                  <div className="text-gray-500 text-xs mt-1">{t('createEpaper.meta.type') || 'Type'}: {info.type}</div>
                  <div className="text-gray-500 text-xs">{t('createEpaper.meta.size') || 'Size'}: {info.sizeMB} MB</div>
                  <div className="text-gray-500 text-xs">{t('createEpaper.meta.modified') || 'Modified'}: {new Date(info.lastModified).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2">{t('createEpaper.upload.otherFiles') || 'Other Files'}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {others.map((info, idx) => (
                <div key={idx} className="p-3 border rounded bg-white text-sm">
                  <div className="font-medium text-black truncate">{info.name}</div>
                  <div className="text-gray-500 text-xs mt-1">{t('createEpaper.meta.type') || 'Type'}: {info.type || 'unknown'}</div>
                  <div className="text-gray-500 text-xs">{t('createEpaper.meta.size') || 'Size'}: {info.sizeMB} MB</div>
                  <div className="text-gray-500 text-xs">{t('createEpaper.meta.modified') || 'Modified'}: {new Date(info.lastModified).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-black mb-4">{t('createEpaper.upload.grid1Title', { title: getDynamicTitle() }) || `Grid 1: ${getDynamicTitle()}`}</h3>
        <DropZone 
          onFilesSelected={(files) => setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))} 
          inputId="file-input-main" 
        />
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

        {showPreviews && imageInfos.length > 0 && renderFileInfoPanel(imageInfos, t('createEpaper.upload.grid1Title', { title: getDynamicTitle() }))}

      </div>

      <div>
        <h3 className="text-lg font-medium text-black mb-4">{t('createEpaper.upload.grid2Title') || 'Grid 2: Additional Pages'}</h3>
        <DropZone 
          onFilesSelected={(files) => setFormData(prev => ({ ...prev, additionalImages: [...prev.additionalImages, ...files] }))} 
          inputId="file-input-additional" 
        />
        <AdditionalFileList
          files={formData.additionalImages}
          onRemove={(index) => setFormData(prev => ({
            ...prev,
            additionalImages: prev.additionalImages.filter((_, i) => i !== index)
          }))}
          onReorder={(newFiles) => setFormData(prev => ({
            ...prev,
            additionalImages: newFiles
          }))}
        />

        {showPreviews && additionalImageInfos.length > 0 && renderFileInfoPanel(additionalImageInfos, t('createEpaper.upload.grid2Title'))}

      </div>
    </div>
  );
};

UploadStep.propTypes = {
  formData: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.instanceOf(File)),
    additionalImages: PropTypes.arrayOf(PropTypes.instanceOf(File))
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  imageInfos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    sizeMB: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    lastModified: PropTypes.number.isRequired,
    preview: PropTypes.string.isRequired
  })).isRequired,
  additionalImageInfos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    sizeMB: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    lastModified: PropTypes.number.isRequired,
    preview: PropTypes.string.isRequired
  })).isRequired,
  getDynamicTitle: PropTypes.func.isRequired,
  groupInfos: PropTypes.func.isRequired
};

export default UploadStep;