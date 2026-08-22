-- ============================================================================
-- ANUPAM PAINTS — pricing for the Specification Generator
-- Run once in Supabase > SQL Editor. Safe to re-run.
-- ============================================================================

-- Price and volume solids per product key.
-- The keys match PRODUCTS in src/data/coating-systems.ts (EPZP, ZNEP, IZS …).
create table if not exists coating_pricing (
  product_key     text primary key,
  product_name    text,
  price_per_litre numeric(10,2) default 0,
  volume_solids   numeric(5,1),              -- overrides the value in code when set
  updated_at      timestamptz default now()
);

-- Cost of reaching the surface, per square metre, excluding the coating.
-- This is what makes a durable system cheaper over 25 years.
create table if not exists coating_access_cost (
  access_key   text primary key,
  label        text,
  cost_per_m2  numeric(10,2) default 0,
  updated_at   timestamptz default now()
);

insert into coating_access_cost (access_key, label, cost_per_m2) values
  ('ground',   'Ground level, open access',      0),
  ('scaffold', 'Scaffold required',              0),
  ('rope',     'Rope access or high structure',  0),
  ('shutdown', 'Production shutdown required',   0),
  ('live',     'Live road, rail or airside',     0)
on conflict (access_key) do nothing;

-- Public read so the specification generator can use the figures.
-- Writes stay restricted to the service role, which is what the admin panel uses.
alter table coating_pricing     enable row level security;
alter table coating_access_cost enable row level security;

drop policy if exists "public read pricing" on coating_pricing;
create policy "public read pricing" on coating_pricing for select using (true);

drop policy if exists "public read access cost" on coating_access_cost;
create policy "public read access cost" on coating_access_cost for select using (true);

-- Check what landed
select 'coating_pricing' as table_name, count(*) from coating_pricing
union all
select 'coating_access_cost', count(*) from coating_access_cost;
