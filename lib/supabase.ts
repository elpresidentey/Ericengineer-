import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Create a lazy-loaded singleton client
let client: SupabaseClient | null = null;
let initAttempted = false;

function getSupabaseClient(): SupabaseClient | null {
  // If we've already attempted to initialize, return the client (or null if failed)
  if (initAttempted) {
    return client;
  }

  initAttempted = true;

  // On server-side or build time, return null to prevent errors
  if (typeof window === 'undefined') {
    return null;
  }

  // On client-side, try to initialize if we have credentials
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn('Supabase environment variables not configured. Admin features will not work.');
    return null;
  }

  client = createClient(url, key);
  return client;
}

// Export lazy getter instead of direct client
export function getSupabase(): SupabaseClient {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error(
      'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
    );
  }
  return client;
}

// For backward compatibility, also export a proxy that initializes on first use
export const supabase = new Proxy({} as SupabaseClient, {
  get(target: any, prop: string | symbol) {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error(
        'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
      );
    }
    return Reflect.get(client, prop);
  },
});
