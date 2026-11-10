import { API_KEYS } from '../config/apiConfig';
import {
  PROTOCOLS,
  BOOSTS,
  CHEZ_VOUS_PACKAGES,
  PRODUCTS,
  HERBIER_ACTIVES,
} from '../data/mockData';

/**
 * Constrói a Base de Conhecimento Completa da Maison Belle Éclat + Contexto em Tempo Real da Cliente
 */
function buildSystemContext({
  skinPlan,
  isClubMember,
  chezVousCredits,
  appointments,
  bagItems,
}) {
  const protocolsText = PROTOCOLS.map(
    (p) =>
      `- ${p.name} (${p.category}): ${p.durationLabel} | Preço: R$ ${p.price} | Ativo chave: ${
        p.keyActive
      } | Indicação: ${p.indication} | Exige avaliação prévia gratuita de 30min? ${
        p.exige_avaliacao ? 'Sim' : 'Não'
      } | Preparo obrigatório: ${p.preparo} | Descrição: ${p.sensoryDescription}`
  ).join('\n');

  const boostsText = BOOSTS.map(
    (b) => `- ${b.name}: +${b.duration} min | +R$ ${b.price} (${b.description})`
  ).join('\n');

  const productsText = PRODUCTS.map(
    (pr) =>
      `- ${pr.name} (${pr.volume}) — ${pr.metaLine}: R$ ${
        pr.price
      } (ou R$ ${Math.round(pr.price * 0.85)} para membros Le Club Éclat com 15% OFF) | ${
        pr.description
      } | Ativos: ${pr.keyActives.join(', ')} | Sensorial: ${pr.sensoryNotes}`
  ).join('\n');

  const chezVousText = CHEZ_VOUS_PACKAGES.map(
    (cv) =>
      `- ${cv.name}: R$ ${cv.price} (${cv.sessions} sessões em domicílio com maca aquecida em linho egípcio e aromaterapia | ${cv.validity})`
  ).join('\n');

  const herbierText = HERBIER_ACTIVES.map(
    (h) =>
      `- ${h.name} (${h.frenchTitle}): ${h.concentration} | Origem: ${h.origin} | Ação biológica: ${h.biologicalAction}`
  ).join('\n');

  const clientProfileText = skinPlan
    ? `PERFIL ATUAL DA CLIENTE (Le Diagnostic):
- Biotipo Cutâneo: ${skinPlan.answers?.biotipo || 'Não informado'}
- Objetivo Principal: ${skinPlan.answers?.objetivo || 'Não informado'}
- Restrições/Sensibilidade: ${skinPlan.answers?.restricoes || 'Nenhuma restrição'}
- Estilo de Rotina em Casa: ${skinPlan.answers?.estiloRotina || 'Ritual Completo'}
- Frequência na Flagship: ${skinPlan.answers?.frequencia || 'Mensal'}
- Dia atual no Ciclo Celular de 28 Dias: Dia ${skinPlan.cycleDay || 24} de 28
- Cronograma de 6 Meses na Clínica: ${
        skinPlan.clinicSchedule
          ?.map((m) => `${m.monthLabel}: ${m.protocolName} (${m.status})`)
          .join(' | ') || ''
      }`
    : 'A cliente ainda não preencheu o quiz personalizado.';

  const liveAccountText = `STATUS DA CONTA DA CLIENTE EM TEMPO REAL NO SITE:
- Membro VIP do Le Club Éclat (R$ 360/mês)? ${
    isClubMember
      ? 'SIM (Possui 1 ritual mensal incluso até R$ 460, Taxa de Reserva R$ 0 e 15% OFF ativo na Boutique)'
      : 'Ainda não é assinante VIP'
  }
- Saldo de Créditos Domiciliares (Chez Vous): ${chezVousCredits || 0} créditos
- Agendamentos Confirmados: ${
    appointments && appointments.length > 0
      ? appointments
          .map(
            (a) =>
              `${a.protocolName} em ${a.dateLabel} às ${a.timeSlot} (${a.modality}) com ${a.specialist}`
          )
          .join('; ')
      : 'Nenhum agendamento ativo no momento'
  }
- Itens na Sacola da Boutique agora: ${
    bagItems && bagItems.length > 0
      ? bagItems.map((i) => `${i.quantity}x ${i.name}`).join(', ')
      : 'Sacola vazia'
  }`;

  return `Você é a Dra. Camille Laurent, Facialista Sênior e Diretora Científica da **Belle Éclat — Maison de Beauté & Clínica Facial Botânica**, localizada na Flagship Jardins (Rua Bela Cintra, 1840 — São Paulo, Terça a Sábado das 09h às 20h).

DIRETRIZES DE PERSONALIDADE E ESTILO DE RESPOSTA:
1. Você tem liberdade total de conversação! Responda qualquer pergunta da cliente de forma natural, humana, fluida, inteligente e altamente personalizada.
2. Nunca diga "Como uma inteligência artificial, não tenho acesso a preços". Você TRABALHA na Belle Éclat e conhece cada detalhe, preço exato, ativo botânico, duração e regra de negócio listados abaixo.
3. Mantenha um tom elegante, acolhedor, sofisticado e acessível (estilo Maison francesa de luxo orgânico, podendo usar um "Bonjour" sutil quando adequado, sem exageros).
4. Se a cliente fizer uma pergunta aberta, casual, pedir uma rotina, comparar produtos, perguntar sobre condições de pele (acne, melasma, gravidez, rosácea, flacidez, rotina matinal/noturna), explique a ciência biológica da pele (como o ciclo de renovação epidérmica de 28 dias e a integridade da barreira cutânea) e recomende os rituais e produtos exatos da Belle Éclat com seus valores reais.
5. Evite respostas excessivamente longas ou cheias de marcações robóticas; prefira parágrafos fluidos e bem estruturados.

=== BASE DE CONHECIMENTO OFICIAL DA BELLE ÉCLAT ===

[REGRAS OPERACIONAIS E GARANTIAS]
- Taxa Fixa de Reserva na Flagship: R$ 100,00 (paga via PIX ou Cartão na Gaveta de Agendamento e 100% abatida no valor final da sessão na clínica).
- Isenção de Taxa: Membros do "Le Club Éclat" ou clientes usando créditos "Chez Vous" pagam R$ 0 de taxa de reserva (confirmação em 1 clique).
- Remarcação em 1 Clique: Gratuita até 24h antes do horário agendado sem cobrar nova taxa.
- Tratamentos de Alta Performance (Protocole Jeunesse Cellulaire e Bio-Collagen Infuse): Por segurança dermatológica, a primeira visita inclui automaticamente uma Avaliação Visual Presencial Gratuita de 30 minutos.
- Vale-Experiência (Gift Cards): Cartões de presente digitais com estética de papel algodão, disponíveis para qualquer ritual ou valores livres (R$ 350 a R$ 1.000).

[ASSINATURA MENSAL VIP: LE CLUB ÉCLAT — R$ 360/mês]
- Modalidade única sem fidelidade.
- Benefício 1: 1 Ritual Mensal na Flagship (qualquer protocolo de até R$ 460 incluso integralmente todo mês — ex: Soin Lumière d'Or ou Lifting Kobi-Do Royal).
- Benefício 2: Reserva Sem Taxa (isenção do sinal de R$ 100).
- Benefício 3: 15% OFF fixo e automático em todos os produtos da Boutique Skincare.

[CATÁLOGO DOS 8 RITUAIS FACIAIS NA FLAGSHIP]
${protocolsText}

[BOOSTS ADICIONAIS NA MESMA VISITA (Máximo de 2 por sessão)]
${boostsText}

[PACOTES DE ATENDIMENTO DOMICILIAR — BELLE ÉCLAT CHEZ VOUS]
${chezVousText}

[CATÁLOGO DOS 6 PRODUTOS DA BOUTIQUE SKINCARE (Linha Própria Refilável & 100% Botânica)]
*(O Cofre Completo com os 6 produtos soma R$ 1.720 avulso ou R$ 1.462 para membros do Clube Éclat)*
${productsText}

[L'HERBIER — ENCICLOPÉDIA DE ATIVOS BOTÂNICOS DA MAISON]
${herbierText}

=== CONTEXTO PERSONALIZADO DA CLIENTE ATUAL ===
${clientProfileText}

${liveAccountText}`;
}

/**
 * Fallback local inteligente caso o usuário esteja sem internet
 */
function buildOfflineFallbackReply(skinPlan, userQuestion = '') {
  const biotipo = skinPlan?.answers?.biotipo || 'Brilho na Zona T (Mista/Oleosa)';
  const objetivo = skinPlan?.answers?.objetivo || 'Manchas & Luminosidade';
  if (!userQuestion.trim()) {
    return `Bonjour! Analisei o mapeamento biológico da sua pele (${biotipo}) com foco em ${objetivo}. Para o seu ciclo de 28 dias, recomendo combinar nossas sessões na Flagship (como o Soin Lumière d'Or — R$ 460 e o Rituel Pureté Botanique — R$ 380) com o uso diário do Sérum Éclat Boréal (R$ 340) pela manhã e do Élixir Nuit Régénérant com Bakuchiol Puro (R$ 380) à noite.`;
  }
  return `Bonjour! Para sua dúvida sobre "${userQuestion}", considerando seu perfil ${biotipo.toLowerCase()} com foco em ${objetivo.toLowerCase()}, recomendo priorizar ativos botânicos biocompatíveis como a Niacinamida 10% (Sérum Éclat Boréal — R$ 340) pela manhã e o Bakuchiol Puro 1.5% (Élixir Nuit Régénérant — R$ 380) à noite, sempre selando com o Voile Solaire Minéral FPS 50 (R$ 260).`;
}

/**
 * 1. SERVIÇO GOOGLE GEMINI IA — Respostas Livres, Multi-Turn History e Contexto Total da Maison
 */
export async function askBotanicalAI({
  skinPlan,
  userQuestion = '',
  chatHistory = [],
  isClubMember = false,
  chezVousCredits = 0,
  appointments = [],
  bagItems = [],
}) {
  const apiKey = (API_KEYS.GEMINI_API_KEY || '').trim();

  const systemInstructionText = buildSystemContext({
    skinPlan,
    isClubMember,
    chezVousCredits,
    appointments,
    bagItems,
  });

  // Monta o histórico de conversa multi-turn para o Gemini manter o fio da meada
  const formattedContents = [];

  if (Array.isArray(chatHistory) && chatHistory.length > 0) {
    chatHistory.forEach((msg) => {
      if (!msg.text) return;
      formattedContents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      });
    });
  }

  const finalUserMessage = userQuestion.trim()
    ? userQuestion.trim()
    : 'Elabore um parecer clínico botânico completo, caloroso e personalizado sobre o meu diagnóstico de pele, explicando quais rituais da clínica e produtos da rotina em casa serão mais transformadores para mim.';

  // Evita duplicar a última mensagem se ela já estiver no final do chatHistory
  const lastInHistory = formattedContents[formattedContents.length - 1];
  if (!lastInHistory || lastInHistory.role !== 'user' || lastInHistory.parts[0].text !== finalUserMessage) {
    formattedContents.push({
      role: 'user',
      parts: [{ text: finalUserMessage }],
    });
  }

  // Garante que a primeira mensagem em contents seja 'user' (requisito da API Gemini)
  while (formattedContents.length > 0 && formattedContents[0].role !== 'user') {
    formattedContents.shift();
  }

  if (apiKey && apiKey !== 'COLE_SUA_CHAVE_GEMINI_AQUI') {
    const modelsToTry = ['gemini-flash-lite-latest', 'gemini-flash-latest'];

    for (const modelName of modelsToTry) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 14000);

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: systemInstructionText }],
              },
              contents: formattedContents,
              generationConfig: {
                temperature: 0.75,
                maxOutputTokens: 900,
              },
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
              text: reply.trim(),
            };
          }
        }
      } catch {
        clearTimeout(timeoutId);
      }
    }
  }

  return {
    fromLiveAPI: false,
    text: buildOfflineFallbackReply(skinPlan, userQuestion),
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

export async function sendTransactionalEmail({ subject, details }) {
  // Se o Supabase estiver configurado no .env / Vercel, salva automaticamente no banco de dados na nuvem!
  await syncToSupabase(subject, details);
  return { sent: true };
}

/**
 * INTEGRAÇÃO AUTOMÁTICA COM SUPABASE REST API
 * Salva Agendamentos, Pedidos da Boutique, Planos Faciais e Newsletter no banco PostgreSQL do Supabase.
 */
export async function syncToSupabase(eventType = '', payload = {}) {
  const url = (API_KEYS.SUPABASE_URL || '').trim().replace(/\/$/, '');
  const key = (API_KEYS.SUPABASE_ANON_KEY || '').trim();

  if (!url || !key) return { synced: false };

  let table = 'appointments';
  let rowData = payload;

  if (eventType.includes('Reserva Confirmada') && payload.protocolo) {
    table = 'appointments';
    rowData = {
      id: `apt-${Date.now()}`,
      protocol_id: payload.protocolId || 'p1',
      protocol_name: payload.protocolo,
      date_label: payload.data,
      time_slot: payload.horario,
      modality: payload.modalidade,
      total_price: parseFloat(String(payload.valor_total || '0').replace(/\D/g, '')) || 380,
      status: 'Confirmado',
    };
  } else if (eventType.includes('Pedido na Boutique')) {
    table = 'boutique_orders';
    rowData = {
      items: payload,
      delivery_option: payload.modalidade || 'Flagship',
      total_amount: parseFloat(String(payload.total || '0').replace(/\D/g, '')) || 0,
    };
  } else if (eventType.includes('Lettre Botanique') && payload.email_inscrito) {
    table = 'newsletter_leads';
    rowData = {
      email: payload.email_inscrito,
    };
  } else if (eventType === 'SKIN_PLAN') {
    table = 'skin_plans';
    rowData = {
      biotipo: payload?.answers?.biotipo || '',
      objetivo: payload?.answers?.objetivo || '',
      restricoes: payload?.answers?.restricoes || '',
      estilo_rotina: payload?.answers?.estiloRotina || '',
      frequencia: payload?.answers?.frequencia || '',
      profile_title: payload?.profileTitle || '',
      cycle_day: payload?.cycleDay || 24,
      clinic_schedule: payload?.clinicSchedule || [],
    };
  }

  try {
    const res = await fetch(`${url}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(rowData),
    });
    return { synced: res.ok };
  } catch (err) {
    console.error('Erro ao sincronizar com Supabase:', err);
    return { synced: false };
  }
}
