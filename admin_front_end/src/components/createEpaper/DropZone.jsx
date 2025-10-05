import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const DropZone = ({ onFilesSelected, inputId }) => {
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
        id={inputId}
      />
      <label htmlFor={inputId} className="cursor-pointer text-blue-600 hover:text-blue-800 block mt-2">Browse files</label>
    </div>
  );
};

export default DropZone;
