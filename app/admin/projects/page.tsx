'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types/database';

interface ProjectFormProps {
  id?: number;
  title: string;
  category: string;
  description: string;
  year: string;
  isCreating: boolean;
  saveLoading: boolean;
  onTitleChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onSave: (id?: number) => Promise<void>;
  onCancel: () => void;
}

const categories = [
  'Government Project',
  'Security Systems',
  'Solar Installation',
  'Facility Management',
  'Fire Safety',
  'Infrastructure',
  'Commercial',
  'Residential',
  'Industrial',
];

const ProjectForm = ({
  id,
  title,
  category,
  description,
  year,
  isCreating,
  saveLoading,
  onTitleChange,
  onCategoryChange,
  onDescriptionChange,
  onYearChange,
  onSave,
  onCancel,
}: ProjectFormProps) => (
  <div className="space-y-4">
    <div className="grid md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-primary mb-2">
          Project Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          placeholder="e.g., Lagos State Government Building"
          autoComplete="off"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Category *
        </label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Year Completed *
        </label>
        <input
          type="text"
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          placeholder="2024"
          autoComplete="off"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-primary mb-2">
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors min-h-[120px] resize-y"
          placeholder="Describe the project scope, deliverables, and achievements..."
        />
        <p className="text-xs text-secondary mt-1">
          {description.length} characters
        </p>
      </div>
    </div>

    <div className="flex gap-3 pt-2">
      <button
        onClick={() => onSave(id)}
        disabled={saveLoading}
        className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saveLoading ? 'Saving...' : isCreating ? 'Create Project' : 'Save Changes'}
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

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [saveLoading, setSaveLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('year', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Error loading projects. Check console for details.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();
  }, [fetchProjects]);

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setIsCreating(false);
    setTitle(project.title);
    setCategory(project.category);
    setDescription(project.description);
    setYear(project.year);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setTitle('');
    setCategory('');
    setDescription('');
    setYear(new Date().getFullYear().toString());
  };

  const handleSave = async (id?: number) => {
    if (!title || !category || !description || !year) {
      alert('Please fill in all required fields');
      return;
    }

    setSaveLoading(true);
    const formData = { title, category, description, year };

    try {
      if (isCreating) {
        const { error } = await supabase.from('projects').insert([formData]);
        if (error) throw error;
        alert('Project created successfully!');
      } else if (id) {
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', id);
        if (error) throw error;
        alert('Project updated successfully!');
      }

      setEditingId(null);
      setIsCreating(false);
      setTitle('');
      setCategory('');
      setDescription('');
      setYear(new Date().getFullYear().toString());
      fetchProjects();
    } catch (error: unknown) {
      console.error('Error saving project:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error: ${errorMessage}`);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: number, projectTitle: string) => {
    if (!confirm(`Delete "${projectTitle}"? This cannot be undone.`)) return;

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      alert('Project deleted successfully!');
      fetchProjects();
    } catch (error: unknown) {
      console.error('Error deleting project:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setTitle('');
    setCategory('');
    setDescription('');
    setYear(new Date().getFullYear().toString());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Projects</h1>
          <p className="text-secondary">
            Showcase your completed projects and success stories
          </p>
        </div>
        {!isCreating && !editingId && (
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            + Add Project
          </button>
        )}
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="bg-card rounded-xl p-6 shadow-sm border-2 border-accent mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
          <ProjectForm
            title={title}
            category={category}
            description={description}
            year={year}
            isCreating={isCreating}
            saveLoading={saveLoading}
            onTitleChange={setTitle}
            onCategoryChange={setCategory}
            onDescriptionChange={setDescription}
            onYearChange={setYear}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            {editingId === project.id ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
                <ProjectForm
                  id={project.id}
                  title={title}
                  category={category}
                  description={description}
                  year={year}
                  isCreating={false}
                  saveLoading={saveLoading}
                  onTitleChange={setTitle}
                  onCategoryChange={setCategory}
                  onDescriptionChange={setDescription}
                  onYearChange={setYear}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">ðŸ—ï¸</span>
                      <h3 className="font-bold text-xl text-primary">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex gap-3 mb-3">
                      <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 bg-background text-secondary text-sm rounded-full">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-secondary text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-4 py-2 text-accent border border-accent/30 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
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

      {projects.length === 0 && !isCreating && (
        <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
          <div className="text-5xl mb-4">ðŸ—ï¸</div>
          <h3 className="font-semibold text-lg mb-2">No projects yet</h3>
          <p className="text-secondary mb-4">
            Start showcasing your work by adding your first project
          </p>
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Add First Project
          </button>
        </div>
      )}
    </div>
  );
}
