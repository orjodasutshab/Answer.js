export const initialCategories = [
  { id: 'cat-1', slug: 'ecommerce', nameBn: 'ই-কমার্স ওয়েবসাইট', nameEn: 'E-commerce Website', icon: 'ShoppingBag', count: 42 },
  { id: 'cat-2', slug: 'business', nameBn: 'বিজনেস ও কর্পোরেট', nameEn: 'Business & Corporate', icon: 'Briefcase', count: 38 },
  { id: 'cat-3', slug: 'portfolio', nameBn: 'পোর্টফোলিও ও পার্সোনাল', nameEn: 'Portfolio & Personal', icon: 'User', count: 25 },
  { id: 'cat-4', slug: 'blog', nameBn: 'ব্লগ ও নিউজ পোর্টাল', nameEn: 'Blog & News Portal', icon: 'FileText', count: 19 },
  { id: 'cat-5', slug: 'education', nameBn: 'এডুকেশন ও এলএমএস', nameEn: 'Education & LMS', icon: 'GraduationCap', count: 15 },
  { id: 'cat-6', slug: 'landing', nameBn: 'ল্যান্ডিং পেজ ও স্ক্রিপ্ট', nameEn: 'Landing Page & Scripts', icon: 'Code', count: 31 }
];

export const initialListings = [
  {
    id: 'listing-101',
    slug: 'kartly-multivendor-ecommerce',
    titleBn: 'কার্টলি - মাল্টিভেন্ডর ই-কমার্স ফুল ওয়েবসাইট ও অ্যাপ কোড',
    titleEn: 'Kartly - Multivendor eCommerce CMS & App Source Code',
    type: 'Complete Website',
    categorySlug: 'ecommerce',
    price: 3500,
    sellerId: 'seller-1',
    sellerName: 'ThemeLooks BD',
    isVerifiedSeller: true,
    rating: 4.9,
    salesCount: 142,
    shortDescBn: 'সম্পূর্ণ রেডি মাল্টিভেন্ডর ই-কমার্স সাইট, সেলার প্যানেল, কাস্টমার অ্যাপ এবং বিকাশ/নগদ পেমেন্ট ইন্টিগ্রেশন সহ।',
    shortDescEn: 'Complete multivendor e-commerce site with seller panel, customer app, and bKash/Nagad integration.',
    fullDescBn: 'কার্টলি হল একটি পূর্ণাঙ্গ মাল্টিভেন্ডর ই-কমার্স সমাধান। এতে পাবেন অ্যাডমিন প্যানেল, সেলার হাব, কাস্টমার অ্যাপ সোর্স কোড, অটোমেটিক কুপন সিস্টেম, সেলস রিপোর্ট এবং বিডি ওয়ালেট সাপোর্ট।',
    fullDescEn: 'Kartly is a full-featured multi-vendor ecommerce system. Includes Admin Panel, Seller Portal, Customer App source code, Coupon system, Sales reports, and BD wallet payment logic.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'React Native'],
    includedFiles: ['Full Source Code (.zip)', 'Database Dump (.sql)', 'Setup Documentation PDF', 'Figma Design Files'],
    demoUrl: 'https://demo.example.com/kartly',
    downloadUrl: 'https://cdn.websitebazerbd.com/downloads/kartly-v2.4-full.zip',
    coverImage: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'Approved',
    createdAt: '2026-01-15'
  },
  {
    id: 'listing-102',
    slug: 'pixmart-digital-products-marketplace',
    titleBn: 'পিক্সমার্ট - ডিজিটাল প্রোডাক্ট ও AI সার্ভিস বিক্রি মার্কেটপ্লেস স্ক্রিপ্ট',
    titleEn: 'PixMart - Digital Products & AI Tools Marketplace Script',
    type: 'Source Code',
    categorySlug: 'landing',
    price: 2800,
    sellerId: 'seller-2',
    sellerName: 'SoftCraft BD',
    isVerifiedSeller: true,
    rating: 4.8,
    salesCount: 98,
    shortDescBn: 'ডিজিটাল ফাইল, AI প্রম্পট, থিম এবং টেমপ্লেট বিক্রির জন্য আধুনিক Next.js সোর্স কোড।',
    shortDescEn: 'Modern Next.js source code for selling digital files, AI prompts, themes, and templates.',
    fullDescBn: 'পিক্সমার্ট সোর্স কোডের সাহায্যে আপনি নিজস্ব ডিজিটাল প্রোডাক্ট ডাউনলোড স্টোর চালু করতে পারবেন। এর মধ্যে ইন্সট্যান্ট জিপ ফাইল ডাউনলোড ও ইনস্ট্যান্ট অ্যাক্সেস মেকানিজম সংমোজিত।',
    fullDescEn: 'Launch your own digital product store with PixMart. Features instant ZIP download links and license management.',
    techStack: ['React', 'TypeScript', 'Prisma', 'Tailwind CSS'],
    includedFiles: ['Next.js Source Code', 'Prisma Schema', 'Documentation'],
    demoUrl: 'https://demo.example.com/pixmart',
    downloadUrl: 'https://cdn.websitebazerbd.com/downloads/pixmart-v1.2.zip',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'Approved',
    createdAt: '2026-02-01'
  },
  {
    id: 'listing-103',
    slug: 'edupro-lms-school-management',
    titleBn: 'এডুপ্রো - অনলাইন এলএমএস ও স্কুল ম্যানেজমেন্ট সাইট টেমপ্লেট',
    titleEn: 'EduPro - Online LMS & School Management System',
    type: 'Template',
    categorySlug: 'education',
    price: 1800,
    sellerId: 'seller-1',
    sellerName: 'ThemeLooks BD',
    isVerifiedSeller: true,
    rating: 4.7,
    salesCount: 64,
    shortDescBn: 'অনলাইন কোর্স বিক্রি, স্টুডেন্ট ড্যাশবোর্ড এবং সার্টিফিকেট জেনারেটর সমৃদ্ধ LMS সাইট।',
    shortDescEn: 'Online course selling platform with student dashboard and automated certificate generator.',
    fullDescBn: 'কোচিং সেন্টার, টিউটর বা অনলাইন একাডেমির জন্য পারফেক্ট LMS টেমপ্লেট। স্টুডেন্ট এনরোলমেন্ট, কুইজ সিস্টেমে সমৃদ্ধ।',
    fullDescEn: 'Perfect LMS template for coaching centers and academies. Complete with course enrollments and quizzes.',
    techStack: ['HTML5', 'Tailwind CSS', 'Alpine.js'],
    includedFiles: ['HTML/CSS Templates', 'Documentation', 'Figma Files'],
    demoUrl: 'https://demo.example.com/edupro',
    downloadUrl: 'https://cdn.websitebazerbd.com/downloads/edupro-html-v1.zip',
    coverImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'Approved',
    createdAt: '2026-02-10'
  },
  {
    id: 'listing-104',
    slug: 'newsbd-bangla-newspaper-portal',
    titleBn: 'নিউজবিডি - গতিশীল বাংলা নিউজ পোর্টাল ও ব্লগ ওয়েবসাইট',
    titleEn: 'NewsBD - Dynamic Bangla Newspaper & Portal Website',
    type: 'Complete Website',
    categorySlug: 'blog',
    price: 2200,
    sellerId: 'seller-3',
    sellerName: 'DevZone Studio',
    isVerifiedSeller: false,
    rating: 4.6,
    salesCount: 51,
    shortDescBn: 'বিজ্ঞাপন ম্যানেজমেন্ট, লাইভ ব্রেকিং নিউজ আপডেট এবং সার্চ ইঞ্জিন অপটিমাইজড অনলাইন পত্রিকা।',
    shortDescEn: 'Ad management ready, SEO optimized live online newspaper portal script.',
    fullDescBn: 'নিউজবিডি পোর্টালের মাধ্যমে সহজেই অনলাইন নিউজ মিডিয়া প্রকাশ করা সম্ভব। অ্যাডভার্টাইজ স্লট ও অটো সোশ্যাল শেয়ার অপশন রয়েছে।',
    fullDescEn: 'Publish news online with ease using NewsBD. Features ad banner placements and auto social sharing.',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap 5'],
    includedFiles: ['Laravel Full Code', 'SQL Schema', 'Video Guide'],
    demoUrl: 'https://demo.example.com/newsbd',
    downloadUrl: 'https://cdn.websitebazerbd.com/downloads/newsbd-v3.0.zip',
    coverImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'Approved',
    createdAt: '2026-02-20'
  }
];

export const initialOrders = [
  {
    id: 'ORD-9081',
    listingId: 'listing-101',
    listingTitleBn: 'কার্টলি - মাল্টিভেন্ডর ই-কমার্স ফুল ওয়েবসাইট ও অ্যাপ কোড',
    listingTitleEn: 'Kartly - Multivendor eCommerce CMS & App Source Code',
    amount: 3500,
    buyerId: 'user-customer',
    buyerName: 'Rafiq Islam',
    paymentMethod: 'bKash',
    senderMobile: '01818671023',
    trxId: 'BK892311X2',
    status: 'Approved', // Approved, Pending, Rejected
    downloadUrl: 'https://cdn.websitebazerbd.com/downloads/kartly-v2.4-full.zip',
    createdAt: '2026-03-01'
  },
  {
    id: 'ORD-9082',
    listingId: 'listing-102',
    listingTitleBn: 'পিক্সমার্ট - ডিজিটাল প্রোডাক্ট ও AI সার্ভিস বিক্রি মার্কেটপ্লেস স্ক্রিপ্ট',
    listingTitleEn: 'PixMart - Digital Products & AI Tools Marketplace Script',
    amount: 2800,
    buyerId: 'user-customer',
    buyerName: 'Rafiq Islam',
    paymentMethod: 'Nagad',
    senderMobile: '01712345678',
    trxId: 'NG7712399A',
    status: 'Pending',
    downloadUrl: 'https://cdn.websitebazerbd.com/downloads/pixmart-v1.2.zip',
    createdAt: '2026-03-05'
  }
];

export const initialSiteSettings = {
  bkashNumber: '01818671023',
  nagadNumber: '01329885689',
  siteName: 'Website Bazer BD',
  supportEmail: 'support@websitebazerbd.com',
  supportPhone: '+880 1818-671023',
  defaultLang: 'bn'
};
