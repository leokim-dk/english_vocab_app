import React, { useState } from 'react';
import { Repeat } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { NewVocabulary } from '@/lib/supabase';
import { checkVocabularyTable } from '@/utils/mockVocabulary';

interface TranslationFormProps {
  user: any;
  onNewWord: () => void;
  onTranslate: (text: string, from: 'en' | 'ko', to: 'en' | 'ko') => Promise<string>;
  onSave: () => void;
}

export function TranslationForm({ user, onNewWord, onTranslate, onSave }: TranslationFormProps) {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState<'en' | 'ko'>('en');
  const [targetLang, setTargetLang] = useState<'en' | 'ko'>('ko');
  const [translating, setTranslating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleTranslate(e: React.FormEvent) {
    e.preventDefault();
    
    if (!inputText.trim()) {
      setError('번역할 텍스트를 입력해주세요');
      return;
    }
    
    setTranslating(true);
    setError('');
    
    try {
      const result = await onTranslate(inputText, sourceLang, targetLang);
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
      const newWord: NewVocabulary = {
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
      
      // 부모 컴포넌트에 알림
      onNewWord();
      
    } catch (err: any) {
      console.error('Save error:', err);
      setError(err.message || '단어 저장 중 오류가 발생했습니다');
    } finally {
      setSaving(false);
    }
  }
  
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
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full border border-blue-100">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">단어 번역하기</h2>
      
      <form onSubmit={handleTranslate} className="space-y-4">
        <div>
          <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-1">
            번역할 텍스트 {sourceLang === 'ko' ? '(한국어)' : '(영어)'}
          </label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-blue-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="번역할 단어나 문장을 입력하세요..."
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{sourceLang === 'ko' ? '한국어' : '영어'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span className="text-sm text-gray-500">{targetLang === 'ko' ? '한국어' : '영어'}</span>
          </div>
          
          <button
            type="submit"
            disabled={translating || !inputText.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
          >
            {translating ? '번역 중...' : '번역하기'}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md text-sm border border-red-100">
          {error}
        </div>
      )}
      
      {translatedText && (
        <div className="mt-6">
          <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              번역 결과 {targetLang === 'ko' ? '(한국어)' : '(영어)'}
            </h3>
            <p className="text-lg">{translatedText}</p>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving || translating}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              {saving ? '저장 중...' : '단어장에 저장'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 