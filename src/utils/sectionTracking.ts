/**
 * Utility to identify the currently active section in the viewport
 * and format context-aware message payloads for WhatsApp links.
 */

// Canonical title dictionary for known section IDs
export const SECTION_ID_TITLES: Record<string, string> = {
  inicio: 'Início',
  diagnostico: 'Diagnóstico Estratégico',
  servicos: 'Serviços',
  metodo: 'Método Viratta',
  projetos: 'Projetos & Portfólio',
  sobre: 'Sobre a Viratta',
  faq: 'Perguntas Frequentes (FAQ)',
  contato: 'Contato',
};

/**
 * Extracts a human-readable, professional section title from a DOM element.
 */
export function extractTitleFromElement(el: Element): string {
  // 1. Explicit data attribute (highest priority & deterministic)
  const dataTitle = el.getAttribute('data-section-title');
  if (dataTitle && dataTitle.trim()) {
    return dataTitle.trim();
  }

  // 2. Element ID mapping
  const id = el.getAttribute('id');
  if (id && SECTION_ID_TITLES[id.toLowerCase()]) {
    return SECTION_ID_TITLES[id.toLowerCase()];
  }

  // 3. Footer tag check
  if (el.tagName.toLowerCase() === 'footer') {
    return 'Rodapé / Contato';
  }

  // 4. Kicker tag (span with uppercase tracking text)
  const kicker = el.querySelector('span[class*="tracking-"]');
  if (kicker && kicker.textContent) {
    const cleanKicker = kicker.textContent.trim();
    if (cleanKicker.length >= 2 && cleanKicker.length <= 40) {
      return cleanKicker;
    }
  }

  // 5. Heading check (h2 or h1)
  const heading = el.querySelector('h2, h1');
  if (heading && heading.textContent) {
    const rawText = heading.textContent.replace(/\s+/g, ' ').trim();
    // Match well-known heading phrases
    if (/pequeno/i.test(rawText) && /parecer/i.test(rawText)) return 'Início';
    if (/pilares/i.test(rawText) || /estrutura/i.test(rawText)) return 'Estrutura & Métricas';
    if (/mudamos o seu negócio/i.test(rawText)) return 'Manifesto de Marca';
    if (/outro olhar|outra percepção/i.test(rawText)) return 'Percepção Antes & Depois';
    if (/feito para quem/i.test(rawText)) return 'Público-Alvo';
    if (/antes da venda/i.test(rawText)) return 'Jornada do Cliente';
    if (/quem já virou/i.test(rawText) || /depoimento/i.test(rawText)) return 'Depoimentos';
    if (/não somos uma fábrica/i.test(rawText) || /diferencial/i.test(rawText)) return 'Diferenciais';
    if (/bons negócios não deveriam/i.test(rawText)) return 'Filosofia da Marca';
    if (/instagram/i.test(rawText)) return 'Instagram Feed';
    if (/perguntas frequentes|faq/i.test(rawText)) return 'Perguntas Frequentes (FAQ)';

    if (rawText.length <= 35) {
      return rawText;
    }
  }

  return 'Início';
}

/**
 * Returns the title of the section currently in the user's primary field of view.
 */
export function getActiveSectionTitle(): string {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 'Início';
  }

  // If at the very top of the page, user is in the Hero / Início section
  if (window.scrollY < 180) {
    return 'Início';
  }

  // If scrolled near the bottom of the document, user is at Contato / Footer
  const isNearBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
  if (isNearBottom) {
    return 'Contato';
  }

  // Gather all sections and footer elements on the page
  const sections = Array.from(document.querySelectorAll('main > section, section, footer'));
  if (sections.length === 0) {
    return 'Início';
  }

  // Focal line in viewport: roughly 42% from top where user reading gaze rests
  const focalPoint = window.innerHeight * 0.42;

  let bestSection: Element | null = null;
  let bestScore = -Infinity;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(window.innerHeight, rect.bottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    if (visibleHeight <= 0) continue;

    // Check if the reading focal line intersects this section
    const containsFocalPoint = rect.top <= focalPoint && rect.bottom >= focalPoint;
    const score = visibleHeight + (containsFocalPoint ? 15000 : 0);

    if (score > bestScore) {
      bestScore = score;
      bestSection = section;
    }
  }

  if (bestSection) {
    return extractTitleFromElement(bestSection);
  }

  return 'Início';
}

/**
 * Formats a message with a prepended section title payload for WhatsApp.
 * E.g., "[Serviços] Olá! Conheci a VIRATTA pelo site e quero entender como podemos transformar a comunicação da minha empresa."
 */
export function buildContextAwareMessage(sectionTitle: string, baseMessage: string): string {
  const cleanTitle = (sectionTitle || 'Início').trim();
  const cleanBase = (baseMessage || '').trim();
  const prefix = `[${cleanTitle}]`;

  if (!cleanBase) {
    return prefix;
  }

  // If already starts with this exact prefix, avoid duplication
  if (cleanBase.startsWith(prefix)) {
    return cleanBase;
  }

  // If already starts with another bracketed tag, replace it cleanly with the new active section
  if (/^\[[^\]]+\]\s*/.test(cleanBase)) {
    return cleanBase.replace(/^\[[^\]]+\]\s*/, `${prefix} `);
  }

  return `${prefix} ${cleanBase}`;
}
