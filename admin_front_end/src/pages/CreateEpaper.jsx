import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Eye, Upload, ChevronLeft, ChevronRight } from 'lucide-react';

const CreateEpaper = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    publicationDate: '',
    publicationType: '',
    hasAdditionalPage: false,
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
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
    if (formData.publicationType === 'daily') return 'Daily Pages';
    if (formData.publicationType === 'special') return 'Special Edition Pages';
    return 'Pages';
  };

  const DropZone = ({ onFilesSelected }) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
      onFilesSelected(files);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = () => {
      setIsDragOver(false);
    };

    const handleFileInputChange = (e) => {
      const files = Array.from(e.target.files);
      onFilesSelected(files);
    };

    return (
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">Drag and drop images here, or click to select</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="cursor-pointer text-blue-600 hover:text-blue-800 block mt-2">Browse files</label>
      </div>
    );
  };

  const FileList = ({ files }) => (
    <div className="mt-4">
      <p className="text-sm text-gray-600">Selected files: {files.length}</p>
      <ul className="list-disc list-inside text-sm text-gray-700">
        {files.map((file, index) => <li key={index}>{file.name}</li>)}
      </ul>
    </div>
  );

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
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="hasAdditionalPage"
                  name="hasAdditionalPage"
                  checked={formData.hasAdditionalPage}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-black">{t('createEpaper.hasAdditionalPage') || 'Has Additional Page'}</span>
              </label>
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
              <h3 className="text-lg font-medium text-black mb-4">{getDynamicTitle()}</h3>
              <DropZone onFilesSelected={(files) => setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))} />
              {formData.images.length > 0 && <FileList files={formData.images} />}
            </div>
            {formData.hasAdditionalPage && (
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Additional Attachments</h3>
                <DropZone onFilesSelected={(files) => setFormData(prev => ({ ...prev, additionalImages: [...prev.additionalImages, ...files] }))} />
                {formData.additionalImages.length > 0 && <FileList files={formData.additionalImages} />}
              </div>
            )}
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('createEpaper.summary') || 'Summary'}</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p><strong>{t('createEpaper.title') || 'Title'}:</strong> {formData.title}</p>
              <p><strong>{t('createEpaper.publicationDate') || 'Publication Date'}:</strong> {formData.publicationDate}</p>
              <p><strong>{t('createEpaper.publicationType') || 'Publication Type'}:</strong> {formData.publicationType === 'daily' ? 'Daily newspaper' : formData.publicationType === 'special' ? 'Special Edition' : ''}</p>
              <p><strong>{t('createEpaper.hasAdditionalPage') || 'Has Additional Page'}:</strong> {formData.hasAdditionalPage ? 'Yes' : 'No'}</p>
              <p><strong>{t('createEpaper.category') || 'Category'}:</strong> {formData.category}</p>
              <p><strong>{t('createEpaper.tags') || 'Tags'}:</strong> {formData.tags}</p>
              <p><strong>{t('createEpaper.metaTitle') || 'Meta Title'}:</strong> {formData.metaTitle}</p>
              <p><strong>{t('createEpaper.metaDescription') || 'Meta Description'}:</strong> {formData.metaDescription}</p>
              <p><strong>{t('createEpaper.keywords') || 'Keywords'}:</strong> {formData.keywords}</p>
              <p><strong>{t('createEpaper.slug') || 'Slug'}:</strong> {formData.slug}</p>
              <p><strong>{t('createEpaper.content') || 'Content'}:</strong> {formData.content.substring(0, 100)}...</p>
              <p><strong>{t('createEpaper.template') || 'Template'}:</strong> {formData.template}</p>
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
