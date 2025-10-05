import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gregorianToBangla, gregorianToHijri, toBanglaDigits } from '../../../utils/dateConverters';
import { format } from 'date-fns';

const CalendarHeader = ({ currentMonth, onPrev, onNext }) => {
  const { bYear } = gregorianToBangla(currentMonth);
  const { hYear } = gregorianToHijri(currentMonth);
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <button onClick={onPrev} className="p-2 rounded hover:bg-gray-100" aria-label="Previous month">
        <ChevronLeft size={20} />
      </button>
      <div className="text-center">
        <div className="text-base font-semibold">{toBanglaDigits(bYear)} বঙ্গাব্দ | {toBanglaDigits(hYear)} হিজরি</div>
        <div className="text-xs text-gray-500">{format(currentMonth, 'MMMM yyyy')}</div>
      </div>
      <button onClick={onNext} className="p-2 rounded hover:bg-gray-100" aria-label="Next month">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

CalendarHeader.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default CalendarHeader;