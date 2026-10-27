import { LocalizedPair } from "./home-defaults";

export interface SustainabilityPillar {
  number: string;
  title: LocalizedPair;
  desc: LocalizedPair;
  image: string;
}

export interface SustainabilityInitiative {
  icon: string;
  title: LocalizedPair;
  desc: LocalizedPair;
}

export interface SustainabilityStat {
  value: string;
  label: LocalizedPair;
}

export interface SustainabilityPageContent {
  hero: {
    badge: LocalizedPair;
    title: LocalizedPair;
    description: LocalizedPair;
    image: string;
  };
  national_context: {
    eyebrow: LocalizedPair;
    headline: LocalizedPair;
    p1: LocalizedPair;
    p2: LocalizedPair;
    statistics: SustainabilityStat[];
  };
  pillars_section: {
    eyebrow: LocalizedPair;
    headline: LocalizedPair;
    subtitle: LocalizedPair;
    pillars: SustainabilityPillar[];
  };
  initiatives_section: {
    eyebrow: LocalizedPair;
    headline: LocalizedPair;
    items: SustainabilityInitiative[];
  };
  cta: {
    headline: LocalizedPair;
    subtitle: LocalizedPair;
    primary_btn_text: LocalizedPair;
    primary_btn_url: string;
    secondary_btn_text: LocalizedPair;
    secondary_btn_url: string;
  };
}

export const DEFAULT_SUSTAINABILITY_CONTENT: SustainabilityPageContent = {
  hero: {
    badge: {
      en: "Ecological Commitment & Green Development",
      am: "የአካባቢ ጥበቃ እና ዘላቂ ልማት"
    },
    title: {
      en: "Building Green Infrastructure & Climate Resilience",
      am: "ለተፈጥሮ ተስማሚ አሰራር፣ ለዘላቂ አረንጓዴ ልማት"
    },
    description: {
      en: "Founded directly in response to deforestation, land degradation, and climate change in Ethiopia, our mission integrates ecological restoration, water conservation, and native flora propagation into every project.",
      am: "የአየር ንብረት ለውጥን ለመቋቋም፣ የደን መጨፍጨፍን ለመከላከል እና ብዝሃ-ሕይወትን ለመጠበቅ ሳይንሳዊ የመልክአ ምድር መፍትሄዎችን እንተገብራለን።"
    },
    image: "/images/service_restoration.jpg"
  },
  national_context: {
    eyebrow: {
      en: "The National Context & Urgent Imperative",
      am: "አገራዊ ጥሪ እና ወቅታዊ ተልዕኮ"
    },
    headline: {
      en: "Addressing Climate Challenges Through Professional Action",
      am: "የአካባቢ ጥበቃ ተግዳሮቶችን በሙያዊ መፍትሄዎች መመለስ"
    },
    p1: {
      en: "Ethiopia is actively implementing a range of development initiatives, including green development, to address the impacts of trans-boundary climate change, deforestation, and environmental degradation associated with population growth and increasing demand for natural resources.",
      am: "ኢትዮጵያ ከህዝብ ቁጥር መጨመር እና ከተፈጥሮ ሀብት ፍላጎት ጋር ተያይዞ የሚከሰተውን ድንበር ተሻጋሪ የአየር ንብረት ለውጥ፣ የደን መጨፍጨፍ እና የአካባቢ መራቆትን ለመቅረፍ የአረንጓዴ ልማትን ጨምሮ በርካታ የልማት ተግባራትን ተግባራዊ እያደረገች ትገኛለች።"
    },
    p2: {
      en: "Landscape Solution PLC was founded to be an active institutional force in this transformation. By replacing chemical-heavy practices with organic composting, establishing water-saving drip networks, propagating native seedlings, and restoring degraded terrains, we translate environmental policy into living, thriving green realities.",
      am: "ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር በእነዚህ አገራዊ ጥረቶች ውስጥ ንቁ ተሳታፊ ለመሆን የተመሰረተ ነው። ኬሚካል አልባ የተፈጥሮ ማዳበሪያን በመጠቀም፣ ውሃ ቆጣቢ የጠብታ መስኖዎችን በመዘርጋት እና አገር በቀል ዛፎችን በማልማት የአካባቢ ጥበቃ ፖሊሲን በተግባር እንተረጉማለን።"
    },
    statistics: [
      {
        value: "60%",
        label: {
          en: "Water Savings with Smart Drip",
          am: "የውሃ ቁጠባ በዘመናዊ ጠብታ መስኖ"
        }
      },
      {
        value: "100%",
        label: {
          en: "Organic Soil Enrichment",
          am: "የተፈጥሮ ማዳበሪያ አጠቃቀም"
        }
      },
      {
        value: "50k+",
        label: {
          en: "Native Seedlings Propagated",
          am: "የተተከሉ አገር በቀል ችግኞች"
        }
      },
      {
        value: "15+",
        label: {
          en: "Hectares Restored Ecologically",
          am: "በዘላቂነት የተለሙ ሄክታሮች"
        }
      }
    ]
  },
  pillars_section: {
    eyebrow: {
      en: "Core Environmental Pillars",
      am: "የዘላቂነት ምሰሶዎች"
    },
    headline: {
      en: "Our Six Sustainability Principles",
      am: "የስነ-ምህዳር ጥበቃ መርሆዎቻችን"
    },
    subtitle: {
      en: "Every landscape design, nursery propagation schedule, and construction methodology adheres to these six environmental standards.",
      am: "እያንዳንዱ የመልክአ ምድር ዲዛይን፣ የችግኝ ማፍላት እና የግንባታ ስራችን እነዚህን ስድስት የአካባቢ ጥበቃ መስፈርቶች የተከተለ ነው።"
    },
    pillars: [
      {
        number: "01",
        title: {
          en: "Climate Resilience & Green Development",
          am: "የአየር ንብረት ጥንካሬና አረንጓዴ ልማት"
        },
        desc: {
          en: "Founded directly in response to deforestation, environmental degradation, and climate change in Ethiopia, Landscape Solution PLC designs landscapes that act as resilient ecological buffers against heat and drought.",
          am: "በኢትዮጵያ የሚታየውን የደን መመናመንና የአየር ንብረት ለውጥ ለመቋቋም የተመሰረተው ላንድስኬፕ ሶሉሽን፣ ተፈጥሮን የሚከላከሉ አረንጓዴ ስነ-ምህዳሮችን ይገነባል።"
        },
        image: "/images/hero_landscape.jpg"
      },
      {
        number: "02",
        title: {
          en: "Biodiversity & Native Species Conservation",
          am: "ብዝሃ-ሕይወትና አገር በቀል እፅዋት ጥበቃ"
        },
        desc: {
          en: "We actively collect, propagate, and champion native Ethiopian plant varieties, protecting threatened flora and providing essential habitats for indigenous pollinators and birds.",
          am: "አገር በቀል የኢትዮጵያ እፅዋትን በማባዛትና በስራዎቻችን ውስጥ በማካተት ብርቅዬ ዝርያዎችን እንጠብቃለን፤ ለንቦችና ለአዕዋፋት ምቹ መኖሪያ እንፈጥራለን።"
        },
        image: "/images/service_plant_id.jpg"
      },
      {
        number: "03",
        title: {
          en: "Water Stewardship & Smart Irrigation",
          am: "የውሃ ቁጠባና ዘመናዊ የመስኖ አጠቃቀም"
        },
        desc: {
          en: "Through precision drip lines, smart evapotranspiration controllers, and drought-tolerant plant palettes, we protect precious water reserves across urban and nursery settings.",
          am: "በጠብታ መስኖዎችና በውሃ ቆጣቢ እፅዋት አማካኝነት የውሃ ብክነትን እስከ 50% በመቀነስ የተፈጥሮ ሀብትን እንጠብቃለን።"
        },
        image: "/images/service_irrigation.jpg"
      },
      {
        number: "04",
        title: {
          en: "Circular Biomass & Organic Soil Health",
          am: "ተፈጥሯዊ ኮምፖስትና የአፈር ጤና"
        },
        desc: {
          en: "Zero organic waste: our clippings and plant residues are systematically aerobically composted into rich biological fertilizer, eliminating synthetic chemical runoff into waterways.",
          am: "የአትክልት ተረፈ-ምርቶችን በሙሉ ወደ ተፈጥሮ ማዳበሪያነት በመቀየር ኬሚካል አልባና ጤናማ የአፈር ለምነት እንዲፈጠር እናደርጋለን።"
        },
        image: "/images/service_compost.jpg"
      },
      {
        number: "05",
        title: {
          en: "Ecological Restoration & Reforestation",
          am: "የተራቆቱ መሬቶችን መልሶ ማልማት"
        },
        desc: {
          en: "Restoring degraded terrains through biological contouring, native reforestation, and watershed stabilization, strengthening communities against soil erosion.",
          am: "የተራቆቱ ተፋሰሶችንና ገደላማ ቦታዎችን አገር በቀል ዛፎችን በመትከል መልሶ በማቋቋም አፈር እንዳይሸረሸር ጥበቃ እናደርጋለን።"
        },
        image: "/images/service_restoration.jpg"
      },
      {
        number: "06",
        title: {
          en: "Community Education & Green Jobs",
          am: "የማህበረሰብ ትምህርትና አረንጓዴ ስራዎች"
        },
        desc: {
          en: "Building sustainable capacity across Ethiopia by training local gardeners, engaging youth in environmental initiatives, and creating durable green economy employment.",
          am: "ለወጣቶችና ለባለሙያዎች ስልጠናዎችን በመስጠትና አስተማማኝ የስራ ዕድሎችን በመፍጠር በአረንጓዴ ኢኮኖሚ ውስጥ ጠንካራ አቅም እንገነባለን።"
        },
        image: "/images/who_we_are.jpg"
      }
    ]
  },
  initiatives_section: {
    eyebrow: {
      en: "On-the-Ground Initiatives",
      am: "ተግባራዊ ተነሳሽነቶች"
    },
    headline: {
      en: "Actionable Environmental Commitments",
      am: "የምንተገብራቸው የአካባቢ ጥበቃ ስራዎች"
    },
    items: [
      {
        icon: "🌱",
        title: {
          en: "Native Seedling Cultivation",
          am: "አገር በቀል የችግኝ ማፍላት ስራ"
        },
        desc: {
          en: "Propagating indigenous Ethiopian trees, shrubs, and medicinal flora in our controlled nurseries to restore local genetic diversity.",
          am: "አገር በቀል የሆኑ የኢትዮጵያ ዛፎችንና የመድኃኒት ቅመሞችን በችግኝ ጣቢያዎቻችን በማፍላት የዕፅዋት ብዝሃነትን እንጠብቃለን።"
        }
      },
      {
        icon: "💧",
        title: {
          en: "Precision Drip Irrigation",
          am: "ዘመናዊ የጠብታ መስኖ"
        },
        desc: {
          en: "Cutting landscape water waste by up to 50% through micro-drip networks, soil moisture monitoring, and automated smart timing.",
          am: "በዘመናዊ ጠብታ መስኖ ቴክኖሎጂ አማካኝነት የውሃ ብክነትን በግማሽ በመቀነስ የተፈጥሮ ሀብትን በአግባቡ እንጠቀማለን።"
        }
      },
      {
        icon: "♻️",
        title: {
          en: "100% Organic Composting",
          am: "100% የተፈጥሮ ማዳበሪያ ዝግጅት"
        },
        desc: {
          en: "Recycling vegetative landscape biomass into pathogen-free organic compost, eliminating harmful chemical fertilizer dependency.",
          am: "የአትክልት ተረፈ-ምርቶችን መልሶ በመጠቀም ወደ ተፈጥሮ ማዳበሪያነት በመቀየር ኬሚካል አልባ የአፈር አያያዝን እናረጋግጣለን።"
        }
      },
      {
        icon: "👥",
        title: {
          en: "Capacity Building & Training",
          am: "የአቅም ግንባታ እና ስልጠና"
        },
        desc: {
          en: "Conducting vocational horticultural and environmental training for groundskeepers, youth, and communities across Addis Ababa.",
          am: "ለወጣቶች፣ ለተቋማት ሰራተኞች እና ለማህበረሰቡ ቀጣይነት ያለው የሆርቲካልቸር እና የአካባቢ ጥበቃ ስልጠናዎችን እንሰጣለን።"
        }
      }
    ]
  },
  cta: {
    headline: {
      en: "Partner With Us for a Greener Tomorrow",
      am: "ለአረንጓዴ ነገ አብረውን ይስሩ"
    },
    subtitle: {
      en: "Whether you are an institution, government authority, or private developer, let us help you plan and execute sustainable green spaces.",
      am: "መንግስታዊ ተቋም፣ የግል ድርጅት ወይም ግለሰብ፣ ዘላቂና ውብ የሆኑ አረንጓዴ ቦታዎችን እውን ለማድረግ ዝግጁ ነን።"
    },
    primary_btn_text: {
      en: "Contact Our Specialists",
      am: "ባለሙያዎቻችንን ያነጋግሩ"
    },
    primary_btn_url: "/contact",
    secondary_btn_text: {
      en: "Explore Services",
      am: "አገልግሎቶቻችንን ይመልከቱ"
    },
    secondary_btn_url: "/services"
  }
};
