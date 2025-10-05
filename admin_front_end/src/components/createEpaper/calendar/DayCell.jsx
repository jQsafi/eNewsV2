import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { gregorianToBangla, gregorianToHijri, toBanglaDigits } from '../../../utils/dateConverters';

const DayCell = ({ dateObj, inMonth, selected, onPick }) => {
  const gregMonthNamesBn = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  const hijriMonthNamesBn = ['মহররম','সফর','রবিউল আওয়াল','রবিউস সানি','জুমাদাল উলা','জুমাদাল উখরা','রজব','শা\'বান','রামাদান','শাওয়াল','জিলকদ','জিলহজ্জ'];
  const { hDay, hMonth, hYear } = gregorianToHijri(dateObj);
  const { bDay, bMonthName, bYear } = gregorianToBangla(dateObj);
  const gDayEn = format(dateObj, 'd');
  const gDayBn = toBanglaDigits(gDayEn);
  const gMonthBn = gregMonthNamesBn[dateObj.getMonth()];
  const gYearBn = toBanglaDigits(format(dateObj, 'yyyy'));
  const hDayBn = toBanglaDigits(hDay);
  const hMonthBn = hijriMonthNamesBn[Math.max(0, Math.min(11, hMonth - 1))];
  const hYearBn = toBanglaDigits(hYear);

  return (
    <button
      onClick={() => onPick(dateObj)}
      className={`border rounded p-3 text-left h-28 flex flex-col justify-between ${
        inMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
      } ${selected ? 'ring-2 ring-black' : ''}`}
    >
      <div className="text-xl font-bold">{gDayEn}</div>
      <div className="text-[12px]">{toBanglaDigits(bDay)} {bMonthName}</div>
      <div className="text-[12px]">{hDayBn} {hMonthBn}</div>
    </button>
  );
};

DayCell.propTypes = {
  dateObj: PropTypes.instanceOf(Date).isRequired,
  inMonth: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  onPick: PropTypes.func.isRequired
};

export default DayCell;