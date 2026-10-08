-- ============================================================================
-- ANUPAM PAINTS — visitor analytics
-- Run once in Supabase > SQL Editor. Safe to re-run.
-- ============================================================================

create table if not exists page_views (
  id          bigserial primary key,
  visitor_id  text,            -- random, per browser. Not a person, not an IP.
  session_id  text,            -- random, per visit
  path        text,
  referrer    text,
  source      text,            -- google, facebook, direct, instagram…
  utm_source  text,
  utm_medium  text,
  utm_campaign text,
  device      text,            -- mobile | tablet | desktop
  browser     text,
  country     text,            -- from Vercel's edge header, country only
  screen_w    int,
  is_bot      boolean default false,
  created_at  timestamptz default now()
);

create index if not exists page_views_created_idx on page_views (created_at desc);
create index if not exists page_views_visitor_idx on page_views (visitor_id);
create index if not exists page_views_path_idx    on page_views (path);

-- Writes happen server-side with the service role, which bypasses RLS.
-- So RLS is enabled with NO policies: the public key can neither read nor
-- write. Without this, anyone could read your traffic data or flood the
-- table with fake rows.
alter table page_views enable row level security;

select 'page_views' as table_name, count(*) from page_views;
