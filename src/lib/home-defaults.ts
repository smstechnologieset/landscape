export interface LocalizedPair {
  en: string;
  am: string;
}

export interface HomePageContent {
  hero: {
    badge_date: LocalizedPair;
    badge_subtitle: LocalizedPair;
    headline: LocalizedPair;
    description: LocalizedPair;
    primary_btn: { label: LocalizedPair; url: string };
    secondary_btn: { label: LocalizedPair; url: string };
    metrics: {
      m1: { value: string; label: LocalizedPair };
      m2: { value: string; label: LocalizedPair };
      m3: { value: string; label: LocalizedPair };
    };
    visual_card: {
      tag: LocalizedPair;
      caption_title: LocalizedPair;
      caption_desc: LocalizedPair;
    };
    hero_image?: string;
  };
  who_we_are: {
    eyebrow: LocalizedPair;
    headline: LocalizedPair;
    p1: LocalizedPair;
    p2: LocalizedPair;
    fact_badge: { year: string; label: LocalizedPair };
    pillar_specialization: { label: LocalizedPair; value: LocalizedPair };
    pillar_focus: { label: LocalizedPair; value: LocalizedPair };
    cta_btn: { label: LocalizedPair; url: string };
    image?: string;
  };
  why_choose_us: {
    eyebrow: LocalizedPair;
    headline: LocalizedPair;
    description: LocalizedPair;
    team_image?: string;
    strengths: Array<{
      title: LocalizedPair;
      desc: LocalizedPair;
    }>;
  };
  cta_banner: {
    badge: LocalizedPair;
    headline: LocalizedPair;
    description: LocalizedPair;
    primary_btn: { label: LocalizedPair; url: string };
    secondary_btn: { label: LocalizedPair; url: string };
  };
}

export const DEFAULT_HOME_CONTENT: HomePageContent = {
  hero: {
    badge_date: {
      en: "Est. 2026 • Addis Ababa",
      am: "የተመሰረተበት ዓ.ም • 2026"
    },
    badge_subtitle: {
      en: "Landscape Architecture & Ecological Infrastructure",
      am: "የአረንጓዴ ልማት እና የመልክአ ምድር መፍትሄዎች"
    },
    headline: {
      en: "Professional Landscape Architecture for a Greener Future",
      am: "ለዘላቂ አረንጓዴ የወደፊት ፕሮፌሽናል የመልክአ ምድር መፍትሄዎች"
    },
    description: {
      en: "Dedicated to creating aesthetically pleasing, functional, and climate-resilient indoor and outdoor environments across Ethiopia through innovation, technical expertise, and environmental responsibility.",
      am: "በፈጠራ ቴክኖሎጂ፣ በአርክቴክቸራል ዲዛይንና በዘላቂ አሰራሮች በመላ ኢትዮጵያ ውብ፣ ተግባራዊ እና ከአየር ንብረት ለውጥ ጋር የተጣጣሙ የመልክአ ምድር ስራዎችን እንገነባለን።"
    },
    primary_btn: {
      label: { en: "Explore 11 Major Services", am: "11ዱን ዋና አገልግሎቶች ይመልከቱ" },
      url: "/services"
    },
    secondary_btn: {
      label: { en: "Request Consultation", am: "ያግኙን / ምክክር ይጠይቁ" },
      url: "/contact"
    },
    metrics: {
      m1: {
        value: "11",
        label: { en: "Specialized Services", am: "ዋና ዋና አገልግሎቶች" }
      },
      m2: {
        value: "2026",
        label: { en: "Founded in Ethiopia", am: "የተቋቋመበት ዓመት" }
      },
      m3: {
        value: "100%",
        label: { en: "Sustainable Focus", am: "ዘላቂና አገር በቀል" }
      }
    },
    visual_card: {
      tag: {
        en: "Biophilic Architecture • Addis Ababa",
        am: "የመልክአ ምድር አርክቴክቸር • አዲስ አበባ"
      },
      caption_title: {
        en: "Sustainable Landscape Master Planning",
        am: "የአረንጓዴ ልማት ማስተር ፕላን"
      },
      caption_desc: {
        en: "Indigenous flora, smart water conservation, and eco-restoration",
        am: "አገር በቀል እፅዋት፣ ዘመናዊ የመስኖ ስርዓት እና የስነ-ምህዳር ጥበቃ"
      }
    },
    hero_image: "/images/hero_landscape.jpg"
  },
  who_we_are: {
    eyebrow: {
      en: "Who We Are",
      am: "ማን ነን"
    },
    headline: {
      en: "Pioneering Sustainable Environments Across Ethiopia",
      am: "ለቀጣይነት ያለው አረንጓዴ ልማት የታመነ አጋር"
    },
    p1: {
      en: "Established in 2026, Landscape Solution PLC was founded to contribute directly to Ethiopia's green development initiatives, addressing climate change and environmental degradation through professional, science-backed landscaping.",
      am: "በ2026 የተቋቋመው ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር፣ በኢትዮጵያ የአረንጓዴ ልማት ጥረቶችን ለመደገፍና የተፈጥሮ ሀብት መመናመንን ለመከላከል የተቋቋመ ፕሮፌሽናል የመልክአ ምድር ድርጅት ነው።"
    },
    p2: {
      en: "We combine innovative technology, creative design, technical expertise, and sustainable practices to enhance biodiversity, elevate urban aesthetics, and foster long-term climate resilience for government institutions, private enterprises, commercial centers, residential properties, and industrial sites.",
      am: "ድርጅቱ የፈጠራ ቴክኖሎጂን፣ አርክቴክቸራል ዲዛይንን፣ የቴክኒክ እውቀትንና ዘላቂ አሰራሮችን በማቀናጀት ለመንግስት ተቋማት፣ ለግል ድርጅቶች፣ ለንግድ ማዕከላት፣ ለመኖሪያ ቤቶች እና ለኢንዱስትሪ ቦታዎች ሁሉን አቀፍ አገልግሎት ይሰጣል።"
    },
    fact_badge: {
      year: "2026",
      label: {
        en: "Founded to Advance Ethiopia's Green Development",
        am: "የተመሰረተበት ዓመት • አዲስ አበባ"
      }
    },
    pillar_specialization: {
      label: { en: "Specialization", am: "ስፔሻላይዜሽን" },
      value: { en: "11 Documented Major Services", am: "11 ዋና ዋና አገልግሎቶች" }
    },
    pillar_focus: {
      label: { en: "Focus", am: "ተልዕኮ" },
      value: { en: "Sustainability & Climate Resilience", am: "ዘላቂነት እና ብዝሃ-ሕይወት" }
    },
    cta_btn: {
      label: { en: "Read Full Company Background →", am: "ሙሉ ታሪካችንን ያንብቡ" },
      url: "/about"
    },
    image: "/images/who_we_are.jpg"
  },
  why_choose_us: {
    eyebrow: {
      en: "Why Choose Landscape Solution PLC",
      am: "ለምን ይመርጡናል"
    },
    headline: {
      en: "Institutional Capabilities Built for Ecological Excellence",
      am: "ለላቀ የስነ-ምህዳር ውጤት የተገነባ ተቋማዊ አቅም"
    },
    description: {
      en: "We combine innovative technology, creative design, technical expertise, and sustainable practices to deliver enduring landscape architecture.",
      am: "ፈጠራን፣ የዲዛይን ጥበብን እና ዘላቂ አሰራርን በማቀናጀት አስተማማኝ የመልክአ ምድር ስራዎችን እናከናውናለን።"
    },
    team_image: "/images/who_we_are.jpg",
    strengths: [
      {
        title: {
          en: "Scientific Horticultural Approach",
          am: "ሳይንሳዊ የሆርቲካልቸር እውቀት"
        },
        desc: {
          en: "Soil testing, indigenous plant curation, micro-climate analysis, and precision biological fertilization.",
          am: "የአፈር ምርመራ፣ ለአየር ንብረት ተስማሚ የሆኑ እፅዋትን መምረጥ እና ተፈጥሯዊ ማዳበሪያን መጠቀም።"
        }
      },
      {
        title: {
          en: "Custom Aesthetic & Functional Design",
          am: "ልዩ ውበትና ተግባራዊ ዲዛይን"
        },
        desc: {
          en: "CAD spatial drafting, 3D architectural rendering, and functional spatial integration.",
          am: "በዘመናዊ የኮምፒውተር ዲዛይን የታገዘ እና የተጠቃሚውን ፍላጎት ያማከለ ተግባራዊ የመልክአ ምድር ፕላን።"
        }
      },
      {
        title: {
          en: "Quality & Climate Resilience",
          am: "ዘላቂ ጥራትና ከአየር ንብረት ጋር መጣጣም"
        },
        desc: {
          en: "Selecting drought-hardy Ethiopian highland flora, smart drip networks, and climate-adaptive materials.",
          am: "ድርቅን የሚቋቋሙ አገር በቀል እፅዋትን፣ ዘመናዊ የመስኖ ቴክኖሎጂዎችን እና ጠንካራ ቁሳቁሶችን መጠቀም።"
        }
      },
      {
        title: {
          en: "Integrated End-to-End Capabilities",
          am: "ሁሉን አቀፍ የመፍትሄ ፓኬጅ"
        },
        desc: {
          en: "Complete synergy across master planning, nursery propagation, earthworks construction, and long-term care.",
          am: "ከፕላንና ዲዛይን ጀምሮ እስከ ግንባታ፣ ችግኝ ማፍራት፣ ተከላ እና ቀጣይ ጥገና ድረስ የተሟላ አገልግሎት።"
        }
      }
    ]
  },
  cta_banner: {
    badge: {
      en: "Let's Collaborate",
      am: "አብረን እንስራ"
    },
    headline: {
      en: "Let's build greener, healthier environments together.",
      am: "አረንጓዴና ጤናማ አካባቢዎችን በጋራ እንገንባ"
    },
    description: {
      en: "Whether planning a new commercial development, municipal green corridor, or private estate landscape, our team is ready to assist.",
      am: "ለመንግስት፣ ለንግድ ተቋም ወይም ለመኖሪያ ቤትዎ ፕሮፌሽናል የመልክአ ምድር መፍትሄ ዛሬውኑ ያነጋግሩን።"
    },
    primary_btn: {
      label: { en: "Contact Us Today", am: "ያግኙን" },
      url: "/contact"
    },
    secondary_btn: {
      label: { en: "Explore All Services", am: "አገልግሎቶቻችንን ያስሱ" },
      url: "/services"
    }
  }
};
