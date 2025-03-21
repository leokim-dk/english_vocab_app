import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Vocabulary } from '@/lib/supabase';
import { addMockVocabulary, checkVocabularyTable } from '@/utils/mockVocabulary';
import { vocabularyTableSetupSQL } from '@/utils/databaseHelper';

interface VocabularyListProps {
  user: any;
  refreshTrigger: number;
}

export function VocabularyList({ user, refreshTrigger }: VocabularyListProps) {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, favorites

  useEffect(() => {
    if (user) {
      fetchVocabulary();
    }
  }, [user, refreshTrigger]);

  async function fetchVocabulary() {
    setLoading(true);
    setError('');

    try {
      // First verify the table exists
      const tableExists = await checkVocabularyTable();
      if (!tableExists) {
        setError('vocabulary_table_missing');
        setVocabularies([]);
        setLoading(false);
        return;
      }

      let query = supabase
        .from('vocabulary')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (filter === 'favorites') {
        query = query.eq('favorite', true);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) {
        if (fetchError.message && fetchError.message.includes('does not exist')) {
          // 테이블이 없는 경우
          setError('단어장 테이블이 없습니다. 관리자에게 문의하세요.');
        } else {
          setError('단어장을 불러오는데 실패했습니다.');
        }
      } else {
        // 타입 안전하게 변환
        if (data) {
          // 데이터가 있는 경우 Vocabulary 배열로 처리
          setVocabularies(data as unknown as Vocabulary[]);
        } else {
          // 데이터가 없으면 빈 배열
          setVocabularies([]);
        }
      }
    } catch (err: any) {
      console.error('Error fetching vocabulary:', err);
      // Don't show database errors to users
      setError(err.message || '단어장을 불러오는 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  }

  async function toggleFavorite(id: number, currentValue: boolean) {
    try {
      const { error: updateError } = await supabase
        .from('vocabulary')
        .update({ favorite: !currentValue })
        .eq('id', id);
        
      if (updateError) throw updateError;
      
      // 로컬 상태 업데이트
      setVocabularies(vocabularies.map(word => 
        word.id === id ? { ...word, favorite: !currentValue } : word
      ));
    } catch (err: any) {
      console.error('Error updating favorite:', err);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('이 단어를 삭제하시겠습니까?')) {
      return;
    }
    
    try {
      const { error: deleteError } = await supabase
        .from('vocabulary')
        .delete()
        .eq('id', id);
        
      if (deleteError) throw deleteError;
      
      // 로컬 상태 업데이트
      setVocabularies(vocabularies.filter(word => word.id !== id));
    } catch (err: any) {
      console.error('Error deleting word:', err);
    }
  }

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm w-full border border-blue-100">
        <p className="text-center text-gray-500">로그인이 필요합니다</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full border border-blue-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-blue-800">내 단어장</h2>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'all' 
                ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'favorites' 
                ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            즐겨찾기
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-blue-600">로딩 중...</div>
        </div>
      ) : error === 'vocabulary_table_missing' ? (
        <div className="text-center p-8 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-red-500 mb-2">데이터베이스 테이블이 존재하지 않습니다</p>
          <p className="text-sm text-gray-600 mb-4">
            단어장 테이블이 아직 생성되지 않았습니다. 
            다음 SQL 코드를 Supabase 대시보드에서 실행해주세요.
          </p>
          <div className="bg-gray-800 text-green-400 p-4 text-xs text-left rounded overflow-auto max-h-60 mb-4">
            <pre>{vocabularyTableSetupSQL}</pre>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(vocabularyTableSetupSQL);
              alert('SQL 코드가 클립보드에 복사되었습니다.');
            }}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            SQL 복사하기
          </button>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-800 rounded-md border border-red-100">
          {error}
        </div>
      ) : vocabularies.length === 0 ? (
        <div className="text-center p-8 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-gray-500 mb-2">단어장이 비어있습니다</p>
          <p className="text-sm text-gray-400">단어를 번역하고 저장해보세요!</p>
          <button
            onClick={async () => {
              try {
                await addMockVocabulary(user.id);
                fetchVocabulary(); // Refresh the vocabulary list
              } catch (err) {
                console.error('Error adding mock data:', err);
                setError('샘플 단어 추가 중 오류가 발생했습니다');
              }
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            샘플 단어 추가하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2">
          {vocabularies.map(word => (
            <div key={word.id} className="p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow border border-blue-100">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{word.english}</h3>
                  <p className="text-gray-600">{word.korean}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleFavorite(word.id, word.favorite)}
                    className="text-gray-400 hover:text-amber-500"
                  >
                    {word.favorite ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(word.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
                <span>
                  {new Date(word.created_at).toLocaleDateString('ko-KR')}
                </span>
                <span>
                  {word.review_count === 0 ? '학습 안함' : `${word.review_count}회 학습`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 