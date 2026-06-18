import { supabase } from './supabase';

export interface Profile {
  id: string;
  email?: string | null;
  full_name?: string | null;
  agency_name?: string | null;
  currency_code?: string | null;
  onboarding_completed?: boolean;
  services?: string[];
  created_at?: string;
  updated_at?: string;
}

export const profileStore = {
  async get(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) return null;
    return data as Profile;
  },

  async update(userId: string, patch: Partial<Omit<Profile, 'id' | 'created_at'>>): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update(patch)
      .eq('id', userId)
      .select()
      .single();
    if (error) return null;
    return data as Profile;
  },
};
