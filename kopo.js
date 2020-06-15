//  (c) 2020 geysirrr
// TODO: to add more postposition and support array
(function (root, Kopo) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Kopo;
    });
  } else if (typeof module === 'object' && module.export) {
    module.exports = Kopo;
  } else {
    root.Kopo = Kopo;
  }
})(
  this,
  (function () {
    function Kopo(text) {
      this.text = text;
    }

    var getLastCharCode = function (text) {
      return text.charCodeAt(text.length - 1);
    };

    var postpositionsForBatchim = ['을', '은', '이', '과'];

    var postpositionsForNonBatchim = ['를', '는', '가', '와'];

    Kopo.prototype.hasBatchim = function () {
      return (getLastCharCode(this.text) - 0xac00) % 28 > 0;
    };

    Kopo.prototype.getOnlyPostposition = function (postposition) {
      var postpositions = postposition.split('/');

      if (postpositions.length !== 2) {
        throw new Error('Arguments must be separated by /. example: "을/를"');
      }

      var getPostposition = function (postpositions) {
        return postpositions.indexOf(firstPostposition) !== -1
          ? firstPostposition
          : postpositions.indexOf(secondPostposition) !== -1
          ? secondPostposition
          : (function () {
              throw new Error('Invalid Postposition');
            })();
      };

      var firstPostposition = postpositions[0];
      var secondPostposition = postpositions[1];

      return getPostposition(
        this.hasBatchim() ? postpositionsForBatchim : postpositionsForNonBatchim
      );
    };

    Kopo.prototype.get = function (postposition) {
      return this.text + this.getOnlyPostposition(postposition);
    };

    return Kopo;
  })()
);
