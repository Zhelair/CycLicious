create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text not null unique,
  city_slug text not null default 'sofia',
  locale text not null default 'bg',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  is_adult_confirmed boolean not null default false,
  meetup_risk_acknowledged boolean not null default false,
  navigation_risk_acknowledged boolean not null default false,
  accepted_at timestamptz not null default timezone('utc', now()),
  unique (user_id)
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  city_slug text not null default 'sofia',
  report_type text not null,
  category_key text not null,
  severity text not null,
  note text not null default '',
  latitude double precision not null,
  longitude double precision not null,
  status text not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz,
  constraint reports_status_check check (status in ('active', 'cleared', 'hidden')),
  constraint reports_note_length_check check (char_length(note) <= 280)
);

create table if not exists public.report_confirmations (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  unique (report_id, user_id)
);

create table if not exists public.meetups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  city_slug text not null default 'sofia',
  title text not null,
  note text not null default '',
  visibility text not null default 'unlisted',
  pace_label text not null default '',
  scheduled_for timestamptz not null,
  area_label text not null default '',
  latitude double precision,
  longitude double precision,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint meetups_visibility_check check (visibility in ('public', 'unlisted', 'private'))
);

alter table public.profiles enable row level security;
alter table public.consents enable row level security;
alter table public.reports enable row level security;
alter table public.report_confirmations enable row level security;
alter table public.meetups enable row level security;

create policy "profiles_select_public_handles"
on public.profiles
for select
using (true);

create policy "profiles_insert_own_row"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "profiles_update_own_row"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "consents_select_own_row"
on public.consents
for select
to authenticated
using (auth.uid() = user_id);

create policy "consents_insert_own_row"
on public.consents
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "consents_update_own_row"
on public.consents
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "reports_select_public_active"
on public.reports
for select
using (status = 'active');

create policy "reports_insert_authenticated"
on public.reports
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "reports_update_owner"
on public.reports
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "report_confirmations_select_public"
on public.report_confirmations
for select
using (true);

create policy "report_confirmations_insert_own_row"
on public.report_confirmations
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "meetups_select_visible"
on public.meetups
for select
using (visibility in ('public', 'unlisted'));

create policy "meetups_insert_owner"
on public.meetups
for insert
to authenticated
with check (auth.uid() = owner_id);

create policy "meetups_update_owner"
on public.meetups
for update
to authenticated
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);
