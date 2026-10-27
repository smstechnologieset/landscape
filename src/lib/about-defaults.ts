import { LocalizedPair } from "./home-defaults";

export interface SpecificObjective {
  id: number;
  title: LocalizedPair;
  desc: LocalizedPair;
}

export interface ValueCard {
  number: string;
  title: LocalizedPair;
  desc: LocalizedPair;
}

export interface AboutPageContent {
  hero: {
    badge: LocalizedPair;
    title: LocalizedPair;
    description: LocalizedPair;
    image: string;
  };
  background_context: {
    eyebrow: LocalizedPair;
    headline: LocalizedPair;
    p1: LocalizedPair;
    p2: LocalizedPair;
    p3: LocalizedPair;
    quote: LocalizedPair;
    image: string;
    city_tag: LocalizedPair;
    brand_title: string;
    established_year: string;
    headquarters: string;
    brochure_url: string;
    brochure_btn_label: LocalizedPair;
  };
  vision_mission: {
    vision_badge: LocalizedPair;
    vision: LocalizedPair;
    mission_badge: LocalizedPair;
    mission: LocalizedPair;
    mission_subtitle: LocalizedPair;
  };
  objectives: {
    eyebrow: LocalizedPair;
    headline: LocalizedPair;
    general_badge: LocalizedPair;
    general_objective: LocalizedPair;
    specific: SpecificObjective[];
  };
  values_section: {
    eyebrow: LocalizedPair;
    headline: LocalizedPair;
    items: ValueCard[];
  };
  strategic_engagement: {
    eyebrow: LocalizedPair;
    headline: LocalizedPair;
    description: LocalizedPair;
  };
}

export const DEFAULT_ABOUT_CONTENT: AboutPageContent = {
  hero: {
    badge: {
      en: "Corporate Profile",
      am: "ኦፊሴላዊ የድርጅት መገለጫ"
    },
    title: {
      en: "Dedicated to Sustainable Green Development in Ethiopia",
      am: "ለአረንጓዴ፣ ውብ እና ዘላቂ ኢትዮጵያ ቁርጠኝነት"
    },
    description: {
      en: "Established in 2026 in Addis Ababa, combining professional landscape architecture, plant science, and environmental responsibility to build resilient communities.",
      am: "በ2026 በአዲስ አበባ የተመሰረተው ላንድስኬፕ ሶሉሽን፣ የስነ-ምህዳር ጥበቃን ከዘመናዊ አርክቴክቸራል ዲዛይን ጋር በማቀናጀት የላቀ አገልግሎት ይሰጣል።"
    },
    image: "/images/hero_landscape.jpg"
  },
  background_context: {
    eyebrow: {
      en: "Background & Context",
      am: "ዳራ እና መነሻ"
    },
    headline: {
      en: "Responding to Ethiopia's Environmental & Greening Demands",
      am: "ለአገራዊ አረንጓዴ ልማት ጥረቶች የተሰጠ ሙያዊ ምላሽ"
    },
    p1: {
      en: "Ethiopia is implementing a range of development initiatives, including green development, to address the impacts of trans-boundary climate change, deforestation, and environmental degradation associated with population growth and increasing demand for natural resources.",
      am: "ኢትዮጵያ ከህዝብ ቁጥር መጨመር እና ከተፈጥሮ ሀብት ፍላጎት ጋር ተያይዞ የሚከሰተውን ድንበር ተሻጋሪ የአየር ንብረት ለውጥ፣ የደን መጨፍጨፍ እና የአካባቢ መራቆትን ለመቅረፍ የአረንጓዴ ልማትን ጨምሮ በርካታ የልማት ተግባራትን ተግባራዊ እያደረገች ትገኛለች።"
    },
    p2: {
      en: "Landscape Solution PLC, established in 2026, was founded to contribute to these efforts as a professional landscaping company dedicated to creating aesthetically pleasing, functional, and sustainable indoor and outdoor environments. The company provides comprehensive landscape planning, design, implementation, and maintenance services for government institutions, private businesses, commercial developments, residential properties, and industrial sites.",
      am: "በ2026 የተቋቋመው ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር፣ ውበት ያላቸው፣ ተግባራዊ እና ዘላቂ የሆኑ የውስጥና የውጪ የተፈጥሮ አካባቢዎችን በመፍጠር ለነዚህ ጥረቶች አስተዋጽኦ ለማበርከት የተመሰረተ ፕሮፌሽናል የመልክአ ምድር ድርጅት ነው። ድርጅቱ ለመንግስታዊ ተቋማት፣ ለግል ድርጅቶች፣ ለንግድ ማዕከላት፣ ለመኖሪያ ቤቶች እና ለኢንዱስትሪ ቦታዎች ሁሉን አቀፍ አገልግሎት ይሰጣል።"
    },
    p3: {
      en: "With a team of skilled, experienced, and dedicated professionals, Landscape Solution PLC is committed to delivering customized, high-quality, sustainable, and cost-effective landscape solutions tailored to the specific needs of each client. By integrating professional expertise with environmental responsibility, the company contributes to healthier communities, greener cities, enhanced biodiversity, environmental restoration, and improved quality of life.",
      am: "በሆርቲካልቸር፣ በመልክአ ምድር አርክቴክቸርና በአካባቢ ሳይንስ የሰለጠኑ ባለሙያዎችን በማቀናጀት፣ ድርጅታችን ጥራት ያላቸውንና ወጪ ቆጣቢ የመልክአ ምድር መፍትሄዎችን ለደንበኞች ፍላጎት አመቺ በሆነ መልኩ ያዘጋጃል።"
    },
    quote: {
      en: "Landscape Solution PLC aspires to become a trusted and leading partner in sustainable landscaping, nursery development, environmental restoration, and green infrastructure in Ethiopia, contributing to a greener, healthier, and more climate-resilient future.",
      am: "ላንድስኬፕ ሶሉሽን በዘላቂ የመልክአ ምድር ስራዎች፣ የችግኝ ማፍያ ልማት እና የተፈጥሮ አካባቢ ጥበቃ ዘርፍ በኢትዮጵያ ቀዳሚና እጅግ የታመነ አጋር ለመሆን ይተጋል።"
    },
    image: "/images/who_we_are.jpg",
    city_tag: {
      en: "Addis Ababa, Ethiopia",
      am: "አዲስ አበባ፣ ኢትዮጵያ"
    },
    brand_title: "Landscape Solution PLC",
    established_year: "2026",
    headquarters: "Sur Construction Building, 8th Floor, Addis Ababa, Ethiopia",
    brochure_url: "/downloads/landscape_solution_profile.pdf",
    brochure_btn_label: {
      en: "Download Brochure (PDF)",
      am: "የድርጅቱን ብሮሹር አውርድ (PDF)"
    }
  },
  vision_mission: {
    vision_badge: {
      en: "Our Vision 2030",
      am: "የረጅም ጊዜ ራዕይ"
    },
    vision: {
      en: "By 2030, to become Ethiopia's most trusted landscape solutions company, recognized for excellence, innovation, and sustainable green development while enhancing quality of life and protecting the environment.",
      am: "እስከ 2030 ድረስ፣ የህይወት ጥራትን በማሻሻልና አካባቢን በመጠበቅ፣ በላቀ ደረጃ፣ በፈጠራና በዘላቂ አረንጓዴ ልማት የታወቀ በኢትዮጵያ ውስጥ እጅግ የታመነ የመልክአ ምድር መፍትሄዎች ኩባንያ መሆን።"
    },
    mission_badge: {
      en: "Our Mission",
      am: "የተልዕኮ መግለጫ"
    },
    mission: {
      en: "To become a trusted partner in creating sustainable landscapes by providing integrated services in landscape planning and design, construction, botanic garden and nursery development, irrigation systems, urban greening, restoration, training, outreach programs, and landscape maintenance that support economic growth and environmental resilience in Ethiopia.",
      am: "በኢትዮጵያ ኢኮኖሚያዊ ዕድገትን እና የአካባቢ ጥንካሬን የሚደግፉ የመልክአ ምድር ፕላን እና ዲዛይን፣ ግንባታ፣ የዕፅዋት ማዕከል እና የችግኝ ማፍያ ልማት፣ የመስኖ ሥርዓቶች፣ የከተማ አረንጓዴ ልማት፣ መልሶ ማቋቋም፣ ስልጠና፣ የማህበረሰብ ተደራሽነት ፕሮግራሞች እና የመልክአ ምድር ጥገና የተቀናጁ አገልግሎቶችን በማቅረብ ዘላቂ መልክአ ምድሮችን በመፍጠር የታመነ አጋር መሆን።"
    },
    mission_subtitle: {
      en: "Integrated Environmental Solutions for Ethiopia",
      am: "ሁሉን አቀፍ የመልክአ ምድር መፍትሄዎች"
    }
  },
  objectives: {
    eyebrow: {
      en: "Objectives",
      am: "ግብ እና አላማዎች"
    },
    headline: {
      en: "General & Specific Objectives",
      am: "አጠቃላይ እና ዝርዝር ግቦች"
    },
    general_badge: {
      en: "General Objective",
      am: "አጠቃላይ ግብ"
    },
    general_objective: {
      en: "To provide innovative, sustainable, and superior landscape, nursery, and environmental management solutions that improve urban and rural settings, strengthen ecological balance, and support Ethiopia's socioeconomic development and climatic resilience.",
      am: "የከተማና የገጠር አካባቢዎችን የሚያሻሽሉ፣ የስነ-ምህዳር ሚዛንን የሚያጠናክሩ እና የኢትዮጵያን ማህበራዊና ኢኮኖሚያዊ ዕድገት እንዲሁም የአየር ንብረት ጥንካሬን የሚደግፉ አዳዲስ፣ ዘላቂና የላቁ የመልክአ ምድር፣ የችግኝ ማፍያና የአካባቢ ጥበቃ መፍትሄዎችን ማቅረብ።"
    },
    specific: [
      {
        id: 1,
        title: { en: "Aesthetic & Sustainable Landscapes", am: "ውብና ዘላቂ መልክአ ምድሮች" },
        desc: {
          en: "To design, develop, and maintain aesthetically attractive, functional, and environmentally sustainable landscapes for public, private, and commercial clients.",
          am: "ለመንግስት፣ ለግል እና ለንግድ ደንበኞች ማራኪ፣ ተግባራዊ እና ከአካባቢ ጥበቃ ጋር የተጣጣሙ ዘላቂ መልክአ ምድሮችን መንደፍ፣ ማልማት እና መንከባከብ።"
        }
      },
      {
        id: 2,
        title: { en: "Modern Plant Nurseries", am: "ዘመናዊ የችግኝ ማፍያ ማዕከላት" },
        desc: {
          en: "To establish and manage modern plant nurseries that produce high-quality native, alternative ornamental, indigenous, fruit, forest, and medicinal plants.",
          am: "ከፍተኛ ጥራት ያላቸውን አገር በቀል፣ አማራጭ ጌጣጌጥ፣ ፍራፍሬ፣ ደን እና የመድኃኒት ዕፅዋት ችግኞችን የሚያመርቱ ዘመናዊ የችግኝ ጣቢያዎችን ማቋቋምና ማስተዳደር።"
        }
      },
      {
        id: 3,
        title: { en: "Urban Greening & Reforestation", am: "የከተማ አረንጓዴ ልማትና መልሶ ደን ማልማት" },
        desc: {
          en: "To promote urban greening and reforestation through tree planting, park development, roadside landscaping, and green infrastructure projects.",
          am: "በዛፍ ተከላ፣ በፓርክ ልማት፣ በመንገድ ዳርቻ መልክአ ምድር እና በአረንጓዴ መሰረተ-ልማት ፕሮጀክቶች አማካኝነት የከተማ አረንጓዴ ልማትን እና መልሶ ደን ማልማትን ማስፋፋት።"
        }
      },
      {
        id: 4,
        title: { en: "Professional Consultancy & Planning", am: "የባለሙያ አማካሪነት አገልግሎት" },
        desc: {
          en: "To provide professional consultancy services in landscape architecture, environmental planning, irrigation systems, and green space management.",
          am: "በመልክአ ምድር አርክቴክቸር፣ በአካባቢ ፕላን፣ በመስኖ ሥርዓቶች እና በአረንጓዴ ቦታዎች አስተዳደር ላይ የሙያ አማካሪነት አገልግሎት መስጠት።"
        }
      },
      {
        id: 5,
        title: { en: "Climate-Smart Landscaping", am: "የአየር ንብረት ተስማሚ አሰራር" },
        desc: {
          en: "To implement climate-smart landscaping practices that conserve biodiversity and adapt to changing climate realities.",
          am: "ብዝሃ-ሕይወትን የሚጠብቁ እና ከአየር ንብረት ለውጥ ጋር የሚጣጣሙ ብልህ የመልክአ ምድር አሰራሮችን ተግባራዊ ማድረግ።"
        }
      },
      {
        id: 6,
        title: { en: "Organic Compost & Soil Health", am: "ኦርጋኒክ ኮምፖስት ማምረት" },
        desc: {
          en: "To produce and promote organic compost and sustainable biological soil enrichers for chemical-free soil fertility.",
          am: "ኬሚካል አልባ የአፈር ለምነትን ለማረጋገጥ የተፈጥሮ ማዳበሪያና ኦርጋኒክ ኮምፖስት ማምረት እና ማስተዋወቅ።"
        }
      },
      {
        id: 7,
        title: { en: "Efficient Water & Irrigation Systems", am: "ውሃ ቆጣቢ የመስኖ ሥርዓቶች" },
        desc: {
          en: "To design and install efficient irrigation systems that optimize water use in landscapes and nurseries.",
          am: "በመልክአ ምድርና በችግኝ ጣቢያዎች ውስጥ የውሃ አጠቃቀምን የሚቆጥቡና የሚያሻሽሉ ዘመናዊ የመስኖ ሥርዓቶችን መዘርጋት።"
        }
      },
      {
        id: 8,
        title: { en: "Environmental Restoration", am: "የተራቆቱ መሬቶችን ማቋቋም" },
        desc: {
          en: "To undertake environmental restoration and ecological rehabilitation projects on degraded landscapes.",
          am: "በተራቆቱ መሬቶችና የተፈጥሮ አካባቢዎች ላይ ስነ-ምህዳራዊ መልሶ ማቋቋም እና የመልሶ ማልማት ፕሮጀክቶችን ማካሄድ።"
        }
      },
      {
        id: 9,
        title: { en: "Community & Institutional Training", am: "ስልጠና እና የአቅም ግንባታ" },
        desc: {
          en: "To build the capacity of communities, institutions, and professionals through targeted horticultural and environmental trainings.",
          am: "በሆርቲካልቸር እና በአካባቢ ጥበቃ ተግባራት ዙሪያ የማህበረሰቡን፣ የተቋማትን እና የባለሙያዎችን አቅም በስልጠና ማጎልበት።"
        }
      },
      {
        id: 10,
        title: { en: "Employment & Socioeconomic Growth", am: "የስራ ዕድል ፈጠራ" },
        desc: {
          en: "To create meaningful employment opportunities in the green economy for youth and landscaping practitioners.",
          am: "በአረንጓዴው ኢኮኖሚ ዘርፍ ለወጣቶችና ለባለሙያዎች አስተማማኝና ዘላቂ የስራ ዕድሎችን መፍጠር።"
        }
      },
      {
        id: 11,
        title: { en: "Strategic Partnerships", am: "ስትራቴጂካዊ አጋርነቶች" },
        desc: {
          en: "To foster partnerships with government agencies, development organizations, research institutions, and the private sector.",
          am: "ከመንግስት ተቋማት፣ ከልማት ድርጅቶች፣ ከምርምር ተቋማት እና ከግሉ ዘርፍ ጋር ጠንካራ የትብብር አጋርነት መፍጠር።"
        }
      },
      {
        id: 12,
        title: { en: "Modern Technology & Innovation", am: "ዘመናዊ ቴክኖሎጂ እና ፈጠራ" },
        desc: {
          en: "To continuously adopt modern technologies and innovative ecological practices in all projects.",
          am: "በሁሉም ፕሮጀክቶች ውስጥ ዘመናዊ ቴክኖሎጂዎችን እና አዳዲስ ስነ-ምህዳራዊ አሰራሮችን በተከታታይ መተግበር።"
        }
      }
    ]
  },
  values_section: {
    eyebrow: {
      en: "Core Values",
      am: "እሴቶቻችን"
    },
    headline: {
      en: "Our Foundational Values",
      am: "የምንመራባቸው 6 እሴቶቻችን"
    },
    items: [
      {
        number: "01",
        title: { en: "Sustainability", am: "ዘላቂነት" },
        desc: {
          en: "Integrating eco-friendly practices, water efficiency, organic inputs, and long-term ecological balance into every landscape we design.",
          am: "በምንሰራቸው ስራዎች ሁሉ የስነ-ምህዳር ሚዛንን፣ የውሃ ቆጣቢነትንና የተፈጥሮ ግብዓቶችን ቅድሚያ እንሰጣለን።"
        }
      },
      {
        number: "02",
        title: { en: "Quality", am: "ጥራት" },
        desc: {
          en: "Delivering superior horticultural standards, durable materials, refined craftsmanship, and enduring environmental excellence.",
          am: "ከፍተኛ የሆርቲካልቸር ደረጃን፣ ዘላቂ ጥንካሬ ያላቸውን ግብዓቶችና የላቀ የሙያ አሰራርን እናረጋግጣለን።"
        }
      },
      {
        number: "03",
        title: { en: "Innovation", am: "ፈጠራ" },
        desc: {
          en: "Continuously adopting modern landscaping technologies, precision irrigation engineering, and creative spatial solutions.",
          am: "ዘመናዊ ቴክኖሎጂዎችን፣ ትክክለኛ የመስኖ ምህንድስናንና አዳዲስ የዲዛይን እሳቤዎችን በተከታታይ እንተገብራለን።"
        }
      },
      {
        number: "04",
        title: { en: "Community Engagement", am: "የማህበረሰብ ተሳትፎ" },
        desc: {
          en: "Promoting knowledge sharing, local employment generation, environmental outreach, and public green space stewardship.",
          am: "ዕውቀትን በማጋራት፣ የስራ ዕድሎችን በመፍጠርና የአካባቢ ጥበቃ ንቅናቄዎችን በማበረታታት ከህብረተሰቡ ጋር እንሰራለን።"
        }
      },
      {
        number: "05",
        title: { en: "Integrity", am: "ታማኝነት" },
        desc: {
          en: "Maintaining the highest ethical and professional standards in all business relationships, client interactions, and project delivery.",
          am: "በሁሉም የንግድ ግንኙነቶች፣ የደንበኞች አያያዝ እና የፕሮጀክት አፈጻጸም ውስጥ ከፍተኛ የሙያ ስነ-ምግባር እና ታማኝነትን እንጠብቃለን።"
        }
      },
      {
        number: "06",
        title: { en: "Biodiversity Conservation", am: "የብዝሃ-ሕይወት ጥበቃ" },
        desc: {
          en: "Protecting, propagating, and promoting indigenous Ethiopian flora, native trees, and ecologically vital habitats across all projects.",
          am: "አገር በቀል የኢትዮጵያ እፅዋትን፣ የደን ዛፎችን እና ለስነ-ምህዳር ወሳኝ የሆኑ የተፈጥሮ አካባቢዎችን እንጠብቃለን፣ እናባዛለን።"
        }
      }
    ]
  },
  strategic_engagement: {
    eyebrow: {
      en: "Strategic Engagement",
      am: "አጋሮችና ባለድርሻ አካላት"
    },
    headline: {
      en: "Sectors & Organizations Landscape Solution Seeks to Engage With",
      am: "ድርጅቱ ሊሰራባቸው ያቀዳቸው ዘርፎችና ባለድርሻ አካላት"
    },
    description: {
      en: "Identified in our founding charter as key institutional, governmental, and private collaborators for sustainable green infrastructure and environmental initiatives across Ethiopia.",
      am: "በድርጅቱ ሰነድ የተለዩና ወደፊት በትብብርና በጋራ ለመስራት የታለሙ የዲፕሎማቲክ፣ የመንግስት፣ የትምህርት፣ የልማት ድርጅቶችና የግሉ ዘርፍ ተቋማት።"
    }
  }
};
