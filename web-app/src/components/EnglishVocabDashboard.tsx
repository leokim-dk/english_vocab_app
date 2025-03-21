import React, { useState } from "react";
import { 
  Book, 
  Globe, 
  User, 
  CheckCircle, 
  Search,
  Repeat,
  Star,
  Trash2,
  LogOut
} from "lucide-react";
import { supabase } from '@/lib/supabase';
import { Vocabulary } from '@/lib/supabase';
import { checkVocabularyTable } from '@/utils/mockVocabulary';
import { addMockVocabulary } from '@/utils/mockVocabulary';
import { LandingPage } from '@/components/LandingPage';

interface EnglishVocabDashboardProps {
  user: any;
  onNewWord: () => void;
  vocabularies: Vocabulary[];
  refreshVocabularies: () => void;
  loading: boolean;
  onLogout?: () => Promise<void>;
}

export function EnglishVocabDashboard({
  user,
  onNewWord,
  vocabularies = [],
  refreshVocabularies,
  loading = false,
  onLogout
}: EnglishVocabDashboardProps) {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState<'en' | 'ko'>('en');
  const [targetLang, setTargetLang] = useState<'en' | 'ko'>('ko');
  const [translating, setTranslating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState('all'); // all, favorites
  const [searchTerm, setSearchTerm] = useState("");

  // 언어 감지 및 자동 설정
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    setInputText(text);
    
    // 한국어가 포함되어 있으면 한국어 -> 영어로 설정
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text)) {
      setSourceLang('ko');
      setTargetLang('en');
    } else {
      // 그 외에는 영어 -> 한국어로 설정
      setSourceLang('en');
      setTargetLang('ko');
    }
  }

  // 엔터키 처리 함수 추가
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Ctrl+Enter 또는 Command+Enter를 누르면 번역 실행
    if ((e.key === 'Enter' && (e.ctrlKey || e.metaKey)) || (e.key === 'Enter' && !e.shiftKey)) {
      e.preventDefault(); // 줄바꿈 방지
      handleTranslate(e);
    }
  }

  async function handleTranslate(e: React.FormEvent) {
    e.preventDefault();
    
    if (!inputText.trim()) {
      setError('번역할 텍스트를 입력해주세요');
      return;
    }
    
    setTranslating(true);
    setError('');
    
    try {
      const result = await translateText(inputText, sourceLang, targetLang);
      setTranslatedText(result);
    } catch (err) {
      console.error('Translation error:', err);
      setError('번역 중 오류가 발생했습니다');
    } finally {
      setTranslating(false);
    }
  }

  async function handleSave() {
    if (!user) {
      setError('단어를 저장하려면 로그인이 필요합니다');
      return;
    }
    
    if (!inputText.trim() || !translatedText.trim()) {
      setError('번역된 텍스트가 없습니다');
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      // Verify the table exists first
      const tableExists = await checkVocabularyTable();
      if (!tableExists) {
        throw new Error('단어장 테이블이 존재하지 않습니다. 관리자에게 문의하거나 데이터베이스 설정을 확인하세요.');
      }
      
      // 한국어인지 영어인지 감지
      const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(inputText);
      
      const englishWord = isKorean ? translatedText : inputText;
      const koreanWord = isKorean ? inputText : translatedText;
      
      // 중복 체크 - 같은 영어 단어나 한국어 단어가 이미 있는지 확인
      const { data: existingEnglishWords, error: englishSearchError } = await supabase
        .from('vocabulary')
        .select('id, english, korean')
        .eq('user_id', user.id)
        .eq('english', englishWord);
        
      if (englishSearchError) {
        throw englishSearchError;
      }
      
      const { data: existingKoreanWords, error: koreanSearchError } = await supabase
        .from('vocabulary')
        .select('id, english, korean')
        .eq('user_id', user.id)
        .eq('korean', koreanWord);
        
      if (koreanSearchError) {
        throw koreanSearchError;
      }
      
      // 중복된 단어가 있으면 에러 메시지 표시
      if ((existingEnglishWords && existingEnglishWords.length > 0) || 
          (existingKoreanWords && existingKoreanWords.length > 0)) {
        const duplicateWord = existingEnglishWords?.[0] || existingKoreanWords?.[0];
        throw new Error(`"${duplicateWord.english} / ${duplicateWord.korean}"이(가) 이미 단어장에 있습니다.`);
      }
      
      // 새 단어 생성
      const newWord = {
        english: englishWord,
        korean: koreanWord,
        favorite: false,
        user_id: user.id,
      };
      
      // Supabase에 저장
      const { error } = await supabase
        .from('vocabulary')
        .insert([newWord]);
        
      if (error) {
        // Handle the specific case when the table doesn't exist
        if (error.message && error.message.includes("relation") && error.message.includes("does not exist")) {
          throw new Error('단어장 테이블이 아직 설정되지 않았습니다. 관리자에게 문의하세요.');
        }
        throw error;
      }
      
      // 폼 초기화
      setInputText('');
      setTranslatedText('');
      
      // 단어장 새로고침
      onNewWord();
      
    } catch (err: any) {
      console.error('Save error:', err);
      setError(err.message || '단어 저장 중 오류가 발생했습니다');
    } finally {
      setSaving(false);
    }
  }

  async function toggleFavorite(id: number, currentValue: boolean) {
    try {
      const { error: updateError } = await supabase
        .from('vocabulary')
        .update({ favorite: !currentValue })
        .eq('id', id);
        
      if (updateError) throw updateError;
      
      // 단어장 새로고침
      refreshVocabularies();
    } catch (err: any) {
      console.error('Error updating favorite:', err);
      setError('즐겨찾기 토글 중 오류가 발생했습니다');
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
      
      // 단어장 새로고침
      refreshVocabularies();
    } catch (err: any) {
      console.error('Error deleting word:', err);
      setError('단어 삭제 중 오류가 발생했습니다');
    }
  }

  async function handleAddMockData() {
    try {
      await addMockVocabulary(user.id);
      refreshVocabularies();
    } catch (err) {
      console.error('Error adding mock data:', err);
      setError('샘플 단어 추가 중 오류가 발생했습니다');
    }
  }

  // 검색 및 필터링된 단어 목록
  const filteredVocabularies = vocabularies
    .filter(word => {
      // 필터 적용
      if (filter === 'favorites' && !word.favorite) {
        return false;
      }
      
      // 검색어 적용
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          word.english.toLowerCase().includes(searchLower) ||
          word.korean.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });

  // 내부 로그아웃 함수
  const handleLogout = async () => {
    try {
      if (onLogout) {
        await onLogout();
      } else {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // 로그인하지 않은 경우 랜딩 페이지 표시
  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white p-4 lg:p-6">
      {/* 앱 컨테이너 - 아이패드 스타일 적용 */}
      <div className="w-full h-full bg-white overflow-hidden flex flex-col lg:flex-row">
        {/* 프로필 컬럼 */}
        <div className="w-full lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-100 p-6 flex flex-col bg-white">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {user.email?.charAt(0).toUpperCase() || <User className="w-6 h-6 text-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">{user.email}</h2>
                <button 
                  onClick={handleLogout}
                  className="ml-2 p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-gray-100 transition-all"
                  title="로그아웃"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500">한국어 ↔ 영어</p>
            </div>
          </div>

          <nav className="space-y-2 mb-8">
            <button className="w-full flex items-center px-4 py-3 text-left rounded-xl font-medium text-blue-600 bg-blue-50 border border-blue-100">
              <Book className="mr-3 h-5 w-5" />
              <span>단어장</span>
            </button>
            <button className="w-full flex items-center px-4 py-3 text-left rounded-xl text-gray-700 hover:bg-gray-50 transition-all">
              <Globe className="mr-3 h-5 w-5" />
              <span>번역</span>
            </button>
          </nav>

          <div className="mt-6 mb-6 lg:mt-auto p-5 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-3">
              <strong className="font-medium text-blue-600">{vocabularies.length}</strong> 개의 단어를 저장했습니다
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-200'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setFilter('favorites')}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  filter === 'favorites' 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-200'
                }`}
              >
                즐겨찾기
              </button>
            </div>
          </div>
        </div>

        {/* 번역 컬럼 */}
        <div className="w-full lg:w-2/4 p-6 flex flex-col bg-white">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">단어 번역</h1>
            <p className="text-gray-500">단어나 문장을 번역하고 단어장에 저장하세요</p>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {sourceLang === 'ko' ? '한국어' : '영어'}
                </span>
              </div>
              <div className="relative">
                <textarea 
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full h-32 p-4 rounded-xl border border-gray-200 bg-white text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="번역할 단어나 문장을 입력하세요..."
                />
                <p className="mt-1 text-xs text-gray-500">Enter 키를 누르면 자동으로 번역됩니다. Shift+Enter로 줄바꿈.</p>
              </div>
            </div>

            <div className="flex justify-center my-5">
              <button 
                onClick={handleTranslate}
                disabled={translating || !inputText.trim()}
                className="rounded-full h-12 w-12 p-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-all"
              >
                {translating ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <Repeat className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {targetLang === 'ko' ? '한국어' : '영어'}
                </span>
              </div>
              <div className="relative">
                <textarea 
                  value={translatedText}
                  className="w-full h-32 p-4 rounded-xl border border-blue-100 bg-blue-50 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="번역 결과가 여기에 표시됩니다..."
                  readOnly
                />
              </div>
            </div>
            
            {error && (
              <div className="mb-5 p-4 rounded-xl text-sm bg-red-50 text-red-800 border border-red-100">
                {error}
              </div>
            )}

            <div className="mt-5 flex space-x-3">
              <button
                onClick={handleSave}
                disabled={saving || translating || !translatedText}
                className="flex-1 py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 flex items-center justify-center transition-all"
              >
                {saving ? (
                  <span className="flex items-center">
                    <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    저장 중...
                  </span>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" /> 단어장에 저장
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 단어장 컬럼 */}
        <div className="w-full lg:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-100 p-6 flex flex-col bg-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">내 단어장</h2>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="단어 검색..." 
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-8 mb-2 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
                <span className="text-blue-600">로딩 중...</span>
              </div>
            </div>
          ) : filteredVocabularies.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-5">
              <div className="bg-blue-50 text-blue-600 p-4 rounded-full mb-4">
                <Book className="h-8 w-8" />
              </div>
              <p className="text-gray-700 font-medium mb-2">단어장이 비어있습니다</p>
              <p className="text-sm text-gray-500 mb-6">단어를 번역하고 저장해보세요!</p>
              <button
                onClick={handleAddMockData}
                className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
              >
                샘플 단어 추가하기
              </button>
              <div className="mt-6 text-xs text-gray-400">
                {user && <p>사용자 ID: {user.id}</p>}
                <p>총 단어 개수: {vocabularies.length}</p>
                <p>필터링된 단어 개수: {filteredVocabularies.length}</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-3 max-h-[500px] pr-1">
              {filteredVocabularies.map((word) => (
                <div 
                  key={word.id} 
                  className={`
                    p-4 rounded-xl border transition-all duration-200
                    ${word.favorite 
                      ? "border-amber-200 bg-amber-50" 
                      : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50"}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{word.english}</h3>
                      <p className="text-sm text-gray-600">{word.korean}</p>
                    </div>
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => toggleFavorite(word.id, word.favorite)}
                        className="p-1.5 rounded-full hover:bg-white text-gray-400 hover:text-amber-500 transition-all"
                      >
                        <Star className={`h-4 w-4 ${word.favorite ? "fill-amber-500 text-amber-500" : ""}`} />
                      </button>
                      <button 
                        onClick={() => handleDelete(word.id)}
                        className="p-1.5 rounded-full hover:bg-white text-gray-400 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    {new Date(word.created_at).toLocaleDateString('ko-KR')}
                    <span className="mx-1">•</span>
                    {word.review_count === 0 ? '학습 안함' : `${word.review_count}회 학습`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

async function translateText(text: string, from: 'en' | 'ko', to: 'en' | 'ko'): Promise<string> {
  try {
    // 텍스트가 비어있으면 빈 문자열 반환
    if (!text.trim()) return '';
    
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        from,
        to
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Translation failed');
    }
    
    return data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
} 