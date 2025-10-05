import React from 'react';
import { useTranslation } from 'react-i18next';

const StepIndicator = ({ steps, currentStep }) => {
  const { t } = useTranslation();

  return (
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
  );
};

export default StepIndicator;