import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "building-realtime-analytics-pipeline",
    title: "Building a Real-Time Analytics Pipeline at Scale",
    excerpt:
      "How we process 50 billion events per day with sub-100ms latency using Kafka, Flink, and a purpose-built query layer.",
    date: "2024-09-12",
    readTime: 8,
    category: "Engineering",
    locale: "en",
  },
  {
    slug: "predictive-modeling-for-saas",
    title: "Predictive Modeling for SaaS: A Practical Guide",
    excerpt:
      "Moving beyond vanity metrics to build ML models that actually predict churn, expansion revenue, and customer health scores.",
    date: "2024-08-28",
    readTime: 6,
    category: "Product",
    locale: "en",
  },
  {
    slug: "rtl-support-data-products",
    title: "RTL Support in Data Products: Lessons Learned",
    excerpt:
      "Building bi-directional interfaces for Arabic and Hebrew markets taught us more about accessibility and design systems than we expected.",
    date: "2024-08-10",
    readTime: 5,
    category: "Design",
    locale: "en",
  },
];

export const blogPostsAr: BlogPost[] = [
  {
    slug: "building-realtime-analytics-pipeline",
    title: "بناء خط أنابيب تحليلات في الوقت الفعلي على نطاق واسع",
    excerpt:
      "كيف نعالج 50 مليار حدث يومياً بزمن استجابة أقل من 100 مللي ثانية باستخدام Kafka وFlink وطبقة استعلام مصممة خصيصاً.",
    date: "2024-09-12",
    readTime: 8,
    category: "هندسة",
    locale: "ar",
  },
  {
    slug: "predictive-modeling-for-saas",
    title: "النمذجة التنبؤية لـ SaaS: دليل عملي",
    excerpt:
      "تجاوز مقاييس الغرور لبناء نماذج تعلم آلي تتنبأ فعلياً بالاضطراب وإيرادات التوسع ودرجات صحة العملاء.",
    date: "2024-08-28",
    readTime: 6,
    category: "منتج",
    locale: "ar",
  },
  {
    slug: "rtl-support-data-products",
    title: "دعم RTL في منتجات البيانات: دروس مستفادة",
    excerpt:
      "بناء واجهات ثنائية الاتجاه للأسواق العربية والعبرية علمنا الكثير عن إمكانية الوصول وأنظمة التصميم.",
    date: "2024-08-10",
    readTime: 5,
    category: "تصميم",
    locale: "ar",
  },
];

export function getBlogPosts(locale: string): BlogPost[] {
  return locale === "ar" ? blogPostsAr : blogPosts;
}

export function getBlogPost(slug: string, locale: string): BlogPost | undefined {
  const posts = getBlogPosts(locale);
  return posts.find((p) => p.slug === slug);
}
