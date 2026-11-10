-- Run in the Supabase SQL editor (or via `supabase db push`) on a fresh
-- project. Backs the account / products / purchase history / owned products
-- pages: a product is something a user can buy (a report, a database
-- tier, ...); a purchase links a user to a product they own.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  -- Where the gated content lives once owned, e.g. a storage path or
  -- external URL to the report/data file. Null means "contact to access".
  content_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  purchased_at timestamptz not null default now(),
  unique (user_id, product_id)
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.purchases enable row level security;

-- Profiles: a user can read and update only their own row.
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Products: the catalog is public (needed for the marketing/purchase page).
create policy "products_select_all" on public.products
  for select using (true);

-- Purchases: a user can see only their own purchase history.
create policy "purchases_select_own" on public.purchases
  for select using (auth.uid() = user_id);

-- Auto-create a profile row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
