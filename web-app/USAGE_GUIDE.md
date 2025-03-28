# English Vocabulary App 사용 가이드

이 문서는 영어 단어장 웹 애플리케이션을 설정하고 사용하는 방법을 안내합니다.

## 애플리케이션 설명

이 웹 애플리케이션은 영어-한국어 단어 학습을 위한 도구로, 다음과 같은 기능을 제공합니다:

- 영어와 한국어 간 자동 번역
- 사용자 인증 및 계정 관리
- 번역한 단어를 개인 단어장에 저장
- 즐겨찾기 기능 및 단어 관리

## 시작하기

### 1. 개발 서버 실행

애플리케이션을 로컬에서 실행하려면:

```bash
cd ~/english_vocab_app
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 사용할 수 있습니다.

### 2. 번역 기능

번역 기능은 두 가지 모드로 작동합니다:

1. **모의(Mock) 번역 모드**: API 키가 없어도 기본적인 단어들을 번역할 수 있는 모드입니다. 다음 단어들이 지원됩니다:
   - hello / 안녕하세요
   - thank you / 감사합니다
   - goodbye / 안녕히 가세요
   - student / 학생
   - teacher / 선생님
   - school / 학교
   - book / 책
   - computer / 컴퓨터
   - friend / 친구
   - family / 가족
   - 그 외 20개 단어들...

2. **실제 API 사용 모드**: MyMemory Translation API를 사용하는 모드입니다.
   - [RapidAPI](https://rapidapi.com/translated/api/mymemory-translation-memory)에서 API 키를 발급받아 `.env.local` 파일에 설정해야 합니다.

### 3. Supabase 설정

애플리케이션의 완전한 기능을 사용하려면 Supabase 프로젝트를 설정해야 합니다:

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성합니다.
2. SQL 에디터에서 다음 SQL 스크립트를 실행하여 필요한 테이블을 생성합니다:

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

3. Supabase 프로젝트의 URL과 익명 키를 `.env.local` 파일에 설정합니다.

## 애플리케이션 사용법

### 사용자 인증

1. 왼쪽 컬럼의 로그인/회원가입 폼을 사용하여 계정을 생성하거나 로그인합니다.
2. 이메일과 비밀번호를 입력하여 회원가입할 수 있습니다.
3. 로그인하면 사용자 프로필 정보와 로그아웃 버튼이 표시됩니다.

### 단어 번역

1. 가운데 컬럼의 번역 폼에 번역할 텍스트를 입력합니다.
2. 입력한 텍스트가 한국어인지 영어인지 자동으로 감지되어 번역 방향이 설정됩니다.
3. "번역하기" 버튼을 클릭하여 번역 결과를 확인합니다.
4. 번역 결과를 "단어장에 저장" 버튼을 클릭하여 저장할 수 있습니다.

### 단어장 관리

1. 오른쪽 컬럼에서 저장된 단어 목록을 확인할 수 있습니다.
2. "전체"와 "즐겨찾기" 버튼으로 표시할 단어를 필터링할 수 있습니다.
3. 각 단어 카드에는 영어, 한국어 번역, 생성 날짜, 학습 횟수가 표시됩니다.
4. 별 아이콘을 클릭하여 즐겨찾기 상태를 토글할 수 있습니다.
5. 휴지통 아이콘을 클릭하여 단어를 삭제할 수 있습니다.

## 문제 해결

- **로그인 오류**: Supabase 프로젝트 설정을 확인하고, 인증 설정이 활성화되어 있는지 확인하세요.
- **번역 오류**: `.env.local` 파일에 올바른 API 키가 설정되어 있는지 확인하세요. API 키가 없어도 기본 단어는 모의 번역으로 작동합니다.
- **단어 저장 오류**: Supabase 프로젝트에 vocabulary 테이블이 올바르게 생성되었는지, Row Level Security 정책이 설정되었는지 확인하세요.

이 애플리케이션에 대한 추가 질문이나 문제가 있으시면 개발자에게 문의하세요. 