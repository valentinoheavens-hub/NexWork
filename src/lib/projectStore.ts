import { supabase } from './supabase';

export interface Milestone {
  id: string;
  title: string;
  date: string;
  status: 'Not Started' | 'In Progress' | 'Under Review' | 'Approved' | 'Done';
}

export interface Project {
  id: string;
  user_id: string;
  client_id?: string | null;
  name: string;
  client_name: string;
  description?: string;
  status: string;
  progress: number;
  health: string;
  budget: number;
  spent: number;
  billing_method: string;
  due_date?: string | null;
  milestones: Milestone[];
  created_at: string;
  updated_at: string;
}

export type ProjectInsert = Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'>;

export const projectStore = {
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) { console.error(error); return []; }
    return (data ?? []) as Project[];
  },

  async getById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (error) { console.error(error); return null; }
    return data as Project;
  },

  async create(project: ProjectInsert): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    if (error) { console.error(error); return null; }
    return data as Project;
  },

  async update(id: string, patch: Partial<ProjectInsert>): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    if (error) { console.error(error); return null; }
    return data as Project;
  },

  async remove(id: string): Promise<void> {
    await supabase.from('projects').delete().eq('id', id);
  },
};
