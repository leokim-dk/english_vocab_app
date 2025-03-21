import { supabase } from '@/lib/supabase';
import { NewVocabulary } from '@/lib/supabase';

// Sample vocabulary words for testing
const mockVocabularyData = [
  { english: 'apple', korean: '사과' },
  { english: 'banana', korean: '바나나' },
  { english: 'computer', korean: '컴퓨터' },
  { english: 'book', korean: '책' },
  { english: 'coffee', korean: '커피' },
  { english: 'water', korean: '물' },
  { english: 'friend', korean: '친구' },
  { english: 'family', korean: '가족' },
  { english: 'school', korean: '학교' },
  { english: 'car', korean: '자동차' }
];

/**
 * Checks if the vocabulary table exists
 * @returns A promise that resolves to true if the table exists, false otherwise
 */
export async function checkVocabularyTable() {
  try {
    const { error } = await supabase.from('vocabulary').select('id').limit(1);
    
    if (error && error.message.includes('relation "public.vocabulary" does not exist')) {
      console.error('Vocabulary table does not exist. Please create it in Supabase dashboard.');
      return false;
    }
    
    return !error;
  } catch (err) {
    console.error('Error checking vocabulary table:', err);
    return false;
  }
}

/**
 * Adds mock vocabulary words to the database for the specified user
 * @param userId The user ID to associate with the mock words
 * @returns A promise with the result of the operation 
 */
export async function addMockVocabulary(userId: string) {
  if (!userId) {
    throw new Error('User ID is required to add mock vocabulary');
  }

  // First, check if the vocabulary table exists
  const tableExists = await checkVocabularyTable();
  if (!tableExists) {
    throw new Error('단어장 테이블이 존재하지 않습니다. 관리자에게 문의하세요.');
  }

  try {
    // Create vocabulary entries with the user ID
    const newWords: NewVocabulary[] = mockVocabularyData.map(word => ({
      english: word.english,
      korean: word.korean,
      favorite: Math.random() > 0.7, // Randomly mark some as favorites
      user_id: userId
    }));

    // Insert the words into the database
    const { data, error } = await supabase
      .from('vocabulary')
      .insert(newWords);

    if (error) throw error;
    
    console.log('Added mock vocabulary words successfully');
    return { success: true, count: newWords.length };
  } catch (error) {
    console.error('Error adding mock vocabulary:', error);
    return { success: false, error };
  }
} 