-- ============================================================================
-- ANUPAM PAINTS — painting labour rates
-- Run once in Supabase > SQL Editor. Safe to re-run.
-- Edited afterwards at /admin/labour
-- ============================================================================

create table if not exists painting_labour_rates (
  rate_key      text primary key,
  label         text,
  rate_low      numeric(10,2) default 0,   -- rupees per sq ft, lower end
  rate_high     numeric(10,2) default 0,   -- rupees per sq ft, upper end
  updated_at    timestamptz default now()
);

insert into painting_labour_rates (rate_key, label, rate_low, rate_high) values
  ('interior_paint',  'Interior painting, per sq ft',            0, 0),
  ('exterior_paint',  'Exterior painting, per sq ft',            0, 0),
  ('putty',           'Putty application, per sq ft',            0, 0),
  ('surface_repair',  'Scraping and repair, damaged walls',      0, 0),
  ('wood_metal',      'Doors, windows and grills, per sq ft',    0, 0)
on conflict (rate_key) do nothing;

alter table painting_labour_rates enable row level security;

drop policy if exists "public read labour" on painting_labour_rates;
create policy "public read labour" on painting_labour_rates for select using (true);

select rate_key, label, rate_low, rate_high from painting_labour_rates order by rate_key;
