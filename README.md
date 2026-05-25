# 할 일 목록 (TODO App)

순수 HTML / CSS / JavaScript로 만든 가벼운 할 일 관리 앱입니다.
빌드 도구나 외부 라이브러리 없이 브라우저에서 바로 실행됩니다.

🔗 **데모: https://gbhyunchulkim.github.io/todo/**

## 기능

- ➕ **추가** — 입력 후 Enter 또는 "추가" 버튼
- ✅ **완료 처리** — 체크박스로 토글 (완료 시 취소선)
- ✏️ **수정** — 항목을 더블클릭 (Enter 저장 / Esc 취소)
- 🗑️ **삭제** — 항목에 마우스를 올리면 나타나는 × 버튼
- 🔍 **필터** — 전체 / 진행 중 / 완료
- 🧹 **완료 항목 비우기** — 완료된 항목 일괄 삭제
- 💾 **자동 저장** — `localStorage`에 저장되어 새로고침해도 유지

## 실행 방법

### 1. 파일 직접 열기

`index.html`을 더블클릭하면 브라우저에서 바로 열립니다.

### 2. 로컬 서버로 실행 (권장)

```bash
npx http-server -p 8080 -c-1
```

브라우저에서 http://127.0.0.1:8080 접속.

## 파일 구조

```
todo/
├── index.html   # 마크업 구조
├── style.css    # 스타일
├── app.js       # 동작 로직 (상태 관리 · 렌더링 · localStorage)
└── README.md
```

## 기술 스택

- HTML5
- CSS3
- Vanilla JavaScript (프레임워크·번들러 없음)

## 배포

`main` 브랜치에 push하면 GitHub Pages가 자동으로 재배포합니다.

```bash
git add -A
git commit -m "메시지"
git push
```
