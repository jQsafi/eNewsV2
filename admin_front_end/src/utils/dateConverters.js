// Date conversion utilities for Bengali and Hijri calendars

export const toBanglaDigits = (str) => {
  const map = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
  return String(str).replace(/[0-9]/g, d => map[d]);
};

export const toArabicIndicDigits = (str) => {
  const map = {'0':'٠','1':'١','2':'٢','3':'٣','4':'٤','5':'٥','6':'٦','7':'٧','8':'٨','9':'٩'};
  return String(str).replace(/[0-9]/g, d => map[d]);
};

export const isGregorianLeap = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

// Approximate Bangla (Bengali) calendar conversion (Bangladesh version)
export const gregorianToBangla = (gDate) => {
  const gYear = gDate.getFullYear();
  const banglaEpochMonth = 3; // April (0-based)
  const banglaEpochDay = 14;
  const epochThisYear = new Date(gYear, banglaEpochMonth, banglaEpochDay);
  let banglaYear = gYear - 593;
  let startEpoch = epochThisYear;
  
  if (gDate < epochThisYear) {
    banglaYear = gYear - 594;
    startEpoch = new Date(gYear - 1, banglaEpochMonth, banglaEpochDay);
  }

  const daysSinceStart = Math.floor((gDate - startEpoch) / (1000 * 60 * 60 * 24));
  const falgunLength = isGregorianLeap(gYear) ? 30 : 29;
  const monthLengths = [31,31,31,31,31,30,30,30,30,30,falgunLength,30];
  const monthNamesBn = ['বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন','কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র'];

  let remaining = daysSinceStart;
  let bMonth = 0;
  while (remaining >= monthLengths[bMonth]) {
    remaining -= monthLengths[bMonth];
    bMonth += 1;
    if (bMonth > 11) break;
  }
  const bDay = remaining + 1;
  return { bYear: banglaYear, bMonth: bMonth + 1, bDay, bMonthName: monthNamesBn[Math.min(bMonth, 11)] };
};

// Hijri calendar conversion helpers
export const islamicToJulianDay = (iy, im, id) => {
  const islamicEpoch = 1948439.5;
  return id + Math.ceil(29.5 * (im - 1)) + (iy - 1) * 354 + Math.floor((3 + 11 * iy) / 30) + islamicEpoch - 1;
};

export const isIslamicLeapYear = (iy) => {
  const y = (iy + 11) % 30;
  return [2,5,7,10,13,16,18,21,24,26,29].includes(y);
};

export const islamicMonthLength = (iy, im) => {
  if (im % 2 === 1) return 30;
  if (im === 12 && isIslamicLeapYear(iy)) return 30;
  return 29;
};

// Gregorian to Hijri conversion
export const gregorianToHijri = (gDate) => {
  const day = gDate.getDate();
  const month = gDate.getMonth();
  const year = gDate.getFullYear();
  let m = month + 1;
  let y = year;
  
  if (m < 3) {
    y -= 1;
    m += 12;
  }
  
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
  const islamicEpoch = 1948439.5;
  let daysSince = Math.floor(jd) - Math.floor(islamicEpoch);
  let hYear = Math.floor((30 * daysSince + 10646) / 10631);
  let firstDayOfYear = islamicToJulianDay(hYear, 1, 1);
  let dayOfYear = Math.floor(jd) - Math.floor(firstDayOfYear) + 1;
  let hMonth = 1;
  
  while (hMonth <= 12 && dayOfYear > islamicMonthLength(hYear, hMonth)) {
    dayOfYear -= islamicMonthLength(hYear, hMonth);
    hMonth += 1;
  }
  
  const hDay = dayOfYear;
  return { hYear, hMonth, hDay };
};

export const getBanglaWeekday = (d) => {
  const names = ['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
  return names[d.getDay()];
};