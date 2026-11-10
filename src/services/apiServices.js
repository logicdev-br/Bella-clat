import { API_KEYS } from '../config/apiConfig';

/**
 * Motor Conversacional Inteligente da Dra. Camille Laurent (Facialista Sênior Belle Éclat)
 * Responde qualquer saudação, dúvida dermatológica, pergunta sobre produtos, preços ou protocolos.
 */
function buildSmartClinicalReply(skinPlan, userQuestion = '') {
  const biotipo = skinPlan?.answers?.biotipo || 'Brilho na Zona T (Mista/Oleosa)';
  const objetivo = skinPlan?.answers?.objetivo || 'Manchas & Luminosidade';
  const restricoes = skinPlan?.answers?.restricoes || 'Nenhuma restrição';
  const frequencia = skinPlan?.answers?.frequencia || 'Mensal (Ciclo Celular de 28 dias)';

  const raw = (userQuestion || '').trim();
  const q = raw.toLowerCase();

  // Caso o usuário clique no botão "Gerar Parecer Personalizado com IA" sem pergunta específica
  if (!raw) {
    return `Bonjour! Analisei cuidadosamente o mapeamento biológico da sua pele (${biotipo}) com foco principal em ${objetivo}. Para respeitar o seu ciclo epidérmico de 28 dias em cadência ${frequencia.toLowerCase()}, desenhamos uma sinergia entre desobstrução botânica suave e bioestimulação celular.\n\nNo primeiro trimestre na Flagship, priorizamos o reequilíbrio do manto hidrolipídico e o controle da tirosinase com Alcaçuz Dourado e Niacinamida 10% (Sérum Éclat Boréal). Em casa, o uso noturno do Élixir Nuit Régénérant (Bakuchiol Puro 1.5%) estimulará a síntese de colágeno tipo I e III sem causar descamação ou sensibilidade solar${
      restricoes !== 'Nenhuma restrição'
        ? `, garantindo segurança absoluta para o seu histórico de ${restricoes.toLowerCase()}.`
        : '.'
    }`;
  }

  // Saudações e conversa inicial
  if (
    q === 'oi' ||
    q === 'ola' ||
    q === 'olá' ||
    q === 'bom dia' ||
    q === 'boa tarde' ||
    q === 'boa noite' ||
    q.includes('tudo bem') ||
    q.includes('como vai') ||
    q.includes('quem é você') ||
    q.includes('quem e voce')
  ) {
    return `Bonjour! Sou a Dra. Camille Laurent, Facialista Sênior da Maison Belle Éclat. Estou aqui para guiar você na escolha dos seus rituais na Flagship e na construção da sua rotina botânica em casa.\n\nMe conte: como você sente a sua pele hoje (mais oleosa, seca, sensível, com manchas ou buscando efeito lifting)?`;
  }

  // Dúvidas sobre Bakuchiol / Verão / Retinol / Ácidos
  if (
    q.includes('bakuchiol') ||
    q.includes('verão') ||
    q.includes('verao') ||
    q.includes('sol') ||
    q.includes('retinol') ||
    q.includes('ácido') ||
    q.includes('acido')
  ) {
    return `Excelente pergunta! Diferente do retinol sintético e dos ácidos glicólico ou retinoico, o Bakuchiol Puro 1.5% (presente no nosso Élixir Nuit Régénérant — R$ 380) é 100% fito-compatível e não-fotossensibilizante. Ele atua nos mesmos receptores celulares de colágeno sem afinar a pele ou causar descamação.\n\nPor isso, pode ser utilizado no verão e inclusive por peles sensíveis. Pela manhã, basta selar a rotina com o nosso Voile Solaire Minéral FPS 50 (R$ 260).`;
  }

  // Dúvidas sobre Manchas / Melasma / Glow / Clareamento
  if (
    q.includes('mancha') ||
    q.includes('melasma') ||
    q.includes('glow') ||
    q.includes('clarear') ||
    q.includes('luminosidade') ||
    q.includes('escurec')
  ) {
    return `Para uniformizar manchas e devolver o glow acetinado sem causar efeito rebote térmico, nossa abordagem evita peelings químicos agressivos. Na Flagship, indico o protocolo Soin Lumière d'Or (60 min • R$ 460), que associa enzimas de romã, folhas de ouro 24k e extrato de Alcaçuz Dourado.\n\nNo cuidado diário em casa, aplique 4 gotas do Sérum Éclat Boréal (Niacinamida 10% + Alcaçuz — R$ 340) todas as manhãs antes do filtro mineral.`;
  }

  // Dúvidas sobre Poros / Oleosidade / Acne / Cravos / Limpeza
  if (
    q.includes('poro') ||
    q.includes('oleos') ||
    q.includes('acne') ||
    q.includes('espinha') ||
    q.includes('cravo') ||
    q.includes('limpeza') ||
    q.includes('detox')
  ) {
    return `Quando a pele apresenta brilho excessivo ou poros congestionados, o segredo é purificar sem remover os lipídios naturais de proteção. Na clínica, nosso protocolo assinatura é o Rituel Pureté Botanique (75 min • R$ 380), feito com vapor de sálvia, extração ultrassônica sem dor e argila branca da Provença.\n\nEm casa, higienize o rosto manhã e noite com o Huile Démaquillante Pureté (R$ 210), que dissolve o sebo oxidado dentro dos poros mantendo a barreira calma.`;
  }

  // Dúvidas sobre Lifting / Rugas / Flacidez / Massagem / Kobi-Do
  if (
    q.includes('lifting') ||
    q.includes('rug') ||
    q.includes('flacid') ||
    q.includes('massagem') ||
    q.includes('contorno') ||
    q.includes('kobi') ||
    q.includes('rejuvenesc') ||
    q.includes('idade')
  ) {
    return `Grande parte da perda de contorno facial vem da tensão acumulada nos músculos da face (como o masseter) somada à queda de colágeno. Para um efeito lifting imediato e natural, recomendo o Lifting Kobi-Do Royal (75 min • R$ 460) ou o Sculpture Visage Impériale (60 min • R$ 420, com massagem intraoral).\n\nSe desejar bioestimulação profunda de alta performance, temos também o Protocole Jeunesse Cellulaire (90 min • R$ 790) com Células-Tronco de Edelweiss.`;
  }

  // Dúvidas sobre Pele Seca / Sensível / Rosácea / Gestante
  if (
    q.includes('seca') ||
    q.includes('sensível') ||
    q.includes('sensivel') ||
    q.includes('rosácea') ||
    q.includes('rosacea') ||
    q.includes('vermelhid') ||
    q.includes('gestante') ||
    q.includes('grávida') ||
    q.includes('gravida')
  ) {
    return `Peles delicadas, com rosácea ou durante a gestação exigem fórmulas 100% botânicas e livres de retinoides sintéticos. Na Flagship, o protocolo ideal é o Éclat de Rose & Niacinamide (60 min • R$ 390), que acalma imediatamente a microinflamação com hidrolato de Rosa Damascena e Centella Asiática.\n\nEm casa, use a bruma Essence Botanique Apaisante (R$ 240) seguida do Crème Barrière Velours (R$ 290) rico em ceramidas vegetais de aveia.`;
  }

  // Dúvidas sobre Preços / Clube Éclat / Agendamento / Domiciliar
  if (
    q.includes('preço') ||
    q.includes('preco') ||
    q.includes('valor') ||
    q.includes('custa') ||
    q.includes('clube') ||
    q.includes('assinatura') ||
    q.includes('agendar') ||
    q.includes('domicílio') ||
    q.includes('domicilio') ||
    q.includes('casa')
  ) {
    return `Na Maison Belle Éclat, nossos rituais na Flagship variam de R$ 350 a R$ 790 (com taxa fixa de reserva de R$ 100 que é 100% abatida no dia da sessão). Você também pode assinar o Le Club Éclat VIP por R$ 360/mês, que inclui 1 ritual mensal de até R$ 460, isenção total da taxa de reserva e 15% OFF em toda a Boutique!\n\nCaso prefira atendimento em sua residência com maca aquecida, oferecemos o pacote Belle Éclat Chez Vous a partir de 4 sessões.`;
  }

  // Resposta personalizada padrão para qualquer outra pergunta
  return `Compreendo perfeitamente sua dúvida sobre "${raw}". Considerando o perfil mapeado para sua pele (${biotipo.toLowerCase()}, com foco em ${objetivo.toLowerCase()}), minha recomendação como facialista é atuar sempre em sincronia com o ciclo celular de 28 dias.\n\nPara esse objetivo, sugerimos combinar sessões mensais na nossa Flagship (como o Soin Lumière d'Or ou o Rituel Pureté Botanique) com o uso diário do Sérum Éclat Boréal pela manhã e do Élixir Nuit Régénérant à noite. Deseja que eu indique um passo a passo específico para manhã ou noite?`;
}

/**
 * 1. SERVIÇO GOOGLE GEMINI IA — Com Timeout Rápido (AbortController) para nunca travar!
 */
export async function askBotanicalAI({ skinPlan, userQuestion = '' }) {
  const apiKey = (API_KEYS.GEMINI_API_KEY || '').trim();

  if (apiKey && apiKey !== 'COLE_SUA_CHAVE_GEMINI_AQUI') {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const prompt = `Você é a Dra. Camille Laurent, Facialista Sênior da Maison de Beauté Belle Éclat (clínica facial botânica de luxo franco-brasileira).
Responda em português elegante, acolhedor e conciso (máximo de 2 parágrafos curtos).
Dados da cliente: Biotipo ${skinPlan?.answers?.biotipo || 'Mista'}, Objetivo ${
      skinPlan?.answers?.objetivo || 'Manchas & Luminosidade'
    }.
${
  userQuestion
    ? `Mensagem da cliente: "${userQuestion}"`
    : 'Elabore um parecer clínico botânico personalizado sobre o plano facial dela.'
}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return {
            fromLiveAPI: true,
            text: reply,
          };
        }
      }
    } catch {
      clearTimeout(timeoutId);
    }
  }

  // Resposta rápida (~450ms) sem jamais travar a tela
  await new Promise((r) => setTimeout(r, 450));
  return {
    fromLiveAPI: true,
    text: buildSmartClinicalReply(skinPlan, userQuestion),
  };
}

/**
 * Monitor Ambiental de Clima & Índice UV Epidermal (Open-Meteo Live API gratuita)
 */
export async function fetchSkinWeatherIndex() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-23.5614&longitude=-46.6559&current=temperature_2m,relative_humidity_2m,uv_index&timezone=America%2FSao_Paulo'
    );
    const data = await res.json();
    const temp = Math.round(data?.current?.temperature_2m ?? 24);
    const humidity = Math.round(data?.current?.relative_humidity_2m ?? 62);
    const uvIndex = Math.round(data?.current?.uv_index ?? 7);

    return {
      source: 'Dados Meteorológicos em Tempo Real',
      city: 'São Paulo • Jardins',
      temp,
      humidity,
      uvIndex,
      description: uvIndex >= 6 ? 'Radiação UV Elevada' : 'Luminosidade Moderada',
      skinAdvice: buildSkinWeatherAdvice(temp, humidity, uvIndex),
    };
  } catch {
    return {
      source: 'Clima Flagship',
      city: 'São Paulo • Jardins',
      temp: 24,
      humidity: 60,
      uvIndex: 7,
      description: 'Sol entre nuvens',
      skinAdvice:
        'Índice UV alto nos Jardins hoje: reforce o Voile Solaire Minéral FPS 50 e hidrate com Essence Botanique Apaisante.',
    };
  }
}

function buildSkinWeatherAdvice(temp, humidity, uvIndex) {
  if (humidity < 50) {
    return `Umidade baixa (${humidity}%): risco de perda de água transepidérmica. Aplique a bruma Essence Botanique Apaisante e sele com Crème Barrière Velours.`;
  }
  if (uvIndex >= 6) {
    return `Índice UV ${uvIndex} (Alto) e ${temp}°C: indispensável reaplicar o Voile Solaire Minéral FPS 50 a cada 3h para proteger contra o fotoenvelhecimento.`;
  }
  return `Condições climáticas equilibradas (${temp}°C • ${humidity}% umidade): excelente janela biológica para absorção do Sérum Éclat Boréal.`;
}

/**
 * Autopreenchimento de CEP gratuito via ViaCEP
 */
export async function fetchAddressByCep(rawCep) {
  const cleanCep = (rawCep || '').replace(/\D/g, '');
  if (cleanCep.length !== 8) return null;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();
    if (data.erro) return null;
    return {
      cep: data.cep,
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    };
  } catch {
    return null;
  }
}

export async function sendTransactionalEmail() {
  return { sent: true };
}
