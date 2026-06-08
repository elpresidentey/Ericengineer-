'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types/database';

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

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editYear, setEditYear] = useState(new Date().getFullYear().toString());

  const categories = [
    'Government Project', 'Security Systems', 'Solar Installation',
    'Facility Management', 'Fire Safety', 'Infrastructure',
    'Commercial', 'Residential', 'Industrial',
  ];

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('year', { ascending: false });
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setIsCreating(false);
    setEditTitle(project.title);
    setEditCategory(project.category);
    setEditDescription(project.description);
    setEditYear(project.year);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setEditTitle('');
    setEditCategory('');
    setEditDescription('');
    setEditYear(new Date().getFullYear().toString());
  };

  const saveProject = async (id?: number) => {
    if (!editTitle || !editCategory || !editDescription || !editYear) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setSaveLoading(true);
    const data = { title: editTitle, category: editCategory, description: editDescription, year: editYear };

    try {
      if (isCreating) {
        const { error } = await supabase.from('projects').insert([data]);
        if (error) throw error;
        showToast('Project created successfully!', 'success');
      } else if (id) {
        const { error } = await supabase.from('projects').update(data).eq('id', id);
        if (error) throw error;
        showToast('Project updated successfully!', 'success');
      }

      cancelEdit();
      fetchProjects();
    } catch (error: any) {
      showToast('Error: ' + error.message, 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const deleteProject = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      showToast('Project deleted successfully!', 'success');
      fetchProjects();
    } catch (error: any) {
      showToast('Error: ' + error.message, 'error');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setEditTitle('');
    setEditCategory('');
    setEditDescription('');
    setEditYear(new Date().getFullYear().toString());
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
            <h1 className="font-serif text-3xl font-bold mb-2">Projects</h1>
            <p className="text-secondary">Showcase completed projects</p>
          </div>
          {!isCreating && !editingId && (
            <button onClick={startCreate} className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90">
              + Add Project
            </button>
          )}
        </div>

        {(isCreating || editingId) && (
          <div className="bg-card rounded-xl p-6 shadow-sm border-2 border-accent mb-6">
            <h2 className="text-xl font-semibold mb-4">{isCreating ? 'Create Project' : 'Edit Project'}</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Project Title *</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    placeholder="e.g., Lagos State Government Building"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Year *</label>
                  <input
                    type="text"
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    placeholder="2024"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent min-h-[120px] resize-y"
                    placeholder="Describe the project..."
                  />
                  <p className="text-xs text-secondary mt-1">{editDescription.length} characters</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => saveProject(editingId || undefined)}
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
          {projects.map((project) => (
            <div key={project.id} className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🏗️</span>
                    <h3 className="font-bold text-xl">{project.title}</h3>
                  </div>
                  <div className="flex gap-3 mb-3">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium">{project.category}</span>
                    <span className="px-3 py-1 bg-background text-secondary text-sm rounded-full">{project.year}</span>
                  </div>
                  <p className="text-secondary text-sm leading-relaxed">{project.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => startEdit(project)} className="px-4 py-2 text-accent border border-accent/30 rounded-lg text-sm font-medium hover:bg-accent/10">Edit</button>
                  <button onClick={() => deleteProject(project.id, project.title)} className="px-4 py-2 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && !isCreating && (
          <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
            <div className="text-5xl mb-4">🏗️</div>
            <h3 className="font-semibold text-lg mb-2">No projects yet</h3>
            <button onClick={startCreate} className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90">Add First Project</button>
          </div>
        )}
      </div>
    </>
  );
}
