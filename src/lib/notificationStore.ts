import { supabase } from './supabase';

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message?: string | null;
  read: boolean;
  data?: Record<string, unknown>;
  created_at: string;
}

export const notificationStore = {
  async getAll(): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) return [];
    return (data ?? []) as Notification[];
  },

  async markRead(id: string): Promise<void> {
    await supabase.from('notifications').update({ read: true }).eq('id', id);
  },

  async markAllRead(userId: string): Promise<void> {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);
  },

  async remove(id: string): Promise<void> {
    await supabase.from('notifications').delete().eq('id', id);
  },
};
