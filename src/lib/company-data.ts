import type { Service, LocalizedText } from "./types";

export interface ServiceDetail extends Service {
  categoryGroup: "Landscape & Design" | "Plants & Gardens" | "Water & Environment" | "Professional Services";
  number: string;
}

export const COMPANY_INFO = {
  name: "Landscape Solution PLC",
  shortName: "Landscape Solution",
  tagline: "Professional Landscape Solutions for a Greener Future",
  establishedYear: 2026,
  founder: "Birhanu Belay",
  location: "Addis Ababa, Ethiopia",
  country: "Ethiopia",
  city: "Addis Ababa",
  logoUrl: "/images/logo.png",
  brochureUrl: null as string | null,
  
  // Official background summary
  background: {
    en: "Ethiopia is implementing a range of development initiatives, including green development, to address the impacts of trans-boundary climate change, deforestation, and environmental degradation associated with population growth and increasing demand for natural resources.\n\nLandscape Solution PLC, established in 2026, was founded to contribute to these efforts as a professional landscaping company dedicated to creating aesthetically pleasing, functional, and sustainable indoor and outdoor environments. The company provides comprehensive landscape planning, design, implementation, and maintenance services for government institutions, private businesses, commercial developments, residential properties, and industrial sites.\n\nLandscape Solution PLC combines innovative technology, creative design, technical expertise, and sustainable practices to enhance biodiversity, improve urban aesthetics, and promote climate resilience. In response to the growing demand for high-quality green infrastructure and environmentally responsible landscaping, the company specializes in lawn establishment, irrigation systems, urban greening, environmental restoration, modern botanical garden development, nursery establishment and management, and the production of diverse native, ornamental, and indigenous seedlings.\n\nWith a team of skilled, experienced, and dedicated professionals, Landscape Solution PLC is committed to delivering customized, high-quality, sustainable, and cost-effective landscape solutions tailored to the specific needs of each client. By integrating professional expertise with environmental responsibility, the company contributes to healthier communities, greener cities, enhanced biodiversity, environmental restoration, and improved quality of life.\n\nLandscape Solution PLC aspires to become a trusted and leading partner in sustainable landscaping, nursery development, environmental restoration, and green infrastructure in Ethiopia, contributing to a greener, healthier, and more climate-resilient future.",
    am: "ኢትዮጵያ ከህዝብ ቁጥር መጨመር እና ከተፈጥሮ ሀብት ፍላጎት ጋር ተያይዞ የሚከሰተውን ድንበር ተሻጋሪ የአየር ንብረት ለውጥ፣ የደን መጨፍጨፍ እና የአካባቢ መራቆትን ለመቅረፍ የአረንጓዴ ልማትን ጨምሮ በርካታ የልማት ተግባራትን ተግባራዊ እያደረገች ትገኛለች።\n\nበ2026 የተቋቋመው ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር፣ ውበት ያላቸው፣ ተግባራዊ እና ዘላቂ የሆኑ የውስጥና የውጪ የተፈጥሮ አካባቢዎችን በመፍጠር ለነዚህ ጥረቶች አስተዋጽኦ ለማበርከት የተመሰረተ ፕሮፌሽናል የመልክአ ምድር ድርጅት ነው። ድርጅቱ ለመንግስታዊ ተቋማት፣ ለግል ድርጅቶች፣ ለንግድ ማዕከላት፣ ለመኖሪያ ቤቶች እና ለኢንዱስትሪ ቦታዎች ሁሉን አቀፍ የመልክአ ምድር ፕላን፣ ዲዛይን፣ ግንባታ እና የጥገና አገልግሎቶችን ያቀርባል።"
  },

  vision: {
    en: "By 2030, to become Ethiopia's most trusted landscape solutions company, recognized for excellence, innovation, and sustainable green development while enhancing quality of life and protecting the environment.",
    am: "እስከ 2030 ድረስ፣ የህይወት ጥራትን በማሻሻልና አካባቢን በመጠበቅ፣ በላቀ ደረጃ፣ በፈጠራና በዘላቂ አረንጓዴ ልማት የታወቀ በኢትዮጵያ ውስጥ እጅግ የታመነ የመልክአ ምድር መፍትሄዎች ኩባንያ መሆን።"
  },

  mission: {
    en: "To become a trusted partner in creating sustainable landscapes by providing integrated services in landscape planning and design, construction, botanic garden and nursery development, irrigation systems, urban greening, restoration, training, outreach programs, and landscape maintenance that support economic growth and environmental resilience in Ethiopia.",
    am: "በኢትዮጵያ ኢኮኖሚያዊ ዕድገትን እና የአካባቢ ጥንካሬን የሚደግፉ የመልክአ ምድር ፕላን እና ዲዛይን፣ ግንባታ፣ የዕፅዋት ማዕከል እና የችግኝ ማፍያ ልማት፣ የመስኖ ሥርዓቶች፣ የከተማ አረንጓዴ ልማት፣ መልሶ ማቋቋም፣ ስልጠና፣ የማህበረሰብ ተደራሽነት ፕሮግራሞች እና የመልክአ ምድር ጥገና የተቀናጁ አገልግሎቶችን በማቅረብ ዘላቂ መልክአ ምድሮችን በመፍጠር የታመነ አጋር መሆን።"
  },

  generalObjective: {
    en: "To provide innovative, sustainable, and superior landscape, nursery, and environmental management solutions that improve urban and rural settings, strengthen ecological balance, and support Ethiopia's socioeconomic development and climatic resilience.",
    am: "የከተማና የገጠር አካባቢዎችን የሚያሻሽሉ፣ የስነ-ምህዳር ሚዛንን የሚያጠናክሩ እና የኢትዮጵያን ማህበራዊና ኢኮኖሚያዊ ዕድገት እንዲሁም የአየር ንብረት ጥንካሬን የሚደግፉ አዳዲስ፣ ዘላቂና የላቁ የመልክአ ምድር፣ የችግኝ ማፍያና የአካባቢ ጥበቃ መፍትሄዎችን ማቅረብ።"
  },

  specificObjectives: [
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
  ],

  values: [
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
        en: "Conducting every project with professional ethics, operational transparency, honest communication, and accountability.",
        am: "ስራዎቻችንን በሙሉ በከፍተኛ የስነ-ምግባር ደረጃ፣ በግልጽነት እና በተጠያቂነት እንመራለን።"
      }
    },
    {
      number: "06",
      title: { en: "Biodiversity Conservation", am: "የብዝሃ-ሕይወት ጥበቃ" },
      desc: {
        en: "Protecting and propagating native Ethiopian plant species to restore natural habitats, foster pollinators, and enrich regional ecosystems.",
        am: "አገር በቀል የዕፅዋት ዝርያዎችን በመጠበቅና በማባዛት የተፈጥሮ ስነ-ምህዳሩንና ብዝሃ-ሕይወትን እናበለጽጋለን።"
      }
    }
  ],

  targetSectors: [
    {
      title: { en: "Government Institutions", am: "የመንግስት ተቋማት" },
      desc: {
        en: "Public squares, ministerial campuses, municipal parks, and urban greening initiatives.",
        am: "የህዝብ መናፈሻዎች፣ ሚኒስቴር መስሪያ ቤቶች እና የከተማ አረንጓዴ ልማት ፕሮጀክቶች።"
      },
      image: "/images/service_urban_greening.jpg"
    },
    {
      title: { en: "Private Businesses & Commercial", am: "የግልና የንግድ ድርጅቶች" },
      desc: {
        en: "Corporate headquarters, business plazas, shopping developments, and hospitality grounds.",
        am: "የኮርፖሬት ህንፃዎች፣ የቢዝነስ ማዕከላት እና የሆቴል መልክአ ምድሮች።"
      },
      image: "/images/hero_landscape.jpg"
    },
    {
      title: { en: "Residential Properties & Estates", am: "የመኖሪያ ቤቶችና መንደሮች" },
      desc: {
        en: "Private villas, real estate communities, compound gardens, and private retreats.",
        am: "የቪላ መኖሪያ ቤቶች፣ የሪል እስቴት መንደሮች እና የግል መኖሪያ ግቢዎች።"
      },
      image: "/images/service_construction.jpg"
    },
    {
      title: { en: "Industrial Sites & Parks", am: "የኢንዱስትሪ ፓርኮች" },
      desc: {
        en: "Eco-industrial parks, manufacturing facilities, buffer greenery zones, and dust-mitigation landscapes.",
        am: "የኢንዱስትሪ ፓርኮች፣ የማምረቻ ስፍራዎች እና የአቧራ መከላከያ አረንጓዴ ቀበቶዎች።"
      },
      image: "/images/service_restoration.jpg"
    }
  ],

  stakeholderCategories: [
    {
      category: "Embassies & Diplomatic Missions",
      description: "Diplomatic compounds, bilateral environmental collaborations, and international representations in Addis Ababa.",
      entities: [
        "American Embassy",
        "Embassy of UK",
        "France Embassy",
        "Switzerland Embassy",
        "Norwegian Embassy",
        "Indian Embassy",
        "Russia Embassy",
        "Embassy of Brazil",
        "Belgium Embassy"
      ]
    },
    {
      category: "Environmental NGOs & Initiatives",
      description: "Development organizations and national greening programs dedicated to environmental protection and climate resilience.",
      entities: [
        "Global Green Growth Institute (GGGI) Ethiopia",
        "Ethiopian Environmental NGOs",
        "Horn of Africa Environmental Network",
        "Melca Ethiopia",
        "Nature Ethiopia",
        "Save the Environment Ethiopia",
        "Action for Social Development & Environmental Protection (ASDEPO)",
        "Green Walk Ethiopia",
        "NatuReS - Ethiopia",
        "ActionAid Ethiopia",
        "Beautifying Sheger Project",
        "Green Legacy Initiative",
        "Green Innovation Lab"
      ]
    },
    {
      category: "Academic & International Schools",
      description: "Educational institutions committed to campus greening, outdoor botanical classrooms, and environmental stewardship.",
      entities: [
        "ICS International School",
        "Sandford International School",
        "Philip International School",
        "British International School",
        "School of Nations",
        "Lycée Guébré-Mariam",
        "Bingham Academy",
        "Gibson Youth Academy",
        "Abune Gorgorios Schools"
      ]
    },
    {
      category: "Government Authorities & Public Bodies",
      description: "Municipal and national agencies advancing urban infrastructure, public parks, and road corridor aesthetics.",
      entities: [
        "Addis Ababa Greenery and Beautification Bureau",
        "Ethiopian Road Authority (ERA)",
        "Public Universities Across Ethiopia",
        "Park Corporation"
      ]
    },
    {
      category: "Real Estate & Construction Developers",
      description: "Leading construction firms and real estate developers shaping modern Ethiopian architecture and urban spaces.",
      entities: [
        "Semu Real Estate",
        "Sur Construction PLC",
        "Aser Construction (Addis Ababa)",
        "Macro Construction Company",
        "Yencomad Construction PLC",
        "Rama Construction",
        "Tekle Berhan Ambaye Construction (TACON)",
        "MIDROC Ethiopia Construction",
        "MCG Construction Company",
        "Santa Maria Construction",
        "Noah Real Estate",
        "Hayat Real Estate",
        "Tsehay Real Estate",
        "Gift Real Estate"
      ]
    },
    {
      category: "Hospitality & Business Landmarks",
      description: "Premier hotels, resorts, and commercial establishments maintaining immaculate garden landscapes and guest environments.",
      entities: [
        "Haile Grand Addis Ababa",
        "Ghion Hotel",
        "Sheraton Addis (A Luxury Collection Hotel)",
        "Ethiopian Skylight Hotel",
        "Hyatt Regency Addis Ababa",
        "Capital Hotel and Spa",
        "Radisson Blu Hotel Addis Ababa",
        "Inter Luxury Hotel",
        "Lalibela Hotel",
        "Golden Tulip Addis Ababa",
        "Best Western Plus Addis Ababa",
        "Mad Vervet Hostel",
        "Yod Abyssinia Traditional Restaurant",
        "Melka International Hotel",
        "Hilton Addis Ababa",
        "Nexus Hotel"
      ]
    }
  ]
};

export const OFFICIAL_SERVICES: ServiceDetail[] = [
  {
    id: 1,
    number: "01",
    slug: "landscape-planning-and-design",
    categoryGroup: "Landscape & Design",
    title: {
      en: "Landscape Planning and Design",
      am: "የመልክአ ምድር ፕላን እና ዲዛይን"
    },
    short_description: {
      en: "Comprehensive landscape architecture, site planning, 3D spatial visualization, and eco-aesthetic concepts tailored for commercial, residential, and institutional developments.",
      am: "ለመኖሪያ፣ ለንግድ እና ለመንግስታዊ ተቋማት የተዘጋጀ ሁሉን አቀፍ የመልክአ ምድር አርክቴክቸር፣ የቦታ ፕላን እና ዘመናዊ የ3ዲ ዲዛይን ስራዎች።"
    },
    description: {
      en: "Landscape Solution PLC delivers professional landscape planning and master design services combining artistic elegance with environmental engineering. Our design process accounts for micro-climates, soil conditions, sun orientation, functional circulation, and indigenous plant palettes. Whether crafting a tranquil private sanctuary, an expansive commercial plaza, or an institutional master plan, our architects deliver detailed blueprints, plant schedules, and 3D architectural renderings that guarantee harmony between built architecture and living nature.",
      am: "ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር ጥበባዊ ውበትን ከአካባቢያዊ ምህንድስና ጋር በማቀናጀት ፕሮፌሽናል የመልክአ ምድር ፕላን እና ዲዛይን አገልግሎት ይሰጣል። ዲዛይናችን የአየር ንብረት ሁኔታዎችን፣ የአፈር አይነትን እና አገር በቀል እፅዋትን ከግምት ያስገባል።"
    },
    featured_image: "/images/service_planning.jpg",
    icon: "compass",
    features: [
      { en: "Comprehensive site analysis and micro-climate mapping", am: "የቦታ ጥናት እና የአየር ንብረት ትንተና" },
      { en: "3D architectural visualization and photo-realistic renderings", am: "የ3ዲ አርክቴክቸር እይታ እና ምስሎች" },
      { en: "Sustainable indoor and outdoor master planning", am: "ዘላቂ የውስጥና የውጪ ማስተር ፕላን" },
      { en: "Grading, drainage, and circulation blueprints", am: "የፍሳሽና የመተላለፊያ መንገዶች ዲዛይን" }
    ],
    benefits: [
      { en: "Maximized aesthetic and commercial property value", am: "የቦታውን ውበትና የገበያ ዋጋ በከፍተኛ ደረጃ ማሳደግ" },
      { en: "Optimized water flow and natural micro-climate cooling", am: "የተፈጥሮ ቅዝቃዜንና ምቹ የአየር ሁኔታን መፍጠር" },
      { en: "Seamless alignment with municipal greening guidelines", am: "ከከተማ ፕላን አረንጓዴ መመሪያዎች ጋር ሙሉ በሙሉ መጣጣም" }
    ],
    faq: [
      {
        question: { en: "What project scales do you accommodate?", am: "ምን ዓይነት የፕሮጀክት መጠኖችን ታስተናግዳላችሁ?" },
        answer: { en: "We handle projects ranging from intimate private villas and indoor atriums to expansive corporate campuses, industrial parks, and public plazas.", am: "ከግል ቪላዎች ጀምሮ እስከ ትላልቅ የኮርፖሬት ግቢዎች እና የህዝብ መናፈሻዎች ድረስ በሙሉ አቅም እንሰራለን።" }
      }
    ],
    is_featured: true,
    is_published: true,
    sort_order: 1,
    seo_title: "Landscape Planning & Design | Landscape Solution PLC Ethiopia",
    seo_description: "Expert landscape planning, master site design, and 3D architectural landscape services in Addis Ababa, Ethiopia."
  },
  {
    id: 2,
    number: "02",
    slug: "landscape-construction-and-installation",
    categoryGroup: "Landscape & Design",
    title: {
      en: "Landscape Construction and Installation",
      am: "የመልክአ ምድር ግንባታ እና ተከላ"
    },
    short_description: {
      en: "Turnkey hardscaping and softscaping execution, including ground leveling, lawn establishment, specimen planting, stone masonry, and garden construction.",
      am: "የመሬት ዝግጅት፣ የሳር ተከላ፣ የድንጋይ ንጣፍ ስራዎች፣ የውበት እፅዋት ተከላ እና ሁሉን አቀፍ የመልክአ ምድር ግንባታ።"
    },
    description: {
      en: "Bringing architectural plans to life with precision and craft, our construction teams manage complete site development from earth grading and soil preparation to hardscape masonry, walkways, retaining features, and lush softscape installation. We source premium topsoil, establish resilient natural turf, and install mature specimen trees and ornamental shrubs with meticulous attention to root development and long-term health.",
      am: "የተነደፉትን ፕላኖች በጥራት ወደ መሬት በማውረድ፣ የመሬት ዝግጅት፣ የአፈር ማዳበሪያ፣ የድንጋይና ኮብልስቶን ንጣፍ፣ የአጥርና የግድግዳ ስራዎችን እንዲሁም የሳርና የዛፍ ተከላዎችን በጥንቃቄ እንፈጽማለን።"
    },
    featured_image: "/images/service_construction.jpg",
    icon: "hammer",
    features: [
      { en: "Precision earthworks, terrain contouring, and grading", am: "ትክክለኛ የመሬት ደረጃ ማስተካከልና ዝግጅት" },
      { en: "Premium lawn establishment with resilient turfgrass varieties", am: "ጥራት ያለው ዘላቂ የሳር ተከላ" },
      { en: "Hardscape walkways, stepping stones, and perimeter edging", am: "የመተላለፊያ ድንጋዮችና የኮብል ንጣፍ ስራዎች" },
      { en: "Mature specimen tree installation and root ball care", am: "ትላልቅ የጥላና የውበት ዛፎች ተከላ" }
    ],
    benefits: [
      { en: "Durable structural construction engineered for Ethiopian conditions", am: "ለአገራችን የአየር ንብረት የተስማማ ጠንካራ ግንባታ" },
      { en: "Prompt, organized site execution minimizing disruption", am: "ፈጣንና የተደራጀ የስራ አፈፃፀም" },
      { en: "Guaranteed initial plant rooting and establishment support", am: "የእፅዋቱ መጽደቅ ዋስትና እና ክትትል" }
    ],
    faq: [],
    is_featured: true,
    is_published: true,
    sort_order: 2,
    seo_title: "Landscape Construction & Installation | Addis Ababa Landscaping",
    seo_description: "Turnkey landscape installation, ground shaping, lawn establishment, and garden construction in Ethiopia."
  },
  {
    id: 3,
    number: "03",
    slug: "nursery-development-and-plant-production",
    categoryGroup: "Plants & Gardens",
    title: {
      en: "Nursery Development and Plant Production",
      am: "የችግኝ ጣቢያ ልማት እና ዕፅዋት ማፍራት"
    },
    short_description: {
      en: "Establishment of modern botanical nurseries and production of diverse native, ornamental, indigenous, fruit, forest, and medicinal seedlings.",
      am: "ዘመናዊ የችግኝ ማፍያ ማዕከላትን ማቋቋም እና አገር በቀል፣ ጌጣጌጥ፣ ፍራፍሬ፣ ደን እና መድኃኒት ዕፅዋትን በብዛት ማምረት።"
    },
    description: {
      en: "At the core of Landscape Solution PLC is our commitment to plant science. We establish and manage modern plant nurseries equipped with controlled propagation infrastructure, misting systems, and organic growing media. We produce a wide inventory of native alternative ornamental plants, indigenous forest species, highland shade trees, fruit seedlings, and traditional medicinal plants, ensuring high survival rates and resilience when transplanted.",
      am: "ላንድስኬፕ ሶሉሽን ዘመናዊ የችግኝ ማፍያ ማዕከላትን በማቋቋም ጥራት ያላቸውን አገር በቀል የደን ዛፎች፣ ጌጣጌጥ እፅዋት፣ ፍራፍሬዎችና የመድኃኒት ቅመሞችን ያመርታል፤ በማንኛውም ቦታ በቀላሉ የሚጸድቁ ጠንካራ ችግኞችን ያቀርባል።"
    },
    featured_image: "/images/service_nursery.jpg",
    icon: "sprout",
    features: [
      { en: "Controlled propagation greenhouses and shade-house structures", am: "ዘመናዊ የችግኝ ማፍያ ግሪንሃውስ እና ጥላ ማዕከላት" },
      { en: "Production of diverse native and indigenous Ethiopian species", am: "የኢትዮጵያ አገር በቀል እፅዋት ዝርያዎች ማባዛት" },
      { en: "Fruit, forest, ornamental, and medicinal seedling inventory", am: "የፍራፍሬ፣ የደን፣ የውበት እና የባህል መድኃኒት ችግኞች" },
      { en: "Custom commercial nursery design for institutions and farms", am: "ለተቋማትና ለእርሻዎች የችግኝ ጣቢያ የማቋቋም ስራ" }
    ],
    benefits: [
      { en: "Acclimatized plants with exceptionally high survival rates", am: "በማንኛውም የአየር ጸባይ በቀላሉ የሚጸድቁ ጤናማ ችግኞች" },
      { en: "Conservation of threatened native botanical varieties", am: "አደጋ ላይ ያሉ አገር በቀል እፅዋትን መጠበቅ" },
      { en: "Reliable bulk supply for large-scale urban greening projects", am: "ለትላልቅ የልማት ፕሮጀክቶች አስተማማኝ አቅርቦት" }
    ],
    faq: [],
    is_featured: true,
    is_published: true,
    sort_order: 3,
    seo_title: "Nursery Development & Plant Production | Landscape Solution PLC",
    seo_description: "Modern plant nursery development, native seedlings, ornamental and medicinal plant production in Ethiopia."
  },
  {
    id: 4,
    number: "04",
    slug: "botanic-garden-development",
    categoryGroup: "Plants & Gardens",
    title: {
      en: "Botanic Garden Development",
      am: "የዕፅዋት (ቦታኒካል) ጋርደን ልማት"
    },
    short_description: {
      en: "Planning and creation of modern botanical gardens, structured living plant collections, conservation pathways, and educational arboretums.",
      am: "ዘመናዊ የዕፅዋት መናፈሻዎችን (ቦታኒካል ጋርደን) ማቀድና ማልማት፣ ህያው የዕፅዋት ስብስቦችን እና የትምህርት ማዕከላትን መገንባት።"
    },
    description: {
      en: "Botanical gardens serve as living museums, educational centers, and vital genetic repositories. Landscape Solution PLC specializes in the conceptualization, zoning, and execution of modern botanical gardens for universities, research institutes, parks, and eco-tourism destinations. We curate structured collections representing Ethiopia's diverse agro-ecological zones, complete with educational signage, visitor circulation paths, and micro-climate conservation zones.",
      am: "ቦታኒካል ጋርደኖች ለትምህርት፣ ለምርምርና ለህዝብ መዝናኛ ከፍተኛ ፋይዳ አላቸው። ለዩኒቨርሲቲዎች፣ ለምርምር ማዕከላትና ለቱሪዝም መዳረሻዎች የተሟላ የቦታኒካል ጋርደን ልማት ስራዎችን እንሰራለን።"
    },
    featured_image: "/images/service_botanic.jpg",
    icon: "flower",
    features: [
      { en: "Ecological zoning and taxonomic living collection layout", am: "ስነ-ምህዳራዊ የዞን ከፋፈልና የዕፅዋት ስብስብ ፕላን" },
      { en: "Visitor pathways, shaded pergolas, and interpretive signage", am: "የእግር ጉዞ መንገዶች፣ ጥላ ሼዶችና የማብራሪያ ሰሌዳዎች" },
      { en: "Specialized thematic gardens: medicinal, native, and alpine", am: "የመድኃኒት፣ የአገር በቀልና የአልፓይን ጭብጥ ያላቸው የአትክልት ስፍራዎች" },
      { en: "Conservation nurseries and germplasm preservation areas", am: "የዝርያ ማቆያ እና የጥበቃ ችግኝ ማዕከላት" }
    ],
    benefits: [
      { en: "Living educational assets for universities and communities", am: "ለትምህርት ተቋማትና ለማህበረሰቡ ህያው የጥናት ማዕከል" },
      { en: "Preservation of Ethiopia's unique botanical heritage", am: "የኢትዮጵያን ልዩ የተፈጥሮ ሀብት ለትውልድ ማስተላለፍ" },
      { en: "World-class public spaces that enhance quality of life", am: "የህይወት ጥራትን የሚያሻሽሉ ውብ የህዝብ መናፈሻዎች" }
    ],
    faq: [],
    is_featured: false,
    is_published: true,
    sort_order: 4,
    seo_title: "Botanic Garden Development Ethiopia | Landscape Solution PLC",
    seo_description: "Botanical garden design, living plant collections, and educational arboretums across Ethiopia."
  },
  {
    id: 5,
    number: "05",
    slug: "garden-and-landscape-maintenance",
    categoryGroup: "Landscape & Design",
    title: {
      en: "Garden and Landscape Maintenance",
      am: "የአትክልት እና የመልክአ ምድር ጥገናና እንክብካቤ"
    },
    short_description: {
      en: "Scheduled horticultural care, specialized lawn mowing, artistic pruning, plant nutrition, organic fertilization, and seasonal health management.",
      am: "ቀጣይነት ያለው የሆርቲካልቸር እንክብካቤ፣ የሳር ማጨድ፣ የዛፎች ቅርጽ ማስተካከል፣ ተፈጥሯዊ ማዳበሪያ እና የጤና ክትትል።"
    },
    description: {
      en: "A landscape is an evolving living investment that requires specialized horticultural stewardship. Landscape Solution PLC provides regular and contract maintenance services for commercial facilities, embassies, estates, and public grounds. Our trained maintenance technicians handle lawn mowing, aeration, edge trimming, seasonal tree pruning, organic soil amendments, and integrated pest prevention to ensure that outdoor environments stay lush and immaculate all year long.",
      am: "የተገነባ መልክአ ምድር ቀጣይነት ያለው ጥንቃቄ ይሻል። ድርጅታችን ለኤምባሲዎች፣ ለድርጅቶችና ለመኖሪያ ቤቶች የሳር እንክብካቤ፣ የዛፎች መቆረጥ፣ የተፈጥሮ ማዳበሪያና የዕፅዋት ጤና ጥበቃ አገልግሎት ይሰጣል።"
    },
    featured_image: "/images/service_maintenance.jpg",
    icon: "scissors",
    features: [
      { en: "Custom scheduled maintenance agreements (weekly, monthly, quarterly)", am: "እንደፍላጎት የተዘጋጁ የጥገና ስምምነቶች (በሳምንት፣ በወር)" },
      { en: "Precision turf care: mowing, dethatching, and aeration", am: "የሳር ማጨድ፣ ማጽዳትና አየር እንዲያገኝ ማድረግ" },
      { en: "Artistic shrub shaping and safety canopy tree pruning", am: "የዛፎችና የቁጥቋጦዎች ቅርጽ ማስተካከል" },
      { en: "Organic nutrient feeding and weed management", am: "የተፈጥሮ ማዳበሪያ መመገብና አረም ማጽዳት" }
    ],
    benefits: [
      { en: "Immaculate corporate presence and pristine curb appeal", am: "ሁልጊዜም አረንጓዴና ውብ ሆኖ የሚታይ ግቢ" },
      { en: "Long-term protection of the landscape capital investment", am: "የመጀመሪያውን የመልክአ ምድር ኢንቨስትመንት ዘላቂ ማድረግ" },
      { en: "Early diagnosis of botanical stress and disease prevention", am: "የዕፅዋት በሽታዎችን ቀድሞ መከላከልና ማከም" }
    ],
    faq: [],
    is_featured: false,
    is_published: true,
    sort_order: 5,
    seo_title: "Garden & Landscape Maintenance Services | Landscape Solution PLC",
    seo_description: "Commercial and residential landscape maintenance, lawn mowing, pruning, and garden care in Addis Ababa."
  },
  {
    id: 6,
    number: "06",
    slug: "urban-greening-and-environmental-services",
    categoryGroup: "Water & Environment",
    title: {
      en: "Urban Greening and Environmental Services",
      am: "የከተማ አረንጓዴ ልማት እና የአካባቢ ጥበቃ አገልግሎቶች"
    },
    short_description: {
      en: "Urban tree planting campaigns, park revitalization, roadside and median landscaping, green corridors, and civic environmental enhancements.",
      am: "የከተማ የዛፍ ተከላ፣ የፓርኮች ማሻሻያ፣ የመንገድ ዳርቻና መካከለኛ አረንጓዴ ቀበቶዎች ግንባታ እና የአካባቢ ውበት ስራዎች።"
    },
    description: {
      en: "Urban centers in Ethiopia face pressing environmental pressures, from urban heat island effects to air quality concerns. Landscape Solution PLC partners with municipalities, road authorities, real estate developers, and civil society to plan and execute green urban corridors. Our work includes street tree plantings, boulevard medians, pocket parks, public square beautification, and green infrastructure that cleans the air, lowers urban temperatures, and fosters civic pride.",
      am: "የከተሞቻችንን የአየር ንብረት ለማሻሻልና ውበትን ለማላበስ ከመንግስት አካላትና ከልማት ድርጅቶች ጋር በመተባበር የመንገድ ዳርቻ ዛፎችን መትከል፣ ፓርኮችን ማልማትና አረንጓዴ ኮሪደሮችን መገንባት ላይ በስፋት እንሰራለን።"
    },
    featured_image: "/images/service_urban_greening.jpg",
    icon: "trees",
    features: [
      { en: "Streetscape and transport corridor tree canopy establishment", am: "የመንገድ ዳርቻና የመተላለፊያ መስመሮች የዛፍ ተከላ" },
      { en: "Civic park master development and revitalization", am: "የህዝብ መናፈሻ ፓርኮች ግንባታና እድሳት" },
      { en: "Median divider planting and drought-tolerant groundcover", am: "የመኪና መንገድ መከፈያ አረንጓዴ ስራዎች" },
      { en: "Green buffer zones for industrial areas and waterways", am: "የኢንዱስትሪና የወንዝ ዳርቻ አረንጓዴ ቀበቶዎች" }
    ],
    benefits: [
      { en: "Mitigation of urban heat island effects and dust", am: "የከተማ ሙቀትንና አቧራን በከፍተኛ ሁኔታ መቀነስ" },
      { en: "Enhanced urban livability, aesthetics, and mental well-being", am: "የህዝብ ጤናንና የከተማን መልካም ገጽታ ማሳደግ" },
      { en: "Direct contribution to Ethiopia's national Green Legacy goals", am: "ለአገራዊው የአረንጓዴ አሻራ መርሃ-ግብር ቀጥተኛ ድጋፍ" }
    ],
    faq: [],
    is_featured: true,
    is_published: true,
    sort_order: 6,
    seo_title: "Urban Greening & Environmental Services Ethiopia | Landscape Solution",
    seo_description: "Urban tree planting, median landscaping, and public park developments in Addis Ababa and beyond."
  },
  {
    id: 7,
    number: "07",
    slug: "irrigation-and-water-management",
    categoryGroup: "Water & Environment",
    title: {
      en: "Irrigation and Water Management",
      am: "የመስኖ እና የውሃ አያያዝ አስተዳደር"
    },
    short_description: {
      en: "Design and installation of smart water-conserving drip systems, automatic sprinkler zones, rainwater utilization, and nursery watering systems.",
      am: "ውሃ ቆጣቢ ጠብታ መስኖዎች፣ አውቶማቲክ ስፕሪንክለሮች፣ የዝናብ ውሃ አጠቃቀም እና የችግኝ ጣቢያ መስኖ ቴክኖሎጂዎች።"
    },
    description: {
      en: "Water is our most critical resource. Landscape Solution PLC designs, installs, and maintains high-efficiency landscape irrigation systems tailored to local water pressure and site hydrology. By utilizing micro-drip emitters, pressure-regulated pop-up sprinklers, rain sensors, and automated smart timing controllers, we reduce water waste by up to 50% while delivering the exact moisture volume required for vibrant plant vitality.",
      am: "ውሃን በአግባቡ መጠቀም የድርጅታችን ዋነኛ መርህ ነው። ውሃን እስከ 50% የሚቆጥቡ ዘመናዊ የጠብታ መስኖ፣ የስፕሪንክለር ስርዓቶች እና አውቶማቲክ ተቆጣጣሪዎችን በመግጠም እፅዋቱ ተስማሚ ውሃ እንዲያገኙ እናደርጋለን።"
    },
    featured_image: "/images/service_irrigation.jpg",
    icon: "droplet",
    features: [
      { en: "Water-conserving drip irrigation for beds and tree rings", am: "ለዛፎችና ለአትክልት አልጋዎች ውሃ ቆጣቢ ጠብታ መስኖ" },
      { en: "Automated pop-up lawn sprinkler network installation", am: "ለሳር ሜዳዎች አውቶማቲክ ብቅ ባይ ስፕሪንክለር" },
      { en: "Weather sensors and programmable zoning controllers", am: "የአየር ጸባይ ዳሳሾችና በሰዓት የሚሰሩ ተቆጣጣሪዎች" },
      { en: "Nursery misting, micro-jet, and nursery overhead systems", am: "ለችግኝ ጣቢያዎች የጭጋግና የርጭት መስኖ ስርዓት" }
    ],
    benefits: [
      { en: "Significant reduction in utility water costs and conservation", am: "የውሃ ወጪን በከፍተኛ ደረጃ መቀነስ" },
      { en: "Uniform moisture distribution preventing over/under-watering", am: "እፅዋት በቂና ተመጣጣኝ እርጥበት እንዲያገኙ ማገዝ" },
      { en: "Reliable automated operation requiring minimal manual labor", am: "ያለ ሰው ድካም በራስ ሰር የሚሰራ አስተማማኝ አሰራር" }
    ],
    faq: [],
    is_featured: true,
    is_published: true,
    sort_order: 7,
    seo_title: "Irrigation & Water Management | Landscape Solution PLC",
    seo_description: "Smart drip irrigation, automatic sprinklers, and water management systems in Ethiopia."
  },
  {
    id: 8,
    number: "08",
    slug: "environmental-restoration",
    categoryGroup: "Water & Environment",
    title: {
      en: "Environmental Restoration",
      am: "የአካባቢና የስነ-ምህዳር መልሶ ማቋቋም"
    },
    short_description: {
      en: "Ecological rehabilitation of degraded soils, slope stabilization, gully erosion remediation, reforestation, and watershed habitat recovery.",
      am: "የተራቆቱ መሬቶችን ማከም፣ የአፈር መሸርሸርን መከላከል፣ የመልሶ ደን ማልማት እና የወንዞች ተፋሰስ ስነ-ምህዳር መልሶ ማቋቋም።"
    },
    description: {
      en: "To counteract the severe consequences of deforestation and soil erosion, Landscape Solution PLC undertakes comprehensive ecological restoration projects. We deploy bio-engineering techniques, check-dams, vegetative contour hedgerows, and deep-rooting indigenous pioneer trees to stabilize slopes, restore watershed micro-basins, and reactivate natural biodiversity on degraded lands across Ethiopia.",
      am: "የደን መመንጠርና የአፈር መሸርሸርን ለመቋቋም የተራቆቱ መሬቶችን መልሶ የማልማት ስራ እንሰራለን። አገር በቀል ዛፎችንና ሳሮችን በመትከል፣ ገደላማ ቦታዎችን በማከም ተፈጥሮ ወደ ቀድሞ ይዘቷ እንድትመለስ እናደርጋለን።"
    },
    featured_image: "/images/service_restoration.jpg",
    icon: "shield",
    features: [
      { en: "Biological soil erosion control and terracing techniques", am: "የተፈጥሮ የአፈር መሸርሸር መከላከያና እርከን ስራ" },
      { en: "Indigenous reforestation and ecological corridor establishment", am: "አገር በቀል የደን ዛፎችን መልሶ መትከል" },
      { en: "Gully rehabilitation and hydrological watershed recovery", am: "ገደሎችን ማከም እና የተፋሰስ ውሃዎችን መጠበቅ" },
      { en: "Remediation of industrial buffers and brownfield grounds", am: "የተጎዱ የኢንዱስትሪ ዙሪያ መሬቶችን ማከም" }
    ],
    benefits: [
      { en: "Long-term soil stabilization and topsoil preservation", am: "የአፈር ለምነት እንዳይጠፋ በዘላቂነት መጠበቅ" },
      { en: "Reinvigorated biodiversity and wildlife habitat", am: "የዱር እንስሳትና የአዕዋፋት መኖሪያን መመለስ" },
      { en: "Strengthened climate resilience for rural and peri-urban communities", am: "የህብረተሰቡን የአየር ንብረት ለውጥ የመቋቋም አቅም ማሳደግ" }
    ],
    faq: [],
    is_featured: false,
    is_published: true,
    sort_order: 8,
    seo_title: "Environmental Restoration & Reforestation | Landscape Solution PLC",
    seo_description: "Degraded land rehabilitation, slope stabilization, and reforestation projects in Ethiopia."
  },
  {
    id: 9,
    number: "09",
    slug: "composting-and-organic-fertilizer-production",
    categoryGroup: "Water & Environment",
    title: {
      en: "Composting and Organic Fertilizer Production",
      am: "የኮምፖስትና የተፈጥሮ ማዳበሪያ ማምረት"
    },
    short_description: {
      en: "Eco-friendly conversion of landscape biomass into premium organic compost, biological soil enrichers, and chemical-free soil conditioners.",
      am: "የእፅዋት ተረፈ-ምርቶችን ወደ ጥራት ያለው የተፈጥሮ ኮምፖስት መቀየር እና አፈርን የሚያለሙ ተፈጥሯዊ ግብዓቶችን ማምረት።"
    },
    description: {
      en: "Circular sustainability requires treating organic waste as a precious resource. Landscape Solution PLC produces high-grade organic compost from landscape clippings, plant trimmings, and biological residues. Our aerobic composting protocols produce nutrient-dense, weed-free, and pathogen-free soil amendments that restore microbial life, improve moisture retention, and completely replace synthetic fertilizers.",
      am: "ተረፈ-ምርቶችን መልሶ ጥቅም ላይ በማዋል ከፍተኛ ጥራት ያለው ኦርጋኒክ ኮምፖስት እናመርታለን። ይህ የተፈጥሮ ማዳበሪያ አፈር እርጥበት እንዲይዝ፣ ለምነቱ እንዲጨምርና ኬሚካል አልባ ምርት እንዲሰጥ ያግዛል።"
    },
    featured_image: "/images/service_compost.jpg",
    icon: "recycle",
    features: [
      { en: "Aerobically cured, pathogen-screened organic compost production", am: "በጥንቃቄ የተዘጋጀና ከበሽታ የጸዳ የተፈጥሮ ኮምፖስት" },
      { en: "Organic soil conditioning and microbial structure enrichment", am: "የአፈር ጥራትንና ረቂቅ ህዋሳትን ማበልጸግ" },
      { en: "Recycling of civic green biomass and landscape clippings", am: "የከተማ አረንጓዴ ተረፈ-ምርቶችን መልሶ መጠቀም" },
      { en: "Bulk distribution for farms, nurseries, and urban gardens", am: "ለእርሻ፣ ለችግኝ ጣቢያና ለመኖሪያ ግቢዎች በጅምላ ማቅረብ" }
    ],
    benefits: [
      { en: "Rebuilding of depleted soil biology and structure naturally", am: "የተጎዳን አፈር በተፈጥሯዊ መንገድ መልሶ ማዳን" },
      { en: "Enhanced moisture retention reducing irrigation demand", am: "አፈር ውሃ እንዲይዝ በማድረግ የመስኖ ፍላጎትን መቀነስ" },
      { en: "Zero chemical runoff into Ethiopian groundwater systems", am: "የከርሰ ምድር ውሃ በኬሚካል እንዳይበከል መከላከል" }
    ],
    faq: [],
    is_featured: false,
    is_published: true,
    sort_order: 9,
    seo_title: "Composting & Organic Fertilizer | Landscape Solution PLC",
    seo_description: "Production of organic compost, natural fertilizers, and sustainable soil conditioners in Ethiopia."
  },
  {
    id: 10,
    number: "10",
    slug: "consultancy-and-training",
    categoryGroup: "Professional Services",
    title: {
      en: "Consultancy and Training",
      am: "የአማካሪነት እና የስልጠና አገልግሎት"
    },
    short_description: {
      en: "Expert advisory in landscape architecture, irrigation planning, environmental compliance, and practical capacity building for communities and professionals.",
      am: "በመልክአ ምድር አርክቴክቸር፣ በመስኖ እቅድ እና በአካባቢ ጥበቃ ላይ የባለሙያ ምክር መስጠት እና ተግባራዊ ስልጠናዎችን ማካሄድ።"
    },
    description: {
      en: "Long-term environmental impact depends on shared expertise. Landscape Solution PLC offers professional consultancy services for government agencies, private developers, and NGOs in landscape feasibility, sustainable water design, and nursery management. Concurrently, we conduct hands-on training programs and outreach initiatives to equip institutional groundskeepers, youth, and community members with modern horticultural and ecological skills.",
      am: "ላንድስኬፕ ሶሉሽን ለመንግስት ተቋማት፣ ለግል ባለሀብቶችና ለልማት ድርጅቶች የመልክአ ምድር፣ የመስኖ እና የአካባቢ ጥበቃ ፕላን አማካሪነት አገልግሎት ይሰጣል። እንዲሁም ተግባራዊ ስልጠናዎችን በመስጠት አቅምን ይገነባል።"
    },
    featured_image: "/images/who_we_are.jpg",
    icon: "book-open",
    features: [
      { en: "Landscape feasibility assessments and technical audits", am: "የመልክአ ምድር ጥናትና የቴክኒክ ግምገማ" },
      { en: "Institutional capacity building and hands-on workshops", am: "የተቋማት አቅም ግንባታ እና ተግባራዊ ወርክሾፖች" },
      { en: "Water efficiency auditing and irrigation system diagnostics", am: "የውሃ ቁጠባ እና የመስኖ ስርዓት ምርመራ" },
      { en: "Community environmental awareness and youth skill development", am: "የማህበረሰብ ግንዛቤ መፍጠርና የወጣቶች የክህሎት ስልጠና" }
    ],
    benefits: [
      { en: "Independent expert guidance preventing costly landscape errors", am: "አላስፈላጊ ወጪዎችን የሚያስቀር የባለሙያ ትክክለኛ መመሪያ" },
      { en: "Empowered institutional staff capable of maintaining high standards", am: "የተቋማትን ሰራተኞች በሙያ ብቁ ማድረግ" },
      { en: "Fostering local employment and green entrepreneurship", am: "በአካባቢ ጥበቃ ዘርፍ የስራ ዕድሎችን ማስፋፋት" }
    ],
    faq: [],
    is_featured: false,
    is_published: true,
    sort_order: 10,
    seo_title: "Landscape Consultancy & Training Ethiopia | Landscape Solution PLC",
    seo_description: "Landscape architecture consultancy, irrigation design audits, and horticultural training programs in Ethiopia."
  },
  {
    id: 11,
    number: "11",
    slug: "plant-identification",
    categoryGroup: "Plants & Gardens",
    title: {
      en: "Plant Identification",
      am: "የዕፅዋት ዝርያ ልየታና ምርመራ"
    },
    short_description: {
      en: "Specialized botanical taxonomy, invasive species diagnosis, biodiversity surveying, and native flora cataloging for estates and protected areas.",
      am: "የዕፅዋት ሳይንሳዊ ዝርያ ልየታ፣ ወራሪ እፅዋትን መመርመር፣ የብዝሃ-ሕይወት ጥናት እና አገር በቀል እፅዋትን መዝግቦ መያዝ።"
    },
    description: {
      en: "Accurate botanical identification is crucial for effective ecological stewardship and habitat protection. Our certified botanists and horticulturists offer on-site botanical surveys, taxonomic verification, invasive flora identification, and comprehensive plant inventories for residential estates, educational campuses, botanical collections, and conservation sites.",
      am: "አካባቢን በአግባቡ ለመጠበቅ የዕፅዋትን ዝርያ በትክክል ማወቅ ወሳኝ ነው። ባለሙያዎቻችን በቦታው ድረስ በመገኘት የዕፅዋትን ሳይንሳዊ ዝርያ መለየት፣ ወራሪ እፅዋትን መመርመርና የተሟላ ካታሎግ ማዘጋጀት ላይ ያግዛሉ።"
    },
    featured_image: "/images/service_plant_id.jpg",
    icon: "search",
    features: [
      { en: "Botanical taxonomy and scientific specimen classification", am: "የዕፅዋት ሳይንሳዊ ዝርያና ምደባ ልየታ" },
      { en: "Invasive plant species detection and eradication advisories", am: "ወራሪ እፅዋትን መለየትና የማስወገጃ ዘዴዎችን ማመላከት" },
      { en: "On-site estate flora inventory and health auditing", am: "የግቢዎችን የዕፅዋት ዝርያ መዝግቦ መያዝ" },
      { en: "Recommended native companion planting strategies", am: "ተስማሚ አገር በቀል እፅዋትን የመምረጥ ምክረ-ሃሳብ" }
    ],
    benefits: [
      { en: "Definitive clarity on existing campus and estate vegetation", am: "በግቢው ውስጥ ስላሉ እፅዋት ትክክለኛና ሳይንሳዊ እውቀት ማግኘት" },
      { en: "Early mitigation of aggressive invasive plant threats", am: "ወራሪ እፅዋት ጉዳት ሳያደርሱ ቀድሞ መከላከል" },
      { en: "Preservation of endangered native Ethiopian flora", am: "አደጋ ላይ ያሉ ብርቅዬ የሀገራችንን እፅዋት መጠበቅ" }
    ],
    faq: [],
    is_featured: false,
    is_published: true,
    sort_order: 11,
    seo_title: "Plant Identification Services | Landscape Solution PLC Ethiopia",
    seo_description: "Botanical plant identification, taxonomy services, and invasive species auditing in Ethiopia."
  }
];

export const PORTFOLIO_CAPABILITY_AREAS = [
  {
    id: "landscape-architecture",
    title: { en: "Landscape Architecture & Master Planning", am: "የመልክአ ምድር አርክቴክቸር" },
    desc: {
      en: "Custom conceptual layouts, ecological master plans, and 3D architectural visualizations for corporate campuses, embassies, and residential villas.",
      am: "ለኮርፖሬት ግቢዎች፣ ለኤምባሲዎች እና ለመኖሪያ ቪላዎች የተዘጋጀ የቦታ ፕላንና የ3ዲ ዲዛይን ስራ።"
    },
    image: "/images/service_planning.jpg"
  },
  {
    id: "urban-greening",
    title: { en: "Urban Greening & Public Corridors", am: "የከተማ አረንጓዴ ልማት" },
    desc: {
      en: "Corridor streetscape tree canopy plantings, boulevard medians, civic park revitalization, and green infrastructure.",
      am: "የመንገድ ዳርቻ ዛፎች ተከላ፣ የፓርኮች ግንባታ እና የከተማ አረንጓዴ ኮሪደር ስራዎች።"
    },
    image: "/images/service_urban_greening.jpg"
  },
  {
    id: "plant-nursery",
    title: { en: "Nursery Development & Seedling Production", am: "የችግኝ ጣቢያ ልማት" },
    desc: {
      en: "Controlled greenhouse propagation and large-scale cultivation of native, ornamental, forest, and medicinal seedlings.",
      am: "ዘመናዊ የግሪንሃውስ ችግኝ ማፍያ ማዕከላትና ጥራት ያላቸውን አገር በቀል ችግኞች በብዛት ማምረት።"
    },
    image: "/images/service_nursery.jpg"
  },
  {
    id: "botanical-gardens",
    title: { en: "Botanical Gardens & Conservation Collections", am: "ቦታኒካል ጋርደን" },
    desc: {
      en: "Living genetic plant repositories, interpretive nature walkways, educational arboretums, and thematic displays.",
      am: "ህያው የዕፅዋት መናፈሻዎች፣ የተፈጥሮ የእግር ጉዞ መንገዶች እና የጥናትና ምርምር ማዕከላት።"
    },
    image: "/images/service_botanic.jpg"
  },
  {
    id: "smart-irrigation",
    title: { en: "Smart Irrigation & Water Systems", am: "ዘመናዊ የመስኖ ስርዓት" },
    desc: {
      en: "Engineered micro-drip networks, automated zoning timers, popup sprinklers, and water-conserving technologies.",
      am: "ውሃ ቆጣቢ ጠብታ መስኖዎች፣ አውቶማቲክ ስፕሪንክለሮችና ዘመናዊ የውሃ አያያዝ ቴክኖሎጂዎች።"
    },
    image: "/images/service_irrigation.jpg"
  },
  {
    id: "environmental-restoration",
    title: { en: "Environmental Restoration & Reforestation", am: "የተራቆቱ መሬቶችን ማቋቋም" },
    desc: {
      en: "Bio-engineered slope stabilization, watershed basin recovery, native reforestation, and erosion prevention.",
      am: "የተራቆቱ መሬቶችን ማከም፣ የአፈር መሸርሸርን መከላከል እና አገር በቀል ዛፎችን መልሶ መትከል።"
    },
    image: "/images/service_restoration.jpg"
  },
  {
    id: "compost-production",
    title: { en: "Organic Compost & Biomass Recycling", am: "ኦርጋኒክ ኮምፖስት ማምረት" },
    desc: {
      en: "Conversion of green landscape biomass into biological soil fertilizers, enhancing soil fertility without chemicals.",
      am: "የእፅዋት ተረፈ-ምርቶችን ወደ ተፈጥሮ ማዳበሪያነት በመቀየር የአፈርን ለምነት ኬሚካል አልባ በሆነ መንገድ ማሳደግ።"
    },
    image: "/images/service_compost.jpg"
  }
];

export const SUSTAINABILITY_PILLARS = [
  {
    number: "01",
    title: { en: "Climate Resilience & Green Development", am: "የአየር ንብረት ጥንካሬና አረንጓዴ ልማት" },
    desc: {
      en: "Founded directly in response to deforestation, environmental degradation, and climate change in Ethiopia, Landscape Solution PLC designs landscapes that act as resilient ecological buffers.",
      am: "በኢትዮጵያ የሚታየውን የደን መመናመንና የአየር ንብረት ለውጥ ለመቋቋም የተመሰረተው ላንድስኬፕ ሶሉሽን፣ ተፈጥሮን የሚከላከሉ አረንጓዴ ስነ-ምህዳሮችን ይገነባል።"
    },
    image: "/images/hero_landscape.jpg"
  },
  {
    number: "02",
    title: { en: "Biodiversity & Native Species Conservation", am: "ብዝሃ-ሕይወትና አገር በቀል እፅዋት ጥበቃ" },
    desc: {
      en: "We actively collect, propagate, and champion native Ethiopian plant varieties, protecting threatened flora and providing essential habitats for indigenous pollinators and birds.",
      am: "አገር በቀል የኢትዮጵያ እፅዋትን በማባዛትና በስራዎቻችን ውስጥ በማካተት ብርቅዬ ዝርያዎችን እንጠብቃለን፤ ለንቦችና ለአዕዋፋት ምቹ መኖሪያ እንፈጥራለን።"
    },
    image: "/images/service_plant_id.jpg"
  },
  {
    number: "03",
    title: { en: "Water Stewardship & Smart Irrigation", am: "የውሃ ቁጠባና ዘመናዊ የመስኖ አጠቃቀም" },
    desc: {
      en: "Through precision drip lines, smart evapotranspiration controllers, and drought-tolerant plant palettes, we protect precious water reserves across urban and nursery settings.",
      am: "በጠብታ መስኖዎችና በውሃ ቆጣቢ እፅዋት አማካኝነት የውሃ ብክነትን እስከ 50% በመቀነስ የተፈጥሮ ሀብትን እንጠብቃለን።"
    },
    image: "/images/service_irrigation.jpg"
  },
  {
    number: "04",
    title: { en: "Circular Biomass & Organic Soil Health", am: "ተፈጥሯዊ ኮምፖስትና የአፈር ጤና" },
    desc: {
      en: "Zero organic waste: our clippings and plant residues are systematically aerobically composted into rich biological fertilizer, eliminating synthetic chemical runoff into waterways.",
      am: "የአትክልት ተረፈ-ምርቶችን በሙሉ ወደ ተፈጥሮ ማዳበሪያነት በመቀየር ኬሚካል አልባና ጤናማ የአፈር ለምነት እንዲፈጠር እናደርጋለን።"
    },
    image: "/images/service_compost.jpg"
  },
  {
    number: "05",
    title: { en: "Ecological Restoration & Reforestation", am: "የተራቆቱ መሬቶችን መልሶ ማልማት" },
    desc: {
      en: "Restoring degraded terrains through biological contouring, native reforestation, and watershed stabilization, strengthening communities against erosion.",
      am: "የተራቆቱ ተፋሰሶችንና ገደላማ ቦታዎችን አገር በቀል ዛፎችን በመትከል መልሶ በማቋቋም አፈር እንዳይሸረሸር ጥበቃ እናደርጋለን።"
    },
    image: "/images/service_restoration.jpg"
  },
  {
    number: "06",
    title: { en: "Community Education & Green Jobs", am: "የማህበረሰብ ትምህርትና አረንጓዴ ስራዎች" },
    desc: {
      en: "Building sustainable capacity across Ethiopia by training local gardeners, engaging youth in environmental initiatives, and creating durable green economy employment.",
      am: "ለወጣቶችና ለባለሙያዎች ስልጠናዎችን በመስጠትና አስተማማኝ የስራ ዕድሎችን በመፍጠር በአረንጓዴ ኢኮኖሚ ውስጥ ጠንካራ አቅም እንገነባለን።"
    },
    image: "/images/who_we_are.jpg"
  }
];

export const BLOG_THEMATIC_TOPICS = [
  {
    slug: "sustainable-landscaping",
    name: { en: "Sustainable Landscaping", am: "ዘላቂ የመልክአ ምድር አሰራር" },
    desc: {
      en: "Principles and practices for creating climate-resilient, water-efficient outdoor environments in Ethiopia.",
      am: "በኢትዮጵያ የአየር ንብረት ለውጥን የሚቋቋሙ ውብ መልክአ ምድሮችን የመፍጠር ሳይንሳዊ መንገዶች።"
    },
    image: "/images/hero_landscape.jpg"
  },
  {
    slug: "urban-greening",
    name: { en: "Urban Greening & Living Cities", am: "የከተማ አረንጓዴ ልማት" },
    desc: {
      en: "How street trees, pocket parks, and green corridors transform Ethiopian cities into healthier, cooler habitats.",
      am: "የከተማ ዛፎችና ፓርኮች የከተሞቻችንን የአየር ሙቀት በመቀነስ የተሻለ የህይወት ድባብ እንዴት እንደሚፈጥሩ።"
    },
    image: "/images/service_urban_greening.jpg"
  },
  {
    slug: "environmental-restoration",
    name: { en: "Environmental Restoration", am: "የአካባቢ መልሶ ማቋቋም" },
    desc: {
      en: "Rehabilitating degraded landscapes, biological erosion control, and watershed stabilization case studies.",
      am: "የተራቆቱ መሬቶችን ማከም፣ የአፈር መሸርሸርን መከላከል እና የተፋሰስ ጥበቃ ስራዎች።"
    },
    image: "/images/service_restoration.jpg"
  },
  {
    slug: "irrigation-and-water-management",
    name: { en: "Irrigation & Water Stewardship", am: "የውሃ ቁጠባና የመስኖ ሳይንስ" },
    desc: {
      en: "Modern micro-drip technologies, smart zoning, and water optimization for landscapes and nurseries.",
      am: "ዘመናዊ የጠብታ መስኖዎች እና ውሃ ቆጣቢ ቴክኖሎጂዎች ለመኖሪያና ለንግድ ቦታዎች።"
    },
    image: "/images/service_irrigation.jpg"
  },
  {
    slug: "nursery-and-plant-propagation",
    name: { en: "Nursery Science & Propagation", am: "የችግኝ ጣቢያ ሳይንስ" },
    desc: {
      en: "Best practices in seedling propagation, indigenous species selection, and tree establishment.",
      am: "ችግኞችን በጥራት የማፍላትና አገር በቀል ዛፎችን የመንከባከብ ዘዴዎች።"
    },
    image: "/images/service_nursery.jpg"
  },
  {
    slug: "biodiversity-and-native-plants",
    name: { en: "Biodiversity & Native Flora", am: "ብዝሃ-ሕይወትና አገር በቀል እፅዋት" },
    desc: {
      en: "Discovering Ethiopia's unique indigenous botanical treasures and their ecological roles.",
      am: "የኢትዮጵያ ልዩ አገር በቀል እፅዋት እና ለስነ-ምህዳራችን ያላቸው ከፍተኛ ፋይዳ።"
    },
    image: "/images/service_plant_id.jpg"
  }
];

export const MOCK_PORTFOLIO_PROJECTS = [
  {
    id: "bole-commercial-biophilic-plaza",
    title: {
      en: "Bole Commercial Plaza & Biophilic Terraces",
      am: "የቦሌ የንግድ ማዕከልና የተፈጥሮ መልክአ ምድር"
    },
    category: {
      en: "Landscape Architecture & Master Planning",
      am: "የመልክአ ምድር አርክቴክቸር"
    },
    location: "Addis Ababa, Ethiopia",
    year: "2026",
    description: {
      en: "Multi-tiered commercial rooftop garden terraces featuring indigenous flowering flora, custom natural stone pathways, and sustainable micro-climate cooling for corporate headquarters.",
      am: "አገር በቀል የውበት እፅዋትን፣ የተፈጥሮ ድንጋይ ንጣፍን እና ተፈጥሯዊ ቅዝቃዜን የያዘ ዘመናዊ የንግድ ማዕከል እርከን መልክአ ምድር።"
    },
    coverImage: "/images/hero_landscape.jpg",
    galleryImages: [
      {
        url: "/images/hero_landscape.jpg",
        caption: {
          en: "Completed biophilic garden terraces with native canopy and modern architectural integration.",
          am: "የተጠናቀቀው የተፈጥሮ መልክአ ምድር ከዘመናዊው ህንፃ ጋር የተዋሃደ ውብ እይታ።"
        }
      },
      {
        url: "/images/service_planning.jpg",
        caption: {
          en: "Architectural 3D master planning and grading blueprints created during the design phase.",
          am: "በዲዛይን ወቅት የተዘጋጀ የ3ዲ ማስተር ፕላን እና የቴክኒክ ንድፍ።"
        }
      },
      {
        url: "/images/service_construction.jpg",
        caption: {
          en: "Precision hardscape installation and cut-stone masonry paving along perimeter walkways.",
          am: "የመተላለፊያ መንገዶች የድንጋይ ንጣፍ እና የመሬት ዝግጅት ግንባታ።"
        }
      }
    ]
  },
  {
    id: "addis-green-corridor-beautification",
    title: {
      en: "Addis Ababa Urban Green Corridor & Pedestrian Boulevard",
      am: "የአዲስ አበባ አረንጓዴ ኮሪደር እና የመንገድ ዳርቻ ልማት"
    },
    category: {
      en: "Urban Greening & Environmental Services",
      am: "የከተማ አረንጓዴ ልማት"
    },
    location: "Addis Ababa, Ethiopia",
    year: "2026",
    description: {
      en: "Urban roadside beautification incorporating shaded pedestrian walkways, dedicated bike paths, flowering median buffers, and drought-tolerant ground cover.",
      am: "የመንገድ ዳርቻ ዛፎች ተከላ፣ የብስክሌትና የእግር መንገድ ውበት እንዲሁም የአየር ንብረት ተስማሚ እፅዋት ልማት።"
    },
    coverImage: "/images/service_urban_greening.jpg",
    galleryImages: [
      {
        url: "/images/service_urban_greening.jpg",
        caption: {
          en: "Active urban boulevard greening with shade trees and flowering median dividers.",
          am: "በከተማው ዋና መንገድ ዳርቻ የተተከሉ የጥላ ዛፎች እና አረንጓዴ ቀበቶዎች።"
        }
      },
      {
        url: "/images/who_we_are.jpg",
        caption: {
          en: "Landscape engineering field team conducting on-site supervisory alignment.",
          am: "የባለሙያዎች ቡድን በቦታው ተገኝቶ የስራውን ጥራት ሲቆጣጠር።"
        }
      },
      {
        url: "/images/service_maintenance.jpg",
        caption: {
          en: "Post-installation horticultural trimming and edge maintenance regimen.",
          am: "የተተከሉ እፅዋትና ቁጥቋጦዎች ቀጣይነት ያለው እንክብካቤ እና ቅርጽ ማስተካከል።"
        }
      }
    ]
  },
  {
    id: "highland-botanical-arboretum",
    title: {
      en: "Highland Living Botanical Garden & Educational Reserve",
      am: "የደጋማው አካባቢ ህያው የዕፅዋት መናፈሻ ማዕከል"
    },
    category: {
      en: "Botanic Garden Development",
      am: "ቦታኒካል ጋርደን"
    },
    location: "Oromia / Addis Ababa Ridge",
    year: "2026",
    description: {
      en: "Comprehensive botanical garden layout featuring labeled living collections of endangered Ethiopian flora, meandering stone paths, and water lily conservation ponds.",
      am: "ብርቅዬ የሀገራችንን እፅዋት ስብስብ የያዘ፣ የተፈጥሮ የእግር ጉዞ መንገዶች እና የውሃ ገንዳዎች ያሉት ህያው መናፈሻ።"
    },
    coverImage: "/images/service_botanic.jpg",
    galleryImages: [
      {
        url: "/images/service_botanic.jpg",
        caption: {
          en: "Meandering visitor stone pathway and natural lily pond framed by jacaranda canopy.",
          am: "የእግር ጉዞ የተፈጥሮ ድንጋይ መንገድ እና የውሃ ገንዳ በጃካራንዳ ዛፎች ጥላ ስር።"
        }
      },
      {
        url: "/images/service_plant_id.jpg",
        caption: {
          en: "Botanist cataloging native endemic plant specimens with taxonomy markers.",
          am: "የእፅዋት ተመራማሪ አገር በቀል ዝርያዎችን ሳይንሳዊ ልየታ ሲያካሂዱ።"
        }
      },
      {
        url: "/images/service_nursery.jpg",
        caption: {
          en: "Propagation facility cultivating replacement botanical seedlings under controlled misting.",
          am: "ለቦታኒካል ጋርደኑ የሚያስፈልጉ ችግኞች የሚራቡበት የግሪንሃውስ ማዕከል።"
        }
      }
    ]
  },
  {
    id: "commercial-seedling-propagation-center",
    title: {
      en: "Indigenous Seedling Propagation & Greenhouse Facility",
      am: "ዘመናዊ የግሪንሃውስ የችግኝ ማፍያ ማዕከል"
    },
    category: {
      en: "Nursery Development & Plant Production",
      am: "የችግኝ ጣቢያ ልማት"
    },
    location: "Debre Zeit / Bishoftu",
    year: "2026",
    description: {
      en: "High-capacity commercial nursery greenhouse with automated micro-misting systems, producing thousands of native tree saplings and ornamental flowers.",
      am: "አውቶማቲክ የጭጋግ መስኖ የተገጠመለት፣ በሺዎች የሚቆጠሩ አገር በቀል የደንና የውበት ችግኞችን የሚያመርት ማዕከል።"
    },
    coverImage: "/images/service_nursery.jpg",
    galleryImages: [
      {
        url: "/images/service_nursery.jpg",
        caption: {
          en: "Greenhouse interior showcasing orderly rows of acclimatized potted seedlings.",
          am: "በግሪንሃውስ ውስጥ በረድፍ የተደረደሩ ጤናማ የደንና የውበት ችግኞች።"
        }
      },
      {
        url: "/images/service_compost.jpg",
        caption: {
          en: "Nutrient-dense organic soil substrate prepared on-site for seedling potting.",
          am: "ለችግኝ ማፍያነት የተዘጋጀ ከፍተኛ ጥራት ያለው ኦርጋኒክ ማዳበሪያና አፈር።"
        }
      },
      {
        url: "/images/service_plant_id.jpg",
        caption: {
          en: "Quality inspection verifying root health and specimen genetics prior to dispatch.",
          am: "ችግኞቹ ከመሰራጨታቸው በፊት የሚደረግ የጤናና የዝርያ ቁጥጥር።"
        }
      }
    ]
  },
  {
    id: "smart-turf-irrigation-estate",
    title: {
      en: "Automated Precision Lawn & Garden Irrigation Network",
      am: "ዘመናዊ አውቶማቲክ የመስኖ ስርዓት ዝርጋታ"
    },
    category: {
      en: "Irrigation & Water Management",
      am: "ዘመናዊ የመስኖ ስርዓት"
    },
    location: "Addis Ababa, Ethiopia",
    year: "2026",
    description: {
      en: "Engineered underground pop-up sprinkler installation and micro-drip networks with automated weather-adjusted timing controllers for commercial lawns.",
      am: "የውሃ ብክነትን እስከ 50% የሚቆጥብ አውቶማቲክ ስፕሪንክለር እና የጠብታ መስኖ ዝርጋታ።"
    },
    coverImage: "/images/service_irrigation.jpg",
    galleryImages: [
      {
        url: "/images/service_irrigation.jpg",
        caption: {
          en: "High-efficiency rotary sprinkler arc covering manicured turf at dawn.",
          am: "በማለዳ ሳሩን የሚያረሰርስ ዘመናዊ የርጭት ስፕሪንክለር አሰራር።"
        }
      },
      {
        url: "/images/service_construction.jpg",
        caption: {
          en: "Subsurface piping trenching and turf reinstatement during construction.",
          am: "የመስኖ ቱቦዎች ቅበራና የመሬት መልሶ ማስተካከል ስራ።"
        }
      },
      {
        url: "/images/hero_landscape.jpg",
        caption: {
          en: "Vibrant and uniformly hydrated commercial estate lawn following system launch.",
          am: "በመስኖው አማካኝነት ሁልጊዜም ለምለም ሆኖ የሚታይ ውብ ግቢ።"
        }
      }
    ]
  },
  {
    id: "watershed-rehabilitation-hillside",
    title: {
      en: "Hillside Watershed Rehabilitation & Bio-Terracing",
      am: "የተራቆተ ተፋሰስ ስነ-ምህዳራዊ መልሶ ማቋቋም"
    },
    category: {
      en: "Environmental Restoration & Reforestation",
      am: "የአካባቢ መልሶ ማቋቋም"
    },
    location: "Ethiopian Highlands",
    year: "2026",
    description: {
      en: "Bio-engineered stone check-dams, vegetative contour hedgerows, and indigenous pioneer tree plantings restoring severely eroded highland watershed slopes.",
      am: "የተራቆቱ ተራራማ አካባቢዎችን የአፈር መሸርሸር በመከላከልና አገር በቀል ዛፎችን በመትከል መልሶ የማልማት ፕሮጀክት።"
    },
    coverImage: "/images/service_restoration.jpg",
    galleryImages: [
      {
        url: "/images/service_restoration.jpg",
        caption: {
          en: "Terraced hillside contours with stone bunds and newly anchored indigenous tree saplings.",
          am: "የድንጋይ እርከን ስራዎች እና የተተከሉ አገር በቀል ችግኞች በተራራው ተፋሰስ ላይ።"
        }
      },
      {
        url: "/images/service_compost.jpg",
        caption: {
          en: "Soil enrichment with organic amendments restoring microbial biology in depleted earth.",
          am: "የተጎዳውን አፈር ለምነት ለመመለስ የተደረገ የተፈጥሮ ማዳበሪያ አጠቃቀም።"
        }
      },
      {
        url: "/images/who_we_are.jpg",
        caption: {
          en: "Ecological monitoring team reviewing slope stability metrics on-site.",
          am: "የአካባቢ ጥበቃ ባለሙያዎች የተፋሰሱን ደህንነት ሲገመግሙ።"
        }
      }
    ]
  }
];

export const MOCK_BLOG_POSTS = [
  {
    id: "biophilic-urbanism-ethiopia",
    slug: "biophilic-urbanism-ethiopia",
    title: {
      en: "The Science of Biophilic Urbanism: Designing Cooler Cities in Ethiopia",
      am: "የከተሞች የተፈጥሮ አርክቴክቸር፡ የኢትዮጵያ ከተሞችን ሙቀት መቀነስ"
    },
    category: {
      en: "Urban Greening & Living Cities",
      am: "የከተማ አረንጓዴ ልማት"
    },
    date: "September 2026",
    readTime: "5 min read",
    author: "Landscape Solution Technical Team",
    image: "/images/service_urban_greening.jpg",
    excerpt: {
      en: "How continuous tree canopies, green corridors, and permeable groundcovers mitigate urban heat island effects and clean urban air in rapidly growing Ethiopian cities.",
      am: "ቀጣይነት ያለው የዛፍ ጥላ ሽፋን እና አረንጓዴ ኮሪደሮች የከተሞቻችንን ሙቀትና አቧራ እንዴት እንደሚቀንሱ።"
    },
    content: {
      en: {
        paragraphs: [
          "Rapid urbanization across Addis Ababa and regional Ethiopian metropolitan centers has increased impervious concrete and asphalt surfaces, leading to pronounced urban heat island effects. During dry seasons, ambient urban temperatures can exceed surrounding rural areas by 3°C to 5°C.",
          "Biophilic urban design counters this by integrating green corridors, roadside vegetative buffers, and pocket parks directly into civic master planning. High-canopy native shade trees act as natural evaporative cooling towers, providing immediate thermal comfort for pedestrians while capturing fine particulate dust.",
          "At Landscape Solution PLC, our urban greening frameworks prioritize multi-tier planting: combining deep-rooting indigenous shade trees with drought-tolerant perennial shrub understories that maximize biological cooling without straining municipal water reserves."
        ],
        takeaways: [
          "Urban tree canopies reduce localized surface temperatures by up to 8°C through transpiration.",
          "Continuous green corridors serve as wildlife conduits for native pollinators and bird species.",
          "Integrating bioswales along road medians captures seasonal stormwater runoff, preventing flash flooding."
        ]
      },
      am: {
        paragraphs: [
          "በአዲስ አበባ እና በሌሎች የክልል ከተሞች ፈጣን እድገት ምክንያት የተገነቡ ህንፃዎችና የአስፋልት መንገዶች መብዛት የከተማን ሙቀት በከፍተኛ ሁኔታ እንዲጨምር አድርጓል።",
          "ይህንን ችግር ለመቅረፍ በመንገድ ዳርቻዎች እና በመኖሪያ መንደሮች ውስጥ አረንጓዴ ኮሪደሮችንና የጥላ ዛፎችን ማልማት ወሳኝ መፍትሄ ነው። ትላልቅ አገር በቀል የጥላ ዛፎች የከተማን አየር ከማቀዝቀዝ ባለፈ አቧራን በማጣራት ጤናማ አካባቢን ይፈጥራሉ።",
          "ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር ጥልቅ ስር ያላቸውንና አነስተኛ ውሃ የሚፈልጉ አገር በቀል ዛፎችን በመትከል ለከተሞቻችን ውበትና ዘላቂ ቅዝቃዜን የሚያጎናጽፉ የመልክአ ምድር ስራዎችን ያከናውናል።"
        ],
        takeaways: [
          "የዛፍ ጥላ ሽፋን የከተማን ሙቀት እስከ 8 ዲግሪ ሴንቲግሬድ ይቀንሳል።",
          "አረንጓዴ መንገዶች ለአካባቢ ንጽህና እና ለነዋሪዎች የአእምሮ እረፍት ከፍተኛ አስተዋጽኦ ያበረክታሉ።",
          "የመንገድ ዳርቻ እፅዋት በክረምት ወቅት የሚፈጠረውን የጎርፍ አደጋ በከፍተኛ ደረጃ ይከላከላሉ።"
        ]
      }
    }
  },
  {
    id: "indigenous-flora-conservation",
    slug: "indigenous-flora-conservation",
    title: {
      en: "Conserving Indigenous Ethiopian Flora: Why Native Species Outperform Exotics",
      am: "አገር በቀል የኢትዮጵያ እፅዋት ጥበቃ፡ ለምን ከአዳዲስ ዝርያዎች ይመረጣሉ?"
    },
    category: {
      en: "Biodiversity & Native Flora",
      am: "ብዝሃ-ሕይወትና አገር በቀል እፅዋት"
    },
    date: "September 2026",
    readTime: "6 min read",
    author: "Botanical Research Division",
    image: "/images/service_plant_id.jpg",
    excerpt: {
      en: "A comparative botanical analysis of why indigenous Ethiopian trees and shrubs demonstrate superior disease resistance, minimal water demand, and vital pollinator support compared to imported exotics.",
      am: "አገር በቀል የኢትዮጵያ ዛፎችና ቁጥቋጦዎች በሽታን በመቋቋም፣ ውሃ ባለመፍጀት እና ለአካባቢ ስነ-ምህዳር ያላቸው ከፍተኛ ፋይዳ።"
    },
    content: {
      en: {
        paragraphs: [
          "For decades, commercial landscaping projects in East Africa frequently relied on fast-growing imported exotic plants. However, long-term empirical evidence shows these species often demand excessive irrigation, deplete soil nutrients, and remain vulnerable to local pests.",
          "In contrast, Ethiopia's indigenous flora—such as Juniperus procera (Tid), Olea europaea subsp. cuspidata (Weyra), Cordia africana (Wanza), and Acacia abyssinica—have co-evolved over millennia with local soil microbiology and climate fluctuations.",
          "Our botanical surveys demonstrate that indigenous plants achieve over 95% post-transplant survival when properly acclimatized in nursery conditions. They require zero synthetic pesticides and develop symbiotic mycorrhizal root associations that stabilize the soil."
        ],
        takeaways: [
          "Native species consume up to 60% less supplemental irrigation once established.",
          "Indigenous trees support hundreds of specialized local pollinators, birds, and beneficial insects.",
          "Preserving native genetic varieties safeguards Ethiopia's botanical heritage against global biodiversity decline."
        ]
      },
      am: {
        paragraphs: [
          "ለበርካታ ዓመታት በመልክአ ምድር ስራዎች ላይ ከውጭ የሚገቡ የዛፍ ዝርያዎች በስፋት ጥቅም ላይ ሲውሉ ቆይተዋል። ነገር ግን እነዚህ እፅዋት ከፍተኛ ውሃ የሚፈልጉና በሽታን የመቋቋም አቅማቸው ዝቅተኛ መሆኑ ተረጋግጧል።",
          "በተቃራኒው እንደ ጽድ (Juniperus procera)፣ ወይራ (Olea europaea)፣ ዋንዛ (Cordia africana) እና ግራር (Acacia) የመሳሰሉት አገር በቀል ዛፎቻችን ከኢትዮጵያ አፈርና አየር ንብረት ጋር ለዘመናት የተላመዱ በመሆናቸው እጅግ ጠንካራ ናቸው።",
          "ላንድስኬፕ ሶሉሽን እነዚህን ብርቅዬ አገር በቀል እፅዋት በዘመናዊ የችግኝ ማፍያ ማዕከሉ በማባዛት በመላ ሀገሪቱ በሚከናወኑ ፕሮጀክቶች ውስጥ ቅድሚያ ሰጥቶ ይተገብራል።"
        ],
        takeaways: [
          "አገር በቀል እፅዋት ከውጭ ከሚገቡት ጋር ሲነፃፀሩ እስከ 60% ያነሰ ውሃ ይፈልጋሉ።",
          "የአካባቢያችንን አፈር ለምነት ለመጠበቅና ለአእዋፋት ምቹ መኖሪያ ለመፍጠር ተወዳዳሪ የላቸውም።",
          "የሀገራችንን የተፈጥሮ ቅርስ ለቀጣዩ ትውልድ ለማስተላለፍ አገር በቀል ዛፎችን መትከል የግድ ነው።"
        ]
      }
    }
  },
  {
    id: "smart-water-stewardship",
    slug: "smart-water-stewardship",
    title: {
      en: "Smart Water Stewardship: Cutting Landscape Water Use by 50% with Micro-Drip",
      am: "ዘመናዊ የውሃ አጠቃቀም ሳይንስ፡ የመስኖ ውሃን በ50% የመቆጠብ ዘዴ"
    },
    category: {
      en: "Irrigation & Water Stewardship",
      am: "የውሃ ቁጠባና የመስኖ ሳይንስ"
    },
    date: "August 2026",
    readTime: "4 min read",
    author: "Irrigation Engineering Team",
    image: "/images/service_irrigation.jpg",
    excerpt: {
      en: "Moving from wasteful overhead flooding to precision subsurface micro-drip networks, weather-responsive smart sensors, and automated irrigation zoning.",
      am: "ውሃን በከንቱ ከማፍሰስ ወደ ዘመናዊ የጠብታ መስኖ፣ የስፕሪንክለር ስርዓት እና አውቶማቲክ ተቆጣጣሪዎች የመሸጋገር ፋይዳ።"
    },
    content: {
      en: {
        paragraphs: [
          "Traditional manual landscape watering through handheld hoses or non-regulated broadcast sprinklers wastes up to 60% of applied water through wind drift, surface runoff, and midday evaporation.",
          "Modern irrigation engineering replaces this with zoned sub-surface drip irrigation and pressure-compensating rotary pop-up sprinklers. By targeting water delivery directly to root zones at pre-dawn hours, water loss is virtually eliminated.",
          "Landscape Solution PLC integrates automated multi-station controllers equipped with rain and soil-moisture cutoffs. When seasonal rains arrive in Ethiopia, the irrigation network automatically suspends operation, conserving thousands of liters of municipal water."
        ],
        takeaways: [
          "Precision micro-drip delivers moisture with over 90% application efficiency directly at the root zone.",
          "Automated smart timers eliminate the risk of overwatering, root rot, and wasteful runoff.",
          "Substantial reduction in commercial utility bills, typically yielding system ROI within 18 months."
        ]
      },
      am: {
        paragraphs: [
          "በተለመደው መንገድ በጎማ ወይም ውሃን በማፍሰስ የሚደረግ የአትክልት ውሃ ማጠጣት እስከ 60% የሚሆነውን ውሃ በከንቱ እንዲባክን ያደርጋል።",
          "ዘመናዊ የመስኖ ቴክኖሎጂ ይህንን ችግር የሚቀርፈው ውሃ በቀጥታ ወደ እፅዋቱ ስር እንዲደርስ በሚያደርግ የጠብታ መስኖ እና በራስ ሰር በሚሰሩ አውቶማቲክ ስፕሪንክለሮች ነው።",
          "ላንድስኬፕ ሶሉሽን የሚዘረጋቸው የመስኖ ስርዓቶች የዝናብ ዳሳሾች የተገጠመላቸው በመሆናቸው በክረምት ወቅት በራሳቸው ጊዜ ውሃ ማጠጣት በማቆም ከፍተኛ የውሃ ወጪን ይቆጥባሉ።"
        ],
        takeaways: [
          "የጠብታ መስኖ ከ90% በላይ የሚሆነውን ውሃ በቀጥታ ለእፅዋቱ ስር ያደርሳል።",
          "አውቶማቲክ ተቆጣጣሪዎች እፅዋቱ ተመጣጣኝ ውሃ እንዲያገኙ በማድረግ ከመበስበስ ይጠብቃሉ።",
          "የተቋማትንና የመኖሪያ ቤቶችን የውሃ ክፍያ በከፍተኛ ደረጃ ይቀንሳል።"
        ]
      }
    }
  },
  {
    id: "hillside-watershed-restoration",
    slug: "hillside-watershed-restoration",
    title: {
      en: "Restoring Degraded Highland Slopes: Bio-Engineering & Watershed Contouring",
      am: "የተራቆቱ ተራራማ ተፋሰሶችን በባዮ-ኢንጂነሪንግ መልሶ ማቋቋም"
    },
    category: {
      en: "Environmental Restoration",
      am: "የአካባቢ መልሶ ማቋቋም"
    },
    date: "August 2026",
    readTime: "7 min read",
    author: "Restoration & Soil Ecology Team",
    image: "/images/service_restoration.jpg",
    excerpt: {
      en: "Deploying vegetative contour hedgerows, stone check-dams, and native deep-root pioneer species to permanently halt gully erosion and restore water tables in degraded landscapes.",
      am: "የድንጋይ እርከኖችንና አገር በቀል ዛፎችን በመትከል ገደሎችንና የተራቆቱ መሬቶችን ከአፈር መሸርሸር የመጠበቅ ስራ።"
    },
    content: {
      en: {
        paragraphs: [
          "Highland topography in Ethiopia combined with intense seasonal rainfall makes sloped terrains highly vulnerable to devastating gully erosion and topsoil loss when vegetative cover is removed.",
          "Mechanical earth-moving alone rarely provides lasting stability on steep gradients. Instead, Landscape Solution PLC deploys biological engineering methods: pairing physical stone contour bunds with deep-rooting native grasses and nitrogen-fixing pioneer trees.",
          "As these vegetative barriers mature, they slow surface runoff, trap fertile sediment, and facilitate deep groundwater infiltration. Within two seasons, barren slopes regenerate into thriving biological micro-catchments."
        ],
        takeaways: [
          "Bio-engineering vegetative barriers permanently halt topsoil erosion and gully widening.",
          "Rehabilitated watersheds raise local groundwater tables, sustaining perennial stream flows.",
          "Local community engagement provides sustainable green stewardship and long-term land security."
        ]
      },
      am: {
        paragraphs: [
          "በኢትዮጵያ ደጋማ አካባቢዎች የሚገኙ ተራራማ መሬቶች በክረምት ወቅት በሚዘንበው ከባድ ዝናብ ምክንያት ለአፈር መሸርሸርና ለገደል መፈጠር የተጋለጡ ናቸው።",
          "ይህንን ችግር ለመፍታት የድንጋይ እርከን ስራዎችን ጥልቅ ስር ካላቸው አገር በቀል ዛፎችና ሳሮች ጋር በማጣመር የተራቆተውን መሬት መልሶ ማቋቋም ተመራጭ መንገድ ነው።",
          "ላንድስኬፕ ሶሉሽን የተራቆቱ ተፋሰሶችን ወደ ቀድሞ ለምነታቸው በመመለስ የአካባቢው የከርሰ ምድር ውሃ እንዲጨምርና ተፈጥሮ እንድታገግም ያደርጋል።"
        ],
        takeaways: [
          "የተፈጥሮ እርከንና ተከላ ስራዎች የአፈር መሸርሸርን በዘላቂነት ያስቆማሉ።",
          "የተፋሰስ መልሶ ማልማት የውሃ ምንጮች እንዳይደርቁ ያደርጋል።",
          "ማህበረሰቡን ባሳተፈ መንገድ የሚሰራ ስራ ዘላቂ ውጤት ያስገኛል።"
        ]
      }
    }
  },
  {
    id: "modern-nursery-seedling-protocols",
    slug: "modern-nursery-seedling-protocols",
    title: {
      en: "Modern Plant Nursery Protocols: Maximizing Seedling Survival from Greenhouse to Ground",
      am: "ዘመናዊ የችግኝ ማፍያ ስነ-ዘዴ፡ የችግኞች የመጽደቅ ምጣኔን ማሳደግ"
    },
    category: {
      en: "Nursery Science & Propagation",
      am: "የችግኝ ጣቢያ ሳይንስ"
    },
    date: "July 2026",
    readTime: "5 min read",
    author: "Horticultural Nursery Specialists",
    image: "/images/service_nursery.jpg",
    excerpt: {
      en: "Why root pruning, staged sun hardening, and organic mycorrhizal root inoculation are essential for achieving over 90% seedling survival in commercial landscaping.",
      am: "ችግኞች ከመተከላቸው በፊት በግሪንሃውስ ውስጥ የሚደረግ ጥንቃቄና የሳይንሳዊ እንክብካቤ ዘዴዎች።"
    },
    content: {
      en: {
        paragraphs: [
          "A major bottleneck in large-scale tree planting and commercial landscaping initiatives is high seedling mortality following field transplantation. Seedlings reared in shade houses often experience severe transplant shock when exposed to full sun and wind.",
          "Our nursery operations follow a strict 3-stage acclimatization protocol: moving saplings through progressively sun-hardened zones while tapering misting cycles to build drought resilience.",
          "Furthermore, containerized air-pruning pots prevent root circling and promote dense lateral root architecture. Inoculating potting substrates with beneficial mycorrhizal fungi guarantees rapid root anchoring and nutrient uptake upon final site installation."
        ],
        takeaways: [
          "Staged sun hardening builds cuticle thickness and stomatal control, eliminating transplant shock.",
          "Air-pruning containers prevent root spiraling, ensuring structural anchorage and long-term tree stability.",
          "Organic mycorrhizal inoculation increases root surface area by up to 100x for enhanced nutrient absorption."
        ]
      },
      am: {
        paragraphs: [
          "በዛፍ ተከላ ስራዎች ላይ ትልቁ ተግዳሮት ችግኞች ከተተከሉ በኋላ የመሞት ምጣኔያቸው ከፍተኛ መሆኑ ነው። በቂ እንክብካቤ ያልተደረገላቸው ችግኞች ወደ መሬት ሲወርዱ በቀላሉ ይደርቃሉ።",
          "ላንድስኬፕ ሶሉሽን ችግኞቹ ወደ መሬት ከመውረዳቸው በፊት ደረጃ በደረጃ ከፀሀይ ብርሃንና ከንፋስ ጋር እንዲላመዱ በማድረግ የመጽደቅ አቅማቸውን ወደ 95% ያሳድጋል።",
          "እንዲሁም የስር መበስበስን በሚከላከሉ ዘመናዊ የችግኝ ማፍያ ፕላስቲኮችና በተፈጥሮ ማዳበሪያ በመጠቀም ጠንካራና ጤናማ ችግኞችን ለተከላ ዝግጁ ያደርጋል።"
        ],
        takeaways: [
          "የፀሀይ ብርሃን መላመድ ችግኞች ከተተከሉ በኋላ እንዳይደርቁ ያደርጋል።",
          "ጤናማ የስር አወቃቀር ዛፎች በፍጥነት እንዲያድጉና እንዲጠነክሩ ይረዳል",
          "የተፈጥሮ ማዳበሪያ አጠቃቀም ለችግኞች ጤንነት ወሳኝ ነው።"
        ]
      }
    }
  },
  {
    id: "circular-soil-health-composting",
    slug: "circular-soil-health-composting",
    title: {
      en: "Circular Soil Health: The Role of Aerobic Organic Composting in Chemical-Free Landscapes",
      am: "የተፈጥሮ አፈር ለምነት፡ የኦርጋኒክ ኮምፖስት ሚና ኬሚካል አልባ ለሆነ ውበት"
    },
    category: {
      en: "Sustainable Landscaping",
      am: "ዘላቂ የመልክአ ምድር አሰራር"
    },
    date: "July 2026",
    readTime: "5 min read",
    author: "Soil Science & Composting Division",
    image: "/images/service_compost.jpg",
    excerpt: {
      en: "Transforming civic and commercial landscape biomass into weed-free, nutrient-dense organic humus that improves water holding capacity and revives depleted urban soils.",
      am: "የእፅዋት ተረፈ-ምርቶችን ወደ ተፈጥሮ ማዳበሪያነት በመቀየር የአፈርን እርጥበት የመያዝ አቅም ማሳደግ።"
    },
    content: {
      en: {
        paragraphs: [
          "Urban landscaping generates substantial organic biomass through regular grass cuttings, branch pruning, and fallen foliage. Transporting this green waste to landfills wastes valuable organic nutrients and generates anaerobic methane emissions.",
          "Landscape Solution PLC implements circular biomass management. All landscape residues are aerobically composted with controlled temperature monitoring, reaching 60°C to eliminate weed seeds and plant pathogens.",
          "The resulting cured organic compost contains diverse microbial populations and high organic matter content. When tilled into sandy or clay-heavy soils, it increases water-holding capacity by up to 30%, making outdoor landscapes far more drought-resilient."
        ],
        takeaways: [
          "Aerobic high-temperature composting guarantees 100% destruction of weed seeds and pests.",
          "Incorporating organic compost increases soil moisture retention by up to 30%, saving irrigation water.",
          "Eliminates synthetic fertilizers, protecting municipal streams and groundwater from toxic runoff."
        ]
      },
      am: {
        paragraphs: [
          "ከአትክልትና ከሳር የሚገኙ ተረፈ-ምርቶችን አቃጥሎ ወይም ጥሎ ከማባከን ወደ ጠቃሚ የተፈጥሮ ማዳበሪያነት መለወጥ ዘላቂ የመልክአ ምድር ስራ ዋነኛ መሰረት ነው።",
          "ላንድስኬፕ ሶሉሽን እነዚህን ተረፈ-ምርቶች በሳይንሳዊ መንገድ በማብላትና ከፍተኛ ሙቀት እንዲያልፉ በማድረግ ከበሽታና ከአረም የጸዳ ጥራት ያለው ኮምፖስት ያዘጋጃል።",
          "ይህ የተፈጥሮ ማዳበሪያ አፈር እርጥበትን እንዲይዝ በማድረግ የውሃ ወጪን ይቀንሳል፤ እፅዋትም በኬሚካል ሳይሆን በተፈጥሯዊ መንገድ እንዲለመልሙ ያደርጋል።"
        ],
        takeaways: [
          "ሳይንሳዊ የኮምፖስት ዝግጅት አረሞችንና በሽታዎችን ያጠፋል።",
          "አፈር እርጥበት የመያዝ አቅሙ እንዲጨምር በማድረግ የመስኖ ውሃን ይቆጥባል።",
          "የከርሰ ምድር ውሃ እንዳይበከል የሚከላከል ለአካባቢ ተስማሚ አሰራር ነው።"
        ]
      }
    }
  }
];

export interface JobOpening {
  id: string;
  title: LocalizedText;
  department: {
    en: string;
    am: string;
  };
  location: LocalizedText;
  type: LocalizedText;
  experience: LocalizedText;
  postedDate: string;
  deadline: string;
  salary: LocalizedText;
  summary: LocalizedText;
  responsibilities: {
    en: string[];
    am: string[];
  };
  requirements: {
    en: string[];
    am: string[];
  };
}

export const MOCK_JOB_OPENINGS: JobOpening[] = [
  {
    id: "snr-landscape-architect",
    title: {
      en: "Senior Landscape Architect & Master Planner",
      am: "ከፍተኛ የመልክአ ምድር አርክቴክት እና ማስተር ፕላነር"
    },
    department: {
      en: "Landscape Architecture",
      am: "መልክአ ምድር አርክቴክቸር"
    },
    location: {
      en: "Addis Ababa, Ethiopia",
      am: "አዲስ አበባ፣ ኢትዮጵያ"
    },
    type: {
      en: "Full-time (On-site)",
      am: "ሙሉ ጊዜ"
    },
    experience: {
      en: "4+ Years",
      am: "4+ ዓመታት"
    },
    postedDate: "September 2026",
    deadline: "October 30, 2026",
    salary: {
      en: "Competitive & Commensurate with Experience",
      am: "ተወዳዳሪ / በስምምነት"
    },
    summary: {
      en: "Lead comprehensive landscape master planning, 3D site visualizations, and technical construction drawings for institutional campuses, commercial centers, and civic park developments.",
      am: "ለመንግስታዊ፣ ለንግድ ማዕከላትና ለህዝባዊ ፓርኮች የመልክአ ምድር ማስተር ፕላን፣ የ3D ዲዛይን እና የዝርዝር ግንባታ ስዕሎችን በበላይነት ማዘጋጀት።"
    },
    responsibilities: {
      en: [
        "Develop conceptual and schematic landscape architectural master plans adhering to biophilic design principles.",
        "Produce detailed technical drawings, grading plans, planting schedules, and hardscape construction details in AutoCAD/Civil 3D.",
        "Collaborate closely with civil engineers, hydrologists, and nursery managers to select climate-resilient indigenous species.",
        "Conduct periodic site supervision to ensure accurate field execution against approved landscape designs.",
        "Prepare client presentations and 3D architectural renderings using Lumion, SketchUp, or Rhino."
      ],
      am: [
        "ከአካባቢ ጥበቃ እና ዘላቂነት መርሆዎች ጋር የተጣጣሙ የመልክአ ምድር ማስተር ፕላኖችን ማዘጋጀት።",
        "የግንባታ ዝርዝር ስዕሎችን፣ የቦታ ማስተካከል እና የዕፅዋት ተከላ ሰነዶችን በAutoCAD ማዘጋጀት።",
        "ከሲቪል መሐንዲሶችና የችግኝ ጣቢያ አስተዳዳሪዎች ጋር በመተባበር ተስማሚ አገር በቀል እፅዋትን መምረጥ።",
        "በግንባታ ወቅት ዲዛይኑ በትክክል መሬት ላይ መተግበሩን በቦታው ተገኝቶ መቆጣጠር።",
        "ለደንበኞች የሚቀርቡ የ3D እይታዎችንና ማብራሪያዎችን ማዘጋጀት።"
      ]
    },
    requirements: {
      en: [
        "Bachelor's or Master's degree in Landscape Architecture, Architecture, or Urban Planning.",
        "Minimum 4 years of proven professional experience in landscape design or urban site planning.",
        "Advanced proficiency in AutoCAD, SketchUp, Rhino, Lumion, and Adobe Creative Suite.",
        "Strong knowledge of Ethiopian highland and rift valley plant materials, soils, and microclimates.",
        "Excellent bilingual communication skills in English and Amharic."
      ],
      am: [
        "በመልክአ ምድር አርክቴክቸር፣ በህንፃ አርክቴክቸር ወይም በከተማ ፕላኒንግ የመጀመሪያ ወይም ሁለተኛ ዲግሪ።",
        "ቢያንስ 4 ዓመት በዘርፉ የተረጋገጠ የስራ ልምድ ያለው/ያላት።",
        "በAutoCAD, SketchUp, Lumion እና ተዛማጅ ሶፍትዌሮች የላቀ ክህሎት።",
        "ስለ ኢትዮጵያ አገር በቀል እፅዋት፣ አፈር እና የአየር ሁኔታ ጥልቅ ግንዛቤ።",
        "በእንግሊዝኛ እና በአማርኛ ቋንቋዎች የተሟላ የመግባባት ችሎታ።"
      ]
    }
  },
  {
    id: "nursery-operations-manager",
    title: {
      en: "Horticultural Nursery Operations Manager",
      am: "የችግኝ ጣቢያ ስራዎች ስራ አስኪያጅ"
    },
    department: {
      en: "Horticulture & Nursery",
      am: "ሆርቲካልቸር እና የችግኝ ጣቢያ"
    },
    location: {
      en: "Bishoftu / Addis Ababa, Ethiopia",
      am: "ቢሾፍቱ / አዲስ አበባ፣ ኢትዮጵያ"
    },
    type: {
      en: "Full-time",
      am: "ሙሉ ጊዜ"
    },
    experience: {
      en: "3+ Years",
      am: "3+ ዓመታት"
    },
    postedDate: "September 2026",
    deadline: "November 15, 2026",
    salary: {
      en: "Attractive & Commensurate with Experience",
      am: "ማራኪ / በስምምነት"
    },
    summary: {
      en: "Oversee commercial and native seedling propagation, greenhouse humidity systems, potting substrate production, and distribution logistics across company nurseries.",
      am: "የአገር በቀልና የጌጣጌጥ ችግኞች ማፍላትን፣ የግሪንሀውስ አስተዳደርን፣ የአፈርና ማዳበሪያ ዝግጅትን በበላይነት መምራት።"
    },
    responsibilities: {
      en: [
        "Manage daily propagation cycles of indigenous trees, ornamental shrubs, groundcovers, and medicinal species.",
        "Supervise nursery greenhouse microclimate controllers, automated misting benches, and shade structures.",
        "Formulate optimized organic potting media utilizing aerobic compost, river sand, and volcanic pumice.",
        "Implement integrated biological pest management (IPM) protocols without relying on harmful synthetic pesticides.",
        "Coordinate seedling delivery schedules and inventory readiness for active project installation sites."
      ],
      am: [
        "የአገር በቀል ዛፎች፣ የጌጣጌጥ ቁጥቋጦዎች እና የሳር ችግኞች ማፍላትን በየቀኑ ማስተዳደር።",
        "የግሪንሀውስ እርጥበት መጠበቂያ መርጫዎችን እና የጥላ ቤቶችን ስራ መከታተል።",
        "ተስማሚ የተፈጥሮ ማዳበሪያና አፈር ውህድ ለችግኞች ማዘጋጀት።",
        "የችግኝ በሽታዎችን በተፈጥሯዊ መንገድ የመከላከያ ስልቶችን መተግበር።",
        "ለተለያዩ ፕሮጀክቶች የሚላኩ ችግኞችን ዝግጅትና ክምችት ማስተባበር።"
      ]
    },
    requirements: {
      en: [
        "BSc in Horticulture, Plant Sciences, Forestry, or Botanical Sciences.",
        "3+ years managing commercial propagation nurseries or botanical collection centers.",
        "Hands-on expertise in stem cutting rooting, seed scarification, grafting, and containerized stock production.",
        "Demonstrated leadership capabilities in supervising nursery field labor teams.",
        "Valid driver's license is an advantage."
      ],
      am: [
        "በሆርቲካልቸር፣ በዕፅዋት ሳይንስ ወይም በደን ልማት የመጀመሪያ ዲግሪ።",
        "በንግድ ወይም በቦታኒካል ችግኝ ጣቢያ አስተዳደር ቢያንስ 3 ዓመት ልምድ።",
        "በዘር አያያዝ፣ በችግኝ ማፍላትና በመትከል ተግባራዊ ሙያዊ እውቀት።",
        "የሰራተኞች ቡድንን የመምራትና የማስተባበር ችሎታ።"
      ]
    }
  },
  {
    id: "irrigation-hydraulics-engineer",
    title: {
      en: "Irrigation & Hydraulics Systems Engineer",
      am: "የመስኖ እና ሃይድሮሊክስ ሲስተም መሐንዲስ"
    },
    department: {
      en: "Irrigation & Engineering",
      am: "መስኖ እና ምህንድስና"
    },
    location: {
      en: "Addis Ababa & Project Sites",
      am: "አዲስ አበባ እና የፕሮጀክት ሳይቶች"
    },
    type: {
      en: "Full-time",
      am: "ሙሉ ጊዜ"
    },
    experience: {
      en: "3+ Years",
      am: "3+ ዓመታት"
    },
    postedDate: "September 2026",
    deadline: "November 10, 2026",
    salary: {
      en: "Competitive Industry Package",
      am: "ተወዳዳሪ የኢንዱስትሪ ክፍያ"
    },
    summary: {
      en: "Design, engineer, and commission precision micro-drip networks, automated smart pop-up sprinkler systems, booster pump stations, and rainwater harvesting cisterns.",
      am: "ዘመናዊ የጠብታ መስኖ፣ ራስ-ሰር የሚረጩ የመስኖ ኔትወርኮች እና የፓምፕ ሲስተሞችን መንደፍና መገንባት።"
    },
    responsibilities: {
      en: [
        "Calculate hydraulic head losses, flow rates (GPM/LPM), and pump horsepower requirements for varied landscape topographies.",
        "Produce comprehensive irrigation CAD layouts detailing valve zonings, pipe sizing, lateral runs, and sensor hookups.",
        "Supervise trench excavation, pipe laying, solenoid valve installations, and automated controller wiring on project sites.",
        "Conduct hydrostatic pressure testing, backflow prevention verification, and distribution uniformity audits.",
        "Train client facilities maintenance teams on operating digital seasonal programming controllers."
      ],
      am: [
        "ለተለያዩ ቦታዎች የሚያስፈልገውን የውሃ ፍሰት እና የፓምፕ አቅም በሃይድሮሊክ ስሌት ማረጋገጥ።",
        "የመስኖ ፓይፕ መስመሮችንና የቫልቭ ዞኖችን በAutoCAD መንደፍ።",
        "በሳይት ላይ የፓይፕ ዝርጋታዎችን እና የኤሌክትሮኒክስ መቆጣጠሪያዎችን ተከላ በበላይነት መቆጣጠር።",
        "የውሃ ግፊት ሙከራዎችን በማካሄድ ፍሳሾችን መከላከልና ጥራትን ማረጋገጥ።",
        "ለደንበኞች የመስኖ ሲስተሙን አጠቃቀም ስልጠና መስጠት።"
      ]
    },
    requirements: {
      en: [
        "BSc in Water Resources Engineering, Hydraulic Engineering, Agricultural Engineering, or Mechanical Engineering.",
        "3+ years demonstrable field experience in commercial or residential landscape irrigation installation.",
        "Proficiency with irrigation design software and AutoCAD.",
        "Knowledge of Hunter, Rain Bird, or equivalent controller programming and solenoids.",
        "Willingness to travel periodically to project sites across regional Ethiopia."
      ],
      am: [
        "በውሃ ሀብት ምህንድስና፣ በሃይድሮሊክስ ወይም በግብርና ምህንድስና የመጀመሪያ ዲግሪ።",
        "በዘመናዊ የመስኖ ዝርጋታ ስራዎች ቢያንስ 3 ዓመት ልምድ።",
        "በAutoCAD እና በመስኖ ዲዛይን ሶፍትዌሮች የተካነ/ች።",
        "በተለያዩ የሀገሪቱ ክፍሎች ለሚገኙ ሳይቶች ለመንቀሳቀስ ፈቃደኛ የሆነ/ች።"
      ]
    }
  },
  {
    id: "site-construction-supervisor",
    title: {
      en: "Landscape Construction & Hardscape Supervisor",
      am: "የመልክአ ምድር ግንባታና ሀርድስኬፕ ተቆጣጣሪ"
    },
    department: {
      en: "Project Operations",
      am: "የፕሮጀክት ኦፕሬሽን"
    },
    location: {
      en: "Addis Ababa, Ethiopia",
      am: "አዲስ አበባ፣ ኢትዮጵያ"
    },
    type: {
      en: "Full-time",
      am: "ሙሉ ጊዜ"
    },
    experience: {
      en: "3+ Years",
      am: "3+ ዓመታት"
    },
    postedDate: "September 2026",
    deadline: "November 20, 2026",
    salary: {
      en: "Negotiable / Based on Portfolio",
      am: "በስምምነት"
    },
    summary: {
      en: "Direct daily site earthworks, retaining stone walls, decorative paving, topsoil amendments, and plant installation crews to ensure high craftsmanship and safety.",
      am: "የመሬት ዝግጅት፣ የድንጋይ ግንባታ፣ የእግረኛ መንገድ ንጣፍ እና የዕፅዋት ተከላ ስራዎችን በሳይት ላይ በበላይነት መቆጣጠር።"
    },
    responsibilities: {
      en: [
        "Coordinate daily work shifts for stone masons, carpenters, machine operators, and landscape planting laborers.",
        "Verify sub-base compaction, surface leveling, drainage gradients, and walkway pavers alignment.",
        "Oversee safe offloading, root ball conditioning, and deep pit planting of mature shade trees.",
        "Enforce strict site health and safety standards (PPE, trench shoring, tool safety).",
        "Track daily material deliveries, equipment utilization, and submit bi-weekly progress reports."
      ],
      am: [
        "የግንበኞችን፣ የቀራፂዎችን እና የአትክልት ሰራተኞችን የቀን ስራ ማስተባበር።",
        "የአፈር ድልዳሎ፣ የቦታው ፍሳሽ አቅጣጫ እና የእግረኛ ንጣፎች ጥራት በደረጃው መሰረት መሰራታቸውን ማረጋገጥ።",
        "ትላልቅ ዛፎች ሳይጎዱ በትክክለኛው ጥልቀትና አሰራር መተከላቸውን መከታተል።",
        "የሳይት ደህንነትና የሰራተኞች ጥበቃ ደንቦች መከበራቸውን ማረጋገጥ።",
        "የእለታዊ ቁሳቁስ አጠቃቀምና የስራ አፈፃፀም ሪፖርት ማዘጋጀት።"
      ]
    },
    requirements: {
      en: [
        "Diploma or Degree in Civil Engineering, Construction Technology, Horticulture, or Building Construction.",
        "3+ years supervisory experience on landscape civil works, urban parks, or commercial building sites.",
        "Sound understanding of stone masonry, interlocking pavers, drainage, and planting techniques.",
        "Strong team leadership, dispute resolution, and on-site problem-solving abilities."
      ],
      am: [
        "በሲቪል ምህንድስና፣ በኮንስትራክሽን ቴክኖሎጂ ወይም በህንፃ ግንባታ ዲፕሎማ ወይም ዲግሪ።",
        "በሳይት ተቆጣጣሪነት ቢያንስ 3 ዓመት የተረጋገጠ ልምድ።",
        "የድንጋይ ስራዎችን፣ የንጣፍ አሰራርንና የፍሳሽ መስመሮችን በሚገባ የተረዳ/ች።",
        "ቡድንን በብቃት የመምራት እና ችግሮችን በሳይት ላይ የመፍታት አቅም።"
      ]
    }
  },
  {
    id: "urban-greening-specialist",
    title: {
      en: "Urban Greening & Environmental Specialist",
      am: "የከተማ አረንጓዴ ልማት እና የአካባቢ ጥበቃ ባለሙያ"
    },
    department: {
      en: "Environmental Science",
      am: "የአካባቢ ሳይንስ"
    },
    location: {
      en: "Addis Ababa, Ethiopia",
      am: "አዲስ አበባ፣ ኢትዮጵያ"
    },
    type: {
      en: "Full-time",
      am: "ሙሉ ጊዜ"
    },
    experience: {
      en: "2+ Years",
      am: "2+ ዓመታት"
    },
    postedDate: "September 2026",
    deadline: "December 01, 2026",
    salary: {
      en: "Competitive & Rewarding",
      am: "ተወዳዳሪ ክፍያ"
    },
    summary: {
      en: "Conduct tree health diagnostics, urban biodiversity surveys, environmental impact screenings, and corporate ecological stewardship consulting.",
      am: "የከተማ ዛፎች ጤንነት ምርመራ፣ የስነ-ምህዳር ጥናት እና የአካባቢ ጥበቃ ምክክር አገልግሎቶችን ማከናወን።"
    },
    responsibilities: {
      en: [
        "Perform flora species identification, GPS tagging, and structural health assessments on existing urban trees.",
        "Formulate urban forestry management plans for municipalities, industrial parks, and educational campuses.",
        "Advise design teams on selecting bird-friendly, pollinator-attracting, and indigenous drought-tolerant flora.",
        "Conduct workshops and vocational training modules for corporate groundskeepers and community green groups.",
        "Monitor stormwater bio-swales and urban soil biological activity indicators."
      ],
      am: [
        "የከተማ ዛፎችን ዝርያ መለየት፣ በጂፒኤስ መመዝገብና የጤንነት ሁኔታቸውን መገምገም።",
        "ለተቋማትና ለፓርኮች የረጅም ጊዜ የአረንጓዴ ልማት እቅድ ማዘጋጀት።",
        "ለአካባቢ ተስማሚ የሆኑ አገር በቀል እፅዋትን ለዲዛይን ቡድኑ ማቅረብ።",
        "ለተቋማት የአትክልት ሰራተኞች የስልጠና ፕሮግራሞችን መስጠት።",
        "የአፈርና የውሃ ጥበቃ ስራዎችን ውጤታማነት መከታተል።"
      ]
    },
    requirements: {
      en: [
        "BSc or MSc in Environmental Science, Forestry, Botany, Natural Resource Management, or Ecology.",
        "2+ years practical experience in environmental surveys, botanical inventories, or urban forestry.",
        "Strong botanical knowledge of Ethiopian flora and environmental regulations.",
        "Demonstrated technical report writing and public presentation capabilities."
      ],
      am: [
        "በአካባቢ ሳይንስ፣ በደን ልማት፣ በቦታኒ ወይም በተፈጥሮ ሀብት አያያዝ የመጀመሪያ ወይም ሁለተኛ ዲግሪ።",
        "በአካባቢ ጥናትና በዕፅዋት ዳሰሳ ቢያንስ 2 ዓመት ልምድ።",
        "ስለ ኢትዮጵያ እፅዋትና የአካባቢ ጥበቃ ደንቦች ጥልቅ እውቀት።",
        "ጥሩ የቴክኒክ ሪፖርት አዘገጃጀት እና የንግግር ችሎታ።"
      ]
    }
  }
];


