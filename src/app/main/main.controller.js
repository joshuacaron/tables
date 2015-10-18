(function() {
  'use strict';

  angular
    .module('tables')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state) {
    var vm = this;
    vm.code = "Sample\tTable\n1\t4.8311\n2\t9340\n3\t4.99999\n4\t9.99999\n5\t10.0";
    
    vm.convertNewLines = function(n){
      return n.split('\n').join("<br>");
    };
    
    vm.inputAceLoaded = function(_editor) {
      _editor.getSession().setUseSoftTabs(false);
      _editor.getSession().setUseWrapMode(true);
      _editor.setShowPrintMargin(false);
    };
    
    vm.outputAceLoaded = function(_editor) {
      _editor.getSession().setUseWrapMode(true);
      _editor.setHighlightActiveLine(false);
      _editor.setShowPrintMargin(false);
    };
    
    vm.reload = function(){
      $state.reload();
    }
    
    vm.separator = "Tab"
    vm.precision = 2
    
    vm.toLatex = function(text, fs, rs, precision){
      var workingText = text.trim()
      // Fix line endings
      workingText = workingText.replace(/\r\n|\r/g, "\n")
      var records = workingText.split(rs)
      var fields = records.map(function(a){
        return a.split(fs)
      })
    
      var numColumns = fields[0].length
    
      fields.map(function(a){
        if (a.length !== numColumns) {
          throw new Error("The number of columns must be the same in every row")
        }
      })
    
      var columnCentered = ''
      while (numColumns--){
        columnCentered += 'c'
      }
      var precise = fields.map(function(a, i) {
        return a.map(function (b) {
          var line = ''
          
          if (i === 0) {
            line += '\\bfseries '
          }
          
          var testbNumber = b.match(/[0-9.]+/g)
          if (testbNumber === null || testbNumber.length > 1 || precision === '-1'){
            line += b
          } else {
            line += parseFloat(b).toFixed(precision).toString()
          }
          return line
        }).join(' & ') + '\\\\'
      })
    
      precise.unshift('\\toprule')
      precise.unshift('\\begin{tabular}{' + columnCentered + '}')
      precise.splice(3, 0, '\\midrule')
      precise.push('\\bottomrule')
      precise.push('\\end{tabular}')
    
      return precise.join('\n')
    }
  }
})();
