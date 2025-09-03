# campick_project
# HTML 컨벤션 가이드

## 1. 문서 구조
- HTML5 표준 문법 사용
- `<!DOCTYPE html>` 선언 필수
- 언어 속성(\`lang\`) 명시

```
<!DOCTYPE html>
<html lang="ko">
```

## 2. 들여쓰기와 공백
- 들여쓰기는 **스페이스 2칸**
- 불필요한 빈 줄/공백 제거
- 구분을 위한 빈 줄은 1칸 허용

```
<!-- Good -->
<ul>
  <li>사과</li>
  <li>배</li>
</ul>
```
## 3. 태그 & 속성 규칙
- 태그명은 소문자 사용
- 속성은 항상 쌍따옴표("")사용 권장
- 불필요한 속성 생략 및 빈 속성 불허

```
<!-- Good -->
<input type="text" disabled />
<!-- Bad -->
<INPUT TYPE=text DISABLED title="">
```
## 4. 시멘틱 태그 사용
- 의미에 맞는 HTML 태그 사용 (\`header\`, \`main\`, \`footer\`, \`article\`, \`section\` 등)
- 불필요한 `<div>` 남용 금지
- ::after, ::before 가상 요소활용

```
<!-- Good -->
<header>
  <h1>사이트 제목</h1>
</header>

<main>
  <article>
    <h2>게시글 제목</h2>
    <p>내용...</p>
  </article>
</main>

---example.css---
<!-- Good -->
example::after{}
example::before{}

```

## 5. 속성 작성 순서
1. \`id\`, \`class\`
2. \`name\`, \`data-*\`
3. \`src\`, \`for\`, \`type\`, \`href\` , \'value\'
5. \`title\`, \`alt-*\`
6. \`role\`, \`aria-*\`


## 6. 주석 작성
- 구역의 시작 / 끝 표시
- 의미 있는 설명만 주석으로 작성

```
<!-- Header 시작 -->
<header>...</header>
<!-- Header 끝 -->
```
## 7. 코드 정리
- 긴 속성은 줄 바꿈 정렬

```
<!-- Good -->
<button
  type="button"
  class="btn btn-primary"
  aria-label="저장하기"
>
  저장
</button>
```

## 8. 접근성
- 이미지에 \`alt\` 속성 필수
- 폼 요소에는 \`label\` 연결
- 색상만으로 구분하지 않기

```
<!--색상만으로 구분하지 않기-->
<!--Bad-->
<p style="color: red;">입력</p>
<p style="color: green;">입력</p>

<!--Good-->
<p><span style="color: red;">*</span> 필수 입력</p>
```