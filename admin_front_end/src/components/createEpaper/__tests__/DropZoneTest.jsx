import React, { useState } from 'react';
import DropZone from '../DropZone';

const DropZoneTest = () => {
  const [files, setFiles] = useState([]);

  const handleFilesSelected = (selectedFiles) => {
    setFiles(selectedFiles);
    console.log('Selected files:', selectedFiles);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">DropZone Component Test</h1>
      
      {/* Test with default settings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Default Settings</h2>
        <DropZone
          onFilesSelected={handleFilesSelected}
          inputId="default-test"
        />
      </div>

      {/* Test with custom settings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Custom Settings (2MB limit, images only)</h2>
        <DropZone
          onFilesSelected={handleFilesSelected}
          inputId="custom-test"
          maxFileSize={2 * 1024 * 1024}
          allowedTypes={['image/jpeg', 'image/png']}
        />
      </div>

      {/* Display selected files */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Selected Files:</h2>
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li key={index} className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-600">
                Type: {file.type} | Size: {(file.size / 1024).toFixed(2)} KB
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropZoneTest;