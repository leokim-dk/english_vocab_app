import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWords: 0,
    favoriteWords: 0,
    reviewedToday: 0
  });

  useEffect(() => {
    // 현재 사용자 가져오기
    async function getUser() {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          // 사용자의 단어장 통계 가져오기
          const { count: totalWords } = await supabase
            .from('vocabulary')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);
          
          const { count: favoriteWords } = await supabase
            .from('vocabulary')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('favorite', true);
          
          const today = new Date().toISOString().split('T')[0];
          const { count: reviewedToday } = await supabase
            .from('vocabulary')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .gte('last_reviewed', today);
          
          setStats({
            totalWords: totalWords || 0,
            favoriteWords: favoriteWords || 0,
            reviewedToday: reviewedToday || 0
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    getUser();
    
    // 인증 상태 변경 리스너
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md w-full flex items-center justify-center">
        <div className="animate-pulse">로딩 중...</div>
      </div>
    );
  }
  
  if (!user) {
    return null; // AuthForm이 표시됨
  }
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-primary-100 mx-auto rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-primary-600">
            {user.email ? user.email.substring(0, 2).toUpperCase() : 'U'}
          </span>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-800">{user.email}</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary-600">{stats.totalWords}</p>
          <p className="text-sm text-gray-500">총 단어</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-500">{stats.favoriteWords}</p>
          <p className="text-sm text-gray-500">즐겨찾기</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{stats.reviewedToday}</p>
          <p className="text-sm text-gray-500">오늘 학습</p>
        </div>
      </div>
      
      <button
        onClick={handleSignOut}
        className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
      >
        로그아웃
      </button>
    </div>
  );
} 