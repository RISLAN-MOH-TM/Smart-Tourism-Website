import fs from 'fs';
import path from 'path';
import { Enquiry, EnquiryStatus } from './types';
import { supabase, isSupabaseConfigured } from './supabase';

const dataFilePath = path.join(process.cwd(), 'data', 'enquiries.json');

// Ensure data file exists with default array
function ensureDataFile(): void {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2), 'utf-8');
  }
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  ensureDataFile();
  try {
    // If Supabase is configured, attempt to fetch from Supabase
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Also persist/sync to JSON file
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
        return data as Enquiry[];
      }
    }

    // Read from local JSON file
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    const enquiries: Enquiry[] = JSON.parse(fileContent);
    return enquiries.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (err) {
    console.error('Error reading enquiries:', err);
    return [];
  }
}

export async function createEnquiry(
  input: Omit<Enquiry, 'id' | 'status' | 'created_at'>
): Promise<Enquiry> {
  ensureDataFile();
  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...input,
    status: 'New',
    created_at: new Date().toISOString(),
  };

  // 1. Store in JSON file
  try {
    const raw = fs.readFileSync(dataFilePath, 'utf-8');
    const list: Enquiry[] = JSON.parse(raw);
    list.unshift(newEnquiry);
    fs.writeFileSync(dataFilePath, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving to enquiries.json:', err);
  }

  // 2. If Supabase is configured, also insert into Supabase database
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('enquiries').insert([
        {
          id: newEnquiry.id,
          name: newEnquiry.name,
          email: newEnquiry.email,
          destination: newEnquiry.destination,
          message: newEnquiry.message,
          status: newEnquiry.status,
          phone: newEnquiry.phone || null,
          travel_date: newEnquiry.travel_date || null,
          guests: newEnquiry.guests || 1,
          created_at: newEnquiry.created_at,
        },
      ]);
    } catch (dbErr) {
      console.error('Supabase insert failed, safely saved to JSON:', dbErr);
    }
  }

  return newEnquiry;
}

export async function updateEnquiryStatus(
  id: string,
  newStatus: EnquiryStatus
): Promise<Enquiry | null> {
  ensureDataFile();
  let updated: Enquiry | null = null;

  try {
    const raw = fs.readFileSync(dataFilePath, 'utf-8');
    const list: Enquiry[] = JSON.parse(raw);
    const index = list.findIndex((e) => e.id === id);

    if (index !== -1) {
      list[index].status = newStatus;
      updated = list[index];
      fs.writeFileSync(dataFilePath, JSON.stringify(list, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error updating enquiries.json:', err);
  }

  // Update in Supabase if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase
        .from('enquiries')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
    } catch (dbErr) {
      console.error('Supabase update failed:', dbErr);
    }
  }

  return updated;
}

