export type Locale = "en" | "am";

export const LOCALE_COOKIE = "ls_locale";

const en = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    portfolio: "Portfolio",
    sustainability: "Sustainability",
    blog: "Blog",
    careers: "Careers",
    contact: "Contact",
    testimonials: "Testimonials",
    partners: "Partners"
  },
  cta: {
    quote: "Request a Quote",
    consultation: "Book a Consultation",
    contactUs: "Contact Us",
    whatsapp: "Chat on WhatsApp",
    readMore: "Read More",
    viewAll: "View All",
    download: "Download Brochure",
    apply: "Apply Now"
  },
  home: {
    statsTitle: "Why choose us",
    featuredProjects: "Featured Projects",
    ourServices: "Our Services",
    latestPosts: "Latest from the Blog",
    whatClientsSay: "What Our Clients Say",
    ourPartners: "Our Partners"
  },
  forms: {
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    whatsappNumber: "WhatsApp Number (optional)",
    company: "Company (optional)",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
    submitting: "Sending…",
    success: "Thank you! Your message has been received.",
    error: "Something went wrong. Please try again.",
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    preferredDate: "Preferred Date",
    preferredTime: "Preferred Time",
    consultationType: "Consultation Type",
    projectDetails: "Project Details",
    service: "Service",
    projectLocation: "Project Location",
    projectType: "Project Type",
    projectSize: "Project Size",
    budget: "Budget Range",
    timeline: "Desired Timeline",
    attachment: "Attachment (optional)",
    coverLetter: "Cover Letter",
    resume: "Resume (PDF or Word)"
  },
  common: {
    loading: "Loading…",
    notFound: "Page not found",
    backHome: "Back to home",
    error: "An error occurred",
    retry: "Try again",
    empty: "Nothing to show yet",
    language: "Language"
  }
};

type Dict = typeof en;

const am: Dict = {
  nav: {
    home: "መነሻ",
    about: "ስለ እኛ",
    services: "አገልግሎቶች",
    portfolio: "የሥራዎች",
    sustainability: "ዘላቂነት",
    blog: "ብሎግ",
    careers: "ቅጥር",
    contact: "አግኙን",
    testimonials: "አስተያየቶች",
    partners: "አጋሮች"
  },
  cta: {
    quote: "ዋጋ ይጠይቁ",
    consultation: "ውይይት ያዘጋጁ",
    contactUs: "ያግኙን",
    whatsapp: "በWhatsApp ይነጋገሩን",
    readMore: "ያንብቡ",
    viewAll: "ሁሉንም ይመልከቱ",
    download: "ፕሮፋይል አውርድ",
    apply: "አመልክት"
  },
  home: {
    statsTitle: "ለምን እኛን ይምረጡ",
    featuredProjects: "ተመራጭ ፕሮጀክቶች",
    ourServices: "አገልግሎቶቻችን",
    latestPosts: "አዲሶች ብሎግ ጽሑፎች",
    whatClientsSay: "ደንበኞቻችን ምን ይላሉ",
    ourPartners: "አጋሮቻችን"
  },
  forms: {
    fullName: "ሙሉ ስም",
    email: "ኢሜይል",
    phone: "ስልክ",
    whatsappNumber: "የWhatsApp ቁጥር (አማራጭ)",
    company: "ድርጅት (አማራጭ)",
    subject: "ርዕስ",
    message: "መልእክት",
    send: "መልእክት ላክ",
    submitting: "በመላክ ላይ…",
    success: "አመሰግናለሁ! መልእክትዎ ደርሷል።",
    error: "ችግር አጋጥሟል። እባክዎ እንደገና ይሞክሩ።",
    required: "ይህ መስክ ያስፈልጋል",
    invalidEmail: "ትክክለኛ ኢሜይል ያስገቡ",
    preferredDate: "የሚመርጡት ቀን",
    preferredTime: "የሚመርጡት ሰዓት",
    consultationType: "የውይይት ዓይነት",
    projectDetails: "የፕሮጀክት ዝርዝር",
    service: "አገልግሎት",
    projectLocation: "የፕሮጀክት ቦታ",
    projectType: "የፕሮጀክት ዓይነት",
    projectSize: "የፕሮጀክት መጠን",
    budget: "በጀት ክልል",
    timeline: "የፈለኩት ጊዜ",
    attachment: "አባሪ ፋይል (አማራጭ)",
    coverLetter: "የሸፊዝ ማስታወሻ",
    resume: "CV (PDF ወይም Word)"
  },
  common: {
    loading: "በመጫን ላይ…",
    notFound: "ገጹ አልተገኘም",
    backHome: "ወደ መነሻ ተመለስ",
    error: "ችግር አጋጥሟል",
    retry: "እንደገና ሞክር",
    empty: "እስካሁን ምንም የለም",
    language: "ቋንቋ"
  }
};

const dictionaries: Record<Locale, Dict> = { en, am };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}

export type Dictionary = Dict;
