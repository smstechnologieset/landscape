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
