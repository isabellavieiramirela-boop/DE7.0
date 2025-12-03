






export const ASSETS = {
  MENTOR_IMAGE: "https://i.postimg.cc/RFHDz4XY/mentor2.webp",
  MENTOR_PORTRAIT: "https://i.postimg.cc/tJbPqZKL/Anderson.png",
  HEADLINE_IMAGE: "https://i.postimg.cc/C5ddKrnc/headline.webp",
  NOISE_TEXTURE: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E",
  DEVICES_IMAGE: "https://i.postimg.cc/MKnvJGBV/pc.png",
  BRAND_LOGOS: [
    "https://i.postimg.cc/4KszSYZv/1.jpg",
    "https://i.postimg.cc/QdFqn5hS/2.jpg",
    "https://i.postimg.cc/6QsCjmHN/3.jpg",
    "https://i.postimg.cc/BQXDq0kW/4.jpg",
    "https://i.postimg.cc/D0mWyrCY/5.jpg",
    "https://i.postimg.cc/SxcnsNrk/6.jpg",
    "https://i.postimg.cc/66SqfGjf/7.jpg",
    "https://i.postimg.cc/DSHzSDpW/8.jpg",
    "https://i.postimg.cc/JzKGJY9X/9.jpg",
    "https://i.postimg.cc/C5y1Y3qg/10.jpg",
    "https://i.postimg.cc/vTLQycyD/11.jpg",
    "https://i.postimg.cc/9QfW3mnb/12.jpg",
    "https://i.postimg.cc/qR2rczNr/13.jpg",
    "https://i.postimg.cc/yx7MFnqR/14.jpg"
  ],
  MODULE_IMAGES: [
    "https://i.postimg.cc/qMyVjnhr/Modulo-1-compressed.jpg",
    "https://i.postimg.cc/Kkh9hjYQ/Modulo-2-compressed.jpg",
    "https://i.postimg.cc/JGYP4Pnn/Modulo-3-compressed.jpg",
    "https://i.postimg.cc/pmgCKrzk/Modulo-4-compressed.jpg",
    "https://i.postimg.cc/f3mKCsvL/Modulo-5-compressed.jpg",
    "https://i.postimg.cc/BL3CwzhB/Modulo-6-compressed.jpg",
    "https://i.postimg.cc/r099693L/Modulo-7-compressed.jpg",
    "https://i.postimg.cc/sfWNrzVx/Modulo-8-compressed.jpg",
    "https://i.postimg.cc/vD3v335V/Modulo-9-compressed.jpg"
  ],
  CERTIFICATES: {
    FRONT: "https://i.postimg.cc/Pq030y0g/cert-front.jpg", // Placeholder - replace with actual image
    BACK: "https://i.postimg.cc/Pq030y0g/cert-front.jpg"   // Placeholder - replace with actual image
  },
  PORTFOLIO: {
    // Before/After Slider Assets (Sneaker Sketch vs Render)
    SKETCH: "https://i.postimg.cc/Kj42yv2h/sneaker-sketch.jpg", // Needs to be black/white line art
    RENDER: "https://i.postimg.cc/sx0q301J/sneaker-render.jpg", // Needs to be vibrant orange/blue
    // Variation Carousel
    VARIATION_BLACK: "https://i.postimg.cc/sx0q301J/sneaker-render.jpg" // Using render for now, ideally a different colorway
  },
  UNIVERSE_GLOBE: "https://i.postimg.cc/9FyCFJkx/Design-sem-nome-(31).png"
};

export const COLORS = {
  CYAN: '#00CBD9',
  MAGENTA: '#FC2C54',
  YELLOW: '#FFD700',
  BG_DARK: '#0A0A0A'
};

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024
};

export const MODULES = [
  { title: "Módulo 1 - Boas Vindas", image: ASSETS.MODULE_IMAGES[0] },
  { title: "Módulo 2 - Design Hack PRO", image: ASSETS.MODULE_IMAGES[1] },
  { title: "Módulo 3 - Workflow", image: ASSETS.MODULE_IMAGES[2] },
  { title: "Módulo 4 - Inteligência Artificial", image: ASSETS.MODULE_IMAGES[3] },
  { title: "Módulo 5 - Portfólio Imbatível", image: ASSETS.MODULE_IMAGES[4] },
  { title: "Módulo 6 - Corpo e Mente", image: ASSETS.MODULE_IMAGES[5] },
  { title: "Módulo 7 - Empreendedorismo", image: ASSETS.MODULE_IMAGES[6] },
  { title: "Módulo 8 - Espiritualidade", image: ASSETS.MODULE_IMAGES[7] },
  { title: "Módulo 9 - Bônus Acelerador", image: ASSETS.MODULE_IMAGES[8] }
];

export const GUESTS = [
  {
    name: "ESTEVAN HANSEN",
    role: "Especialista em Análise e Inteligência de Mercado",
    bio: "Mais de 15 anos analisando tendências globais e traduzindo dados complexos em estratégias de design vencedoras.",
    image: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  {
    name: "CAMILA ROCHA",
    role: "Especialista em Design Thinking",
    bio: "Facilitadora de processos criativos que conectam inovação e necessidades reais dos usuários.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "RODRIGO ALVES",
    role: "Especialista em UX/UI",
    bio: "Líder de produtos digitais com foco em interfaces intuitivas e alta conversão para grandes startups.",
    image: "https://randomuser.me/api/portraits/men/86.jpg"
  },
  // Duplicates for infinite scroll illusion if needed, or unique new ones
  {
    name: "FERNANDA LIMA",
    role: "Branding Strategist",
    bio: "Criadora de marcas icônicas, ensina como construir identidade visual com propósito e longevidade.",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];