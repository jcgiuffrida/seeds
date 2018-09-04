import $ from 'jquery';
import 'select2';
import util from './utilities.js';

const home = (_ => {
  function init(){
    util.init()
    if (util.isPath('personDetail')){
      $(() => {
        $('select.select2-enable').select2({width: '100%'});
      });
    }
  }
  return {
    init
  }
})()

home.init()
