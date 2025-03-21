# English Vocabulary App

This project consists of two main applications:

## Web App (Next.js)
Located in `/web-app` directory
- Web frontend and backend built with Next.js
- Provides vocabulary learning interface
- API endpoints for mobile app

## Mobile App (Flutter)
Located in `/mobile-app` directory
- Mobile application built with Flutter
- Cross-platform support (iOS & Android)
- Connects to web app's API

## Project Structure
```
english_vocab_app/
├── web-app/                # Next.js web application
│   ├── pages/
│   ├── public/
│   ├── components/
│   ├── styles/
│   └── package.json
│
└── mobile-app/            # Flutter mobile application
    ├── lib/
    ├── assets/
    ├── test/
    └── pubspec.yaml
```

## Development

### Running the Web App
```bash
cd web-app
npm install
npm run dev
```

### Running the Mobile App
```bash
cd mobile-app
flutter pub get
flutter run
```

## 기능

- 🔄 **자동 번역**: 한영/영한 자동 번역 기능
- 👤 **사용자 인증**: 회원가입 및 로그인 기능
- 📝 **단어장 관리**: 단어 저장, 삭제, 즐겨찾기 기능
- 📊 **학습 통계**: 저장한 단어 수, 즐겨찾기 단어 수, 학습한 단어 수 통계

## 기술 스택

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (인증, 데이터베이스)
- **API**: 번역 API (MyMemory Translation API)

## 설치 및 실행 방법

### 사전 요구사항

- Node.js 18+
- npm 또는 yarn
- Supabase 계정

### 설치 단계

1. 저장소 클론

```bash
git clone https://github.com/yourusername/english-vocab-app.git
cd english-vocab-app
```

2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

3. `.env.local` 파일 생성 및 환경 변수 설정

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_RAPID_API_KEY=your-rapid-api-key
```

4. Supabase 데이터베이스 설정

Supabase 대시보드에서 다음 테이블을 생성하세요:

```sql
-- 어휘 테이블
CREATE TABLE vocabulary (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  english TEXT NOT NULL,
  korean TEXT NOT NULL,
  favorite BOOLEAN DEFAULT FALSE,
  last_reviewed TIMESTAMP WITH TIME ZONE,
  review_count INTEGER DEFAULT 0
);

-- 공개 테이블 접근 정책
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 단어만 볼 수 있음
CREATE POLICY "Users can view own vocabulary" 
  ON vocabulary FOR SELECT 
  USING (auth.uid() = user_id);

-- 사용자는 자신의 단어만 추가할 수 있음
CREATE POLICY "Users can insert own vocabulary" 
  ON vocabulary FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 사용자는 자신의 단어만 업데이트할 수 있음
CREATE POLICY "Users can update own vocabulary" 
  ON vocabulary FOR UPDATE 
  USING (auth.uid() = user_id);

-- 사용자는 자신의 단어만 삭제할 수 있음
CREATE POLICY "Users can delete own vocabulary" 
  ON vocabulary FOR DELETE 
  USING (auth.uid() = user_id);
```

5. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

6. 브라우저에서 애플리케이션 열기

```
http://localhost:3000
```

## 배포

Next.js 애플리케이션은 Vercel에 쉽게 배포할 수 있습니다:

1. [Vercel](https://vercel.com)에 가입 및 로그인
2. 새 프로젝트 생성 및 GitHub 저장소 연결
3. 환경 변수 설정 (Supabase URL, API 키 등)
4. 배포

## 라이센스

MIT License
