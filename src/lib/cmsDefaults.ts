import { CmsState, ReelItem, MarqueeItem, FaqItem } from '../types/cms';

export const DEFAULT_VIRATTA_COLORS = {
  primary_color: '#FF5E14',
  accent_color: '#FFA726',
  background_color: '#070708',
  surface_color: '#0E0F12',
  text_color: '#F3F4F6',
  secondary_text_color: '#9CA3AF',
  border_color: 'rgba(255, 255, 255, 0.08)',
};

export const DEFAULT_REELS: ReelItem[] = [
  {
    id: 'ig-dewlvthu2vz',
    title: 'Sua marca não precisa de mais do mesmo. Precisa de estratégia e posicionamento.',
    instagram_url: 'https://www.instagram.com/p/DewlvThu2vZ/',
    url: 'https://www.instagram.com/p/DewlvThu2vZ/',
    cover_image: '/instagram/post-dewlvthu2vz.jpg',
    image: '/instagram/post-dewlvthu2vz.jpg',
    type: 'post',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'ig-deyzif-puu8',
    title: 'Se a sua marca parece igual a todas as outras, ela vira só mais uma.',
    instagram_url: 'https://www.instagram.com/p/DeyzIf-PUu8/',
    url: 'https://www.instagram.com/p/DeyzIf-PUu8/',
    cover_image: '/instagram/post-deyzif-puu8.jpg',
    image: '/instagram/post-deyzif-puu8.jpg',
    type: 'post',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'ig-dehoc3go6vy',
    title: 'Seu Instagram até pode estar bonito. Mas ele está ajudando sua marca a crescer?',
    instagram_url: 'https://www.instagram.com/p/DehOC3gO6VY/',
    url: 'https://www.instagram.com/p/DehOC3gO6VY/',
    cover_image: '/instagram/post-dehoc3go6vy.jpg',
    image: '/instagram/post-dehoc3go6vy.jpg',
    type: 'post',
    sort_order: 3,
    is_active: true,
  },
];

export const DEFAULT_MANTRA_ITEMS: MarqueeItem[] = [
  { id: 'mt-1', text: 'SEJA VISTO', display_order: 1, is_active: true },
  { id: 'mt-2', text: 'SEJA LEMBRADO', display_order: 2, is_active: true },
  { id: 'mt-3', text: 'COMUNIQUE VALOR', display_order: 3, is_active: true },
  { id: 'mt-4', text: 'VIRE A CHAVE', display_order: 4, is_active: true },
];

export const DEFAULT_FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'O que exatamente a VIRATTA faz pela minha empresa?',
    answer: 'A VIRATTA é uma assessoria de comunicação e posicionamento de marca que integra estratégia, design, audiovisual cinematográfico e criação de conteúdo. Transformamos a forma como sua empresa é percebida no mercado, alinhando a estética visual, tom de voz e presença digital com o valor real e a excelência que seu negócio já entrega.',
    display_order: 1,
    is_active: true,
  },
  {
    id: 'faq-2',
    question: 'Qual é a diferença entre a VIRATTA e uma agência tradicional de social media?',
    answer: 'Agências tradicionais costumam focar apenas em volume de posts genéricos e templates repetitivos que não geram autoridade. A VIRATTA atua com direção criativa intencional, captação cinematográfica presencial na sua empresa com equipe e equipamentos de cinema, e narrativa focada em percepção de alto padrão, diferenciação e conversão comercial.',
    display_order: 2,
    is_active: true,
  },
  {
    id: 'faq-3',
    question: 'Para quais tipos de empresas os serviços são indicados?',
    answer: 'Atendemos pequenas e médias empresas, clínicas médicas e estéticas, escritórios corporativos, indústrias, construtoras e marcas em expansão que já possuem um produto ou serviço de excelência, mas sentem que sua comunicação atual ainda parece pequena ou amadora perante o mercado.',
    display_order: 3,
    is_active: true,
  },
  {
    id: 'faq-4',
    question: 'Como funcionam as gravações e captações audiovisuais?',
    answer: 'Nossa equipe de filmmakers vai presencialmente até o seu espaço de trabalho. Direcionamos as cenas, organizamos a iluminação e orientamos você e sua equipe sobre postura e narrativa, registrando a operação real, bastidores, processos e diferenciais com padrão cinematográfico de cinema.',
    display_order: 4,
    is_active: true,
  },
  {
    id: 'faq-5',
    question: 'Como o posicionamento e o conteúdo aumentam a percepção de valor?',
    answer: 'Clientes compram percepção antes de comprar o produto ou serviço. Quando sua comunicação transmite solidez, cuidado estético e clareza de valor, você atrai clientes mais qualificados, reduz a objeção de preço e ganha margem para cobrar o que realmente vale sem depender de dar descontos.',
    display_order: 5,
    is_active: true,
  },
  {
    id: 'faq-6',
    question: 'Como posso solicitar uma proposta ou agendar um diagnóstico?',
    answer: 'Basta clicar no botão de WhatsApp em nosso site ou preencher nosso contato. Nosso time de especialistas agendará uma reunião estratégica para entender seu momento atual e apresentar o plano ideal para virar a chave da sua marca.',
    display_order: 6,
    is_active: true,
  },
];

export const DEFAULT_CMS_STATE: CmsState = {
  settings: {
    whatsapp_country: '55',
    whatsapp_ddd: '11',
    whatsapp_number: '999999999',
    whatsapp_default_message:
      'Olá! Conheci a VIRATTA pelo site e quero entender como podemos transformar a comunicação da minha empresa.',
    email: 'contato@virattamarketing.com.br',
    location: 'São Paulo, SP — Atendimento Brasil',
    tagline: 'Destrave a percepção da sua marca.',
  },
  social: {
    instagram: {
      url: 'https://www.instagram.com/viratta.marketing/',
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
    font_family: 'Plus Jakarta Sans',
  },
  seo: {
    site_title: 'VIRATTA MARKETING — Destrave a Percepção da Sua Marca',
    meta_description:
      'Comunicação estratégica, identidade visual, filmmaker e criação de conteúdo para pequenos e médios negócios serem percebidos com o valor que realmente têm.',
    og_title: 'VIRATTA MARKETING — Destrave a Percepção da Sua Marca',
    og_description:
      'Comunicação estratégica, identidade visual, filmmaker e criação de conteúdo para pequenos e médios negócios serem percebidos com o valor que realmente têm.',
    og_image_url: '/viratta-official-logo.png',
    canonical_url: 'https://virattamarketing.com.br',
    keywords: 'marketing estratégico, comunicação visual, branding, filmmaker, posicionamento, viratta',
    twitter_card: 'summary_large_image',
    og_type: 'website',
    robots: 'index, follow',
    author: 'VIRATTA MARKETING',
  },
  copy: {
    banner_enabled: false,
    banner_text: '🚀 Condições especiais para novos projetos este mês. Agende sua reunião estratégica!',
    banner_link: '',
    banner_button: 'Falar no WhatsApp',

    hero_kicker: 'VIRATTA MARKETING',
    hero_title_line1: 'SEU NEGÓCIO NÃO PRECISA',
    hero_title_line2: 'PARECER PEQUENO.',
    hero_subtitle:
      'Estratégia, conteúdo e posicionamento para transformar a forma como sua empresa é percebida.',
    hero_cta_primary: 'QUERO VIRAR A CHAVE',
    hero_cta_primary_link: '',
    hero_cta_secondary: 'VER NOSSOS TRABALHOS',
    hero_cta_secondary_link: '#projetos',
    hero_services_line: 'Social Media • Filmmaker • Design • Branding • Posicionamento',

    first_impact_kicker: 'O Posicionamento',
    first_impact_headline: 'SER PEQUENO NÃO SIGNIFICA PARECER PEQUENO.',
    first_impact_subtitle:
      '“Uma boa empresa pode perder valor quando sua comunicação não acompanha a qualidade do que ela entrega.”',

    brand_statement_quote:
      'NÓS NÃO MUDAMOS O SEU NEGÓCIO. MUDAMOS A FORMA COMO ELE É PERCEBIDO.',
    brand_statement_subtitle: 'Estratégia · Posicionamento · Presença Real',

    services_kicker: 'Capacidades Viratta',
    services_headline: 'O QUE FAZEMOS PARA SUA MARCA SER PERCEBIDA.',
    services_subtitle:
      'Sem pacotes genéricos. Soluções conectadas para empresas que se recusam a continuar invisíveis.',

    portfolio_kicker: 'CASOS & PORTFÓLIO',
    portfolio_headline: 'MARCAS QUE COMEÇARAM A VIRAR A CHAVE.',

    instagram_kicker: 'Bastidores & Conteúdo',
    instagram_headline: 'A VIRATTA ACONTECE POR AQUI.',
    instagram_button_text: 'Seguir @viratta.marketing',

    final_cta_kicker: 'O PRÓXIMO PASSO',
    final_cta_headline: 'SUA EMPRESA JÁ EXISTE. AGORA ELA PRECISA SER PERCEBIDA.',
    final_cta_subtitle:
      'Não deixe que uma comunicação pequena limite a grandeza do seu negócio.',
    final_cta_button: 'Quero Virar a Chave',
    final_cta_button_link: '',
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
  marquee_mantra_items: DEFAULT_MANTRA_ITEMS,
  reels: DEFAULT_REELS,
  faq_items: DEFAULT_FAQ_ITEMS,
  sections: {
    hero: true,
    first_impact: true,
    business_needs: true,
    numbers: true,
    marquee_services: true,
    services: true,
    brand_statement: true,
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
    faq: true,
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
