-- Create submissions table for contact forms and quote requests
create table submissions (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('contact', 'quote')),
  name text not null,
  email text not null,
  phone text,
  service text,
  message text,
  area text,
  description text,
  timeline text,
  budget text,
  status text default 'new' check (status in ('new', 'viewed', 'responded')),
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table submissions enable row level security;

-- Allow public to insert submissions (from contact/quote forms)
create policy "Allow public insert" on submissions
  for insert to public with check (true);

-- Allow admin to view all submissions
create policy "Allow public select" on submissions  
  for select to public using (true);

-- Allow admin to update and delete
create policy "Allow public update delete" on submissions
  for all to public using (true) with check (true);

-- Create index for efficient filtering
create index idx_submissions_type on submissions(type);
create index idx_submissions_status on submissions(status);
create index idx_submissions_created_at on submissions(created_at desc);
