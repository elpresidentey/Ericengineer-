'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Service } from '@/types/database';

interface ServiceFormProps {
  id?: number;
  title: string;
  description: string;
  icon: string;
  isCreating: boolean;
  saveLoading: boolean;
  onSave: (id?: number) => Promise<void>;
  onCancel: () => void;
}

const ServiceForm = ({
  id,
  title,
  description,
  icon,
  isCreating,
  saveLoading,
  onSave,
  onCancel,
}: ServiceFormProps) => (
  <div className="space-y-4">
    <div className="grid md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-primary mb-2">
          Service Title *
        </label>
        <input
          type="text"
          value={title}
          readOnly
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          placeholder="e.g., Electrical Installation"
          autoComplete="off"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-primary mb-2">
          Description *
        </label>
        <textarea
          value={description}
          readOnly
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors min-h-[100px] resize-y"
          placeholder="Detailed description of the service..."
        />
        <p className="text-xs text-secondary mt-1">
          {description.length} characters
        </p>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-primary mb-2">
          Icon Emoji (Optional)
        </label>
        <input
          type="text"
          value={icon}
          readOnly
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          placeholder="⚡ (Paste an emoji)"
          maxLength={2}
          autoComplete="off"
        />
      </div>
    </div>

    <div className="flex gap-3 pt-2">
      <button
        onClick={() => onSave(id)}
        disabled={saveLoading}
        className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saveLoading ? 'Saving...' : isCreating ? 'Create Service' : 'Save Changes'}
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

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  const fetchServices = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('id');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Error loading services. Check console for details.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchServices();
  }, [fetchServices]);

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setIsCreating(false);
    setTitle(service.title);
    setDescription(service.description);
    setIcon(service.icon || '');
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setTitle('');
    setDescription('');
    setIcon('');
  };

  const handleSave = async (id?: number) => {
    if (!title || !description) {
      alert('Please fill in all required fields');
      return;
    }

    setSaveLoading(true);
    const formData = { title, description, icon };
    
    try {
      if (isCreating) {
        const { error } = await supabase.from('services').insert([formData]);
        if (error) throw error;
        alert('Service created successfully!');
      } else if (id) {
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', id);
        if (error) throw error;
        alert('Service updated successfully!');
      }

      setEditingId(null);
      setIsCreating(false);
      setTitle('');
      setDescription('');
      setIcon('');
      fetchServices();
    } catch (error: unknown) {
      console.error('Error saving service:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error: ${errorMessage}`);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: number, serviceTitle: string) => {
    if (!confirm(`Delete "${serviceTitle}"? This cannot be undone.`)) return;

    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      alert('Service deleted successfully!');
      fetchServices();
    } catch (error: unknown) {
      console.error('Error deleting service:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setTitle('');
    setDescription('');
    setIcon('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Services</h1>
          <p className="text-secondary">
            Manage your service offerings displayed on the website
          </p>
        </div>
        {!isCreating && !editingId && (
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            + Add Service
          </button>
        )}
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="bg-card rounded-xl p-6 shadow-sm border-2 border-accent mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Service</h2>
          <ServiceForm
            title={title}
            description={description}
            icon={icon}
            isCreating={isCreating}
            saveLoading={saveLoading}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            {editingId === service.id ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Edit Service</h2>
                <ServiceForm
                  id={service.id}
                  title={title}
                  description={description}
                  icon={icon}
                  isCreating={false}
                  saveLoading={saveLoading}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    {service.icon && (
                      <span className="text-3xl">{service.icon}</span>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-primary mb-1">
                        {service.title}
                      </h3>
                      <p className="text-secondary text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(service)}
                      className="px-4 py-2 text-accent border border-accent/30 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id, service.title)}
                      className="px-4 py-2 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {services.length === 0 && !isCreating && (
        <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="font-semibold text-lg mb-2">No services yet</h3>
          <p className="text-secondary mb-4">
            Get started by adding your first service
          </p>
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Add First Service
          </button>
        </div>
      )}
    </div>
  );
}
