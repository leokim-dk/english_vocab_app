import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 싱글톤 인스턴스 생성
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

export const createClient = () => {
  if (supabaseInstance) return supabaseInstance;
  
  supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

// 싱글톤 인스턴스 사용
export const supabase = createClient();

export interface Vocabulary {
  id: number;
  created_at: string;
  user_id: string;
  english: string;
  korean: string;
  favorite: boolean;
  last_reviewed: string | null;
  review_count: number;
}

export type NewVocabulary = Omit<Vocabulary, 'id' | 'created_at' | 'user_id' | 'last_reviewed' | 'review_count'> & {
  user_id?: string;
}; 