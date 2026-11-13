-- AdvisorySiteProject database setup.
-- Safe to run more than once in the Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  full_name text not null,
  email text not null,
  booking_date date not null,
  booking_time time not null,
  notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.bookings enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "Users can read own bookings" on public.bookings;
create policy "Users can read own bookings"
on public.bookings
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can create own bookings" on public.bookings;
create policy "Users can create own bookings"
on public.bookings
for insert
to authenticated
with check (user_id = auth.uid());

create index if not exists profiles_email_idx on public.profiles (email);
create index if not exists bookings_user_id_idx on public.bookings (user_id);
create index if not exists bookings_booking_date_idx on public.bookings (booking_date);
create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_created_at_idx on public.bookings (created_at);
create unique index if not exists bookings_active_slot_unique
on public.bookings (booking_date, booking_time)
where status in ('pending', 'confirmed');

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.bookings'::regclass
      and conname = 'bookings_status_allowed'
  ) then
    alter table public.bookings
      add constraint bookings_status_allowed
      check (status in ('pending', 'confirmed', 'cancelled'));
  end if;
end
$$;

create or replace function public.get_unavailable_booking_slots(
  p_start_date date,
  p_end_date date
)
returns table (booking_date date, booking_time time)
language sql
stable
security definer
set search_path = public
as $$
  select bookings.booking_date, bookings.booking_time
  from public.bookings
  where bookings.status in ('pending', 'confirmed')
    and bookings.booking_date between p_start_date and p_end_date
  order by bookings.booking_date, bookings.booking_time;
$$;

revoke all on function public.get_unavailable_booking_slots(date, date) from public;
grant execute on function public.get_unavailable_booking_slots(date, date) to authenticated;
