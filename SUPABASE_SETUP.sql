-- ============================================================================
-- SCRIPT SQL DO SUPABASE — BELLE ÉCLAT (MAISON DE BEAUTÉ)
-- ============================================================================
-- COMO USAR:
-- 1. No painel do Supabase, clique em "SQL Editor" no menu lateral esquerdo.
-- 2. Clique em "+ New query".
-- 3. Cole todo este código abaixo e clique no botão verde "Run" (ou Ctrl + Enter).
-- ============================================================================

-- 1. Tabela de Agendamentos (Flagship & Chez Vous)
create table if not exists public.appointments (
  id text primary key,
  protocol_id text not null,
  protocol_name text not null,
  category text,
  date_label text not null,
  time_slot text not null,
  modality text default 'Flagship',
  specialist text,
  total_duration integer,
  total_price numeric,
  deposit_paid numeric default 100,
  remaining_balance numeric,
  status text default 'Confirmado',
  created_at timestamp with time zone default now()
);

-- 2. Tabela de Planejamentos Faciais (Le Diagnostic)
create table if not exists public.skin_plans (
  id uuid primary key default gen_random_uuid(),
  biotipo text,
  objetivo text,
  restricoes text,
  estilo_rotina text,
  frequencia text,
  profile_title text,
  cycle_day integer default 24,
  clinic_schedule jsonb,
  created_at timestamp with time zone default now()
);

-- 3. Tabela de Pedidos da Boutique, Pacotes Chez Vous e Gift Cards
create table if not exists public.boutique_orders (
  id uuid primary key default gen_random_uuid(),
  items jsonb not null,
  delivery_option text,
  total_amount numeric,
  is_club_member boolean default false,
  created_at timestamp with time zone default now()
);

-- 4. Tabela de Inscritos na Newsletter (La Lettre Botanique)
create table if not exists public.newsletter_leads (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp with time zone default now()
);

-- Habilita Row Level Security (RLS) com permissão pública de leitura/escrita para o MVP
alter table public.appointments enable row level security;
alter table public.skin_plans enable row level security;
alter table public.boutique_orders enable row level security;
alter table public.newsletter_leads enable row level security;

create policy "Permitir acesso publico agendamentos" on public.appointments for all using (true) with check (true);
create policy "Permitir acesso publico planos" on public.skin_plans for all using (true) with check (true);
create policy "Permitir acesso publico pedidos" on public.boutique_orders for all using (true) with check (true);
create policy "Permitir acesso publico newsletter" on public.newsletter_leads for all using (true) with check (true);
