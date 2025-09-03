# CSS 컨벤션 가이드

본 문서는 팀 내 CSS 네이밍과 코드 스타일의 일관성을 위해 작성되었습니다.

**목적:** 유지보수성 향상, 협업 효율 증대, 코드 가독성 확보

---

## 1. 기본 원칙
- CSS3 표준 속성 우선
- 불필요한 중복 스타일 제거
- 의미 없는 축약어 사용 금지 
  (ex: `.cd_ft ❌` → `.card_footer ✅`)



## 2. 코드 스타일
- **들여쓰기:** 스페이스 2칸
- **속성 선언 순서:** 레이아웃 → 박스모델 → 타이포그래피 → 시각적 효과

```css
.selector {
  display: flex;              /* 레이아웃 */
  justify-content: center;    
  width: 100%;                /* 박스모델 */
  padding: 16px;              
  font-size: 1rem;            /* 타이포그래피 */
  color: #333;
  background-color: #f9f9f9; /* 시각적 효과 */
}
```

## 3. 네이밍 규칙

📖 **규칙 설명**
- Part: `_` 1개 → 구조적 하위 요소
- Variant: `__` 2개 → 옵션/스타일 변형


| 구분           | 규칙                   | 예시                                      |
| ------------ | -------------------- | --------------------------------------- |
| 컴포넌트         | 독립적인 UI 블록           | `.card`, `.button`, `.modal`            |
| 부분 (Part)    | 언더스코어 1개 `_` 사용      | `.card_title`, `.card_footer`           |
| 변형 (Variant) | 언더스코어 2개 `__` 사용     | `.card__featured`, `.button__primary`   |




### 3-1. 코드 예시
```css
/* Component */
.card {}

/* Part */
.card_title {}
.card_footer {}

/* Variant */
.card__featured {}
.card__small {}

```

## 4. 단위
| 속성    | 단위        | 예시                                          |
| ----- | --------- | ------------------------------------------- |
| 폰트    | rem, em   | `font-size: 1rem;`                          |
| 여백/크기 | px, %     | `padding: 16px; width: 50%;`                |
| 색상    | HEX, RGBA | `color: #333; background: rgba(0,0,0,0.1);` |
| 변수    | 변수 | `var(--변수명)` |


## 5. 주석
영역별 주석 작성 권장
``` css
/* Header 영역 스타일 */
header {
  background-color: #fff;
  height: 100px;
}
```