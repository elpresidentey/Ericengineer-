import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Create a lazy-loaded singleton client
let client: SupabaseClient | null = null;

function initializeSupabase(): SupabaseClient {
  // On server-side or build time, return a dummy client to prevent errors
  if (typeof window === 'undefined') {
    const dummyUrl = 'https://placeholder.supabase.co';
    const dummyKey = 'placeholder-key';
    return createClient(dummyUrl, dummyKey);
  }

  // On client-side, ensure we have a properly initialized client
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error(
        'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
      );
    }

    client = createClient(url, key);
  }

  return client;
}

// Export the client with proper lazy initialization
export const supabase = initializeSupabase() as SupabaseClient;
