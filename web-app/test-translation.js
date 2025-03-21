// 번역 API 테스트 스크립트
import fetch from 'node-fetch';

async function testTranslation() {
  try {
    console.log('번역 API 테스트 시작...\n');
    
    // 한국어 -> 영어 번역 테스트
    console.log('====== 한국어 -> 영어 번역 테스트 ======');
    const koText = '안녕하세요 오늘 날씨가 좋네요';
    console.log(`입력: "${koText}"`);
    
    console.log('API 요청 보내는 중...');
    const korToEngResponse = await fetch('http://localhost:3002/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: koText,
        from: 'ko',
        to: 'en'
      })
    });
    
    console.log(`응답 상태 코드: ${korToEngResponse.status}`);
    
    // Content-Type 확인
    const contentType = korToEngResponse.headers.get('content-type');
    console.log(`응답 Content-Type: ${contentType}`);
    
    let korToEngResult;
    
    // JSON 응답이 아닌 경우 텍스트로 읽기
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await korToEngResponse.text();
      console.log(`JSON이 아닌 응답 수신 (처음 500자): ${textResponse.substring(0, 500)}`);
      console.log('JSON으로 파싱 시도...');
      try {
        korToEngResult = JSON.parse(textResponse);
      } catch (e) {
        console.error('JSON 파싱 실패:', e);
        korToEngResult = { error: 'Invalid JSON response', rawResponse: textResponse.substring(0, 100) + '...' };
      }
    } else {
      korToEngResult = await korToEngResponse.json();
    }
    
    console.log('한국어 -> 영어 번역 결과:', korToEngResult);
    console.log('\n');
    
    // 영어 -> 한국어 번역 테스트
    console.log('====== 영어 -> 한국어 번역 테스트 ======');
    const enText = 'Hello, the weather is nice today';
    console.log(`입력: "${enText}"`);
    
    console.log('API 요청 보내는 중...');
    const engToKorResponse = await fetch('http://localhost:3002/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: enText,
        from: 'en',
        to: 'ko'
      })
    });
    
    console.log(`응답 상태 코드: ${engToKorResponse.status}`);
    
    // Content-Type 확인
    const engContentType = engToKorResponse.headers.get('content-type');
    console.log(`응답 Content-Type: ${engContentType}`);
    
    let engToKorResult;
    
    // JSON 응답이 아닌 경우 텍스트로 읽기
    if (!engContentType || !engContentType.includes('application/json')) {
      const textResponse = await engToKorResponse.text();
      console.log(`JSON이 아닌 응답 수신 (처음 500자): ${textResponse.substring(0, 500)}`);
      console.log('JSON으로 파싱 시도...');
      try {
        engToKorResult = JSON.parse(textResponse);
      } catch (e) {
        console.error('JSON 파싱 실패:', e);
        engToKorResult = { error: 'Invalid JSON response', rawResponse: textResponse.substring(0, 100) + '...' };
      }
    } else {
      engToKorResult = await engToKorResponse.json();
    }
    
    console.log('영어 -> 한국어 번역 결과:', engToKorResult);
    
    console.log('\n번역 API 테스트 완료!');
  } catch (error) {
    console.error('번역 API 테스트 중 오류 발생:', error);
  }
}

testTranslation(); 