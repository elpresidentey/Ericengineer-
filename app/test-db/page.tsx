'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface InverterPackage {
  id: number;
  name: string;
  battery: string;
  without_solar: string;
  with_solar: string;
  featured: boolean;
}

export default function TestDatabase() {
  const [status, setStatus] = useState<string>('Testing connection...');
  const [packages, setPackages] = useState<InverterPackage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    try {
      // Test connection
      const { data, error } = await supabase
        .from('inverter_packages')
        .select('*')
        .order('id');

      if (error) {
        setError(`Error: ${error.message}`);
        setStatus('❌ Connection failed');
        console.error('Supabase error:', error);
        return;
      }

      if (data && data.length > 0) {
        setPackages(data as InverterPackage[]);
        setStatus('✅ Connection successful!');
      } else {
        setStatus('⚠️ Connected but no data found');
        setError('Table exists but is empty. Did you run the SQL bootstrap script?');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Unexpected error: ${errorMessage}`);
      setStatus('❌ Connection failed');
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
        
        <div className="bg-card rounded-xl p-6 border-2 border-border mb-6">
          <h2 className="text-xl font-semibold mb-4">Status: {status}</h2>
          
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-semibold">Error:</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          )}

          <div className="space-y-2 text-sm">
            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
            <p><strong>Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
          </div>
        </div>

        {packages.length > 0 && (
          <div className="bg-card rounded-xl p-6 border-2 border-border">
            <h2 className="text-xl font-semibold mb-4">Inverter Packages ({packages.length})</h2>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-background p-4 rounded-lg">
                  <h3 className="font-bold text-lg">{pkg.name}</h3>
                  <p className="text-sm text-secondary">{pkg.battery}</p>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                    <div>
                      <span className="text-secondary">Without Solar:</span>
                      <span className="font-semibold ml-2">{pkg.without_solar}</span>
                    </div>
                    <div>
                      <span className="text-secondary">With Solar:</span>
                      <span className="font-semibold ml-2">{pkg.with_solar}</span>
                    </div>
                  </div>
                  {pkg.featured && (
                    <span className="inline-block mt-2 text-xs bg-accent text-white px-2 py-1 rounded-full">
                      FEATURED
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
