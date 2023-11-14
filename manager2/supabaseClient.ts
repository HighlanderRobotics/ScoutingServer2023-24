
import dotenv from 'dotenv';
dotenv.config();
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import sqlite from 'sqlite3';

sqlite.verbose();

const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided!');
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabase };
