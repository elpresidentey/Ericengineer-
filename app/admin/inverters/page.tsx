'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { InverterPackage } from '@/types/database';

interface PackageFormProps {
  id?: number;
  name: string;
  battery: string;
  withoutSolar: string;
  withSolar: string;
  featured: boolean;
  isCreating: boolean;
  saveLoading: boolean;
  onNameChange: (value: string) => void;
  onBatteryChange: (value: string) => void;
  onWithoutSolarChange: (value: string) => void;
  onWithSolarChange: (value: string) => void;
  onFeaturedChange: (value: boolean) => void;
  onSave: (id?: number) => Promise<void>;
  onCancel: () => void;
}

const PackageForm = ({
  id,
  name,
  battery,
  withoutSolar,
  withSolar,
  featured,
  isCreating,
  saveLoading,
  onNameChange,
  onBatteryChange,
  onWithoutSolarChange,
  onWithSolarChange,
  onFeaturedChange,
  onSave,
  onCancel,
}: PackageFormProps) => (
  <div className="space-y-4">
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Package Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          placeholder="e.g., 3.5KVA Inverter Package"
          autoComplete="off"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Battery Specification *
        </label>
        <input
          type="text"
          value={battery}
          onChange={(e) => onBatteryChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          placeholder="e.g., 200AH Battery"
          autoComplete="off"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Price Without Solar *
        </label>
        <input
          type="text"
          value={withoutSolar}
          onChange={(e) => onWithoutSolarChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          placeholder="₦450,000"
          autoComplete="off"
        />
        <p className="text-xs text-secondary mt-1">
          Include currency symbol and formatting
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Price With Solar *
        </label>
        <input
          type="text"
          value={withSolar}
          onChange={(e) => onWithSolarChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          placeholder="₦750,000"
          autoComplete="off"
        />
        <p className="text-xs text-secondary mt-1">
          Include currency symbol and formatting
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2 bg-accent/5 p-4 rounded-lg border border-accent/20">
      <input
        type="checkbox"
        id={`featured-${id || 'new'}`}
        checked={featured}
        onChange={(e) => onFeaturedChange(e.target.checked)}
        className="w-4 h-4 rounded border-accent text-accent focus:ring-accent"
      />
      <label htmlFor={`featured-${id || 'new'}`} className="text-sm font-medium cursor-pointer">
        ⭐ Mark as featured (shows &ldquo;POPULAR&rdquo; badge)
      </label>
    </div>

    <div className="flex gap-3 pt-2">
      <button
        onClick={() => onSave(id)}
        disabled={saveLoading}
        className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saveLoading ? 'Saving...' : isCreating ? 'Create Package' : 'Save Changes'}
      </button>
      <button
        onClick={onCancel}
        disabled={saveLoading}
        className="px-6 py-3 border border-border text-secondary rounded-lg font-medium hover:border-primary/30 hover:text-primary transition-colors disabled:opacity-50"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default function InverterManagement() {
  const [packages, setPackages] = useState<InverterPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [battery, setBattery] = useState('');
  const [withoutSolar, setWithoutSolar] = useState('');
  const [withSolar, setWithSolar] = useState('');
  const [featured, setFeatured] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const fetchPackages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('inverter_packages')
        .select('*')
        .order('id');

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      alert('Error loading packages. Check console for details.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPackages();
  }, [fetchPackages]);

  const handleEdit = (pkg: InverterPackage) => {
    setEditingId(pkg.id);
    setIsCreating(false);
    setName(pkg.name);
    setBattery(pkg.battery);
    setWithoutSolar(pkg.without_solar);
    setWithSolar(pkg.with_solar);
    setFeatured(pkg.featured);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setName('');
    setBattery('');
    setWithoutSolar('');
    setWithSolar('');
    setFeatured(false);
  };

  const handleSave = async (id?: number) => {
    if (!name || !battery || !withoutSolar || !withSolar) {
      alert('Please fill in all required fields');
      return;
    }

    setSaveLoading(true);
    const formData = {
      name,
      battery,
      without_solar: withoutSolar,
      with_solar: withSolar,
      featured,
    };

    try {
      if (isCreating) {
        const { error } = await supabase.from('inverter_packages').insert([formData]);
        if (error) throw error;
        alert('Package created successfully!');
      } else if (id) {
        const { error } = await supabase
          .from('inverter_packages')
          .update(formData)
          .eq('id', id);
        if (error) throw error;
        alert('Package updated successfully!');
      }

      setEditingId(null);
      setIsCreating(false);
      setName('');
      setBattery('');
      setWithoutSolar('');
      setWithSolar('');
      setFeatured(false);
      fetchPackages();
    } catch (error: unknown) {
      console.error('Error saving package:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error: ${errorMessage}`);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: number, pkgName: string) => {
    if (!confirm(`Delete "${pkgName}"? This cannot be undone.`)) return;

    try {
      const { error } = await supabase.from('inverter_packages').delete().eq('id', id);
      if (error) throw error;
      alert('Package deleted successfully!');
      fetchPackages();
    } catch (error: unknown) {
      console.error('Error deleting package:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setName('');
    setBattery('');
    setWithoutSolar('');
    setWithSolar('');
    setFeatured(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Inverter Packages</h1>
          <p className="text-secondary">
            Manage inverter packages and pricing displayed on the website
          </p>
        </div>
        {!isCreating && !editingId && (
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            + Add Package
          </button>
        )}
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="bg-card rounded-xl p-6 shadow-sm border-2 border-accent mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Package</h2>
          <PackageForm
            name={name}
            battery={battery}
            withoutSolar={withoutSolar}
            withSolar={withSolar}
            featured={featured}
            isCreating={isCreating}
            saveLoading={saveLoading}
            onNameChange={setName}
            onBatteryChange={setBattery}
            onWithoutSolarChange={setWithoutSolar}
            onWithSolarChange={setWithSolar}
            onFeaturedChange={setFeatured}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Packages List */}
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            {editingId === pkg.id ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Edit Package</h2>
                <PackageForm
                  id={pkg.id}
                  name={name}
                  battery={battery}
                  withoutSolar={withoutSolar}
                  withSolar={withSolar}
                  featured={featured}
                  isCreating={false}
                  saveLoading={saveLoading}
                  onNameChange={setName}
                  onBatteryChange={setBattery}
                  onWithoutSolarChange={setWithoutSolar}
                  onWithSolarChange={setWithSolar}
                  onFeaturedChange={setFeatured}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-primary mb-1 flex items-center gap-2">
                      🔋 {pkg.name}
                      {pkg.featured && (
                        <span className="text-xs bg-accent text-white px-3 py-1 rounded-full font-medium">
                          POPULAR
                        </span>
                      )}
                    </h3>
                    <p className="text-secondary text-sm">{pkg.battery}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="px-4 py-2 text-accent border border-accent/30 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id, pkg.name)}
                      className="px-4 py-2 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-background p-4 rounded-lg border border-border">
                    <div className="text-secondary text-sm mb-1">Without Solar</div>
                    <div className="text-primary font-bold text-2xl">
                      {pkg.without_solar}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-4 rounded-lg border border-accent/20">
                    <div className="text-secondary text-sm mb-1">With Solar ☀️</div>
                    <div className="text-accent font-bold text-2xl">
                      {pkg.with_solar}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {packages.length === 0 && !isCreating && (
        <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
          <div className="text-5xl mb-4">🔋</div>
          <h3 className="font-semibold text-lg mb-2">No packages yet</h3>
          <p className="text-secondary mb-4">
            Get started by adding your first inverter package
          </p>
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Add First Package
          </button>
        </div>
      )}

      {/* Tips Section */}
      {packages.length > 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2 text-primary">💡 Tips</h3>
          <ul className="text-secondary text-sm space-y-2">
            <li>• Use format &ldquo;₦450,000&rdquo; for prices (with Naira symbol and commas)</li>
            <li>• Mark your most popular package as featured</li>
            <li>• Changes appear on the website immediately after saving</li>
          </ul>
        </div>
      )}
    </div>
  );
}
