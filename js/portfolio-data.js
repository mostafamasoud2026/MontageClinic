/**
 * MOSTAFA MASOUD — PORTFOLIO CENTRAL DATA STORE
 * Source of truth for Cloudinary video assets, project metadata, case studies, and services.
 * 
 * Performance & Architecture:
 * - All video URLs point to verified Cloudinary CDN assets.
 * - Posters use Cloudinary on-the-fly transformations (so_0,w_720,c_limit,q_auto,f_jpg)
 *   with verified fallback images.
 * - Aspect ratios are strictly defined to prevent layout shift.
 * - Testimonials are explicitly tagged with `isPlaceholder` to guarantee content integrity.
 */

const PORTFOLIO_DATA = {
  // Brand Positioning & Identity
  brand: {
    name: 'Mostafa Masoud',
    title: 'Content Creator & Video Editor',
    coreMessage: 'You focus on your business. I take care of the content.',
    supportingMessage: 'You bring the expertise. I turn it into content people want to watch.',
    specializations: [
      'Short-form video content',
      'Talking-head content',
      'Promotional videos'
    ],
    additionalServices: [
      'Long-form video editing',
      'Commercials & ads',
      'Sound design',
      'Color grading',
      'AI-assisted visual production'
    ],
    targetAudiences: [
      'Doctors & clinics',
      'Fitness coaches',
      'Business owners',
      'Content creators & YouTubers',
      'Podcasters',
      'Real estate businesses',
      'Brands & companies'
    ],
    whatsappNumber: '201553772179',
    turnaround: '24–48h Turnaround'
  },

  // Main Showreel (Horizontal 16:9)
  showreel: {
    id: 'showreel',
    title: 'Official Showreel 2026',
    subtitle: 'High-Retention Short-Form & Cinematic Post-Production',
    aspectRatio: '16:9',
    videoUrlMov: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790818566/SHOWREEL_VIDEO_EDITOR_2026__.mov',
    videoUrlMp4: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790818566/SHOWREEL_VIDEO_EDITOR_2026__.mp4',
    posterUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/so_0,w_1200,c_limit,q_auto,f_jpg/v1790818566/SHOWREEL_VIDEO_EDITOR_2026__.jpg',
    fallbackPoster: 'assets/images/vamos-thumbnail.jpg',
    description: 'A comprehensive showcase of rhythmic cut timing, multi-camera color science, kinetic text animation, retention hooks, and layered sound design across diverse verticals.'
  },

  // Featured Case Studies (4 Selected Pillar Projects)
  caseStudies: [
    {
      id: 'vamos',
      title: 'VAMOS — Abdullah Ashknani',
      category: 'shortform promo',
      client: 'Abdullah Ashknani / VAMOS',
      industry: 'Sportswear / Sports',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790819863/ASHKNANY_WORLD_CUP_BF_AF.mp4',
      posterUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/so_0,w_720,c_limit,q_auto,f_jpg/v1790819863/ASHKNANY_WORLD_CUP_BF_AF.jpg',
      fallbackPoster: 'assets/images/vamos-thumbnail.jpg',
      aspectRatio: '9:16',
      isFeatured: true,
      resultText: '3M+ views across selected videos',
      resultBadge: '3M+ VIEWS',
      resultMetric: '3,000,000+',
      resultMetricLabel: 'Documented Views Across Selected Videos',
      description: 'High-energy sports campaign engineered around dynamic athletic pacing, balanced color treatment across multi-sensor footage, and impactful sound design.',
      challenge: 'Raw footage shot across multiple camera types and varying stadium lighting that needed color unification and high cut velocity without visual confusion.',
      editingFocus: [
        'Multi-camera color matching across different sensors',
        'Balanced color grading tailored for sports aesthetics',
        'Pacing and storytelling cuts engineered for engagement',
        'J-cuts, L-cuts, jump cuts, and match cuts',
        'Animated kinetic typography',
        'Structured B-roll integration',
        'Layered athletic sound design & audio risers',
        'Platform-ready vertical export'
      ],
      primarySkills: ['Multi-Camera Editing', 'Color Grading', 'Pacing & Rhythm', 'Sound Design']
    },
    {
      id: 'daly',
      title: 'Daly',
      category: 'shortform',
      client: 'Daly',
      industry: 'Content Creation / Social Media',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790817563/1_BF_AF.mp4',
      posterUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/so_0,w_720,c_limit,q_auto,f_jpg/v1790817563/1_BF_AF.jpg',
      fallbackPoster: 'assets/images/daly-thumbnail.jpg',
      aspectRatio: '9:16',
      isFeatured: true,
      resultText: 'The edited video reached 2.8 million views within two days.',
      resultBadge: '2.8M IN 48 HOURS',
      resultMetric: '2.8M Views',
      resultMetricLabel: 'Reached Within 2 Days of Publishing',
      description: 'Explosive viral retention edit built with immediate hook mechanics, relentless pacing, and zero dead air.',
      challenge: 'Retaining viewer interest beyond the 2-second drop-off curve in saturated entertainment feeds.',
      editingFocus: [
        'Immediate opening visual & audio hooks',
        'Retention-oriented cut cadence',
        'Storytelling cuts that maintain conversational momentum',
        'Strategic elimination of unnecessary pauses & breaths',
        'Kinetic animated captions and callouts',
        'Contextual supporting B-roll',
        'Punchy sound effects and rhythm sync',
        'Social-platform mobile formatting'
      ],
      primarySkills: ['Opening Hooks', 'Audience Retention', 'Short-Form Storytelling', 'Sound Design']
    },
    {
      id: 'rayan',
      title: 'Rayyan — Fitness Coach',
      category: 'shortform talkinghead',
      client: 'Rayyan (Fitness Coach)',
      industry: 'Fitness / Coaching',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790819701/RAYYAN_CARNIVORE_BF_AF.mp4',
      posterUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/so_0,w_720,c_limit,q_auto,f_jpg/v1790819701/RAYYAN_CARNIVORE_BF_AF.jpg',
      fallbackPoster: 'assets/images/rayan-thumbnail.jpg',
      aspectRatio: '9:16',
      isFeatured: true,
      resultText: 'High-retention coaching series establishing creator authority.',
      resultBadge: 'FITNESS AUTHORITY',
      resultMetric: 'Authority',
      resultMetricLabel: 'Consistent Creator Identity & High Retention',
      description: 'Transforming expert coaching knowledge into engaging short-form videos while preserving the creator’s authentic personality and authority.',
      challenge: 'Explaining complex nutritional principles (e.g. carnivore diet concepts) without losing audience interest or feeling like a dry lecture.',
      editingFocus: [
        'Talking-head editing with speech flow optimization',
        'Fast but controlled conversational pacing',
        'Strong visual & verbal hooks in first 2 seconds',
        'Retention-oriented jump cuts and angle punch-ins',
        'Fitness-related visual cut-ins & B-roll',
        'Accented kinetic text and captions',
        'Dynamic sound design supporting key statements',
        'Cohesive visual style and personal branding palette'
      ],
      primarySkills: ['Talking-Head Editing', 'Fast Controlled Pacing', 'Hooks & Retention', 'Sound Design']
    },
    {
      id: 'clinic',
      title: 'Dr. Ahmed El-Bagoury — Super Healthy Clinic',
      category: 'talkinghead promo',
      client: 'Dr. Ahmed El-Bagoury / Super Healthy Clinic',
      industry: 'Medical / Nutrition / Healthcare',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790816639/SUPER_HEALTHY_2.mp4',
      posterUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/so_0,w_720,c_limit,q_auto,f_jpg/v1790816639/SUPER_HEALTHY_2.jpg',
      fallbackPoster: 'assets/images/clinic-thumbnail.jpg',
      aspectRatio: '9:16',
      isFeatured: true,
      resultText: 'Two videos reached a combined 1.2 million views.',
      resultBadge: '1.2M COMBINED',
      resultMetric: '1.2M Views',
      resultMetricLabel: 'Combined Reach Across Two Educational Videos',
      description: 'Educational healthcare storytelling that makes complex medical topics clear, engaging, and trustworthy for prospective clinic patients.',
      challenge: 'Presenting medical facts clearly without clinical dryness or compromising the doctor’s professional credibility.',
      editingFocus: [
        'Clear educational storytelling structure',
        'Professional talking-head editing',
        'Strategic pacing to balance authority with retention',
        'Visual explanation of complex anatomical & dietary concepts',
        'Educational B-roll cutaways',
        'Stylized captions with clear visual hierarchy',
        'Audio restoration (dialogue leveling & noise removal)',
        'Natural clinical color grading in DaVinci Resolve'
      ],
      primarySkills: ['Educational Storytelling', 'Talking-Head Editing', 'Visual Hierarchy', 'Color Grading']
    }
  ],

  // Selected Shorts (6 Additional Curated Projects)
  selectedShorts: [
    {
      id: 'shoman',
      title: 'Ahmed Shoman',
      category: 'shortform',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790867731/ahmed_shoman_bf_af.mp4',
      posterUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/so_0,w_720,c_limit,q_auto,f_jpg/v1790867731/ahmed_shoman_bf_af.jpg',
      aspectRatio: '9:16',
      tag: 'Short-Form Edit',
      industry: 'Content Creator'
    },
    {
      id: 'sh7ta',
      title: 'Coach Sh7ta',
      category: 'shortform',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790867688/coach_sh7ta_bf_af.mp4',
      posterUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/so_0,w_720,c_limit,q_auto,f_jpg/v1790867688/coach_sh7ta_bf_af.jpg',
      aspectRatio: '9:16',
      tag: 'Fitness Short',
      industry: 'Fitness & Sports'
    },
    {
      id: 'promo',
      title: 'Promotional Video',
      category: 'promo',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790866570/promo_bf_af.mp4',
      posterUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/so_0,w_720,c_limit,q_auto,f_jpg/v1790866570/promo_bf_af.jpg',
      aspectRatio: '9:16',
      tag: 'Commercial Promo',
      industry: 'Commercial / Brand'
    },
    {
      id: 'zero15',
      title: 'Zero 15',
      category: 'shortform',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790866531/zero_15_bf_af.mp4',
      posterUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/so_0,w_720,c_limit,q_auto,f_jpg/v1790866531/zero_15_bf_af.jpg',
      aspectRatio: '9:16',
      tag: 'Brand Short',
      industry: 'Lifestyle & Brand'
    },
    {
      id: 'nasa',
      title: 'Elmodeer Nasa',
      category: 'shortform',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790866441/Elmodeer_nasa_bf_af.mp4',
      posterUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/so_0,w_720,c_limit,q_auto,f_jpg/v1790866441/Elmodeer_nasa_bf_af.jpg',
      aspectRatio: '9:16',
      tag: 'Creator Series',
      industry: 'Creator / Media'
    },
    {
      id: 'aura',
      title: 'Aura Clinics',
      category: 'promo',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790866414/aura_clinics_bf_af.mp4',
      posterUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/so_0,w_720,c_limit,q_auto,f_jpg/v1790866414/aura_clinics_bf_af.jpg',
      aspectRatio: '9:16',
      tag: 'Healthcare Promo',
      industry: 'Clinics / Healthcare'
    }
  ],

  // Long-Form Project (Proportionate Presentation)
  longFormProject: {
    id: 'longform',
    title: 'الزوجة الصالحة والناشز',
    category: 'longform',
    industry: 'Cultural / Educational / Discussion',
    videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790867936/%D8%A7%D9%84%D8%B2%D9%88%D8%AC%D8%A9_%D8%A7%D9%84%D8%B5%D8%A7%D9%84%D8%AD%D8%A9_%D9%88%D8%A7%D9%84%D9%86%D8%A7%D8%B4%D8%B2_BF_AF.mp4',
    posterUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/so_0,w_720,c_limit,q_auto,f_jpg/v1790867936/%D8%A7%D9%84%D8%B2%D9%88%D8%AC%D8%A9_%D8%A7%D9%84%D8%B5%D8%A7%D9%84%D8%AD%D8%A9_%D9%88%D8%A7%D9%84%D9%86%D8%A7%D8%B4%D8%B2_BF_AF.jpg',
    aspectRatio: '9:16',
    formatBadge: 'EXTENDED TALKING-HEAD',
    description: 'An extended talking-head video cut for sustained audience watch time, featuring seamless dialogue trimming, rhythm control, sound balancing, and synchronized Arabic subtitles.',
    editingHighlights: [
      'Dialogue trimming without unnatural voice artifacts',
      'Pacing adjustments designed for long-format engagement',
      'Balanced audio mastering with noise suppression',
      'Accurate Arabic subtitle synchronization'
    ]
  },

  // Testimonials Data
  // NOTE: In compliance with content integrity requirements, demonstration placeholders
  // are flagged with `isPlaceholder: true`. The live testimonials section will remain hidden
  // or only display items where `isPlaceholder !== true`.
  testimonials: [
    {
      id: 'demo-1',
      quote: 'تسلم إيدك، الفيديو ممتاز!',
      language: 'ar',
      direction: 'rtl',
      isPlaceholder: true
    },
    {
      id: 'demo-2',
      quote: 'عاشت إيدك، رائع!',
      language: 'ar',
      direction: 'rtl',
      isPlaceholder: true
    },
    {
      id: 'demo-3',
      quote: 'الصراحة الشغل عالي جدًا جدًا جدًا، عاش أوي!',
      language: 'ar',
      direction: 'rtl',
      isPlaceholder: true
    },
    {
      id: 'demo-4',
      quote: "Great! I didn't expect that!",
      language: 'en',
      direction: 'ltr',
      isPlaceholder: true
    },
    {
      id: 'demo-5',
      quote: 'Excellent work. The final video looks amazing!',
      language: 'en',
      direction: 'ltr',
      isPlaceholder: true
    },
    {
      id: 'demo-6',
      quote: 'Fast delivery and great attention to detail!',
      language: 'en',
      direction: 'ltr',
      isPlaceholder: true
    }
  ]
};

// Helper lookup function to get any project by ID
function getPortfolioItemById(id) {
  if (id === 'showreel') return PORTFOLIO_DATA.showreel;
  if (id === 'longform') return PORTFOLIO_DATA.longFormProject;
  
  const featured = PORTFOLIO_DATA.caseStudies.find(item => item.id === id);
  if (featured) return featured;

  const short = PORTFOLIO_DATA.selectedShorts.find(item => item.id === id);
  if (short) return short;

  return null;
}
