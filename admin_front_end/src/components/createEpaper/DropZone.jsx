import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, AlertCircle } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// Allow all image/* types by default, plus PDF
const ALLOWED_TYPES = ['image/*', 'application/pdf'];

const DropZone = ({ onFilesSelected, inputId, maxFileSize = MAX_FILE_SIZE, allowedTypes = ALLOWED_TYPES }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState('');

  const validateFiles = (files) => {
    const validFiles = [];
    const errors = [];

    Array.from(files).forEach(file => {
      const isAllowed = allowedTypes.some(t => {
        if (t === 'image/*') return file.type.startsWith('image/');
        return t === file.type;
      });

      if (!isAllowed) {
        errors.push(`${file.name}: Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
      } else if (file.size > maxFileSize) {
        errors.push(`${file.name}: File too large. Maximum size: ${maxFileSize / (1024 * 1024)}MB`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setError(errors.join('\\n'));
      setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
    }

    return validFiles;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const validFiles = validateFiles(e.dataTransfer.files);
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const validFiles = validateFiles(e.target.files);
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : error 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {error ? (
          <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
        ) : (
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
        )}
        <p className="mt-2 text-sm text-gray-600">
          {error ? 'Error uploading files' : 'Drag and drop files here, or click to select'}
        </p>
        <input
          type="file"
          multiple
          accept={allowedTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          id={inputId}
        />
        <label htmlFor={inputId} className="cursor-pointer text-blue-600 hover:text-blue-800 block mt-2">
          Browse files
        </label>
      </div>
      {error && (
        <div className="mt-2 text-sm text-red-600 whitespace-pre-line">
          {error}
        </div>
      )}
    </div>
  );
};

DropZone.propTypes = {
  onFilesSelected: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired,
  maxFileSize: PropTypes.number,
  allowedTypes: PropTypes.arrayOf(PropTypes.string)
};

export default DropZone;
