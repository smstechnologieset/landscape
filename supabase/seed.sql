-- ============================================================================
-- Landscape Solution PLC — seed data
-- DEMO / FICTIONAL content for development + preview. Replace before launch.
-- Images use picsum.photos placeholders so the site renders without uploads.
-- ============================================================================

insert into public.site_settings (id, company_name, phone, email, whatsapp, address, google_maps_url, facebook_url, instagram_url, linkedin_url, youtube_url, default_language, logo_url, favicon_url)
values (1,
  'Landscape Solution PLC',
  '+251 11 234 5678',
  'hello@landscapesolution.example',
  '251911223344',
  'Bole Sub-City, Addis Ababa, Ethiopia',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.4!2d38.74!3d9.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnNDguMCJOIDM4wrA0NCcwMC4wIk!5e0!3m2!1sen!2set!4v1',
  'https://facebook.com/',
  'https://instagram.com/',
  'https://linkedin.com/',
  'https://youtube.com/',
  'en',
  'https://picsum.photos/seed/ls-logo/200/200',
  'https://picsum.photos/seed/ls-favicon/64/64')
on conflict (id) do update set
  company_name = excluded.company_name,
  phone = excluded.phone,
  email = excluded.email,
  whatsapp = excluded.whatsapp,
  address = excluded.address,
  google_maps_url = excluded.google_maps_url,
  facebook_url = excluded.facebook_url,
  instagram_url = excluded.instagram_url,
  linkedin_url = excluded.linkedin_url,
  youtube_url = excluded.youtube_url,
  default_language = excluded.default_language,
  logo_url = excluded.logo_url,
  favicon_url = excluded.favicon_url;

insert into public.company_profile (
  id, about, mission, vision, "values", company_story, company_description,
  hero_title, hero_description, brochure_url
) values (
  1,
  '{"en":"Landscape Solution PLC is a design-led landscaping studio based in Addis Ababa. We help homeowners, businesses and institutions turn underused land into thriving, living spaces — from intimate gardens to large public grounds.","am":"የላንድስኬፕ ሶሉሽን ፒኤልሲ በአዲስ አበባ የተመሰረተ ዲዛይን-ሚካንዳ የመሬት አስተዳደር ስቱዲዮ ነው።"}',
  '{"en":"To make beautiful, resilient outdoor spaces the standard — not the exception — for every client we serve."}',
  '{"en":"A greener Addis Ababa where every building is wrapped in living landscape."}',
  '{"en":"Integrity · Sustainability · Craftsmanship · Collaboration · Care","am":"ትክክልነት · ዘላቂነት · ስራ እንቅስተኝነት · ትብህል · እንክብካቤ"}',
  '{"en":"Founded by a small team of horticulturalists and builders, Landscape Solution PLC began with a simple belief: good landscape design should be practical, affordable and good for the environment. Over the years we have delivered gardens, rooftops and campus grounds across the city.","am":"በሰብሳቢ የምህንድስና እና ሰራተኞች ቡድን የተመሠረተ ላንድስኬፕ ሶሉሽን ፒኤልሲ ቀላል እምነት ላይ የተመሠረተ ነው።"}',
  '{"en":"We design, build and maintain outdoor spaces across Addis Ababa and beyond — gardens, irrigation, green roofs and full estate maintenance.","am":"እኛ አትክልት እና መሬት አስተዳደርን እንዲያንጸባርቁ ዲዛይን፣ ግንባታ እና እንክብካቤ እንሰጣለን።"}',
  '{"en":"Beautiful landscapes, built sustainably","am":"ቆንጆ መሬቶች፣ በዘላቂነት የተሠሩ"}',
  '{"en":"Tell us about your space and we will craft a landscape that fits your lifestyle, your budget and the local climate.","am":"የመሬት ክፍሎችዎን ይግለጹልን፤ ለኑሳ ኑሳ የሚሰማ መሬት እንዲያንጸባርቁ እንሰማለን።"}',
  'https://picsum.photos/seed/ls-brochure/800/1100')
on conflict (id) do update set
  about = excluded.about, mission = excluded.mission, vision = excluded.vision,
  "values" = excluded."values", company_story = excluded.company_story,
  company_description = excluded.company_description, hero_title = excluded.hero_title,
  hero_description = excluded.hero_description, brochure_url = excluded.brochure_url;

insert into public.sustainability_content (id, title, introduction, water_conservation, native_plants, environmental_responsibility, eco_friendly_practices, waste_reduction, sustainable_design, initiatives, statistics)
values (1,
  '{"en":"Our Commitment to Sustainability","am":"ለዘላቂነት ያለን እርምጃ"}',
  '{"en":"We design landscapes that use less water, support local biodiversity and stay healthy for decades — not just for a season.","am":"ውሃን የሚቆጥት፣ የአካባቢ ልዩነትን የሚያደግና ለብዙ ዓመታት የሚያቆይ መሬት እንዲያንጸባርቁ እንዲያዘጋጁ እንሰራለን።"}',
  '{"en":"Smart drip irrigation and rain sensors cut water use by up to 50% versus sprinklers.","am":"ማዘናጀት ያለው የፍሰት መቆጣጠሪያ ውሃን እስከ 50% ይቆጥታል።"}',
  '{"en":"We prioritise Ethiopian native species that thrive without heavy fertiliser or pesticides.","am":"በተለዋዋጭ የኢትዮጵያ አትክልቶች ይተካሉ የሚቀበሉ።"}',
  '{"en":"Every project is planned to protect soil health and local wildlife.","am":"እያንዳንዱ ፕሮጀክት ለምድር ጤንነት እና ለአካባቢ ሕይወት የሚጠብቅ ነው።"}',
  '{"en":"Solar-powered lighting and electric tools lower our carbon footprint on site.","am":"የፀሐይ ኃይል ብራሪዎችና ኤሌክትሪክ መሳሪያዎች ካርበን መጠኑን ይቀንሳሉ።"}',
  '{"en":"Green waste is composted and returned to the soil instead of going to landfill.","am":"የአትክልት ቆሻሻ ወደ ምድር ይመለሳል።"}',
  '{"en":"We design for long life: durable materials, climate-matched planting and low-maintenance layouts.","am":"ለረጅም ጊዜ የሚያገለግል ዲዛይን እንዲያንጸባርቁ እንሰራለን።"}',
  '[{"en":"Free community tree-planting days each rainy season","am":"በእጥቡ ወቅት ነፃ የሚዛፍ እርምጃ"},{"en":"School garden workshops","am":"ለተማሪዎች የግቢ አትክልት ስልጠናዎች"}]',
  '[{"label":{"en":"Water saved / yr","am":"የተቆጠተ ውሃ / ዓመት"},"value":"1.2M L"},
   {"label":{"en":"Native species used","am":"የተጠቀመው የአካባቢ አትክልት"},"value":"60+"},
   {"label":{"en":"Projects delivered","am":"የተፈጸመ ፕሮጀክት"},"value":"120+"},
   {"label":{"en":"Avg. client rating","am":"አማካይ የደንበኛ ምዘን"},"value":"4.9/5"}]')
on conflict (id) do update set
  title = excluded.title, introduction = excluded.introduction,
  water_conservation = excluded.water_conservation, native_plants = excluded.native_plants,
  environmental_responsibility = excluded.environmental_responsibility,
  eco_friendly_practices = excluded.eco_friendly_practices, waste_reduction = excluded.waste_reduction,
  sustainable_design = excluded.sustainable_design, initiatives = excluded.initiatives,
  statistics = excluded.statistics;

-- ---------------------------------------------------------------- services
insert into public.services (title, slug, short_description, description, icon, featured_image, features, benefits, faq, is_featured, is_published, sort_order, seo_title, seo_description)
values
 ('{"en":"Garden Design","am":"የግቢ ንድፍ"}','garden-design',
  '{"en":"Bespoke garden designs shaped around how you actually live and relax outdoors.","am":"ለኑሳ የሚሰማ የግቢ ንድፍ።"}',
  '{"en":"Our designers start with a site survey and a conversation about your lifestyle, then deliver planting plans, hardscape layouts and a maintenance schedule. We favour layered, year-round interest and low-input planting.","am":"ዲዛይነሮቻችን የመሬት ግምገማና ምክንያት ይጀምራሉ።"}',
  'leaf','https://picsum.photos/seed/ls-garden/1200/800',
  '["Site survey & analysis","Concept and mood boards","Planting & hardscape plans","Lighting and irrigation design"]',
  '["Higher property value","Lower upkeep costs","A space you will actually use"]',
  '[{"question":{"en":"How long does a design take?","am":"ንድፍ ምን ያህል ጊዜ ይወስዳል?"},"answer":{"en":"Most residential designs are ready within 3–4 weeks.","am":"በብዙዎቹ ሁኔታዎች 3–4 ሳምንታት ይወስዳል።"}}]',
  true, true, 1, 'Garden Design Services', 'Custom garden design in Addis Ababa.'),

 ('{"en":"Irrigation Systems","am":"የመስኖ ሥራ"}','irrigation-systems',
  '{"en":"Water-smart irrigation that keeps plants healthy while cutting your bill.","am":"ውሃን የሚቆጥት የመስኖ ሥራ።"}',
  '{"en":"We design drip and smart-controller systems with rain sensors and zoning, backed by a clear seasonal schedule. Every system is pressure-tested before handover.","am":"የፍሰት መቆጣጠሪያ ሥራዎችን እንዲያንጸባርቁ እንሰራለን።"}',
  'droplet','https://picsum.photos/seed/ls-irrigation/1200/800',
  '["Drip & micro-spray design","Smart controllers","Rain & soil sensors","Seasonal scheduling"]',
  '["Up to 50% less water","Healthier roots","Remote monitoring"]',
  '[{"question":{"en":"Can you retrofit an existing garden?","am":"ያለውን ግቢ ማሻሻል ይቻላል?"},"answer":{"en":"Yes — most systems are retrofitted without major digging.","am":"አዎ፣ ሳይጎዳ ሊሰራ ይቻላል።"}}]',
  true, true, 2, 'Irrigation Systems', 'Smart irrigation installs in Addis Ababa.'),

 ('{"en":"Landscape Maintenance","am":"የመስክ እንክብካቤ"}','landscape-maintenance',
  '{"en":"Scheduled care that keeps grounds healthy, safe and beautiful all year.","am":"ዓመቱን ሁሉ የሚጠብቅ እንክብካቤ።"}',
  '{"en":"Weekly, bi-weekly or monthly programmes covering mowing, pruning, fertilising, pest control and seasonal planting. A dedicated supervisor visits every site.","am":"ሳምንታዊ የእንክብካቤ ፕሮግራሞች።"}',
  'sprout','https://picsum.photos/seed/ls-maintenance/1200/800',
  '["Mowing & edging","Pruning & shaping","Fertilising & mulching","Pest & disease control"]',
  '["Consistent curb appeal","Early problem detection","Peace of mind"]',
  '[{"question":{"en":"Do you supply materials?","am":"ቁሳሌ ይሰጣሉ?"},"answer":{"en":"Yes, all tools and consumables are included.","am":"አዎ፣ ሁሉም ይጨመራል።"}}]',
  true, true, 3, 'Landscape Maintenance', 'Garden and grounds maintenance plans.'),

 ('{"en":"Green Roofs & Walls","am":"አለት ላሊ ላም እና ግድግዶች"}','green-roofs',
  '{"en":"Living roofs and vertical gardens that cool buildings and lift moods.","am":"የህንፃ ላም እና ግድግዶች ላይ አትክልት።"}',
  '{"en":"We install modular green roofs and interior/exterior living walls with integrated irrigation and drainage.","am":"የላም እና ግድግዶች ላይ አትክልት እንጭናለን።"}',
  'tree','https://picsum.photos/seed/ls-greenroof/1200/800',
  '["Modular tray systems","Integrated drainage","Automatic irrigation","Plant selection"]',
  '["Lower cooling costs","Better air quality","Biophilic wellbeing"]',
  '[{"question":{"en":"Are they heavy?","am":"ከባድ ነው?"},"answer":{"en":"We use lightweight modular systems rated for your structure.","am":"ለህንፃዎ የተማረ ሃይል ይውላል።"}}]',
  false, true, 4, 'Green Roofs & Walls', 'Green roof and living wall installation.'),

 ('{"en":"Commercial Grounds","am":"የንግድ ግቢዎች"}','commercial-grounds',
  '{"en":"Corporate campuses, hotels and public spaces maintained to a high standard.","am":"ለኩባንያዎች እና ሚሊያዎች ግቢዎች።"}',
  '{"en":"Dedicated teams, SLA-backed response times and reporting for facilities managers.","am":"ለፋሺሊቲዎች ማናጀር የተዘጋጀ ሪፖርት።"}',
  'leaf','https://picsum.photos/seed/ls-commercial/1200/800',
  '["Campus master planning","Grounds teams on-site","SLA reporting","Event setup support"]',
  '["Professional appearance","Reduced risk & liability","Single point of contact"]',
  '[{"question":{"en":"What size sites?","am":"ምን ያህል ስፋት?"},"answer":{"en":"From 500 m² rooftops to multi-hectare campuses.","am":"ከ500 ሜትር እስከ ታላላቅ ግቢዎች።"}}]',
  false, true, 5, 'Commercial Grounds', 'Commercial landscape maintenance.'),

 ('{"en":"Consultation & Surveys","am":"ምክንያት እና ግምገማ"}','consultation-surveys',
  '{"en":"A structured on-site visit that turns ideas into a clear, costed plan.","am":"ሃሳብዎን ወደ ዋጋ ያለው ፕላን የሚቀይር ጉብኝት።"}',
  '{"en":"Book a consultation and we will assess soil, light, drainage and your goals, then recommend the right next steps.","am":"የመሬት፣ ብርሃንና ፍሳሽ ይገምገማል።"}',
  'sprout','https://picsum.photos/seed/ls-consult/1200/800',
  '["On-site assessment","Goal workshop","Budget guidance","Next-step roadmap"]',
  '["Clarity before commitment","Avoid costly mistakes","Confidence to start"]',
  '[{"question":{"en":"Is it free?","am":"ነጻ ነው?"},"answer":{"en":"The first 30-minute call is free; site surveys are quoted.","am":"የመጀመሪያው ጥሪ ነጻ ነው።"}}]',
  false, true, 6, 'Consultation & Surveys', 'Book a landscape consultation.');

-- ---------------------------------------------------------------- projects
insert into public.projects (title, slug, category, location, client, completion_date, short_description, description, challenge, solution, results, featured_image, is_featured, is_published, seo_title, seo_description)
values
 ('{"en":"Riverside Family Garden","am":"የወንዝ ጠለል ግቢ"}','riverside-family-garden','residential','Addis Ababa','DEMO — Alemayehu Family',
  '2024-03-15',
  '{"en":"A sloped backyard transformed into terraced garden rooms with a play lawn.","am":"ወረደ ግቢ ወደ ላይላይ ክፍሎች ተቀየረ።"}',
  '{"en":"We regraded the slope into three terraces, added a drought-tolerant lawn and a shaded seating area.","am":"ሦሽ ተለዋ ወደ ሶስት ላይላዮች ተከራይቷል።"}',
  '{"en":"A 1.5 m drop across the plot made play unsafe and drained poorly.","am":"የመሬት ውድቀት ደህንነትን አደገ።"}',
  '{"en":"Retaining walls created flat rooms; a rain garden manages runoff.","am":"የመከላከያ ክፍሎች ለማዘጋጀት ተሰሩ።"}',
  '{"en":"Safe play space, 40% less water use, and a garden the family uses daily.","am":"ደህንነቱ ተጠብቋል።"}',
  'https://picsum.photos/seed/ls-proj-river/1200/800', true, true, 'Riverside Family Garden', 'Residential garden case study.'),

 ('{"en":"Bole Office Campus Grounds","am":"ቦሌ ኦፊስ ካምፓስ"}','bole-office-campus','commercial','Addis Ababa','DEMO — Horizon Tower',
  '2023-11-02',
  '{"en":"A sterile plaza became a green, welcoming entrance with native planting.","am":"የነበረው ሳፕስ ወደ አልባም ግቢ ተቀየረ።"}',
  '{"en":"We replaced hard paving with permeable surfaces, added trees and a staff break-out lawn.","am":"ከበረን ማረጃ ወደ የሚበቃ ማረጃ ተቀየረ።"}',
  '{"en":"Heat island effect made the entrance unbearable at midday.","am":"ሞቃት የሚያበሳ አካባቢ ነበር።"}',
  '{"en":"Shade trees and reflective planting lowered surface temps by 6°C.","am":"ምግብ የሚሰጥ ዛፍ ሞቃትን አለቀረ።"}',
  '{"en":"Cooler entrance, happier staff, and a 25% drop in AC load nearby.","am":"የሰራተኞች ደህንነት ተሻሽሏል።"}',
  'https://picsum.photos/seed/ls-proj-bole/1200/800', true, true, 'Bole Office Campus', 'Commercial grounds case study.'),

 ('{"en":"Rooftop Retreat","am":"የላም ላይ ማረፊያ"}','rooftop-retreat','residential','Addis Ababa','DEMO — Bekele Residence',
  '2024-06-20',
  '{"en":"An unused roof deck turned into a planted lounge with a small lawn.","am":"ያልተጠቀም ላም ወደ ማረፊያ ተቀየረ።"}',
  '{"en":"Lightweight modular trays, an automatic drip line and weather-tolerant species.","am":"ለካሩ የተማረ ሞዱላር መገለጫዎች።"}',
  '{"en":"Structural weight and wind exposure limited options.","am":"ክብደት እና ነፋስ ማስገዳዩ ነበር።"}',
  '{"en":"Engineered trays kept load low while still feeling lush.","am":"የተለማመደ ሸክም ተጠብቋል።"}',
  '{"en":"A private green escape above the city.","am":"የተለየ ማረፊያ ተፈጠረ።"}',
  'https://picsum.photos/seed/ls-proj-roof/1200/800', true, true, 'Rooftop Retreat', 'Rooftop garden case study.'),

 ('{"en":"School Nature Garden","am":"የተማሪዎች የምድር ግቢ"}','school-nature-garden','public','Addis Ababa','DEMO — Lideta School',
  '2023-09-10',
  '{"en":"A hands-on learning garden for a primary school.","am":"ለተማሪዎች የሚማሩ በሚያደግ ግቢ።"}',
  '{"en":"Raised beds, a compost corner and signage linking plants to lessons.","am":"የምድር እድገትን የሚያሳዩ ሳንዶች።"}',
  '{"en":"Limited budget and a need for child-safe, hardy planting.","am":"ትንሽ በጀት እና ለልጆች ደህንነት ያለበት።"}',
  '{"en":"Tough natives and volunteer-built beds kept costs down.","am":"ትንሽ ወጪ ተደረገ።"}',
  '{"en":"A living classroom the school uses weekly.","am":"የሚጠቀሙ በሳምንቱ ግቢ።"}',
  'https://picsum.photos/seed/ls-proj-school/1200/800', false, true, 'School Nature Garden', 'Public garden case study.'),

 ('{"en":"Hotel Arrival Court","am":"ሆቴል የመጡበት ግቢ"}','hotel-arrival-court','commercial','Bishoftu','DEMO — Lake View Hotel',
  '2024-01-30',
  '{"en":"A grand, low-water entrance court for a resort.","am":"ለሆቴል ካር የሚያስደስት ግቢ።"}',
  '{"en":"Symmetrical planting, feature trees and subtle night lighting.","am":"የተከራየ አትክልት እና ማብራት።"}',
  '{"en":"Needed impact without high irrigation demand in a dry climate.","am":"በበጎ አየር ሁኔታ ውሃ የቀነለ ነበር።"}',
  '{"en":"Gravel beds and succulents delivered the look with minimal water.","am":"የተቆጣጠረ ውሃ ተጠቅሟል።"}',
  '{"en":"A memorable first impression for guests.","am":"ለእንግዳዎች የሚያስታውስ ቅድመ ምስል።"}',
  'https://picsum.photos/seed/ls-proj-hotel/1200/800', false, true, 'Hotel Arrival Court', 'Hotel landscape case study.'),

 ('{"en":"Community Park Revival","am":"የማህበረሰብ ፓርክ ማንሳት"}','community-park-revival','public','Addis Ababa','DEMO — Woreda 05',
  '2023-05-18',
  '{"en":"A neglected corner park restored with paths, seats and trees.","am":"የተወለደ ፓርክ ወደ ስራ ተመለሰ።"}',
  '{"en":"New paths, communal seating and 80 trees planted with local volunteers.","am":"አዲስ መንገዶችና 80 ዛፎች ተተኩ።"}',
  '{"en":"Vandalism and poor drainage kept people away.","am":"ደንበኝነት የተዘለለ ነበር።"}',
  '{"en":"Better sightlines and drainage made it feel safe again.","am":"ደህንነቱ ተገናኝቷል።"}',
  '{"en":"A loved neighbourhood green space.","am":"የማህበረሰብ የተወደደ ቦታ።"}',
  'https://picsum.photos/seed/ls-proj-park/1200/800', false, true, 'Community Park Revival', 'Public park case study.');

-- project gallery images
insert into public.project_images (project_id, image_url, alt_text, sort_order)
select p.id, 'https://picsum.photos/seed/ls-proj-river-2/800/600', 'Garden terrace', 1 from public.projects p where p.slug='riverside-family-garden';
insert into public.project_images (project_id, image_url, alt_text, sort_order)
select p.id, 'https://picsum.photos/seed/ls-proj-river-3/800/600', 'Seating area', 2 from public.projects p where p.slug='riverside-family-garden';
insert into public.project_images (project_id, image_url, alt_text, sort_order)
select p.id, 'https://picsum.photos/seed/ls-proj-bole-2/800/600', 'Entrance planting', 1 from public.projects p where p.slug='bole-office-campus';
insert into public.project_images (project_id, image_url, alt_text, sort_order)
select p.id, 'https://picsum.photos/seed/ls-proj-roof-2/800/600', 'Rooftop lawn', 1 from public.projects p where p.slug='rooftop-retreat';

-- ---------------------------------------------------------------- blog
insert into public.blog_categories (name, slug) values
 ('Landscaping Tips','landscaping-tips'),
 ('Company News','company-news'),
 ('Sustainability','sustainability');

insert into public.blog_posts (title, slug, excerpt, content, featured_image, author_id, category_id, tags, published_at, is_featured, is_published, seo_title, seo_description)
values
 ('{"en":"5 Water-Saving Tips for Your Garden","am":"ለግቢዎ 5 የውሃ ማቆጠቢያ ምክሮች"}','water-saving-tips',
  '{"en":"Simple changes that cut your garden water use without hurting your plants.","am":"ለግቢዎ ውሃን የሚቆጥት ቀላል ለውጦች።"}',
  '{"en":"<h2>Mulch first</h2><p>A 5 cm layer of mulch can halve evaporation. <strong>Water early</strong> in the morning and group thirsty plants together.</p><h2>Choose smart irrigation</h2><p>Drip systems beat sprinklers for efficiency. Add a rain sensor so you never water in the rain.</p><h2>Pick the right plants</h2><p>Native and drought-tolerant species need far less input once established.</p>"}',
  'https://picsum.photos/seed/ls-blog-water/1200/800', null,
  (select id from public.blog_categories where slug='landscaping-tips'),
  '{water, irrigation, tips}', '2024-02-10', true, true, 'Water-saving garden tips', 'Save water in your garden.'),

 ('{"en":"Why Native Plants Are Better","am":"ምንድነው የአካባቢ አትክልት የሚሻለው"}','native-plants-better',
  '{"en":"Native species are tougher, cheaper to maintain and better for wildlife.","am":"የአካባቢ አትክልት ጠንካራና ማህበራዊ ናቸው።"}',
  '{"en":"<p>Because they evolved here, native plants handle local rainfall, soils and pests with minimal help. That means less fertiliser, fewer pesticides and more birds in your garden.</p><h2>Where to start</h2><p>Ask us for a shortlist matched to your site and sun exposure.</p>"}',
  'https://picsum.photos/seed/ls-blog-native/1200/800', null,
  (select id from public.blog_categories where slug='sustainability'),
  '{native, biodiversity}', '2024-03-22', true, true, 'Native plants guide', 'Benefits of native planting.'),

 ('{"en":"Small Garden, Big Impact","am":"ትንሽ ግቢ፣ ከፍተኛ አርማ"}','small-garden-impact',
  '{"en":"Even a balcony can feel like a garden with the right layout.","am":"እንኳን ባላኮኒ ግቢ ሊሆን ይችላል።"}',
  '{"en":"<p>Use vertical planting, mirrors to fake depth, and one bold feature plant. Container gardens let renters take their green space with them.</p>"}',
  'https://picsum.photos/seed/ls-blog-small/1200/800', null,
  (select id from public.blog_categories where slug='landscaping-tips'),
  '{small spaces, containers}', '2024-04-15', false, true, 'Small garden ideas', 'Make a small garden feel big.'),

 ('{"en":"We Opened Our New Studio","am":"አዲሱን ስቱዲዮ ከፈታን"}','new-studio',
  '{"en":"Landscape Solution PLC now has a dedicated design studio in Bole.","am":"አዲሱ ስቱዲዮ በቦሌ ተከፍቷል።"}',
  '{"en":"<p>Clients can now book in-person design workshops and see material samples first-hand. Come say hello!</p>"}',
  'https://picsum.photos/seed/ls-blog-studio/1200/800', null,
  (select id from public.blog_categories where slug='company-news'),
  '{news}', '2024-01-08', false, true, 'New studio opening', 'Our new Addis Ababa studio.');

-- ---------------------------------------------------------------- testimonials
insert into public.testimonials (customer_name, company, position, testimonial, photo_url, rating, is_featured, is_published)
values
 ('Sara Hailu', 'DEMO', 'Homeowner', '{"en":"They listened, then delivered exactly the calm garden we dreamed of. The team was tidy and on time.","am":"ለፍላጎታችን የሚሰማ ግቢ አምጥተዋል።"}', 'https://picsum.photos/seed/ls-t1/200/200', 5, true, true),
 ('Daniel Bekele', 'DEMO', 'Facilities Manager', '{"en":"Our campus has never looked better, and the maintenance reporting is excellent.","am":"ካምፓሳችን አሁን ደስ ይላል።"}', 'https://picsum.photos/seed/ls-t2/200/200', 5, true, true),
 ('Martha Kebede', 'DEMO', 'Hotel GM', '{"en":"Guests comment on the entrance every day. Worth every birr.","am":"እንግዳዎች ስለግቢው ይናገራሉ።"}', 'https://picsum.photos/seed/ls-t3/200/200', 4, true, true),
 ('Yonas Tadesse', 'DEMO', 'Teacher', '{"en":"The school garden changed how our kids learn about nature.","am":"ልጆቻችን ስለምድር መማሪያ ሆነ።"}', 'https://picsum.photos/seed/ls-t4/200/200', 5, false, true);

-- ---------------------------------------------------------------- partners
insert into public.partners (name, logo_url, website_url, description, sort_order, is_published)
values
 ('Demo Nursery Co.', 'https://picsum.photos/seed/ls-p1/200/80', 'https://example.com/', 'Plant supplier partner.', 1, true),
 ('Demo Irrigation Ltd.', 'https://picsum.photos/seed/ls-p2/200/80', 'https://example.com/', 'Irrigation hardware partner.', 2, true),
 ('Demo Build Group', 'https://picsum.photos/seed/ls-p3/200/80', 'https://example.com/', 'Hardscape construction partner.', 3, true),
 ('Demo Eco Foundation', 'https://picsum.photos/seed/ls-p4/200/80', 'https://example.com/', 'Sustainability partner.', 4, true),
 ('Demo University', 'https://picsum.photos/seed/ls-p5/200/80', 'https://example.com/', 'Research collaboration.', 5, true),
 ('Demo Hotel Chain', 'https://picsum.photos/seed/ls-p6/200/80', 'https://example.com/', 'Hospitality client.', 6, true);

-- ---------------------------------------------------------------- jobs
insert into public.jobs (title, department, location, employment_type, description, responsibilities, requirements, application_deadline, is_published, is_closed)
values
 ('{"en":"Landscape Technician","am":"የመሬት ቴክኒሻን"}','Operations','Addis Ababa','full_time',
  '{"en":"Install and maintain gardens, irrigation and planting on client sites.","am":"መሬትን ማከማቻና ማሰራት።"}',
  '["Carry out planting and irrigation installs","Operate tools safely","Report site progress"]',
  '["Diploma or equivalent","Comfortable working outdoors","Valid local licence a plus"]',
  '2025-12-31', true, false),
 ('{"en":"Junior Landscape Designer","am":"የታችኛ ዲዛይነር"}','Design','Addis Ababa','full_time',
  '{"en":"Support senior designers with plans, sketches and client meetings.","am":"ለሚሻለው ዲዛይነር ድጋፍ።"}',
  '["Draft planting plans","Prepare mood boards","Attend site visits"]',
  '["Design or horticulture background","Basic CAD / drawing skills","Portfolio of work"]',
  '2025-11-30', true, false),
 ('{"en":"Sales & Care Coordinator","am":"ሽያጭ ኮንሲለር"}','Commercial','Addis Ababa','contract',
  '{"en":"Be the friendly first point of contact for new enquiries.","am":"ለአዳዲስ ጥያቄዎች የመጀመሪያ ሰው።"}',
  '["Respond to enquiries","Schedule consultations","Maintain the CRM"]',
  '["Friendly, organised communicator","English + Amharic","1+ year customer facing"]',
  '2025-10-31', true, false);
