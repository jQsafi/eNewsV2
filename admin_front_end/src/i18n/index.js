import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Bengali translations
const bn = {
  translation: {
    // Navigation
    "nav.dashboard": "ড্যাশবোর্ড",
    "nav.createEpaper": "নতুন ইপেপার তৈরি",
    "nav.moderate": "মডারেট",
    "nav.publish": "প্রকাশনা",
    "nav.settings": "সেটিংস",
    
    // Common
    "common.save": "সংরক্ষণ",
    "common.cancel": "বাতিল",
    "common.edit": "সম্পাদনা",
    "common.delete": "মুছে ফেলুন",
    "common.create": "তৈরি করুন",
    "common.search": "খুঁজুন",
    "common.filter": "ফিল্টার",
    "common.language": "ভাষা",
    "common.select": "নির্বাচন করুন",

    // Dashboard
    "dashboard.title": "ড্যাশবোর্ড",
    "dashboard.welcome": "স্বাগতম",
    "dashboard.totalEpaper": "মোট ইপেপার",
    "dashboard.published": "প্রকাশিত",
    "dashboard.pending": "অপেক্ষমান",
    "dashboard.draft": "খসড়া",
    "dashboard.newEpaperPublished": "নতুন ইপেপার প্রকাশিত: {{title}}",
    "dashboard.epaperPendingModeration": "ইপেপার মডারেশনের অপেক্ষায়: {{title}}",
    "dashboard.newDraftCreated": "নতুন খসড়া তৈরি হয়েছে: {{title}}",

    // Epaper
    "epaper.title": "ইপেপার",
    "epaper.createNew": "নতুন ইপেপার তৈরি",
    "epaper.edit": "ইপেপার সম্পাদনা",
    "epaper.preview": "পূর্বরূপ",
    "epaper.publish": "প্রকাশনা",
    "epaper.unpublish": "অপ্রকাশিত",
    
    // Moderation
    "moderation.title": "মডারেশন",
    "moderation.pending": "অপেক্ষমান মডারেশন",
    "moderation.approve": "অনুমোদন",
    "moderation.reject": "প্রত্যাখ্যান",
    "moderation.comments": "মন্তব্য",

    // CreateEpaper
    "createEpaper.step1": "মৌলিক তথ্য",
    "createEpaper.step2": "মিডিয়া",
    "createEpaper.step3": "লেআউট কনফিগারেশন",
    "createEpaper.step4": "পূর্বরূপ এবং পর্যালোচনা",
    "createEpaper.step5": "প্রকাশনা সেটিংস",
    "createEpaper.title": "শিরোনাম",
    "createEpaper.publicationDate": "প্রকাশনার তারিখ",
    "createEpaper.category": "বিভাগ",
    "createEpaper.tags": "ট্যাগ",
    "createEpaper.content": "বিষয়বস্তু",
    "createEpaper.uploadImages": "ছবি আপলোড করুন",
    "createEpaper.template": "টেমপ্লেট",
    "createEpaper.layoutOptions": "লেআউট বিকল্প",
    "createEpaper.summary": "সারাংশ",
    "createEpaper.publishDate": "প্রকাশনার তারিখ",
    "createEpaper.visibility": "দৃশ্যমানতা",
    "createEpaper.public": "সবার জন্য",
    "createEpaper.private": "ব্যক্তিগত",
    "createEpaper.author": "লেখক",
    "createEpaper.previous": "পূর্ববর্তী",
    "createEpaper.saveDraft": "খসড়া সংরক্ষণ করুন",
    "createEpaper.publish": "প্রকাশনা",
    "createEpaper.next": "পরবর্তী"
  }
};

// English translations
const en = {
  translation: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.createEpaper": "Create New Epaper",
    "nav.moderate": "Moderate",
    "nav.publish": "Publish",
    "nav.settings": "Settings",
    
    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.create": "Create",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.language": "Language",
    "common.select": "Select",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome",
    "dashboard.totalEpaper": "Total Epaper",
    "dashboard.published": "Published",
    "dashboard.pending": "Pending",
    "dashboard.draft": "Draft",
    "dashboard.newEpaperPublished": "New epaper published: {{title}}",
    "dashboard.epaperPendingModeration": "Epaper pending moderation: {{title}}",
    "dashboard.newDraftCreated": "New draft created: {{title}}",

    // Epaper
    "epaper.title": "Epaper",
    "epaper.createNew": "Create New Epaper",
    "epaper.edit": "Edit Epaper",
    "epaper.preview": "Preview",
    "epaper.publish": "Publish",
    "epaper.unpublish": "Unpublish",
    
    // Moderation
    "moderation.title": "Moderation",
    "moderation.pending": "Pending Moderation",
    "moderation.approve": "Approve",
    "moderation.reject": "Reject",
    "moderation.comments": "Comments",

    // CreateEpaper
    "createEpaper.step1": "Basic Information",
    "createEpaper.step2": "Content Selection",
    "createEpaper.step3": "Layout Configuration",
    "createEpaper.step4": "Preview and Review",
    "createEpaper.step5": "Publish Settings",
    "createEpaper.title": "Title",
    "createEpaper.publicationDate": "Publication Date",
    "createEpaper.category": "Category",
    "createEpaper.tags": "Tags",
    "createEpaper.content": "Content",
    "createEpaper.uploadImages": "Upload Images",
    "createEpaper.template": "Template",
    "createEpaper.layoutOptions": "Layout Options",
    "createEpaper.summary": "Summary",
    "createEpaper.publishDate": "Publish Date",
    "createEpaper.visibility": "Visibility",
    "createEpaper.public": "Public",
    "createEpaper.private": "Private",
    "createEpaper.author": "Author",
    "createEpaper.previous": "Previous",
    "createEpaper.saveDraft": "Save Draft",
    "createEpaper.publish": "Publish",
    "createEpaper.next": "Next"
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      bn: bn,
      en: en
    },
    lng: 'bn', // Bengali as primary language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
