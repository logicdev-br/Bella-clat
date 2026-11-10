# SPEC.md — Belle Éclat (Maison de Beauté & Clínica Facial Botânica)

## 1. Visão Geral do Projeto
**Belle Éclat** é uma plataforma web completa (Multi-View / Multi-Page Application) para uma *Maison de Estética Facial Botânica e Holística* de alto padrão. O negócio opera em um **Modelo Híbrido** a partir de uma unidade física exclusiva (**Flagship**), integrando:
1. **Agendamento de Rituais Faciais Presenciais** (com alocação automática de especialista e adição de *Boosts* na mesma visita).
2. **Planejamento Facial Interativo (`Le Diagnostic`)** que gera um cronograma semestral/anual na clínica e uma rotina diária de cuidados em casa (manhã e noite) acompanhados por um **Diário da Pele** com ciclo biológico de 28 dias.
3. **Boutique Skincare Digital** para venda de linha própria de dermocosméticos naturais.
4. **Pacotes de Atendimento Domiciliar (`Belle Éclat Chez Vous`)** e **Vale-Experiência (`Gift Cards`)**.
5. **Clube de Assinatura Mensal (`Le Club Éclat`)** em modalidade única VIP.

---

## 2. Diretrizes Inegociáveis de UX/UI (Regras Anti-Poluição Visual)
1. **Respiro Visual Obrigatório:** No mínimo **35% da tela (viewport)** deve permanecer livre (espaço em branco/respiro) utilizando os tons suaves de fundo (`#FAF8F5` e `#EFECE6`).
2. **Proibição de Avaliações Falsas (Zero Clichê de IA):** É estritamente proibido exibir estrelas de avaliação (`★★★★★`), notas numéricas (`4.9/5`) ou contadores de reviews nos cards e páginas. A autoridade é transmitida por metadados técnicos de luxo (*Duração*, *Ativo Botânico Chave* e *Indicação Cutânea*).
3. **Regra dos 3 Elementos nos Cards:** Todo card de protocolo ou produto deve conter exclusivamente:
   - **Elemento 1:** Fotografia minimalista em fundo neutro com no máximo 1 selo discreto no canto superior (ex: `Flagship` ou `Novo`).
   - **Elemento 2:** Título em francês + 1 linha curta de metadado abaixo (ex: `75 min • Purificação & Detox`).
   - **Elemento 3:** Valor em Reais (`R$`) alinhado à esquerda e botão circular verde-oliva (`+`) à direita.
4. **Proibição de Tabelas Complexas e Gráficos Poluídos:** O resultado do Planejamento Facial deve usar uma **Chave Seletora (Toggle)** para alternar entre o cronograma da clínica e a rotina em casa, exibindo uma visão por vez. O Diário da Pele deve usar uma única **Barra de Ciclo Celular de 28 Dias** em vez de múltiplos gráficos.
5. **Gaveta Lateral em Sanfona (Accordion Side Drawer):** O fluxo de agendamento nunca deve empilhar todas as etapas abertas ao mesmo tempo. Quando uma etapa é preenchida, ela se recolhe em uma linha de resumo fina e abre a próxima.

---

## 3. Design System & Tokens Visuais

### 3.1. Paleta de Cores (CSS Variables)
- `--bg-primary`: `#FAF8F5` (*Blanc Cassé* — Fundo principal do site, limpo e acolhedor)
- `--bg-secondary`: `#EFECE6` (*Bege Areia Quente* — Fundo do Hero, cards secundários e gavetas laterais)
- `--surface-card`: `#FFFFFF` (*Branco Puro* — Superfície interna dos cards de produtos e protocolos)
- `--brand-olive`: `#2F3E2E` (*Vert Sauge Profond* — Botões principais de ação, fundo do card do Clube Éclat e destaques)
- `--brand-sage`: `#7C8C76` (*Verde Sálvia Suave* — Faixa horizontal de garantias operacionais e badges secundárias)
- `--accent-gold`: `#C5A880` (*Champagne Rosé / Ouro Fosco* — Bordas sutis de `1px`, selos VIP e barra do ciclo de 28 dias)
- `--accent-terracotta`: `#B87D64` (*Terracota Suave* — Alertas de ciclo celular e avisos de preparo pré-sessão)
- `--text-primary`: `#1E241E` (*Carvão Botânico* — Textos principais e títulos)
- `--text-muted`: `#5C645A` (*Cinza Herbáceo* — Subtítulos, durações e textos de apoio)
- `--border-subtle`: `#E2DEC9` (Linhas divisórias de `1px`)

### 3.2. Tipografia
- **Headings / Display (`H1`, `H2`, `H3` e Nomes Franceses):** `'Cormorant Garamond'` ou `'Playfair Display'` (Serifada editorial de alto contraste, pesos `400` Regular e `500` Medium).
  - `H1 (Hero)`: `52px` (Desktop) / `36px` (Mobile), `line-height: 1.15`.
  - `H2 (Títulos de Seção)`: `36px` (Desktop) / `28px` (Mobile), `line-height: 1.2`.
- **UI, Corpo, Preços e Botões:** `'Plus Jakarta Sans'` ou `'Inter'` (Sans-serif geométrica limpa, pesos `400`, `500` e `600`).
  - Texto padrão: `15px`, `line-height: 1.6`.
  - Metadados e Tags: `12px`, `letter-spacing: 0.08em`, `uppercase`.

### 3.3. Grid, Espaçamento e Bordas
- **Container Máximo:** `1280px` centralizado, com `padding` horizontal de `64px` no desktop e `20px` no mobile.
- **Espaçamento entre Seções (`padding-y`):** `96px` no desktop e `56px` no mobile.
- **Raios de Borda (`border-radius`):** `12px` para cards de categoria e blocos de destaque; `8px` para cards de produtos/protocolos; `999px` (pílula) ou `6px` para botões principais.
- **Sombras:** Sem sombras pesadas. Usar bordas finas (`1px solid var(--border-subtle)`) e contraste de superfície.

---

## 4. Arquitetura de Navegação (5 Páginas Principais + Painel + 2 Gavetas)

O cabeçalho fixo contém a **Top Bar Institucional** no topo (`✦ Diagnóstico Facial Gratuito` | `✦ Protocolos Dermatológicos` | `✦ Remarcação Flexível` | `✦ Ativos 100% Botânicos`) e a **Navbar Principal** abaixo:

- **Esquerda:** Logotipo `BELLE ÉCLAT` com subtítulo `MAISON DE BEAUTÉ`.
- **Centro (5 Links de Navegação):**
  1. `Rituais Faciais` (Catálogo da Flagship + Aba *Chez Vous* Domiciliar + Aba *Vale-Experiência*)
  2. `Planejamento Facial` (Quiz Interativo `Le Diagnostic` + Mapa Semestral/Rotina)
  3. `Boutique` (E-commerce de produtos próprios de skincare)
  4. `Clube Éclat` (Página e adesão à assinatura mensal VIP)
  5. `L’Herbier & Journal` (Enciclopédia de Ativos Botânicos + Editorial de Pele alternados por botão seletor)
- **Direita (Utilitários):**
  - Ícone de **Busca** (abre barra limpa de pesquisa de rituais/ativos).
  - Ícone de **Perfil** (abre a página/view `Meu Espaço Éclat` — Painel do Cliente).
  - Botão de destaque rápido: `Agendar Sessão` (abre a **Gaveta de Agendamento**).
  - Ícone de **Sacola** com contador numérico (abre a **Gaveta da Sacola** para produtos físicos, pacotes domiciliares e gift cards).

---

## 5. Base de Dados Oficial do Sistema (Mock Data)

### 5.1. Rituais Faciais na Flagship (4 Categorias)
| ID | Nome do Protocolo (FR) | Categoria | Duração | Preço | Exige Avaliação Presencial? | Preparo Pré-Sessão |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `p1` | **Rituel Pureté Botanique** | Limpeza & Detox | 75 min | R$ 380 | Não (Reserva Direta) | Suspender ácidos e esfoliantes físicos 48h antes da sessão. |
| `p2` | **Détox Lymphatique Vert** | Limpeza & Detox | 60 min | R$ 350 | Não (Reserva Direta) | Ingerir 500ml de água antes do ritual e evitar maquiagem densa. |
| `p3` | **Sculpture Visage Impériale** | Massagem & Escultura Facial | 60 min | R$ 420 | Não (Reserva Direta) | Vir sem maquiagem; evitar procedimentos injetáveis nos últimos 15 dias. |
| `p4` | **Lifting Kobi-Do Royal** | Massagem & Escultura Facial | 75 min | R$ 460 | Não (Reserva Direta) | Pele limpa; não realizar depilação facial 24h antes. |
| `p5` | **Soin Lumière d'Or** | Manchas & Glow | 60 min | R$ 460 | Não (Reserva Direta) | Evitar exposição solar intensa e retinoides 48h antes. |
| `p6` | **Éclat de Rose & Niacinamide** | Manchas & Glow | 60 min | R$ 390 | Não (Reserva Direta) | Seguro para peles sensíveis; nenhuma restrição prévia. |
| `p7` | **Protocole Jeunesse Cellulaire** | Anti-Aging & Lifting | 90 min | R$ 790 | **Sim (Avaliação Obrigatória)** | Suspender qualquer ácido 5 dias antes; requer avaliação de barreira cutânea. |
| `p8` | **Bio-Collagen Infuse** | Anti-Aging & Lifting | 75 min | R$ 680 | **Sim (Avaliação Obrigatória)** | Não estar com acne inflamatória ativa; requer avaliação prévia. |

### 5.2. Boosts Adicionais (Combos de +20 min na mesma visita)
- `b1`: **Boost Drenagem Ocular com Quartzo Frio** (+ 20 min • R$ 95)
- `b2`: **Boost LEDterapia Regenerativa Botânica** (+ 20 min • R$ 110)
- `b3`: **Boost Máscara Hidroplástica de Algas Marinhas** (+ 20 min • R$ 120)

### 5.3. Pacotes Exclusivos de Atendimento Domiciliar (`Belle Éclat Chez Vous`)
*(Única modalidade comercializada em pacote fechado; inclui deslocamento de especialista com maca aquecida, enxoval de linho e aromaterapia)*:
- `cv1`: **Cure Domicile Sérénité (4 Sessões em Casa)** — R$ 2.200 (Gera 4 créditos `Chez Vous` na carteira do cliente).
- `cv2`: **Cure Domicile Éclat Absolu (8 Sessões Semestrais + Kit Home Care)** — R$ 4.100 (Gera 8 créditos `Chez Vous` + envio imediato de 3 produtos).

### 5.4. Produtos da Boutique Skincare (Linha Própria)
- `pr1`: **Huile Démaquillante Pureté** — `Limpeza • Manhã & Noite` — R$ 210 (*Óleo de limpeza botânico com camomila azul e jojoba*).
- `pr2`: **Essence Botanique Apaisante** — `Preparo • Manhã & Noite` — R$ 240 (*Bruma tônica de água de rosas orgânica e centella asiática*).
- `pr3`: **Sérum Éclat Boréal** — `Tratamento • Manhã` — R$ 340 (*Niacinamida botânica 10% + Extrato iluminador de alcaçuz*).
- `pr4`: **Crème Barrière Velours** — `Hidratação • Manhã & Noite` — R$ 290 (*Ceramidas vegetais, esqualano de oliva e peptídeos*).
- `pr5`: **Élixir Nuit Régénérant** — `Regeneração • Noite` — R$ 380 (*Bakuchiol puro, rosa mosqueta prensada a frio e vitamina E*).
- `pr6`: **Voile Solaire Minéral FPS 50** — `Proteção • Manhã` — R$ 260 (*Filtro 100% mineral invisível com antioxidantes verdes*).

---

## 6. Especificação Detalhada das Telas (Views)

### 6.1. View 1: Home Page (Vitrine & Manifesto)
1. **Hero Section:**
   - **Esquerda:** Headline *"A ciência botânica a favor do tempo da sua pele."* + Subtítulo *"Rituais faciais holísticos, escultura natural e dermocosméticos puros desenhados para o ciclo biológico do seu rosto."*
   - **Botões do Hero:** Botão primário verde-oliva `Agendar Sessão` (abre Gaveta de Agendamento) + Link textual ao lado `Criar Meu Plano Facial →` (navega para `Planejamento Facial`).
   - **Ícones de Confiança abaixo dos botões:** 4 selos verticais minimalistas (`Fórmulas Botânicas Puras`, `Lifting Natural`, `Seguro para Peles Sensíveis`, `Refil Sustentável`).
   - **Direita:** Composição fotográfica editorial em iluminação matinal com frasco verde-oliva fosco sobre pedra de travertino, folhas botânicas e Gua Sha de quartzo.
2. **Faixa Horizontal Verde Sálvia (`#7C8C76`):**
   - 3 garantias distribuídas em colunas iguais:
     1. `Taxa Fixa de R$ 100` (*100% abatida no valor final da sua sessão*)
     2. `Remarcação em 1 Clique` (*Flexibilidade gratuita até 24h antes*)
     3. `Preparo Guiado` (*Checklist personalizado pré-procedimento*)
3. **Seção "Rituais por Categoria":**
   - Coluna esquerda com título *"Rituais por Categoria"*, breve descrição e link `"Ver Todos os Protocolos →"`.
   - Grade à direita com 4 cards verticais fotográficos: **1. Limpeza & Detox**, **2. Anti-Aging & Lifting**, **3. Manchas & Glow**, **4. Massagem & Escultura Facial**. Clicar em qualquer card leva ao catálogo já filtrado.
4. **Banner Bipartido "Le Club Éclat":**
   - Metade esquerda em Verde Oliva Escuro (`#2F3E2E`) com texto claro: tag `ASSINATURA MENSAL VIP`, título *"Sua pele em seu estado mais luminoso, todos os meses."*, preço `R$ 360/mês` e botão `Fazer Parte do Clube`.
   - Metade direita em Bege Areia (`#EFECE6`) com 3 ícones alinhados:
     - `1 Ritual Mensal na Flagship` (Qualquer protocolo de até R$ 460 incluso).
     - `Reserva Sem Taxa` (Agendamento em 1 clique sem cobrança do sinal de R$ 100).
     - `15% OFF Fixo na Boutique` (Desconto permanente em toda a linha home care).
5. **Carrossel "Protocolos Mais Agendados" + "Essenciais da Boutique":**
   - Chave seletora simples no topo da seção: `[ Rituais na Flagship | Produtos Skincare ]`.
   - Exibe fileira limpa de 5 cards seguindo estritamente a **Regra dos 3 Elementos**. Clicar no botão `+` de um ritual abre a Gaveta de Agendamento já preenchida com ele; clicar no `+` de um produto adiciona à Sacola.

---

### 6.2. View 2: Planejamento Facial (`Le Diagnostic`)
Fluxo interativo dividido em 3 estados limpos sem recarregar a página:

1. **Estado Inicial (Boas-vindas):** Layout 50/50 com imagem botânica à esquerda e chamada à direita (*"Mapeie o ritmo biológico da sua pele em 5 passos"* + botão `Iniciar Diagnóstico`).
2. **Estado do Quiz (1 Pergunta por vez):**
   - Exibe barra de progresso fina (`Passo 01 de 05`) e cartões de resposta largos:
     - **P1 (Biotipo):** *Equilibrada (Normal)* | *Brilho na Zona T (Mista/Oleosa)* | *Repuxamento (Seca)* | *Reativa (Sensível)*.
     - **P2 (Objetivo Principal):** *Lifting & Contorno Facial* | *Manchas & Luminosidade* | *Poros & Detox* | *Longevidade & Prevenção*.
     - **P3 (Sensibilidade/Restrições):** *Uso ácidos regularmente* | *Rosácea ou Melasma* | *Gestante/Lactante* | *Nenhuma restrição*.
     - **P4 (Estilo de Rotina em Casa):** *Essencialista (3 passos rápidos)* | *Ritual Completo (4 passos + massagem)*.
     - **P5 (Frequência na Flagship):** *Mensal (Ciclo Celular de 28 dias)* | *Quinzenal (Intensivo)*.
3. **Estado de Resultado (Com Chave Seletora Anti-Bagunça):**
   - **Cabeçalho do Diagnóstico:** Resumo elegante do perfil mapeado + botão `Salvar no Meu Espaço Éclat`.
   - **Chave Seletora Central (Toggle):**
     - **Modo 1: `[ ● Cronograma na Clínica (6 Meses) ]`**
       - Exibe 6 cards horizontais (Mês 1 ao Mês 6) gerados dinamicamente conforme as respostas do quiz.
       - Cada card mostra o Mês, o Protocolo indicado, o motivo biológico em 1 frase e o botão `Agendar Etapa` (que abre a Gaveta de Agendamento com aquele protocolo).
     - **Modo 2: `[ ○ Rotina Diária em Casa (Manhã & Noite) ]`**
       - Alterna a visão para 2 colunas limpas: **Ritual Matinal (3 passos)** e **Ritual Noturno (3 passos)** com os produtos da Belle Éclat correspondentes, permitindo adicionar itens individuais ou clicar em `Adicionar Rotina Completa à Sacola`.

---

### 6.3. View 3: Catálogo de Rituais, Chez Vous & Gift Cards
Página organizada com sub-navegação por 3 pílulas no topo:
1. **Aba `Rituais na Flagship`:** Filtro rápido pelas 4 categorias + grade de cards dos 8 protocolos. Ao clicar no título de um card, abre um modal limpo com descrição sensorial, ativos utilizados e botão de agendar.
2. **Aba `Atendimento Domiciliar (Chez Vous)`:** Apresenta a experiência de spa em casa e os 2 pacotes fechados (`Cure Domicile Sérénité` — 4 sessões por R$ 2.200 e `Cure Domicile Éclat Absolu` — 8 sessões por R$ 4.100).
3. **Aba `Vale-Experiência (Gift Cards)`:** Permite escolher um ritual ou valor em Reais, escrever uma dedicatória personalizada em cartão digital com estética de papel algodão e adicionar à sacola para presentear.

---

### 6.4. View 4: Painel do Cliente (`Meu Espaço Éclat`)
Área logada acessível pelo ícone de perfil no topo, estruturada com menu lateral limpo de **5 abas**:

1. **Aba `Meus Agendamentos`:**
   - Card da próxima sessão contendo data, horário, protocolo, *Boost* adicionado e o box **Checklist de Preparo Pré-Sessão** (em destaque suave terracota).
   - Botão **`Remarcar em 1 Clique`** (habilitado gratuitamente até 24h antes do horário; ao clicar, abre a Gaveta de Agendamento diretamente no Passo 2 para escolher nova data/hora sem pagar nova taxa).
2. **Aba `Meu Plano & Diário da Pele`:**
   - **Barra de Ciclo Celular de 28 Dias:** Indicador horizontal elegante em tom dourado fosco (`#C5A880`) mostrando em qual dia do ciclo a pele está (ex: *Dia 24 de 28 — Fase de Renovação Epidermal: momento ideal para agendar seu Soin Lumière d'Or*).
   - **Notas da Especialista:** Lista limpa de cartões com os registros das últimas sessões (nível de hidratação observado, recomendações e evolução).
   - Acesso direto ao cronograma semestral e rotina matinal/noturna salvos.
3. **Aba `Histórico de Procedimentos`:**
   - Lista cronológica dos rituais já realizados com botão rápido `Repetir este Ritual`.
4. **Aba `Boutique & Reposição Rápida`:**
   - Destaca no topo os produtos que fazem parte da rotina do cliente (com tag `Em uso no seu Plano Facial`) para recompra imediata em 1 clique, seguido do catálogo completo da marca.
5. **Aba `Carteira & Clube Éclat`:**
   - Mostra o status da assinatura mensal (`Ativa • 1 Ritual Disponível neste mês`), saldo de créditos do pacote domiciliar (`Créditos Chez Vous`) e campo para resgatar código de `Vale-Experiência`.

---

## 7. Especificação das Gavetas Laterais Globais (Side Drawers)

### 7.1. Gaveta de Agendamento (`Booking Drawer` — 440px à direita)
Abre sobre qualquer página com fundo desfocado suave (`backdrop-filter: blur(3px)`). Funciona em **Sanfona (Accordion) de 3 Etapas**:

- **Seletor Condicional de Modalidade (Topo da Gaveta):**
  - Padrão: `Unidade Flagship`. Se o usuário possuir créditos de pacote domiciliar na carteira, exibe chave seletora `[ Na Flagship | Em Domicílio (Usar Crédito Chez Vous) ]`.
- **Etapa 1: Protocolo & Boosts (Combos na Mesma Visita)**
  - Exibe o protocolo selecionado, duração e preço.
  - **Regra de Tratamento Invasivo:** Se o protocolo tiver `exige_avaliacao: true` (`Protocole Jeunesse Cellulaire` ou `Bio-Collagen Infuse`), exibe aviso elegante em borda terracota: *"Por segurança dermatológica, sua primeira visita para este protocolo é convertida automaticamente em uma Avaliação Visual Presencial Gratuita (30 min)."*
  - **Seleção de Boosts (+20 min):** Checkboxes elegantes para somar até 2 *Boosts* na mesma janela de visita. O sistema soma automaticamente o tempo total (ex: `75 min + 20 min = 95 min`) e o valor.
  - Botão `Escolher Data e Horário` recolhe a Etapa 1 em uma linha fina de resumo e abre a Etapa 2.
- **Etapa 2: Data & Horário (Alocação Inteligente de Especialista)**
  - O cliente não escolhe profissional manualmente; o sistema aloca automaticamente a especialista disponível.
  - Seletor horizontal de datas dos próximos 14 dias + grade limpa de horários divididos em *Manhã* (`09:00`, `10:30`), *Tarde* (`14:00`, `15:30`, `17:00`) e *Noite* (`18:30`).
  - Selecionar o horário recolhe a Etapa 2 e abre a Etapa 3.
- **Etapa 3: Confirmação e Taxa Fixa de Reserva**
  - **Cenário Padrão (Cliente Avulso):**
    - Exibe Resumo Total do Serviço (ex: `R$ 490,00`), **Taxa Fixa de Reserva a pagar agora: `R$ 100,00`** e Saldo restante para pagar na recepção da clínica (`R$ 390,00`).
    - Botões de pagamento rápido integrados: `[ PIX Instantâneo (QR Code) ]` ou `[ Cartão de Crédito ]`.
  - **Cenário Assinante (`Clube Éclat` Ativo) ou Pacote `Chez Vous`:**
    - Reconhece o benefício automaticamente, exibe **`Taxa de Reserva: R$ 0,00 (Coberto pelo seu Clube/Pacote)`** e botão direto `Confirmar Reserva em 1 Clique`.
- **Tela de Sucesso dentro da Gaveta:**
  - Exibe selo dourado de confirmação, o **Checklist de Preparo Pré-Sessão** específico daquele protocolo, opção de *Upsell* de 1 clique (*"Deseja deixar algum produto separado na recepção para retirar no dia?"*) e botão `Ver em Meus Agendamentos`.

### 7.2. Gaveta da Sacola (`Boutique Bag Drawer`)
- Gerencia exclusivamente a compra de **Produtos Físicos**, **Pacotes Domiciliares (`Chez Vous`)** e **Vale-Experiências (`Gift Cards`)**.
- Se o usuário estiver com o status `Clube Éclat Ativo`, aplica automaticamente **15% OFF** em todos os produtos da sacola.
- Oferece opção de `Entrega Expressa em Domicílio` ou `Retirada Gratuita na Flagship na sua próxima sessão`.

---

## 8. Regras de Estado e Persistência (Requisitos Técnicos)
1. **Estado Reativo Global:** Toda ação realizada pelo usuário deve refletir imediatamente no sistema durante a navegação:
   - Concluir um agendamento na Gaveta deve adicionar imediatamente a sessão na aba `Meus Agendamentos` do Painel do Cliente e atualizar o status do mês correspondente no `Planejamento Facial` de `Pendente` para `Agendado`.
   - Assinar o `Clube Éclat` ou comprar um pacote `Chez Vous` deve ativar imediatamente a isenção da taxa de R$ 100 na Gaveta de Agendamento e aplicar os 15% de desconto nos produtos.
   - Clicar em `Remarcar em 1 Clique` em um agendamento existente deve atualizar a data/hora daquele item sem duplicar a cobrança da taxa de R$ 100.
2. **Responsividade e Fluidez:** Transições suaves (`250ms ease-out`) na abertura de gavetas, troca de chaves seletoras (toggles) e avanço de etapas do quiz, sem quebras de layout em telas Desktop (`1440px`) ou Mobile (`390px`).