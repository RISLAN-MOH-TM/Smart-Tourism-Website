-- =========================================================================
-- Smart Tourism Sri Lanka - Supabase Database Schema & Security Policies
-- =========================================================================

-- 1. Create Enquiries Table
create table if not exists public.enquiries (
    id text primary key,
    name text not null,
    email text not null,
    destination text not null,
    message text not null,
    status text not null default 'New' check (status in ('New', 'Contacted', 'Closed')),
    phone text,
    travel_date text,
    guests integer default 1,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 2. Create Index on status and created_at for fast admin filtering
create index if not exists idx_enquiries_status on public.enquiries (status);
create index if not exists idx_enquiries_created_at on public.enquiries (created_at desc);

-- 3. Enable Row Level Security (RLS)
alter table public.enquiries enable row level security;

-- 4. Security Policies:

-- Policy A: Allow public anonymous visitors to submit enquiries
drop policy if exists "Allow public to insert enquiries" on public.enquiries;
create policy "Allow public to insert enquiries"
on public.enquiries
for insert
to anon, authenticated
with check (true);

-- Policy B: Allow only authenticated admin users to read enquiries
-- (Protects customer email, name, and message details from public inspection)
drop policy if exists "Allow authenticated admins to read enquiries" on public.enquiries;
create policy "Allow authenticated admins to read enquiries"
on public.enquiries
for select
to authenticated
using (true);

-- Policy C: Allow only authenticated admin users to update enquiry status
drop policy if exists "Allow authenticated admins to update enquiry status" on public.enquiries;
create policy "Allow authenticated admins to update enquiry status"
on public.enquiries
for update
to authenticated
using (true)
with check (true);

-- Policy D: Allow only authenticated admin users to delete enquiries if needed
drop policy if exists "Allow authenticated admins to delete enquiries" on public.enquiries;
create policy "Allow authenticated admins to delete enquiries"
on public.enquiries
for delete
to authenticated
using (true);

-- 5. Seed sample records (Initial demo entries)
insert into public.enquiries (id, name, email, destination, message, status, phone, travel_date, guests, created_at)
values
('enq-1001', 'Sarah Jenkins', 'sarah.jenkins@example.com', 'Sigiriya', 'Hello, we are planning a 4-day cultural exploration trip around Sigiriya and Dambulla in early December. Could you provide a private guide and driver recommendation?', 'New', '+44 7700 900123', '2026-12-05', 2, now() - interval '2 hours'),
('enq-1002', 'Kenji Sato', 'kenji.sato@example.jp', 'Ella', 'We would like to book the scenic train journey to Ella and do hiking in Little Adam''s Peak. Do you offer Japanese language guiding or materials?', 'Contacted', '+81 90 1234 5678', '2026-12-18', 3, now() - interval '1 day'),
('enq-1003', 'David Mueller', 'david.m@example.de', 'Galle Fort', 'Looking for boutique colonial heritage villas in Galle Fort and a private walking tour of the ramparts.', 'Closed', '+49 151 23456789', '2026-11-25', 2, now() - interval '3 days'),
('enq-1004', 'Li Wei', 'li.wei@example.cn', 'Mirissa', 'We want to do whale watching in Mirissa and spend 3 days relaxing at the south coast beaches. Please suggest the best season and boat tour operators.', 'New', '+86 138 0000 1234', '2027-01-10', 4, now() - interval '5 hours')
on conflict (id) do nothing;

