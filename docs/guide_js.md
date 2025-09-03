# JavaScript 컨벤션 가이드
본 문서는 팀 내 JavaScript 코드 스타일과 네이밍 규칙의 일관성을 위해 작성되었습니다.

**목적:** 유지보수성 향상, 협업 효율 증대, 코드 가독성 확보

## 1. 문법 스타일

- ES6 이상 문법 사용
- `var` 대신 `let`, `const` 사용
- 세미콜론(`;`) 사용

```javascript
let count = 0;
const MAX_COUNT = 10;
```

---

## 2. 들여쓰기와 공백

- 들여쓰기는 **스페이스 2칸**
- 연산자 앞뒤, 콤마 뒤에 공백 추가
- 함수 괄호와 중괄호 사이 공백

```javascript
const sum = a + b;

const add = (x, y) => {
  return x + y;
};
```

---

## 3. 네이밍 규칙 (상세화)

- **변수/함수**: `camelCase`

  - 소문자로 시작, 단어가 이어질 땐 대문자 사용
  - 의미 없는 축약어 사용 금지
```javascript
let userName = "Alice";
const calculateSum = (a, b) => a + b;
```

- **클래스**: `PascalCase`

  - 각 단어 첫 글자를 대문자로 작성
```javascript
class UserProfile {
  constructor(name) {
    this.name = name;
  }
}
```

- **상수**: `UPPER_SNAKE_CASE`

  - 변하지 않는 값, 환경 설정 등
```javascript
const API_URL = "https://api.example.com";
const MAX_RETRY_COUNT = 5;
```

* **불리언 변수**: `is`, `has`, `can` 접두사 사용
```javascript
let isLoggedIn = true;
const hasPermission = false;
```

* **배열/객체**: 복수형/명사형으로 의미 명확히
```javascript
const users = [];
const userProfile = {};
```

> 💡 변수명만 보고도 용도를 알 수 있도록 작성

---

## 4. 함수 작성

* 화살표 함수 사용 권장
* 하나의 함수는 하나의 역할만 수행
```javascript
const getUserName = (user) => user.name;
const calculateArea = (width, height) => width * height;
```

---

## 5. 주석

- **함수/모듈 상단**: 한 줄로 기능 요약
- **필요한 경우** 매개변수와 반환값 간단 표시
- **한 줄 주석**: 코드에서 바로 이해가 어려운 부분만

```javascript
// 두 수를 더해서 반환
const sum = (a, b) => a + b;

// 사용자 로그인 상태 체크
if (isLoggedIn) {
  showDashboard();
}

// TODO: 에러 처리 개선
```

> 💡 주석은 “왜 이 코드를 썼는지” 정도만 간단히 적으면 충분
