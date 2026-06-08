'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface InverterPackage {
  id: number;
  name: string;
  battery: string;
  without_solar: string;
  with_solar: string;
  featured: boolean;
}

export default function InverterManagement() {
  const [packages, setPackages] = useState<InverterPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    battery: '',
    without_solar: '',
    with_solar: '',
    featured: false,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('inverter_packages')
        .select('*')
        .order('id');

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg: InverterPackage) => {
    setEditingId(pkg.id);
    setFormData({
      name: pkg.name,
      battery: pkg.battery,
      without_solar: pkg.without_solar,
      with_solar: pkg.with_solar,
      featured: pkg.featured,
    });
  };

  const handleSave = async (id: number) => {
    try {
      const { error } = await supabase
        .from('inverter_packages')
        .update(formData)
        .eq('id', id);

      if (error) throw error;

      setEditingId(null);
      fetchPackages();
      alert('Package updated successfully!');
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Error updating package');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: '',
      battery: '',
      without_solar: '',
      with_solar: '',
      featured: false,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="font-serif text-3xl font-bold">Manage Inverter Packages</h1>
            <Link
              href="/admin"
              className="text-accent hover:text-accent/80 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-card rounded-xl p-6 shadow-sm border border-border"
            >
              {editingId === pkg.id ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Package Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Battery Specification
                      </label>
                      <input
                        type="text"
                        value={formData.battery}
                        onChange={(e) =>
                          setFormData({ ...formData, battery: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Price Without Solar
                      </label>
                      <input
                        type="text"
                        value={formData.without_solar}
                        onChange={(e) =>
                          setFormData({ ...formData, without_solar: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                        placeholder="₦450,000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Price With Solar
                      </label>
                      <input
                        type="text"
                        value={formData.with_solar}
                        onChange={(e) =>
                          setFormData({ ...formData, with_solar: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                        placeholder="₦750,000"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`featured-${pkg.id}`}
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <label htmlFor={`featured-${pkg.id}`} className="text-sm text-secondary">
                      Mark as featured (Popular)
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave(pkg.id)}
                      className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 border border-border text-secondary rounded-lg font-medium hover:border-primary/30 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-primary mb-1">
                        {pkg.name}
                        {pkg.featured && (
                          <span className="ml-3 text-xs bg-accent text-white px-2 py-1 rounded-full">
                            POPULAR
                          </span>
                        )}
                      </h3>
                      <p className="text-secondary text-sm">{pkg.battery}</p>
                    </div>
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="px-4 py-2 text-accent border border-accent/30 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-background p-4 rounded-lg">
                      <div className="text-secondary mb-1">Without Solar</div>
                      <div className="text-primary font-bold text-xl">
                        {pkg.without_solar}
                      </div>
                    </div>
                    <div className="bg-background p-4 rounded-lg">
                      <div className="text-secondary mb-1">With Solar</div>
                      <div className="text-primary font-bold text-xl">
                        {pkg.with_solar}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-accent/10 border border-accent/20 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2 text-primary">💡 Tips</h3>
          <ul className="text-secondary text-sm space-y-2">
            <li>• Use format "₦450,000" for prices (with Naira symbol and commas)</li>
            <li>• Only one package should be marked as featured at a time</li>
            <li>• Changes are reflected on the website immediately after saving</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
