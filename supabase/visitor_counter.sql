-- 1. Create the visitor_counter table
create table if not exists visitor_counter (
  id int primary key,
  count bigint not null default 0
);

-- 2. Seed with initial row (id = 1, count = 0)
insert into visitor_counter (id, count)
values (1, 0)
on conflict (id) do nothing;

-- 3. Enable Row Level Security (RLS)
alter table visitor_counter enable row level security;

-- 4. Create public SELECT policy only (no insert/update/delete policies for anon)
drop policy if exists "Allow public read access" on visitor_counter;
create policy "Allow public read access"
  on visitor_counter
  for select
  using (true);

-- 5. Function to increment visits safely (security definer bypasses RLS for the update)
create or replace function increment_visits()
returns bigint
language sql
security definer
set search_path = public
as $$
  update visitor_counter
  set count = count + 1
  where id = 1
  returning count;
$$;

-- 6. Grant execute permissions on function to anon (and authenticated)
grant execute on function increment_visits() to anon;
grant execute on function increment_visits() to authenticated;
