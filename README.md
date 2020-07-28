# kopo.js

현재 텍스트와 조사를 포함한 결과값 반환

```javascript
const kopo = new Kopo('김연아');
console.log(`${kopo.get('은/는')} 아름답다.`); // 김연아는 아름답다.
```

조사만 반환

```javascript
const kopo = new Kopo('김연아');
console.log(`${kopo.getOnlyPostposition('은/는')}.`); // 는
```

마지막 글자가 받침이 있는지 여부 확인

```javascript
const kopo = new Kopo('김연아');
kopo.hasBatchim(); // false
```

텍스트가 한글이 아닐 경우 기본 조사 세팅

```javascript
Kopo.setDefaultJosaType(Kopo.josaType.BATCHIM);

console.log(`${new Kopo('Lionel Messi').get('은/는')} Goat 이다.`);
// Lionel Messi은 Goat 이다.

Kopo.setDefaultJosaType(Kopo.josaType.NON_BATCHIM);

console.log(`${new Kopo('Lionel Messi').get('은/는')} Goat 이다.`);
// 'Lionel Messi는 Goat 이다.'
```
