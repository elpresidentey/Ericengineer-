'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { InverterPackage } from '@/types/database';

// Simple Toast Component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const icon = type === 'success' ? '✓' : '✕';

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
      <div className={`${bgColor} ${textColor} px-6 py-4 rounded-lg border-l-4 shadow-lg flex items-center gap-3 min-w-[300px]`}>
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold">
          {icon}
        </div>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-current opacity-50 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function InverterManagement() {
  const [packages, setPackages] = useState<InverterPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Separate state for each field
  const [editName, setEditName] = useState('');
  const [editBattery, setEditBattery] = useState('');
  const [editWithoutSolar, setEditWithoutSolar] = useState('');
  const [editWithSolar, setEditWithSolar] = useState('');
  const [editFeatured, setEditFeatured] = useState(false);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

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
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (pkg: InverterPackage) => {
    setEditingId(pkg.id);
    setIsCreating(false);
    setEditName(pkg.name);
    setEditBattery(pkg.battery);
    setEditWithoutSolar(pkg.without_solar);
    setEditWithSolar(pkg.with_solar);
    setEditFeatured(pkg.featured);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setEditName('');
    setEditBattery('');
    setEditWithoutSolar('');
    setEditWithSolar('');
    setEditFeatured(false);
  };

  const savePackage = async (id?: number) => {
    if (!editName || !editBattery || !editWithoutSolar || !editWithSolar) {
      showToast('Please fill all fields', 'error');
      return;
    }

    setSaveLoading(true);
    const data = {
      name: editName,
      battery: editBattery,
      without_solar: editWithoutSolar,
      with_solar: editWithSolar,
      featured: editFeatured,
    };

    try {
      if (isCreating) {
        const { error } = await supabase.from('inverter_packages').insert([data]);
        if (error) throw error;
        showToast('Package created successfully!', 'success');
      } else if (id) {
        const { error } = await supabase
          .from('inverter_packages')
          .update(data)
          .eq('id', id);
        if (error) throw error;
        showToast('Package updated successfully!', 'success');
      }

      cancelEdit();
      fetchPackages();
    } catch (error: any) {
      showToast('Error: ' + error.message, 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const deletePackage = async (id: number, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;

    try {
      const { error } = await supabase.from('inverter_packages').delete().eq('id', id);
      if (error) throw error;
      showToast('Package deleted successfully!', 'success');
      fetchPackages();
    } catch (error: any) {
      showToast('Error: ' + error.message, 'error');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setEditName('');
    setEditBattery('');
    setEditWithoutSolar('');
    setEditWithSolar('');
    setEditFeatured(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Inverter Packages</h1>
          <p className="text-secondary">Manage pricing and packages</p>
        </div>
        {!isCreating && !editingId && (
          <button
            onClick={startCreate}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90"
          >
            + Add Package
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <div className="bg-card rounded-xl p-6 shadow-sm border-2 border-accent mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {isCreating ? 'Create Package' : 'Edit Package'}
          </h2>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Package Name *</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  placeholder="e.g., 3.5KVA Inverter Package"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Battery *</label>
                <input
                  type="text"
                  value={editBattery}
                  onChange={(e) => setEditBattery(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  placeholder="e.g., 200AH Battery"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price Without Solar *</label>
                <input
                  type="text"
                  value={editWithoutSolar}
                  onChange={(e) => setEditWithoutSolar(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  placeholder="₦450,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price With Solar *</label>
                <input
                  type="text"
                  value={editWithSolar}
                  onChange={(e) => setEditWithSolar(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  placeholder="₦750,000"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 bg-accent/5 p-4 rounded-lg">
              <input
                type="checkbox"
                id="featured"
                checked={editFeatured}
                onChange={(e) => setEditFeatured(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                ⭐ Mark as featured
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => savePackage(editingId || undefined)}
                disabled={saveLoading}
                className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50"
              >
                {saveLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={cancelEdit}
                disabled={saveLoading}
                className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-background"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Packages List */}
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                  🔋 {pkg.name}
                  {pkg.featured && (
                    <span className="text-xs bg-accent text-white px-3 py-1 rounded-full">
                      POPULAR
                    </span>
                  )}
                </h3>
                <p className="text-secondary text-sm">{pkg.battery}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(pkg)}
                  className="px-4 py-2 text-accent border border-accent/30 rounded-lg text-sm font-medium hover:bg-accent/10"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePackage(pkg.id, pkg.name)}
                  className="px-4 py-2 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-lg border border-border">
                <div className="text-secondary text-sm mb-1">Without Solar</div>
                <div className="font-bold text-2xl">{pkg.without_solar}</div>
              </div>
              <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                <div className="text-secondary text-sm mb-1">With Solar ☀️</div>
                <div className="text-accent font-bold text-2xl">{pkg.with_solar}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {packages.length === 0 && !isCreating && (
        <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
          <div className="text-5xl mb-4">🔋</div>
          <h3 className="font-semibold text-lg mb-2">No packages yet</h3>
          <button
            onClick={startCreate}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90"
          >
            Add First Package
          </button>
        </div>
      )}
      </div>
    </>
  );
}
