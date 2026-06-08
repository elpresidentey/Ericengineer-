'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Testimonial } from '@/types/database';

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
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold">{icon}</div>
        <div className="flex-1"><p className="font-medium">{message}</p></div>
        <button onClick={onClose} className="flex-shrink-0 text-current opacity-50 hover:opacity-100">✕</button>
      </div>
    </div>
  );
}

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const [editName, setEditName] = useState('');
  const [editPosition, setEditPosition] = useState('');
  const [editMessage, setEditMessage] = useState('');

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setIsCreating(false);
    setEditName(testimonial.name);
    setEditPosition(testimonial.position);
    setEditMessage(testimonial.message);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setEditName('');
    setEditPosition('');
    setEditMessage('');
  };

  const saveTestimonial = async (id?: number) => {
    if (!editName || !editPosition || !editMessage) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setSaveLoading(true);
    const data = { name: editName, position: editPosition, message: editMessage };

    try {
      if (isCreating) {
        const { error } = await supabase.from('testimonials').insert([data]);
        if (error) throw error;
        showToast('Testimonial created successfully!', 'success');
      } else if (id) {
        const { error } = await supabase.from('testimonials').update(data).eq('id', id);
        if (error) throw error;
        showToast('Testimonial updated successfully!', 'success');
      }

      cancelEdit();
      fetchTestimonials();
    } catch (error: any) {
      showToast('Error: ' + error.message, 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const deleteTestimonial = async (id: number, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      showToast('Testimonial deleted successfully!', 'success');
      fetchTestimonials();
    } catch (error: any) {
      showToast('Error: ' + error.message, 'error');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setEditName('');
    setEditPosition('');
    setEditMessage('');
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
            <h1 className="font-serif text-3xl font-bold mb-2">Testimonials</h1>
            <p className="text-secondary">Manage client feedback and reviews</p>
          </div>
          {!isCreating && !editingId && (
            <button onClick={startCreate} className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90">
              + Add Testimonial
            </button>
          )}
        </div>

        {(isCreating || editingId) && (
          <div className="bg-card rounded-xl p-6 shadow-sm border-2 border-accent mb-6">
            <h2 className="text-xl font-semibold mb-4">{isCreating ? 'Create Testimonial' : 'Edit Testimonial'}</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Client Name *</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    placeholder="e.g., Engr. Michael Adebayo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Position / Company *</label>
                  <input
                    type="text"
                    value={editPosition}
                    onChange={(e) => setEditPosition(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    placeholder="e.g., Facility Manager, Lagos State"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Testimonial Message *</label>
                  <textarea
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent min-h-[120px] resize-y"
                    placeholder="What did the client say?"
                  />
                  <p className="text-xs text-secondary mt-1">{editMessage.length} characters</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => saveTestimonial(editingId || undefined)}
                  disabled={saveLoading}
                  className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50"
                >
                  {saveLoading ? 'Saving...' : 'Save'}
                </button>
                <button onClick={cancelEdit} disabled={saveLoading} className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-background">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-secondary text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="bg-background p-4 rounded-lg border-l-4 border-accent">
                    <p className="text-secondary leading-relaxed italic">&ldquo;{testimonial.message}&rdquo;</p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => startEdit(testimonial)} className="px-4 py-2 text-accent border border-accent/30 rounded-lg text-sm font-medium hover:bg-accent/10">Edit</button>
                  <button onClick={() => deleteTestimonial(testimonial.id, testimonial.name)} className="px-4 py-2 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && !isCreating && (
          <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="font-semibold text-lg mb-2">No testimonials yet</h3>
            <button onClick={startCreate} className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90">Add First Testimonial</button>
          </div>
        )}
      </div>
    </>
  );
}
