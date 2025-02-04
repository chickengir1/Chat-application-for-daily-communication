````markdown
# 일상 채팅 애플리케이션 🚀

일상적인 소통을 위한 실시간 채팅 애플리케이션입니다. WebSocket을 활용한 실시간 통신과 IndexedDB를 이용한 메시지 캐싱을 지원합니다.

## 주요 기능 🌟

- **실시간 채팅**

  - WebSocket을 통한 실시간 메시지 전송
  - 1:1 채팅 및 그룹 채팅 지원
  - 이모지 지원
  - 파일 전송 기능

- **사용자 관리**

  - 이메일 기반 회원가입/로그인
  - 친구 목록 관리
  - 프로필 관리

- **채팅방 관리**

  - 채팅방 생성/참여/나가기
  - 채팅방 검색
  - 참여자 목록 확인

- **메시지 관리**
  - IndexedDB를 통한 메시지 캐싱
  - 메시지 히스토리 조회

## 기술 스택 💻

### Frontend

- React + TypeScript
- Vite
- Tailwind CSS
- Zustand (상태 관리)
- Axios (서버 Api 통신)

### 데이터 관리

- IndexedDB (메시지 캐싱)
- WebSocket (실시간 통신)

## 시작하기 🚀

1. **저장소 클론**

```bash
git clone https://kdt-gitlab.elice.io/pttrack/class_01/web_project_i/team01/front.git
cd chat-application
```
````

2. **의존성 설치**

```bash
npm install
```

3. **개발 서버 실행**

```bash
npm run dev
```

4. **빌드**

```bash
npm run build
```

## 프로젝트 구조 📁

```
src/
├── api/          # API 관련 설정
├── components/   # 리액트 컴포넌트
├── hooks/        # 커스텀 훅
├── pages/        # 페이지 컴포넌트
├── providers/    # 컨텍스트 프로바이더
├── stores/       # Zustand 스토어
└── utils/        # 유틸리티 함수
```

## 주요 기능 설명 📝

### WebSocket 연결 관리

- 채팅방 입장 시 자동 연결
- 연결 끊김 시 자동 재연결
- 채팅방 나가기 시 연결 해제

### 메시지 캐싱

- IndexedDB를 사용하여 메시지 로컬 저장
- 최대 1000개 메시지까지 저장
- 앱 재실행 시 캐시된 메시지 로드

### 사용자 인증

- JWT 기반 인증
- 토큰 만료 시 자동 갱신
- 보안을 위한 특수문자 포함 비밀번호 정책

## 커밋 메시지 컨벤션 📝

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 코드
chore: 빌드 업무 수정
```

## 기여하기 🤝

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스 📄

이 프로젝트는 라이선스의 라이선스는 엘리스 PT트랙 1기에 귀속 됩니다.

## 팀원 👥

- 이강호 - Frontend Developer -
- 김준수 - Backend Developer -
- 엄수경 - Backend Developer -
- 강대희 - Backend Developer -

## 연락처 📧

프로젝트 링크: [https://kdt-pt-1-pj-1-team01.elicecoding.com/login](https://kdt-gitlab.elice.io/pttrack/class_01/web_project_i/team01/front)

```

```
