import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, parseISO, startOfMonth, startOfWeek, endOfMonth, endOfWeek, addDays, addMonths, isSameMonth, isSameDay } from 'date-fns';

// Components
import StepIndicator from '../components/createEpaper/StepIndicator';
import CalendarHeader from '../components/createEpaper/calendar/CalendarHeader';
import DayCell from '../components/createEpaper/calendar/DayCell';

import DropZone from '../components/createEpaper/DropZone';
import MainFileList from '../components/createEpaper/MainFileList';

// Step Components
import BasicInformation from '../components/createEpaper/steps/BasicInformation';
import UploadStep from '../components/createEpaper/steps/UploadStep';
import LayoutConfiguration from '../components/createEpaper/steps/LayoutConfiguration';
import Checklist from '../components/createEpaper/steps/Checklist';
import PreviewAndReview from '../components/createEpaper/steps/PreviewAndReview';
import PublishSettings from '../components/createEpaper/steps/PublishSettings';

const CreateEpaper = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  // Initialize form data state without localStorage persistence
  const [formData, setFormData] = useState({
    title: '',
    publicationDate: '',
    publicationType: 'daily',
    additionalPageName: '',
    category: '',
    tags: '',
    content: '',
    images: [],
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
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (dragCounter === 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev - 1);
    if (dragCounter === 1) { // Only set to false when leaving the last draggable element
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragCounter(0);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setCurrentStep(1);
      handleFilesSelected(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  useEffect(() => {
    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  // Fix: Ensure additionalImages do not update imageInfos (Grid 1 preview)
  useEffect(() => {
    let created = [];
    let cancelled = false;

    const buildInfos = async () => {
      const infos = await Promise.all(formData.images.map((file) => {
        return new Promise((resolve) => {
          // Check if file is a File object before creating object URL
          if (file instanceof File) {
          // Check if file is a File object before creating object URL
          if (file instanceof File) {
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
          } else if (typeof file.preview === 'string' && file.preview.startsWith('data:')) {
            // If preview is base64 string, resolve with it directly
            resolve({
              name: file.name || 'unknown',
              size: file.size || 0,
              sizeMB: '0.00',
              type: file.type || 'unknown',
              width: null,
              height: null,
              lastModified: file.lastModified || null,
              preview: file.preview
            });
          } else {
            // If not a File object or base64 string, resolve with minimal info and empty preview
            resolve({
              name: file.name || 'unknown',
              size: file.size || 0,
              sizeMB: '0.00',
              type: file.type || 'unknown',
              width: null,
              height: null,
              lastModified: file.lastModified || null,
              preview: ''
            });
          }
          } else if (typeof file.preview === 'string' && file.preview.startsWith('data:')) {
            // If preview is base64 string, resolve with it directly
            resolve({
              name: file.name || 'unknown',
              size: file.size || 0,
              sizeMB: '0.00',
              type: file.type || 'unknown',
              width: null,
              height: null,
              lastModified: file.lastModified || null,
              preview: file.preview
            });
          } else {
            // If not a File object or base64 string, resolve with minimal info and empty preview
            resolve({
              name: file.name || 'unknown',
              size: file.size || 0,
              sizeMB: '0.00',
              type: file.type || 'unknown',
              width: null,
              height: null,
              lastModified: file.lastModified || null,
              preview: ''
            });
          }
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



  // Full-screen datepicker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const parsed = formData.publicationDate ? parseISO(formData.publicationDate) : new Date();
    return startOfMonth(parsed);
  });

  const [displayPublicationDate, setDisplayPublicationDate] = useState('');

  const openDatePicker = () => setShowDatePicker(true);
  const closeDatePicker = () => setShowDatePicker(false);
  const prevMonth = () => setCalendarMonth(m => addMonths(m, -1));
  const nextMonth = () => setCalendarMonth(m => addMonths(m, 1));

  const getBanglaWeekday = (d) => {
    const names = ['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
    return names[d.getDay()];
  };

  const setDateValue = (date) => {
    const isoValue = format(date, 'yyyy-MM-dd');
    const gregMonthNamesBn = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
    const { bDay, bMonthName, bYear } = gregorianToBangla(date);
    const { hDay, hMonth, hYear } = gregorianToHijri(date);
    const hijriMonthNamesBn = ['মহররম','সফর','রবিউল আওয়াল','রবিউস সানি','জুমাদাল উলা','জুমাদাল উখরা','রজব','শা’বান','রামাদান','শাওয়াল','জিলকদ','জিলহজ্জ'];
    const gDayBn = toBanglaDigits(format(date, 'd'));
    const gMonthBn = gregMonthNamesBn[date.getMonth()];
    const gYearBn = toBanglaDigits(format(date, 'yyyy'));
    const hDayBn = toBanglaDigits(hDay);
    const hMonthBn = hijriMonthNamesBn[Math.max(0, Math.min(11, hMonth - 1))];
    const hYearBn = toBanglaDigits(hYear);
    const weekdayBn = getBanglaWeekday(date);

    const display = `${gDayBn} ${gMonthBn} ${gYearBn}, ${toBanglaDigits(bDay)} ${bMonthName} ${toBanglaDigits(bYear)} এবং হিজরি ${hDayBn} ${hMonthBn} ${hYearBn} - ${weekdayBn}`;

    setFormData(prev => ({ ...prev, publicationDate: isoValue }));
    setDisplayPublicationDate(display);
    setShowDatePicker(false);
  };

  const toBanglaDigits = (str) => {
    const map = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
    return String(str).replace(/[0-9]/g, d => map[d]);
  };

  const toArabicIndicDigits = (str) => {
    const map = {'0':'٠','1':'١','2':'٢','3':'٣','4':'٤','5':'٥','6':'٦','7':'٧','8':'٨','9':'٩'};
    return String(str).replace(/[0-9]/g, d => map[d]);
  };

  const isGregorianLeap = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // Approximate Bangla (Bengali) calendar conversion (Bangladesh version, Boishakh starts Apr 14)
  const gregorianToBangla = (gDate) => {
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
    // Month lengths (BD revised: first 5 months 31, next 6 months 30, Falgun 29 normally, 30 on leap years)
    const falgunLength = isGregorianLeap(gYear) ? 30 : 29;
    const monthLengths = [31,31,31,31,31,30,30,30,30,30,falgunLength,30];
    const monthNamesBn = ['বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন','কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র'];

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

  // Simple (tabular) Hijri conversion, approximate. Returns { hYear, hMonth, hDay }
  const gregorianToHijri = (gDate) => {
    // Algorithm based on Kuwaiti algorithm approximation
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
    const islamicEpoch = 1948439.5; // Julian day of 1 Muharram 1 AH
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

  const islamicToJulianDay = (iy, im, id) => {
    const islamicEpoch = 1948439.5;
    return id + Math.ceil(29.5 * (im - 1)) + (iy - 1) * 354 + Math.floor((3 + 11 * iy) / 30) + islamicEpoch - 1;
  };

  const islamicMonthLength = (iy, im) => {
    // 30/29 alternating with leap years in a 30-year cycle
    if (im % 2 === 1) return 30; // odd months 30 days
    // even months 29, but Dhu al-Hijjah (12th) has 30 in leap years
    if (im === 12 && isIslamicLeapYear(iy)) return 30;
    return 29;
  };

  const isIslamicLeapYear = (iy) => {
    // leap years in years: 2,5,7,10,13,16,18,21,24,26,29 of 30-year cycle
    const y = (iy + 11) % 30;
    return [2,5,7,10,13,16,18,21,24,26,29].includes(y);
  };



  // Build metadata for additional images
  useEffect(() => {
    let created = [];
    let cancelled = false;

    const buildInfos = async () => {
      const infos = await Promise.all(formData.additionalImages.map((file) => {
        return new Promise((resolve) => {
          // Check if file is a File object before creating object URL
          if (file instanceof File) {
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
          } else if (typeof file.preview === 'string' && file.preview.startsWith('data:')) {
            // If preview is base64 string, resolve with it directly
            resolve({
              name: file.name || 'unknown',
              size: file.size || 0,
              sizeMB: '0.00',
              type: file.type || 'unknown',
              width: null,
              height: null,
              lastModified: file.lastModified || null,
              preview: file.preview
            });
          } else {
            // If not a File object or base64 string, resolve with minimal info and empty preview
            resolve({
              name: file.name || 'unknown',
              size: file.size || 0,
              sizeMB: '0.00',
              type: file.type || 'unknown',
              width: null,
              height: null,
              lastModified: file.lastModified || null,
              preview: ''
            });
          }
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
    { id: 4, title: t('createEpaper.step4') || 'Checklist', key: 'step4' },
    { id: 5, title: t('createEpaper.step5') || 'Preview and Review', key: 'step5' },
    { id: 6, title: t('createEpaper.step6') || 'Publish Settings', key: 'step6' }
  ];

  // Helper function to compress image quality and convert to base64 (maintains original dimensions)
  const compressImage = (file, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Use original dimensions
        const { naturalWidth: width, naturalHeight: height } = img;

        canvas.width = width;
        canvas.height = height;

        // Draw and compress the image (maintains original aspect ratio)
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 with quality compression (WebP format for better compression)
        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          },
          'image/webp',
          quality
        );
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  // Helper function to convert file to base64 string (with compression for images)
  const fileToBase64 = async (file) => {
    if (file.type.startsWith('image/')) {
      // Compress images
      return await compressImage(file);
    } else {
      // For non-image files, use regular base64 conversion
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  };

  // Override DropZone onFilesSelected handlers to convert files to base64 before adding to formData
  const handleFilesSelected = async (files) => {
    const existingCount = formData.images.length;
    const base64Files = await Promise.all(Array.from(files).map(async (file, index) => {
      const base64 = await fileToBase64(file);
      // Calculate compressed size from base64 string
      const compressedSize = Math.round((base64.length * 3) / 4); // Approximate size from base64
      return {
        ...file,
        name: `page-${existingCount + index + 1}`,
        originalSize: file.size,
        compressedSize,
        preview: base64
      };
    }));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...base64Files] }));
  };



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

  // Small preview pane component used in step 2
  // Removed PreviewPane component as per user request to not show file info like name, size, dimension

  // ...existing code...

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInformation
            formData={formData}
            handleInputChange={handleInputChange}
            openDatePicker={openDatePicker}
            displayPublicationDate={displayPublicationDate}
          />
        );
      case 1:
        return (
          <UploadStep
            formData={formData}
            setFormData={setFormData}
            handleFilesSelected={handleFilesSelected}
          />
        );
      case 2:
        return (
          <LayoutConfiguration formData={formData} onInputChange={handleInputChange} />
        );
      case 3:
        return (
          <Checklist formData={formData} onInputChange={handleInputChange} />
        );
      case 4:
        return (
          <PreviewAndReview
            formData={formData}
            imageInfos={imageInfos}
          />
        );
      case 5:
        return (
          <PublishSettings
            formData={formData}
            handleInputChange={handleInputChange}
          />
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
          {t('createEpaper.pageDescription') || 'Create a new epaper publication'}
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index === 1 && isDragging ? 'bg-blue-500 text-white' :
              index <= currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step.id}
            </div>
            <span className={`ml-2 text-sm ${index === 1 && isDragging ? 'text-blue-500' : index <= currentStep ? 'text-black' : 'text-gray-500'}`}>
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

      {showDatePicker && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            <CalendarHeader currentMonth={calendarMonth} onPrev={prevMonth} onNext={nextMonth} />
            <div className="grid grid-cols-7 gap-px bg-gray-200 text-center text-sm font-medium">
              {['সোম','মঙ্গল','বুধ','বৃহস্পতি','শুক্র','শনি','রবি'].map((d, i) => (
                <div key={i} className="bg-white p-2">{d}</div>
              ))}
            </div>
            <div className="flex-1 overflow-auto p-2">
              <div className="grid grid-cols-7 gap-2">
                {(() => {
                  const start = startOfWeek(startOfMonth(calendarMonth), { weekStartsOn: 1 });
                  const end = endOfWeek(endOfMonth(calendarMonth), { weekStartsOn: 1 });
                  const days = [];
                  for (let d = start; d <= end; d = addDays(d, 1)) {
                    const inMonth = isSameMonth(d, calendarMonth);
                    const selected = formData.publicationDate && isSameDay(d, parseISO(formData.publicationDate));
                    days.push(
                      <DayCell key={d.toISOString()} dateObj={d} inMonth={inMonth} selected={!!selected} onPick={setDateValue} />
                    );
                  }
                  return days;
                })()}
              </div>
            </div>
            <div className="p-4 border-t">
              <button onClick={closeDatePicker} className="btn w-full">{t('common.cancel') || 'Cancel'}</button>
            </div>
          </div>
        </div>
      )}

      {isDragging && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            zIndex: 9999,
          }}
        >
          Drop here to upload
        </div>
      )}
    </div>
  );
};

export default CreateEpaper;
