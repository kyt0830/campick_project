# campick_project
# 문서화 컨벤션 가이드

## 1. 문서의 시작
- 파일 최상단에 작성
- /* ... */ 형식으로 작성
- 팀에서 통일된 포맷으로 관리

## 2. 주석 기본 항목
| 항목               | 설명           |
| ---------------- | ------------ |
| 파일명 (Author)     | 파일이름.확장자 |
| 담당자 (Author)     | 해당 파일 1차 책임자 |
| 작성일 (Created)    | 최초 작성일       |
| 최근 수정일 (Updated) | 마지막으로 수정한 날짜 |
| 설명 (Description) | 파일/컴포넌트 목적   |
| 수정이력 (History)   | 주요 변경사항 (작성자) |
- 수정이력 항목은 ``큰 변경 사항 발생 시 기록``

## 2-1. 주석 작성 방식
```js
/*
 ---example---
 * 파일명: store.tsx
 * 담당자: 김영태
 * 작성일: 2025-08-28
 * 최근 수정일: 2025-08-28
 * 설명: 글로벌 상태 관리를 위한 Redux store 초기 설정 파일
 * 수정이력:
 *   - 2025-08-28: 기본 Redux store 세팅 (김영태)
 */

 import { configureStore } from "@reduxjs/toolkit";
 import userReducer from "./slices/userSlice";

 export const store = configureStore({
  reducer: {
    user: userReducer,
  },
 });
```