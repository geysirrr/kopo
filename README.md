# kopo.js

https://www.npmjs.com/package/kopo

https://github.com/geysirrr/kopo

```bash
# 지원하는 조사 종류. 추가를 원하실 경우 문의 바랍니다.
을/를
은/는
이/가
과/와
```

```javascript
// 현재 텍스트와 조사를 포함한 결과값 반환
const kopo = new Kopo('김연아');
console.log(`${kopo.get('은/는')} 아름답다.`); // 김연아는 아름답다.
```

```javascript
// 조사만 반환
const kopo = new Kopo('김연아');
console.log(`${kopo.getOnlyPostposition('은/는')}.`); // 는
```

```javascript
// 마지막 글자가 받침이 있는지 여부 확인
const kopo = new Kopo('김연아');
kopo.hasBatchim(); // false
```

```javascript
// 텍스트가 한글이 아닐 경우 기본 조사 세팅
Kopo.setDefaultJosaType(Kopo.josaType.BATCHIM);

console.log(`${new Kopo('Lionel Messi').get('은/는')} Goat 이다.`);
// Lionel Messi은 Goat 이다.

Kopo.setDefaultJosaType(Kopo.josaType.NON_BATCHIM);

console.log(`${new Kopo('Lionel Messi').get('은/는')} Goat 이다.`);
// Lionel Messi는 Goat 이다.
```

```javascript
// text 와 조사 사이 띄어쓰기
Kopo.setDefaultJosaType(Kopo.josaType.BOTH);

console.log(`${new Kopo('Lionel Messi').space().get('은/는')} Goat 이다.`);
// Lionel Messi 은(는) Goat 이다.
```
