import { CmsState } from '../types/cms';

export const DEFAULT_VIRATTA_COLORS = {
  primary_color: '#FF5E14',
  background_color: '#070708',
  text_color: '#F3F4F6',
  surface_color: '#0E0F12',
  border_color: 'rgba(255, 255, 255, 0.08)',
};

export const DEFAULT_CMS_STATE: CmsState = {
  settings: {
    whatsapp_country: '55',
    whatsapp_ddd: '11',
    whatsapp_number: '999999999',
    whatsapp_default_message:
      'Olá! Conheci a VIRATTA pelo site e quero entender como podemos transformar a comunicação da minha empresa.',
    email: 'contato@virattamarketing.com.br',
    location: 'São Paulo, SP — Atendimento Brasil',
  },
  social: {
    instagram: {
      url: 'https://instagram.com/virattamarketing',
      active: true,
    },
    facebook: {
      url: '',
      active: false,
    },
    tiktok: {
      url: '',
      active: false,
    },
    linkedin: {
      url: '',
      active: false,
    },
    youtube: {
      url: '',
      active: false,
    },
  },
  appearance: {
    ...DEFAULT_VIRATTA_COLORS,
    logo_url: '/viratta-official-logo.png',
    favicon_url: '/favicon.ico',
  },
  seo: {
    site_title: 'VIRATTA MARKETING — Destrave a Percepção da Sua Marca',
    meta_description:
      'Comunicação estratégica, identidade visual, filmmaker e criação de conteúdo para pequenos e médios negócios serem percebidos com o valor que realmente têm.',
    og_title: 'VIRATTA MARKETING — Destrave a Percepção da Sua Marca',
    og_description:
      'Comunicação estratégica, identidade visual, filmmaker e criação de conteúdo para pequenos e médios negócios serem percebidos com o valor que realmente têm.',
    og_image_url: '/viratta-app-icon-1024.png',
  },
  copy: {
    hero_kicker: 'AGÊNCIA DE COMUNICAÇÃO E POSICIONAMENTO ESTRATÉGICO',
    hero_title_line1: 'SUA EMPRESA JÁ EXISTE.',
    hero_title_line2: 'AGORA ELA PRECISA SER PERCEBIDA.',
    hero_subtitle:
      'Estratégia, audiovisual, identidade visual e conteúdo para negócios que cansaram de parecer menores do que realmente são.',
    hero_cta_primary: 'FALAR COM A VIRATTA',
    hero_cta_secondary: 'VER NOSSO MÉTODO',
    first_impact_headline:
      'A DIFERENÇA ENTRE QUEM VENDE BARATO E QUEM É DISPUTADO ESTÁ NA PERCEPÇÃO.',
    brand_statement_quote:
      'NÓS NÃO MUDAMOS O SEU NEGÓCIO. MUDAMOS A FORMA COMO ELE É PERCEBIDO.',
    services_kicker: 'CAPACIDADES VIRATTA',
    services_headline: 'O QUE FAZEMOS PARA SUA MARCA SER PERCEBIDA.',
    services_subtitle:
      'Sem pacotes genéricos. Soluções conectadas para empresas que se recusam a continuar invisíveis.',
    portfolio_kicker: 'CASOS & PORTFÓLIO',
    portfolio_headline: 'MARCAS QUE COMEÇARAM A VIRAR A CHAVE.',
    final_cta_kicker: 'O PRÓXIMO PASSO',
    final_cta_headline: 'SUA EMPRESA ESTÁ PRONTA PARA VIRAR A CHAVE?',
    final_cta_subtitle:
      'Se você entrega um serviço excelente mas sua comunicação ainda parece improvisada, o problema não é o seu produto. É a sua percepção.',
    final_cta_button: 'FALAR COM A VIRATTA NO WHATSAPP',
  },
  clients: [
    {
      id: 'client-1',
      name: 'Café & Bistrô Origem',
      logo_url: '/clients/cafe-origem.svg',
      alt_text: 'Logotipo Café & Bistrô Origem',
      website_url: '',
      display_order: 1,
      is_active: true,
    },
    {
      id: 'client-2',
      name: 'Clínica Lumine Dermatologia',
      logo_url: '/clients/clinica-lumine.svg',
      alt_text: 'Logotipo Clínica Lumine Dermatologia',
      website_url: '',
      display_order: 2,
      is_active: true,
    },
    {
      id: 'client-3',
      name: 'Iron Box Performance',
      logo_url: '/clients/iron-box.svg',
      alt_text: 'Logotipo Iron Box Performance',
      website_url: '',
      display_order: 3,
      is_active: true,
    },
    {
      id: 'client-4',
      name: 'Officina Spezial Garage',
      logo_url: '/clients/officina-spezial.svg',
      alt_text: 'Logotipo Officina Spezial Garage',
      website_url: '',
      display_order: 4,
      is_active: true,
    },
  ],
  services: [
    {
      id: 'srv-1',
      number: '01',
      name: 'SOCIAL MEDIA',
      description:
        'Estratégia, planejamento e gestão para construir uma presença digital consistente e profissional.',
      display_order: 1,
      is_active: true,
    },
    {
      id: 'srv-2',
      number: '02',
      name: 'FILMMAKER',
      description:
        'Captação e produção audiovisual para apresentar sua empresa com mais qualidade, personalidade e impacto.',
      display_order: 2,
      is_active: true,
    },
    {
      id: 'srv-3',
      number: '03',
      name: 'DESIGN GRÁFICO',
      description:
        'Criativos e materiais visuais que fortalecem a comunicação e a percepção profissional da sua marca.',
      display_order: 3,
      is_active: true,
    },
    {
      id: 'srv-4',
      number: '04',
      name: 'BRANDING / COMUNICAÇÃO VISUAL',
      description:
        'Construção e organização da identidade visual para tornar sua marca mais reconhecível, coerente e memorável.',
      display_order: 4,
      is_active: true,
    },
    {
      id: 'srv-5',
      number: '05',
      name: 'POSICIONAMENTO ESTRATÉGICO',
      description:
        'Estratégia para definir como sua empresa se apresenta, se comunica e quer ser percebida pelo mercado.',
      display_order: 5,
      is_active: true,
    },
  ],
  marquee_items: [
    { id: 'mq-1', text: 'ESTRATÉGIA', display_order: 1, is_active: true },
    { id: 'mq-2', text: 'IDENTIDADE', display_order: 2, is_active: true },
    { id: 'mq-3', text: 'CONTEÚDO', display_order: 3, is_active: true },
    { id: 'mq-4', text: 'SOCIAL MEDIA', display_order: 4, is_active: true },
    { id: 'mq-5', text: 'FILMMAKER', display_order: 5, is_active: true },
    { id: 'mq-6', text: 'DESIGN', display_order: 6, is_active: true },
    { id: 'mq-7', text: 'POSICIONAMENTO', display_order: 7, is_active: true },
    { id: 'mq-8', text: 'CRIATIVIDADE', display_order: 8, is_active: true },
  ],
  sections: {
    hero: true,
    first_impact: true,
    numbers: true,
    marquee_services: true,
    services: true,
    brand_statement: true,
    perception_slider: true,
    target_audience: true,
    method: true,
    customer_journey: true,
    portfolio: true,
    testimonials: true,
    difference: true,
    philosophy: true,
    about: true,
    marquee_mantra: true,
    instagram: true,
    final_conversion: true,
  },
  media: [
    {
      id: 'med-1',
      name: 'viratta-official-logo.png',
      url: '/viratta-official-logo.png',
      file_path: 'branding/viratta-official-logo.png',
      mime_type: 'image/png',
      folder: 'branding',
      created_at: new Date().toISOString(),
    },
    {
      id: 'med-2',
      name: 'viratta-app-icon-1024.png',
      url: '/viratta-app-icon-1024.png',
      file_path: 'branding/viratta-app-icon-1024.png',
      mime_type: 'image/png',
      folder: 'branding',
      created_at: new Date().toISOString(),
    },
    {
      id: 'med-3',
      name: 'cafe-origem.svg',
      url: '/clients/cafe-origem.svg',
      file_path: 'clients/cafe-origem.svg',
      mime_type: 'image/svg+xml',
      folder: 'clients',
      created_at: new Date().toISOString(),
    },
    {
      id: 'med-4',
      name: 'clinica-lumine.svg',
      url: '/clients/clinica-lumine.svg',
      file_path: 'clients/clinica-lumine.svg',
      mime_type: 'image/svg+xml',
      folder: 'clients',
      created_at: new Date().toISOString(),
    },
    {
      id: 'med-5',
      name: 'iron-box.svg',
      url: '/clients/iron-box.svg',
      file_path: 'clients/iron-box.svg',
      mime_type: 'image/svg+xml',
      folder: 'clients',
      created_at: new Date().toISOString(),
    },
    {
      id: 'med-6',
      name: 'officina-spezial.svg',
      url: '/clients/officina-spezial.svg',
      file_path: 'clients/officina-spezial.svg',
      mime_type: 'image/svg+xml',
      folder: 'clients',
      created_at: new Date().toISOString(),
    },
  ],
  last_published_at: new Date().toISOString(),
};
