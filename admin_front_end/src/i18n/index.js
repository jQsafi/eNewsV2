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
    "createEpaper.publicationType": "প্রকাশনার ধরন",
    "createEpaper.metaTitle": "মেটা শিরোনাম",
    "createEpaper.metaDescription": "মেটা বর্ণনা",
    "createEpaper.keywords": "কীওয়ার্ড",
    "createEpaper.slug": "স্লাগ",
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
    "createEpaper.next": "পরবর্তী",

    // CreateEpaper - additional keys
    "createEpaper.mainPages": "প্রধান পৃষ্ঠা",
    "createEpaper.titlePlaceholder": "ইপেপারের শিরোনাম লিখুন",
    "createEpaper.publicationTypeOptions.daily": "দৈনিক সংবাদপত্র",
    "createEpaper.publicationTypeOptions.special": "বিশেষ সংস্করণ",
    "createEpaper.additionalPageName": "অতিরিক্ত পৃষ্ঠার নাম",
    "createEpaper.additionalPageNamePlaceholder": "অতিরিক্ত পৃষ্ঠার নাম লিখুন",
    "createEpaper.categoryPlaceholder": "বিভাগ নির্বাচন করুন",
    "createEpaper.categoryOptions.news": "সংবাদ",
    "createEpaper.categoryOptions.sports": "খেলা",
    "createEpaper.categoryOptions.technology": "প্রযুক্তি",
    "createEpaper.categoryOptions.entertainment": "বিনোদন",
    "createEpaper.categoryOptions.business": "ব্যবসা",
    "createEpaper.tagsPlaceholder": "কমা দিয়ে আলাদা করে ট্যাগ লিখুন",
    "createEpaper.metaTitlePlaceholder": "এসইওর জন্য মেটা শিরোনাম লিখুন",
    "createEpaper.metaDescriptionPlaceholder": "এসইওর জন্য মেটা বর্ণনা লিখুন",
    "createEpaper.keywordsPlaceholder": "কমা দিয়ে আলাদা করে কীওয়ার্ড লিখুন",
    "createEpaper.slugPlaceholder": "ইউআরএল স্লাগ লিখুন",
    "createEpaper.upload.grid1Title": "গ্রিড ১: {{title}}",
    "createEpaper.upload.images": "ছবি",
    "createEpaper.upload.pdfs": "পিডিএফ",
    "createEpaper.upload.otherFiles": "অন্যান্য ফাইল",
    "createEpaper.meta.type": "ধরণ",
    "createEpaper.meta.size": "আকার",
    "createEpaper.meta.dimensions": "মাত্রা",
    "createEpaper.meta.modified": "সংশোধনের সময়",
    "createEpaper.upload.grid2Title": "গ্রিড ২: অতিরিক্ত পৃষ্ঠা",
    "createEpaper.template.options.default": "ডিফল্ট",
    "createEpaper.template.options.modern": "মডার্ন",
    "createEpaper.template.options.classic": "ক্ল্যাসিক",
    "createEpaper.layoutOptionsPlaceholder": "লেআউট পছন্দসমূহ বর্ণনা করুন...",
    "createEpaper.summary.mainPagesPreview": "প্রধান পৃষ্ঠার প্রিভিউ",
    "createEpaper.summary.noImagesDaily": "দৈনিক পৃষ্ঠার জন্য কোনো ছবি আপলোড করা হয়নি।",
    "createEpaper.summary.noImagesSpecial": "বিশেষ সংস্করণের পৃষ্ঠার জন্য কোনো ছবি আপলোড করা হয়নি।",
    "createEpaper.summary.additionalPagesPreview": "অতিরিক্ত পৃষ্ঠার প্রিভিউ",
    "createEpaper.summary.noAdditionalAttachments": "কোনো অতিরিক্ত সংযুক্তি আপলোড করা হয়নি।",
    "createEpaper.authorPlaceholder": "লেখকের নাম লিখুন",
    "createEpaper.pageDescription": "নতুন একটি ইপেপার প্রকাশনা তৈরি করুন",
    "common.none": "কিছুই নয়"
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
    "createEpaper.publicationType": "Publication Type",
    "createEpaper.metaTitle": "Meta Title",
    "createEpaper.metaDescription": "Meta Description",
    "createEpaper.keywords": "Keywords",
    "createEpaper.slug": "Slug",
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
    "createEpaper.next": "Next",

    // CreateEpaper - additional keys
    "createEpaper.mainPages": "Main Pages",
    "createEpaper.titlePlaceholder": "Enter epaper title",
    "createEpaper.publicationTypeOptions.daily": "Daily newspaper",
    "createEpaper.publicationTypeOptions.special": "Special Edition",
    "createEpaper.additionalPageName": "Additional Page Name",
    "createEpaper.additionalPageNamePlaceholder": "Enter additional page name",
    "createEpaper.categoryPlaceholder": "Select category",
    "createEpaper.categoryOptions.news": "News",
    "createEpaper.categoryOptions.sports": "Sports",
    "createEpaper.categoryOptions.technology": "Technology",
    "createEpaper.categoryOptions.entertainment": "Entertainment",
    "createEpaper.categoryOptions.business": "Business",
    "createEpaper.tagsPlaceholder": "Enter tags separated by commas",
    "createEpaper.metaTitlePlaceholder": "Enter meta title for SEO",
    "createEpaper.metaDescriptionPlaceholder": "Enter meta description for SEO",
    "createEpaper.keywordsPlaceholder": "Enter keywords separated by commas",
    "createEpaper.slugPlaceholder": "Enter URL slug",
    "createEpaper.upload.grid1Title": "Grid 1: {{title}}",
    "createEpaper.upload.images": "Images",
    "createEpaper.upload.pdfs": "PDFs",
    "createEpaper.upload.otherFiles": "Other Files",
    "createEpaper.meta.type": "Type",
    "createEpaper.meta.size": "Size",
    "createEpaper.meta.dimensions": "Dimensions",
    "createEpaper.meta.modified": "Modified",
    "createEpaper.upload.grid2Title": "Grid 2: Additional Pages",
    "createEpaper.template.options.default": "Default",
    "createEpaper.template.options.modern": "Modern",
    "createEpaper.template.options.classic": "Classic",
    "createEpaper.layoutOptionsPlaceholder": "Describe layout preferences...",
    "createEpaper.summary.mainPagesPreview": "Main Pages Preview",
    "createEpaper.summary.noImagesDaily": "No images uploaded for daily pages.",
    "createEpaper.summary.noImagesSpecial": "No images uploaded for special edition pages.",
    "createEpaper.summary.additionalPagesPreview": "Additional Pages Preview",
    "createEpaper.summary.noAdditionalAttachments": "No additional attachments uploaded.",
    "createEpaper.authorPlaceholder": "Enter author name",
    "createEpaper.pageDescription": "Create a new epaper publication",
    "common.none": "None"
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
