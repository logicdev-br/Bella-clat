# 🌿 BELLE ÉCLAT — Maison de Beauté & Clínica Facial Botânica

Plataforma web completa (Multi-View Application) desenvolvida para a **Belle Éclat**, uma *Maison de Estética Facial Botânica e Holística* de alto padrão franco-brasileira.

---

## ✨ Funcionalidades Principais

- **Vitrine & Manifesto Editorial (`HomeView`):** Hero com curadoria visual, faixa de garantias operacionais, filtro por categorias de protocolo, banner bipartido do *Le Club Éclat* e carrossel interativo.
- **Planejamento Facial Interativo (`Le Diagnostic`):** Quiz dermatológico em 5 passos que gera dinamicamente um **Cronograma Semestral na Clínica (6 Meses)** e uma **Rotina Diária em Casa (Manhã & Noite)**, integrado com parecer clínico via **Google Gemini IA** (*Dra. Camille Laurent*).
- **Catálogo de Rituais, Chez Vous & Gift Cards (`RituaisView`):**
  - 8 protocolos presenciais na Flagship com modal sensorial detalhado.
  - Pacotes fechados de atendimento domiciliar (*Belle Éclat Chez Vous* — 4 ou 8 sessões).
  - Configurador de **Vale-Experiência (Gift Cards)** com pré-visualização em cartão de papel algodão digital.
- **La Boutique Skincare (`BoutiqueView`):** E-commerce da linha própria de 6 dermocosméticos botânicos com desconto automático de `15% OFF` para membros do Clube.
- **Assinatura Mensal VIP (`ClubeView`):** Adesão em 1 clique ao *Le Club Éclat* (`R$ 360/mês`), ativando isenção imediata da taxa de reserva de `R$ 100` e desconto na Boutique.
- **L’Herbier & Le Journal (`HerbierJournalView`):** Enciclopédia de matérias-primas botânicas e ensaios editoriais sobre cronobiologia cutânea.
- **Painel do Cliente (`Meu Espaço Éclat`):**
  - Gestão de agendamentos com **Checklist de Preparo Pré-Sessão** e botão **Remarcar em 1 Clique**.
  - **Barra de Ciclo Celular de 28 Dias** + Monitor Ambiental de Clima, Umidade e Índice UV em tempo real.
  - Prontuário com notas da especialista, histórico de sessões, reposição rápida e carteira VIP.
- **Gavetas Laterais Globais (`BookingDrawer` & `BagDrawer`):** Agendamento em sanfona (Accordion) de 3 etapas e sacola inteligente com autopreenchimento de endereço via **ViaCEP**.

---

## 🛠️ Tecnologias Utilizadas

- **React 18** + **Vite**
- **Tailwind CSS** (Tokens customizados de luxo orgânico)
- **Lucide React** (Ícones minimalistas de linha fina)
- **Google Gemini API** (Consultoria Dermatológica IA)
- **Open-Meteo & ViaCEP APIs** (Clima/UV em tempo real e cálculo de endereço)

---

## 🚀 Como Executar Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acesse no navegador:**
   ```
   http://localhost:5173/
   ```

