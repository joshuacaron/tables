(function() {
  'use strict';

  angular
    .module('tables')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
