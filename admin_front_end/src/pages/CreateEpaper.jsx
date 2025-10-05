import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Upload, ChevronLeft, ChevronRight } from 'lucide-react';

import DropZone from '../components/createEpaper/DropZone';
import MainFileList from '../components/createEpaper/MainFileList';
import AdditionalFileList from '../components/createEpaper/AdditionalFileList';

const CreateEpaper = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    publicationDate: '',
    publicationType: 'daily',
    additionalPageName: '',
    category: '',
    tags: '',
    content: '',
    images: [],
    additionalImages: [],
    template: 'default',
    layoutOptions: '',
    publishDate: '',
    visibility: 'public',
    author: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    slug: ''
  });

  // Derived metadata for uploaded images (main + additional)
  const [imageInfos, setImageInfos] = useState([]);
  const [additionalImageInfos, setAdditionalImageInfos] = useState([]);

  // Build metadata (preview URL, dimensions, type, size, lastModified) for main images
  useEffect(() => {
    let created = [];
    let cancelled = false;

    const buildInfos = async () => {
      const infos = await Promise.all(formData.images.map((file) => {
        return new Promise((resolve) => {
          const preview = URL.createObjectURL(file);
          created.push(preview);

          const img = new Image();
          img.onload = () => {
            resolve({
              name: file.name,
              size: file.size,
              sizeMB: (file.size / 1024 / 1024).toFixed(2),
              type: file.type || 'unknown',
              width: img.naturalWidth,
              height: img.naturalHeight,
              lastModified: file.lastModified,
              preview
            });
          };
          img.onerror = () => {
            // fallback if image can't be loaded
            resolve({
              name: file.name,
              size: file.size,
              sizeMB: (file.size / 1024 / 1024).toFixed(2),
              type: file.type || 'unknown',
              width: null,
              height: null,
              lastModified: file.lastModified,
              preview
            });
          };
          img.src = preview;
        });
      }));

      if (!cancelled) setImageInfos(infos);
    };

    buildInfos();

    return () => {
      cancelled = true;
      created.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [formData.images]);

  // Build metadata for additional images
  useEffect(() => {
    let created = [];
    let cancelled = false;

    const buildInfos = async () => {
      const infos = await Promise.all(formData.additionalImages.map((file) => {
        return new Promise((resolve) => {
          const preview = URL.createObjectURL(file);
          created.push(preview);

          const img = new Image();
          img.onload = () => {
            resolve({
              name: file.name,
              size: file.size,
              sizeMB: (file.size / 1024 / 1024).toFixed(2),
              type: file.type || 'unknown',
              width: img.naturalWidth,
              height: img.naturalHeight,
              lastModified: file.lastModified,
              preview
            });
          };
          img.onerror = () => {
            resolve({
              name: file.name,
              size: file.size,
              sizeMB: (file.size / 1024 / 1024).toFixed(2),
              type: file.type || 'unknown',
              width: null,
              height: null,
              lastModified: file.lastModified,
              preview
            });
          };
          img.src = preview;
        });
      }));

      if (!cancelled) setAdditionalImageInfos(infos);
    };

    buildInfos();

    return () => {
      cancelled = true;
      created.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [formData.additionalImages]);

  // Helper to group files by broad MIME category
  const groupInfos = (infos) => {
    const images = infos.filter(i => i.type && i.type.startsWith('image/'));
    const pdfs = infos.filter(i => i.type === 'application/pdf');
    const others = infos.filter(i => !(i.type && (i.type.startsWith('image/') || i.type === 'application/pdf')));
    return { images, pdfs, others };
  };

  const steps = [
    { id: 1, title: t('createEpaper.step1') || 'Basic Information', key: 'step1' },
    { id: 2, title: t('createEpaper.step2') || 'Upload', key: 'step2' },
    { id: 3, title: t('createEpaper.step3') || 'Layout Configuration', key: 'step3' },
    { id: 4, title: t('createEpaper.step4') || 'Preview and Review', key: 'step4' },
    { id: 5, title: t('createEpaper.step5') || 'Publish Settings', key: 'step5' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to the backend
  };

  const getDynamicTitle = () => {
    return 'Main Pages';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-black mb-2">
                {t('createEpaper.title') || 'Title'}
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input w-full"
                placeholder="Enter epaper title"
                required
              />
            </div>

            <div>
              <label htmlFor="publicationDate" className="block text-sm font-medium text-black mb-2">
                {t('createEpaper.publicationDate') || 'Publication Date'}
              </label>
              <input
                type="date"
                id="publicationDate"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleInputChange}
                className="input w-full"
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
                onChange={handleInputChange}
                className="input w-full"
                required
              >
                <option value="">{t('common.select') || 'Select type'}</option>
                <option value="daily">Daily newspaper</option>
                <option value="special">Special Edition</option>
              </select>
            </div>

            <div>
              <label htmlFor="additionalPageName" className="block text-sm font-medium text-black mb-2">
                Additional Page Name
              </label>
              <input
                type="text"
                id="additionalPageName"
                name="additionalPageName"
                value={formData.additionalPageName}
                onChange={handleInputChange}
                className="input w-full"
                placeholder="Enter additional page name"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-black mb-2">
                {t('createEpaper.category') || 'Category'}
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="input w-full"
                required
              >
                <option value="">{t('common.select') || 'Select category'}</option>
                <option value="news">News</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
                <option value="entertainment">Entertainment</option>
                <option value="business">Business</option>
              </select>
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
                onChange={handleInputChange}
                className="input w-full"
                placeholder="Enter tags separated by commas"
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
                onChange={handleInputChange}
                className="input w-full"
                placeholder="Enter meta title for SEO"
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
                onChange={handleInputChange}
                className="input w-full h-20"
                placeholder="Enter meta description for SEO"
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
                onChange={handleInputChange}
                className="input w-full"
                placeholder="Enter keywords separated by commas"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-black mb-2">
                {t('createEpaper.slug') || 'Slug'}
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="input w-full"
                placeholder="Enter URL slug"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-black mb-4">Grid 1: {getDynamicTitle()}</h3>
              <DropZone onFilesSelected={(files) => setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))} inputId="file-input-main" />
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

              {/* Grouped metadata panels for main uploads */}
              {imageInfos.length > 0 && (() => {
                const { images: imgs, pdfs, others } = groupInfos(imageInfos);
                return (
                  <div className="mt-4 space-y-4">
                    {imgs.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Images</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {imgs.map((info, idx) => (
                            <div key={idx} className="flex items-center space-x-4 p-3 border rounded bg-white">
                              <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                                <img src={info.preview} alt={info.name} className="w-full h-full object-contain" />
                              </div>
                              <div className="flex-1 text-sm">
                                <div className="font-medium text-black truncate">{info.name}</div>
                                <div className="text-gray-500 text-xs mt-1">Type: {info.type}</div>
                                <div className="text-gray-500 text-xs">Size: {info.sizeMB} MB</div>
                                <div className="text-gray-500 text-xs">Dimensions: {info.width ? `${info.width}×${info.height}` : '—'}</div>
                                <div className="text-gray-500 text-xs">Modified: {new Date(info.lastModified).toLocaleString()}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {pdfs.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">PDFs</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {pdfs.map((info, idx) => (
                            <div key={idx} className="p-3 border rounded bg-white text-sm">
                              <div className="font-medium text-black truncate">{info.name}</div>
                              <div className="text-gray-500 text-xs mt-1">Type: {info.type}</div>
                              <div className="text-gray-500 text-xs">Size: {info.sizeMB} MB</div>
                              <div className="text-gray-500 text-xs">Modified: {new Date(info.lastModified).toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {others.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Other Files</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {others.map((info, idx) => (
                            <div key={idx} className="p-3 border rounded bg-white text-sm">
                              <div className="font-medium text-black truncate">{info.name}</div>
                              <div className="text-gray-500 text-xs mt-1">Type: {info.type || 'unknown'}</div>
                              <div className="text-gray-500 text-xs">Size: {info.sizeMB} MB</div>
                              <div className="text-gray-500 text-xs">Modified: {new Date(info.lastModified).toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
            <div>
              <h3 className="text-lg font-medium text-black mb-4">Grid 2: Additional Pages</h3>
              <DropZone onFilesSelected={(files) => setFormData(prev => ({ ...prev, additionalImages: [...prev.additionalImages, ...files] }))} inputId="file-input-additional" />
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

              {/* Grouped metadata panels for additional uploads */}
              {additionalImageInfos.length > 0 && (() => {
                const { images: imgs, pdfs, others } = groupInfos(additionalImageInfos);
                return (
                  <div className="mt-4 space-y-4">
                    {imgs.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Images</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {imgs.map((info, idx) => (
                            <div key={idx} className="flex items-center space-x-4 p-3 border rounded bg-white">
                              <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                                <img src={info.preview} alt={info.name} className="w-full h-full object-contain" />
                              </div>
                              <div className="flex-1 text-sm">
                                <div className="font-medium text-black truncate">{info.name}</div>
                                <div className="text-gray-500 text-xs mt-1">Type: {info.type}</div>
                                <div className="text-gray-500 text-xs">Size: {info.sizeMB} MB</div>
                                <div className="text-gray-500 text-xs">Dimensions: {info.width ? `${info.width}×${info.height}` : '—'}</div>
                                <div className="text-gray-500 text-xs">Modified: {new Date(info.lastModified).toLocaleString()}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {pdfs.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">PDFs</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {pdfs.map((info, idx) => (
                            <div key={idx} className="p-3 border rounded bg-white text-sm">
                              <div className="font-medium text-black truncate">{info.name}</div>
                              <div className="text-gray-500 text-xs mt-1">Type: {info.type}</div>
                              <div className="text-gray-500 text-xs">Size: {info.sizeMB} MB</div>
                              <div className="text-gray-500 text-xs">Modified: {new Date(info.lastModified).toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {others.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Other Files</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {others.map((info, idx) => (
                            <div key={idx} className="p-3 border rounded bg-white text-sm">
                              <div className="font-medium text-black truncate">{info.name}</div>
                              <div className="text-gray-500 text-xs mt-1">Type: {info.type || 'unknown'}</div>
                              <div className="text-gray-500 text-xs">Size: {info.sizeMB} MB</div>
                              <div className="text-gray-500 text-xs">Modified: {new Date(info.lastModified).toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        );
      case 2:
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
                onChange={handleInputChange}
                className="input w-full"
              >
                <option value="default">Default</option>
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
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
                onChange={handleInputChange}
                className="input w-full h-32"
                placeholder="Describe layout preferences..."
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t('createEpaper.summary') || 'Summary'}</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p><strong>{t('createEpaper.title') || 'Title'}:</strong> {formData.title}</p>
              <p><strong>{t('createEpaper.publicationDate') || 'Publication Date'}:</strong> {formData.publicationDate}</p>
              <p><strong>{t('createEpaper.publicationType') || 'Publication Type'}:</strong> {formData.publicationType === 'daily' ? 'Daily newspaper' : formData.publicationType === 'special' ? 'Special Edition' : ''}</p>
              <p><strong>Additional Page Name:</strong> {formData.additionalPageName || 'None'}</p>
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
                <h4 className="text-md font-semibold">
                  Main Pages Preview
                </h4>
                {formData.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={URL.createObjectURL(file)}
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
                  <p className="text-gray-500">No images uploaded for {formData.publicationType === 'daily' ? 'daily pages' : 'special edition pages'}.</p>
                )}
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-md font-semibold">Additional Pages Preview</h4>
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
                <p className="text-gray-500">No additional attachments uploaded.</p>
              )}
            </div>
          </div>
        );
      case 4:
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="input w-full"
                placeholder="Enter author name"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-black mb-3">
          {t('epaper.createNew')}
        </h1>
        <p className="text-lg text-gray-600">
          Create a new epaper publication
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index <= currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step.id}
            </div>
            <span className={`ml-2 text-sm ${index <= currentStep ? 'text-black' : 'text-gray-500'}`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-4 ${index < currentStep ? 'bg-black' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-black mb-4">
            {steps[currentStep].title}
          </h2>
          {renderStepContent()}
        </div>

        <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="btn flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
            <span>{t('createEpaper.previous') || 'Previous'}</span>
          </button>

          <div className="flex space-x-4">
            <button type="button" className="btn flex items-center justify-center space-x-2">
              <Save size={16} />
              <span>{t('createEpaper.saveDraft') || 'Save Draft'}</span>
            </button>

            {currentStep === steps.length - 1 ? (
              <button type="submit" className="btn btn-primary flex items-center justify-center space-x-2">
                <Upload size={16} />
                <span>{t('createEpaper.publish') || 'Publish'}</span>
              </button>
            ) : (
              <button type="button" onClick={nextStep} className="btn btn-primary flex items-center justify-center space-x-2">
                <span>{t('createEpaper.next') || 'Next'}</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEpaper;
