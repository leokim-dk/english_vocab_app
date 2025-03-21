import { NextResponse } from 'next/server';

// 마지막 요청 시간을 추적하기 위한 변수
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 최소 1초 간격으로 요청

// Together AI API 엔드포인트 URL
const API_URL = 'https://api.together.xyz/v1/chat/completions';
// Together AI API 키를 환경 변수에서 가져옴
const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

// 디버그 로그
console.log('[Server] Starting translation service with Together AI');
console.log(`[Server] API URL: ${API_URL}`);
console.log(`[Server] Together API Key available: ${TOGETHER_API_KEY ? 'Yes' : 'No'}`);

// API 요청 간 딜레이를 위한 유틸리티 함수
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Together AI를 사용하여 번역하는 함수
async function translateWithTogetherAI(text: string, from: string, to: string): Promise<string> {
  console.log(`[Server] Translating using Together AI: "${text}" from ${from} to ${to}`);
  
  // API 키가 없으면 오류 발생
  if (!TOGETHER_API_KEY) {
    throw new Error('TOGETHER_API_KEY is not defined in environment variables');
  }
  
  // 시스템 메시지와 사용자 메시지 생성
  const systemMessage = "You are a professional translator with expertise in Korean and English languages.";
  let userMessage: string;
  
  if (from === 'ko' && to === 'en') {
    userMessage = `Translate the following Korean text to English. Return only the translated text without any explanations or additional text: "${text}"`;
  } else if (from === 'en' && to === 'ko') {
    userMessage = `Translate the following English text to Korean. Return only the translated text without any explanations or additional text: "${text}"`;
  } else {
    throw new Error(`Unsupported language pair: ${from} to ${to}`);
  }
  
  try {
    // API 요청 본문 구성
    const requestBody = {
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",  // Llama 3.3 무료 모델로 변경
      messages: [
        {
          role: "system" as const,
          content: systemMessage
        },
        {
          role: "user" as const,
          content: userMessage
        }
      ],
      temperature: 0.1,   // 더 낮은 온도로 조정
      max_tokens: 500,
      top_p: 0.9,
      frequency_penalty: 0,
      presence_penalty: 0
    };
    
    console.log(`[Server] Request payload: ${JSON.stringify(requestBody)}`);
    console.log(`[Server] Using model: meta-llama/Llama-3.3-70B-Instruct-Turbo-Free`);
    console.log(`[Server] Sending request to: ${API_URL}`);
    console.log(`[Server] API Key (first 8 chars): ${TOGETHER_API_KEY.substring(0, 8)}...`);
    
    // fetch API를 사용하여 직접 호출
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${TOGETHER_API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });
      
      console.log(`[Server] API response status: ${response.status}`);
      console.log(`[Server] API response headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()))}`);
      
      // 응답이 성공적이지 않은 경우
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Server] API error response: ${response.status}`);
        console.error(`[Server] Full error details: ${errorText}`);
        throw new Error(`Translation API error: ${response.status} - ${errorText || 'Unknown error'}`);
      }
      
      // 응답 내용 가져오기
      const contentType = response.headers.get('content-type');
      console.log(`[Server] Response content type: ${contentType}`);
      
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log(`[Server] API response received (first 200 chars): ${JSON.stringify(data).substring(0, 200)}...`);
      } else {
        const textResponse = await response.text();
        console.log(`[Server] Non-JSON response (first 200 chars): ${textResponse.substring(0, 200)}...`);
        try {
          data = JSON.parse(textResponse);
        } catch (e) {
          console.error(`[Server] Failed to parse response as JSON:`, e);
          throw new Error('Invalid response format from API');
        }
      }
      
      // 응답에서 번역된 텍스트 추출
      if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
        console.error(`[Server] Unexpected response structure:`, data);
        throw new Error('Invalid response format from API');
      }
      
      // 번역 결과 추출
      const translatedText = data.choices[0].message.content.trim().replace(/^["']|["']$/g, '');
      console.log(`[Server] Extracted translation: "${translatedText}"`);
      
      return translatedText;
    } catch (fetchError) {
      console.error('[Server] Fetch error details:', fetchError);
      if (fetchError instanceof TypeError && fetchError.message.includes('fetch failed')) {
        console.error('[Server] Network error - Could not connect to API endpoint. Check network connectivity and API URL.');
        if (fetchError.cause) {
          console.error('[Server] Error cause:', fetchError.cause);
        }
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('[Server] Error calling Together AI API:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, from, to } = body;
    
    if (!text || !from || !to) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    console.log(`[Server] Translation request: "${text}" from ${from} to ${to}`);
    
    // 요청 간 딜레이 적용
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      // 너무 빠른 요청인 경우 429 상태 코드와 함께 에러 반환
      return NextResponse.json({
        error: 'Too many requests. Please wait a moment before trying again.',
        retryAfter: MIN_REQUEST_INTERVAL - timeSinceLastRequest
      }, { 
        status: 429,
        headers: {
          'Retry-After': `${Math.ceil((MIN_REQUEST_INTERVAL - timeSinceLastRequest) / 1000)}`
        }
      });
    }
    
    // 요청 시간 업데이트
    lastRequestTime = Date.now();
    
    try {
      // Together AI를 사용하여 번역
      const translatedText = await translateWithTogetherAI(text, from, to);
      
      console.log(`[Server] Translation result: "${translatedText}"`);
      
      return NextResponse.json({
        translatedText,
        from,
        to,
        source: 'together-ai'
      });
    } catch (translateError: Error | unknown) {
      console.error('[Server] Translation API error:', translateError instanceof Error ? translateError.message : translateError);
      
      // Together AI API의 요청 제한 감지
      const isRateLimited = 
        translateError instanceof Error && translateError.message && (
          translateError.message.includes('429') || 
          translateError.message.includes('Too Many Requests') ||
          translateError.message.includes('rate limit')
        );
      
      if (isRateLimited) {
        return NextResponse.json({
          error: 'Translation service is busy. Please try again in a few seconds.',
          retryAfter: MIN_REQUEST_INTERVAL
        }, { 
          status: 429,
          headers: {
            'Retry-After': '1'
          }
        });
      }
      
      return NextResponse.json({
        error: 'Translation service is temporarily unavailable. Please try again later.'
      }, { status: 503 });
    }
  } catch (error: Error | unknown) {
    console.error('[Server] Request processing error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
} 