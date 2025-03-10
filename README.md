### **프로젝트 개요**

> **플랫폼**: 실시간 일상 커뮤니케이션 플랫폼
> **주요 기능:** 실시간 채팅, 메시지 캐싱, 사용자 관리, 채팅방 관리
> **타겟:** 일상적인 소통이 필요한 개인 및 그룹
> **기술 스택:** `React, TypeScript, Tailwind CSS, Vite, Zustand, WebSocket`


### 프로젝트 팀 구성

> **개발팀**: 엘리스 PT트랙 1기 1차 프로젝트 1팀
> **프로젝트 링크:** https://kdt-pt-1-pj-1-team01.elicecoding.com/login
> **Github:** https://github.com/chickengir1/Chat-application-for-daily-communication
> **프론트엔드:** **이강호** 
> **백엔드:** 김준수, 엄수경, 강대희


---

### 기술 스택

> **프론트엔드**: React + TypeScript + Vite + Storybook + Zustand
> 
> - **스타일링:** `Tailwind CSS` 기반 반응형 디자인
> - **상태 관리:** Zustand 스토어 활용
> - **API 연동:** Axios 기반 서버 통신
> - **실시간 통신:** WebSocket 연동
> - **스토리북**: Ui 테스팅

---

### 프론트엔드 시퀀스 다이어그램

![image](https://github.com/user-attachments/assets/c419c73c-be45-4054-8838-4ad15bd9e8fe)


---

### 핵심 기능

### 실시간 채팅

- **WebSocket 기반 실시간 통신**
- **1:1 및 그룹 채팅 지원**
- **이모지/파일 전송 기능**

### 메시지 관리

- **IndexedDB를 이용한 메시지 캐싱**
- **최대 100개 메시지 자동 저장**
- **채팅 기록 조회 기능**

### 사용자 관리

- **JWT 기반 인증 시스템**
- **친구 목록 관리**
- **프로필 관리 기능**

### 채팅방 관리

- **동적 채팅방 생성/참여 시스템**
- **참여자 목록 확인**
- **채팅방 검색 기능**

---

### 주요 컴포넌트 설명

**친구 목록 시스템**

- **인피티니 스크롤을 활용한 친구 검색**
- **모바일 반응형 토글 기능**
- **새로운 채팅 생성 인터페이스**

**채팅방 관리**

- **WebSocket 연결 자동 관리**
- **채팅방 특정 메세지 검색**
- **이모지 피커와  AWS S3를 활용한 이모지 및 이미지 업로드**

**인증 시스템**

- **이메일 검증 단계적 처리**
- **비밀번호 유효성 검사**
- **자동 토큰 갱신**

**상태 관리**

- **Zustand를 이용한 글로벌 상태 관리**
- **WebSocket 연결 상태 추적**
- **메시지 캐싱(IndexDB)**
