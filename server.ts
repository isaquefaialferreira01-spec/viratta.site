import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// Helper for intelligent offline/fallback analysis
function getSmartFallbackAnalysis(userPrompt: string): { analysis: string; serviceNeeded: string } {
  const lower = userPrompt.toLowerCase();
  
  if (lower.includes('vídeo') || lower.includes('video') || lower.includes('gravar') || lower.includes('reels') || lower.includes('film')) {
    return {
      analysis: 'Para elevar a percepção do seu negócio e transmitir autoridade imediata, a captação audiovisual cinematográfica e alinhada ao posicionamento é o caminho ideal para transformar a imagem da sua empresa.',
      serviceNeeded: 'FILMMAKER & AUDIOVISUAL ESTRATÉGICO'
    };
  }
  
  if (lower.includes('instagram') || lower.includes('rede social') || lower.includes('post') || lower.includes('seguidor') || lower.includes('engajamento')) {
    return {
      analysis: 'O seu perfil precisa deixar de ser um mural improvisado e passar a funcionar como um ativo de vendas e posicionamento. Uma estratégia de conteúdo estruturada com design refinado é o que vai destravar novos clientes.',
      serviceNeeded: 'SOCIAL MEDIA & GESTÃO ESTRATÉGICA'
    };
  }

  if (lower.includes('logo') || lower.includes('marca') || lower.includes('identidade') || lower.includes('amador') || lower.includes('rebranding')) {
    return {
      analysis: 'Quando a identidade visual parece menor do que a qualidade real da entrega, o cliente hesita em pagar o valor justo. Uma reformulação de branding trará o peso visual e a sofisticação que seu negócio merece.',
      serviceNeeded: 'BRANDING & IDENTIDADE VISUAL'
    };
  }

  if (lower.includes('tráfego') || lower.includes('trafego') || lower.includes('anúncio') || lower.includes('anuncio') || lower.includes('leads') || lower.includes('google ads')) {
    return {
      analysis: 'Anunciar sem um posicionamento claro queima verba. O ideal é estruturar a mensagem da marca e canalizar tráfego qualificado para ofertas e páginas de alta conversão.',
      serviceNeeded: 'ESTRATÉGIA DE MARKETING & TRÁFEGO PAGO'
    };
  }

  return {
    analysis: 'Pelo que você contou, o desafio principal está em alinhar a comunicação com o real valor que sua empresa entrega, evitando que clientes comparem seu serviço apenas por preço.',
    serviceNeeded: 'POSICIONAMENTO ESTRATÉGICO & COMUNICAÇÃO'
  };
}

// Server-side AI endpoint
app.post('/api/diagnose', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ error: 'Mensagem não informada.' });
  }

  const cleanPrompt = prompt.trim();
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Você é o consultor de diagnóstico da VIRATTA MARKETING, uma agência de comunicação e posicionamento estratégico no Brasil.
O visitante do site descreveu a necessidade do negócio dele:
"${cleanPrompt}"

Sua tarefa:
1. Responda em no máximo 2 a 3 frases curtas, sofisticadas e diretas em português.
2. Identifique de forma perspicaz a real dor e a prioridade de marketing (ex: percepção de valor, profissionalismo visual, presença no Instagram, produção em vídeo, posicionamento).
3. Conclua com um direcionamento encorajador para avançar com a equipe da VIRATTA.
4. Ao final da resposta, inclua uma linha com a tag [SERVICO: Nome do Serviço Principal Recomendado] (ex: Filmmaker, Social Media, Branding, Posicionamento Estratégico, Design Gráfico).
Não use saudações longas nem formatação exagerada.`
              }
            ]
          }
        ]
      });

      const rawText = response.text || '';
      let serviceNeeded = 'POSICIONAMENTO ESTRATÉGICO';
      let cleanText = rawText;

      const match = rawText.match(/\[SERVICO:\s*([^\]]+)\]/i);
      if (match) {
        serviceNeeded = match[1].trim();
        cleanText = rawText.replace(/\[SERVICO:\s*[^\]]+\]/i, '').trim();
      }

      return res.json({
        analysis: cleanText || getSmartFallbackAnalysis(cleanPrompt).analysis,
        serviceNeeded: serviceNeeded || getSmartFallbackAnalysis(cleanPrompt).serviceNeeded
      });
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to smart diagnosis:', err?.message || err);
      // Fallback seamlessly
      const fallback = getSmartFallbackAnalysis(cleanPrompt);
      return res.json(fallback);
    }
  }

  // If no GEMINI_API_KEY is configured in environment, use smart analysis
  const fallback = getSmartFallbackAnalysis(cleanPrompt);
  return res.json(fallback);
});

// Vite Middleware for dev or static serving for prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VIRATTA server running on port ${PORT}`);
  });
}

startServer();
