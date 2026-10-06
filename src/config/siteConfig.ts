export const SITE_CONFIG = {
  brandName: "VIRATTA MARKETING",
  tagline: "Destrave a percepção da sua marca.",
  phone: "5511999999999", // Centralized Brazilian WhatsApp phone
  whatsappDisplay: "(11) 99999-9999",
  whatsappDefaultMessage:
    "Olá! Conheci a VIRATTA pelo site e quero entender como podemos transformar a comunicação da minha empresa.",
  instagramUrl: "https://instagram.com/virattamarketing",
  instagramHandle: "@virattamarketing",
  email: "contato@virattamarketing.com.br",
  location: "São Paulo, SP — Atendimento Brasil",
};

export const getWhatsAppUrl = (customMessage?: string) => {
  const msg = encodeURIComponent(customMessage || SITE_CONFIG.whatsappDefaultMessage);
  return `https://wa.me/${SITE_CONFIG.phone}?text=${msg}`;
};

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "A Viratta", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Método", href: "#metodo" },
  { label: "Contato", href: "#contato" },
];

export const STRUCTURAL_NUMBERS = [
  {
    number: "04",
    label: "FRENTES CRIATIVAS PRINCIPAIS",
    detail: "Estratégia, Identidade, Audiovisual e Conteúdo integrados.",
  },
  {
    number: "06",
    label: "ETAPAS DO NOSSO PROCESSO",
    detail: "Da imersão e diagnóstico até a distribuição e otimização contínua.",
  },
  {
    number: "01",
    label: "MARCA, UMA COMUNICAÇÃO COERENTE",
    detail: "Tudo o que sua empresa publica passa a falar o mesmo idioma visual.",
  },
  {
    number: "360°",
    label: "VISÃO DA COMUNICAÇÃO",
    detail: "Percepção não é só post: é tom, estética, postura e experiência.",
  },
];

export const VIRATTA_SERVICES = [
  {
    id: "01",
    name: "CONTENT CREATION",
    short: "Conteúdo que chama atenção e comunica valor.",
    description:
      "Criação estratégica de conteúdo pensada para reter atenção, construir autoridade e elevar a percepção de valor do negócio em cada ponto de contato.",
    tag: "Atenção & Valor",
    deliverables: ["Vídeos curtos institucionais", "Narrativas de marca", "Carrosséis estratégicos", "Roteiros focados em posicionamento"],
  },
  {
    id: "02",
    name: "SOCIAL MEDIA",
    short: "Presença digital com estratégia e consistência.",
    description:
      "Planejamento, direção de arte e gestão de presença digital para que sua marca se comunique com regularidade sem parecer improvisada.",
    tag: "Constância & Tom",
    deliverables: ["Linha editorial autêntica", "Calendário e curadoria", "Gestão de feed e stories", "Monitoramento de posicionamento"],
  },
  {
    id: "03",
    name: "FILMMAKER / AUDIOVISUAL",
    short: "Imagem profissional muda percepção.",
    description:
      "Produção audiovisual com padrão cinematográfico para empresas, produtos, serviços, campanhas e comunicação institucional que transmitem autoridade imediata.",
    tag: "Cinema & Autoridade",
    deliverables: ["Captação 4K em locação", "Edição e color grading profissional", "Design de som imersivo", "Vídeos de produtos e serviços"],
  },
  {
    id: "04",
    name: "DESIGN GRÁFICO",
    short: "Visual que faz sua empresa parecer do tamanho que ela merece.",
    description:
      "Materiais visuais consistentes, modernos e limpos que traduzem a excelência da sua entrega na primeira fração de segundo.",
    tag: "Estética & Precisão",
    deliverables: ["Peças digitais e impressas", "Materiais de ponto de venda", "Apresentações comerciais de alto padrão", "Papelaria e uniformização"],
  },
  {
    id: "05",
    name: "BRANDING / COMUNICAÇÃO VISUAL",
    short: "Identidade para ser reconhecido.",
    description:
      "Direção de identidade visual e linguagem que tornam o negócio inconfundível, profissional e coerente em qualquer suporte.",
    tag: "Reconhecimento & Coerência",
    deliverables: ["Sistema de identidade visual", "Manual de aplicação e estilo", "Paleta de cores e tipografia de marca", "Elementos gráficos proprietários"],
  },
  {
    id: "06",
    name: "POSICIONAMENTO ESTRATÉGICO",
    short: "Comunicação com direção.",
    description:
      "Definição clara de como seu negócio deve se expressar, para quem está falando e por quais atributos ele será lembrado e valorizado.",
    tag: "Direção & Clareza",
    deliverables: ["Diagnóstico de percepção atual", "Definição de proposta única de valor", "Matriz de diferenciação local", "Voz e tom de comunicação"],
  },
];

export const METHOD_STEPS = [
  {
    step: "01",
    title: "DIAGNOSTICAR",
    phrase: "Entendemos onde sua marca está.",
    detail: "Mapeamos a distância entre a excelência do que você faz e o que sua comunicação atual transparece ao mercado.",
  },
  {
    step: "02",
    title: "POSICIONAR",
    phrase: "Definimos como ela deve ser percebida.",
    detail: "Estabelecemos a assinatura visual, a mensagem central e o patamar de profissionalismo que seu negócio precisa ocupar.",
  },
  {
    step: "03",
    title: "PLANEJAR",
    phrase: "Transformamos direção em estratégia.",
    detail: "Estruturamos as frentes de atuação, cronogramas, formatos e momentos chave para uma comunicação que faz sentido.",
  },
  {
    step: "04",
    title: "PRODUZIR",
    phrase: "Criamos conteúdo e comunicação.",
    detail: "Captação com filmmaker, design gráfico editorial e roteirização com alto rigor estético.",
  },
  {
    step: "05",
    title: "DISTRIBUIR",
    phrase: "Levamos a mensagem ao público.",
    detail: "Publicação com consistência nos canais certos para gerar frequência, reconhecimento e autoridade.",
  },
  {
    step: "06",
    title: "OTIMIZAR",
    phrase: "Aprendemos, ajustamos e evoluímos.",
    detail: "Análise contínua do impacto e refinamento constante da percepção construída junto ao público.",
  },
];

export const AUDIENCE_CATEGORIES = [
  "LOJAS",
  "CLÍNICAS",
  "ACADEMIAS",
  "RESTAURANTES",
  "OFICINAS",
  "SALÕES",
  "PROFISSIONAIS",
  "SERVIÇOS LOCAIS",
  "MICROEMPREENDEDORES",
  "CAFETERIAS",
  "STUDIOS",
  "CONSULTÓRIOS",
];

export const PORTFOLIO_PROJECTS = [
  {
    id: "atelier-gastronomico",
    client: "Café & Bistrô Origem",
    industry: "Gastronomia & Cafeteria Artesanal",
    service: "Audiovisual + Branding + Conteúdo",
    image: "/src/assets/images/portfolio_gastronomy_1791218028786.jpg",
    description: "De um café de bairro simpático a uma referência gastronômica sofisticada com fila de espera aos fins de semana.",
    outcome: "Percepção elevada para menu premium e aumento do tíquete médio.",
  },
  {
    id: "clinica-lumine",
    client: "Clínica Lumine Dermatologia",
    industry: "Saúde & Estética Avançada",
    service: "Posicionamento + Filmmaker + Social Media",
    image: "/src/assets/images/portfolio_clinic_1791218038116.jpg",
    description: "Comunicação cinematográfica dos protocolos que transmite a segurança e a precisão do corpo clínico.",
    outcome: "Eliminação do aspecto amador e atração de pacientes de alto padrão.",
  },
  {
    id: "iron-performance",
    client: "Iron Box Performance",
    industry: "Fitness & Studio Funcional",
    service: "Identidade Visual + Filmmaker + Conteúdo",
    image: "/src/assets/images/portfolio_gym_1791218046940.jpg",
    description: "Reposicionamento do box com estética crua, iluminação dark e narrativa de comunidade forte.",
    outcome: "Capacidade máxima de alunos atingida em 90 dias após o rebranding.",
  },
  {
    id: "officina-motors",
    client: "Officina Spezial Garage",
    industry: "Automotivo & Restauração",
    service: "Filmmaker + Design Gráfico + Posicionamento",
    image: "/src/assets/images/portfolio_automotive_1791218057376.jpg",
    description: "Mostrando a oficina mecânica como um verdadeiro ateliê de engenharia e cuidado de precisão.",
    outcome: "Clientes deixaram de pedir desconto para valorizar a mão de obra especializada.",
  },
];
