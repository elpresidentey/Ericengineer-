'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Service } from '@/types/database';

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
        <button onClick={onClose} className="flex-shrink-0 text-current opacity-50 hover:opacity-100">
          ✕
        </button>
      </div>
    </div>
  );
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Separate state for each field
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIcon, setEditIcon] = useState('');

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('id');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setIsCreating(false);
    setEditTitle(service.title);
    setEditDescription(service.description);
    setEditIcon(service.icon || '');
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
    setEditIcon('');
  };

  const saveService = async (id?: number) => {
    if (!editTitle || !editDescription) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setSaveLoading(true);
    const data = { title: editTitle, description: editDescription, icon: editIcon };

    try {
      if (isCreating) {
        const { error } = await supabase.from('services').insert([data]);
        if (error) throw error;
        showToast('Service created successfully!', 'success');
      } else if (id) {
        const { error } = await supabase.from('services').update(data).eq('id', id);
        if (error) throw error;
        showToast('Service updated successfully!', 'success');
      }

      cancelEdit();
      fetchServices();
    } catch (error: any) {
      showToast('Error: ' + error.message, 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const deleteService = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;

    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      showToast('Service deleted successfully!', 'success');
      fetchServices();
    } catch (error: any) {
      showToast('Error: ' + error.message, 'error');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setEditTitle('');
    setEditDescription('');
    setEditIcon('');
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
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold mb-2">Services</h1>
            <p className="text-secondary">Manage your service offerings</p>
          </div>
          {!isCreating && !editingId && (
            <button
              onClick={startCreate}
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90"
            >
              + Add Service
            </button>
          )}
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingId) && (
          <div className="bg-card rounded-xl p-6 shadow-sm border-2 border-accent mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {isCreating ? 'Create Service' : 'Edit Service'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Service Title *</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  placeholder="e.g., Electrical Installation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent min-h-[100px] resize-y"
                  placeholder="Detailed description..."
                />
                <p className="text-xs text-secondary mt-1">{editDescription.length} characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Icon Emoji (Optional)</label>
                <input
                  type="text"
                  value={editIcon}
                  onChange={(e) => setEditIcon(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  placeholder="⚡"
                  maxLength={2}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => saveService(editingId || undefined)}
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

        {/* Services List */}
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3 flex-1">
                  {service.icon && <span className="text-3xl">{service.icon}</span>}
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-1">{service.title}</h3>
                    <p className="text-secondary text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => startEdit(service)}
                    className="px-4 py-2 text-accent border border-accent/30 rounded-lg text-sm font-medium hover:bg-accent/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteService(service.id, service.title)}
                    className="px-4 py-2 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && !isCreating && (
          <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="font-semibold text-lg mb-2">No services yet</h3>
            <button
              onClick={startCreate}
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90"
            >
              Add First Service
            </button>
          </div>
        )}
      </div>
    </>
  );
}
