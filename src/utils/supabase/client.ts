import { createClient as createSupabaseClient } from '@supabase/supabase-js';
// Extension shoho path nishchit korun
import { projectId, publicAnonKey } from './info.tsx'; 

let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    );
  }
  return supabaseClient;
}