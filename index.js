//  (c) 2020 geysirrr
(function (root, Kopo) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Kopo;
    });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = Kopo;
  } else {
    root.Kopo = Kopo;
  }
})(
  this,
  (function () {
    function Kopo(text) {
      this.text = text;
      this.whitespace = '';
    }

    Kopo.josaType = {
      BATCHIM: 'batchim',
      NON_BATCHIM: 'nonBatchim',
      BOTH: 'both',
    };

    Kopo.setDefaultJosaType = function (josaType) {
      var josaTypes = getValuesFromObject(Kopo.josaType);

      if (josaTypes.indexOf(josaType) === -1)
        throw new Error(
          'Invalid Josa Type. It should be "batchim" or "nontBatchim"'
        );

      Kopo.defaultJosaType = josaType;
    };

    Kopo.prototype.hasBatchim = function () {
      return (getLastCharCode(this.text) - 0xac00) % 28 > 0;
    };

    Kopo.prototype.getOnlyPostposition = function (postposition) {
      var postpositions = postposition.split('/');

      if (postpositions.length !== 2) {
        throw new Error('Arguments must be separated by /. example: "을/를"');
      }

      var firstPostposition = postpositions[0];
      var secondPostposition = postpositions[1];

      var getPostposition = function (postpositions) {
        return postpositions.indexOf(firstPostposition) !== -1
          ? firstPostposition
          : postpositions.indexOf(secondPostposition) !== -1
          ? secondPostposition
          : (function () {
              throw new Error('Invalid Postposition');
            })();
      };

      if (this.isNotKorean()) {
        if (!Kopo.defaultJosaType)
          throw new Error('Text is not ended with Korean Letter');

        if (Kopo.defaultJosaType === Kopo.josaType.BATCHIM)
          return getPostposition(postpositionsForBatchim);

        if (Kopo.defaultJosaType === Kopo.josaType.NON_BATCHIM)
          return getPostposition(postpositionsForNonBatchim);

        if (Kopo.defaultJosaType === Kopo.josaType.BOTH)
          return firstPostposition + '(' + secondPostposition + ')';

        throw new Error('Invalid defaultJodaType');
      }

      return getPostposition(
        this.hasBatchim() ? postpositionsForBatchim : postpositionsForNonBatchim
      );
    };

    Kopo.prototype.get = function (postposition) {
      return (
        this.text + this.whitespace + this.getOnlyPostposition(postposition)
      );
    };

    Kopo.prototype.isNotKorean = function () {
      return (
        getLastCharCode(this.text) < 0xac00 ||
        getLastCharCode(this.text) > 0xd7a3
      );
    };

    Kopo.prototype.space = function () {
      this.whitespace = this.whitespace + ' ';

      return this;
    };

    var getLastCharCode = function (text) {
      return text.charCodeAt(text.length - 1);
    };

    var getValuesFromObject = function (obj) {
      return Object.keys(obj).map(function (key) {
        return obj[key];
      });
    };

    var postpositionsForBatchim = ['을', '은', '이', '과'];

    var postpositionsForNonBatchim = ['를', '는', '가', '와'];

    return Kopo;
  })()
);
