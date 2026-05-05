import { createClient as createSupabaseClient } from '@supabase/supabase-js';
// .tsx extension ti mention kora dorkar jate Vite confuse na hoy
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