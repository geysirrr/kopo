const assert = require('assert');
const Kopo = require('../index');

describe('한국어 조사 테스트', () => {
  it('text 값이 김연아 일 때, get 함수는 (는) 을 리턴해야 한다.', () => {
    assert.equal(
      `${new Kopo('김연아').get('은/는')} 아름답다`,
      '김연아는 아름답다'
    );
  });

  it('생성자의 인자가 한글이 아닐 때 isNotKorean 함수는 true 를 리턴해야 한다.', () => {
    assert.equal(new Kopo('Lionel messi').isNotKorean(), true);
  });

  it('생성자의 인자가 한글이 아닐 때 get 함수를 호출하면 에러를 던져야 한다.', () => {
    assert.throws(
      () => `${new Kopo('Lionel messi').get('은/는')} Goat 이다.`,
      Error,
      'Text is Korean...!'
    );
  });

  it('같은 text 라면 받침이 있는 조사와 받침이 없는 조사의 순서가 바뀌더라도 같은 결과값이 나와야 한다.', () => {
    assert.equal(
      new Kopo('김연아').get('을/를'),
      new Kopo('김연아').get('를/을')
    );
  });

  it('생성자의 인자가 한글이 아닐 때 get 함수를 호출하면 에러를 던져야 한다.', () => {
    assert.throws(
      () => `${new Kopo('Lionel messi').get('은/는')} Goat 이다.`,
      Error,
      'Text Should be Korean...!'
    );
  });

  it('get 함수에 타당하지 않은 조사를 사용했을 경우 에러를 던져야 한다.', () => {
    assert.throws(
      () => new Kopo('김연아').get('아/악'),
      Error,
      'Invalid Postposition'
    );
  });

  it('get 함수에 / 없이 하나의 조사만 적었을 경우 에러를 던져야 한다.', () => {
    assert.throws(
      () => new Kopo('김연아').get('는'),
      Error,
      'Slash (/) is Required'
    );
  });

  it('getOnlyPostposition 함수는 조사만 반환해야 한다.', () => {
    assert.equal(new Kopo('김연아').getOnlyPostposition('은/는'), '는');
  });

  it('hasBatchim 함수는 text 의 마지막 글자가 받침이 있으면 true 를 반환해야 한다.', () => {
    assert.equal(new Kopo('김연아').hasBatchim(), false);
  });

  it('static setDefaultJosaType 함수는 batchim 또는 nonBatchim 텍스트를 인자로 받아야 한다.', () => {
    Kopo.setDefaultJosaType(Kopo.josaType.BATCHIM);
    assert.equal(Kopo.defaultJosaType, Kopo.josaType.BATCHIM);

    Kopo.setDefaultJosaType(Kopo.josaType.NON_BATCHIM);
    assert.equal(Kopo.defaultJosaType, Kopo.josaType.NON_BATCHIM);

    assert.throws(
      () => Kopo.setDefaultJosaType('anything'),
      Error,
      'Invalid default JosaType'
    );
  });

  it('defaultJosaType 을 세팅하면 한글이 아닐 경우 defaultJosaType 에 따라 get 함수가 값을 반환해야 한다.', () => {
    Kopo.setDefaultJosaType(Kopo.josaType.BATCHIM);

    assert.equal(
      `${new Kopo('Lionel Messi').get('은/는')} Goat 이다.`,
      'Lionel Messi은 Goat 이다.'
    );

    Kopo.setDefaultJosaType(Kopo.josaType.NON_BATCHIM);

    assert.equal(
      `${new Kopo('Lionel Messi').get('은/는')} Goat 이다.`,
      'Lionel Messi는 Goat 이다.'
    );

    Kopo.setDefaultJosaType(Kopo.josaType.BOTH);

    assert.equal(
      `${new Kopo('Lionel Messi').get('은/는')} Goat 이다.`,
      'Lionel Messi은(는) Goat 이다.'
    );
  });

  it('space 는 text 의 뒤에 스페이스를 추가해야 한다.', () => {
    assert.equal(
      `${new Kopo('김연아').space().get('은/는')} 아름답다.`,
      '김연아 는 아름답다.'
    );
  });
});
