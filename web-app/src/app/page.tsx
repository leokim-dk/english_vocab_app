'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { LandingPage } from "@/components/LandingPage";
import { EnglishVocabDashboard } from "@/components/EnglishVocabDashboard";
import { Vocabulary } from '@/lib/supabase';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [vocabLoading, setVocabLoading] = useState(false);

  useEffect(() => {
    // 현재 로그인한 사용자 확인
    async function getInitialUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (user) {
          fetchVocabularies(user.id);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    }

    getInitialUser();

    // 인증 상태 변경 리스너
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const newUser = session?.user || null;
        setUser(newUser);
        if (newUser) {
          fetchVocabularies(newUser.id);
        } else {
          setVocabularies([]);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function fetchVocabularies(userId: string) {
    setVocabLoading(true);
    try {
      const { data, error } = await supabase
        .from('vocabulary')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      // 안전한 타입 변환
      const typedData = (data || []) as unknown as Vocabulary[];
      setVocabularies(typedData);
    } catch (error) {
      console.error('Error fetching vocabularies:', error);
    } finally {
      setVocabLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  function handleNewWord() {
    if (user) {
      fetchVocabularies(user.id);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main>
      {!user ? (
        <LandingPage />
      ) : (
        <EnglishVocabDashboard 
          user={user} 
          onNewWord={handleNewWord}
          vocabularies={vocabularies}
          refreshVocabularies={() => user && fetchVocabularies(user.id)}
          loading={vocabLoading}
          onLogout={handleLogout}
        />
      )}
    </main>
  );
}
