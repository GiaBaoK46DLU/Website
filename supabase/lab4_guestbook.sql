-- Lab 4 (Supabase) - Guestbook schema for the current portfolio project
-- Run this script in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 50),
  message text not null check (char_length(message) between 1 and 500),
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

comment on table public.guestbook_entries is 'Guestbook messages for portfolio website';

create index if not exists guestbook_entries_created_at_idx
  on public.guestbook_entries (created_at desc);

alter table public.guestbook_entries enable row level security;

drop policy if exists "Guestbook is viewable by everyone" on public.guestbook_entries;
create policy "Guestbook is viewable by everyone"
  on public.guestbook_entries
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Guestbook is insertable by everyone" on public.guestbook_entries;
create policy "Guestbook is insertable by everyone"
  on public.guestbook_entries
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Guestbook is updatable by everyone" on public.guestbook_entries;
create policy "Guestbook is updatable by everyone"
  on public.guestbook_entries
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Guestbook is deletable by everyone" on public.guestbook_entries;
create policy "Guestbook is deletable by everyone"
  on public.guestbook_entries
  for delete
  to anon, authenticated
  using (true);
