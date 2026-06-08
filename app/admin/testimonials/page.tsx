'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Testimonial } from '@/types/database';

interface TestimonialFormProps {
  id?: number;
  name: string;
  position: string;
  message: string;
  isCreating: boolean;
  saveLoading: boolean;
  onNameChange: (value: string) => void;
  onPositionChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onSave: (id?: number) => Promise<void>;
  onCancel: () => void;
}

const TestimonialForm = ({
  id,
  name,
  position,
  message,
  isCreating,
  saveLoading,
  onNameChange,
  onPositionChange,
  onMessageChange,
  onSave,
  onCancel,
}: TestimonialFormProps) => (
  <div className="space-y-4">
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Client Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          placeholder="e.g., Engr. Michael Adebayo"
          autoComplete="off"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Position / Company *
        </label>
        <input
          type="text"
          value={position}
          onChange={(e) => onPositionChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          placeholder="e.g., Facility Manager, Lagos State Government"
          autoComplete="off"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-primary mb-2">
          Testimonial Message *
        </label>
        <textarea
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors min-h-[120px] resize-y"
          placeholder="What did the client say about your service?"
        />
        <p className="text-xs text-secondary mt-1">
          {message.length} characters
        </p>
      </div>
    </div>

    <div className="flex gap-3 pt-2">
      <button
        onClick={() => onSave(id)}
        disabled={saveLoading}
        className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saveLoading ? 'Saving...' : isCreating ? 'Create Testimonial' : 'Save Changes'}
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

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      alert('Error loading testimonials. Check console for details.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setIsCreating(false);
    setName(testimonial.name);
    setPosition(testimonial.position);
    setMessage(testimonial.message);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setName('');
    setPosition('');
    setMessage('');
  };

  const handleSave = async (id?: number) => {
    if (!name || !position || !message) {
      alert('Please fill in all required fields');
      return;
    }

    setSaveLoading(true);
    const formData = { name, position, message };

    try {
      if (isCreating) {
        const { error } = await supabase.from('testimonials').insert([formData]);
        if (error) throw error;
        alert('Testimonial created successfully!');
      } else if (id) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', id);
        if (error) throw error;
        alert('Testimonial updated successfully!');
      }

      setEditingId(null);
      setIsCreating(false);
      setName('');
      setPosition('');
      setMessage('');
      fetchTestimonials();
    } catch (error: unknown) {
      console.error('Error saving testimonial:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error: ${errorMessage}`);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: number, clientName: string) => {
    if (!confirm(`Delete testimonial from "${clientName}"? This cannot be undone.`)) return;

    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      alert('Testimonial deleted successfully!');
      fetchTestimonials();
    } catch (error: unknown) {
      console.error('Error deleting testimonial:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setName('');
    setPosition('');
    setMessage('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Testimonials</h1>
          <p className="text-secondary">
            Manage client feedback and reviews displayed on the website
          </p>
        </div>
        {!isCreating && !editingId && (
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            + Add Testimonial
          </button>
        )}
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="bg-card rounded-xl p-6 shadow-sm border-2 border-accent mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Testimonial</h2>
          <TestimonialForm
            name={name}
            position={position}
            message={message}
            isCreating={isCreating}
            saveLoading={saveLoading}
            onNameChange={setName}
            onPositionChange={setPosition}
            onMessageChange={setMessage}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Testimonials List */}
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            {editingId === testimonial.id ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Edit Testimonial</h2>
                <TestimonialForm
                  id={testimonial.id}
                  name={name}
                  position={position}
                  message={message}
                  isCreating={false}
                  saveLoading={saveLoading}
                  onNameChange={setName}
                  onPositionChange={setPosition}
                  onMessageChange={setMessage}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-primary">
                          {testimonial.name}
                        </h3>
                        <p className="text-secondary text-sm">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                    <div className="bg-background p-4 rounded-lg border-l-4 border-accent">
                      <p className="text-secondary leading-relaxed italic">
                        &ldquo;{testimonial.message}&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="px-4 py-2 text-accent border border-accent/30 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id, testimonial.name)}
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

      {testimonials.length === 0 && !isCreating && (
        <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
          <div className="text-5xl mb-4">ðŸ’¬</div>
          <h3 className="font-semibold text-lg mb-2">No testimonials yet</h3>
          <p className="text-secondary mb-4">
            Start building trust by adding client reviews and feedback
          </p>
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Add First Testimonial
          </button>
        </div>
      )}

      {/* Tips Section */}
      {testimonials.length > 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2 text-primary">ðŸ’¡ Tips</h3>
          <ul className="text-secondary text-sm space-y-2">
            <li>â€¢ Include client&apos;s full name and title for credibility</li>
            <li>â€¢ Specific feedback is more impactful than generic praise</li>
            <li>â€¢ Always get permission before publishing client testimonials</li>
            <li>â€¢ Recent testimonials help build current trust with prospects</li>
          </ul>
        </div>
      )}
    </div>
  );
}
