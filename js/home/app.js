import $ from 'jquery';
import 'select2';
import util from './utilities.js';

const home = (_ => {
  function init(){
    util.init()

    if (util.isPath('personEdit')){
      $(() => {
        initSelect2();
      });
    } else if (util.isPath('conversationEdit')){
      $(() => {
        initSelect2();
        var $select = $('select[name="people"]');
        if (util.isPath('conversationCreate') && !$('select[name="people"]').val().length){
          console.log('create')
          $('select[name="people"]').select2('open').select2('focus')
        } else {
          $('input[name="summary"]').select().focus()
        }
        if (['one on one', 'in group'].indexOf($('select[name="mode"]').val()) !== -1){
          $('input[name="location"]').attr('type', 'text').addClass('form-control')
        }
        $('select[name="mode"]').on('change', function(){
          if (['one on one', 'in group'].indexOf($(this).val()) !== -1){
            $('input[name="location"]').attr('type', 'text').addClass('form-control')
          } else {
            $('input[name="location"]').attr('type', 'hidden').val('')
          }
        })
      });
    } else if (util.isPath('personList') || util.isPath('conversationList')){
      initSelect2();
      $('button.sector').on('click', function(){
        let $form = $(this).closest('form')
        
        // Translate sector buttons into form inputs
        $form.find('button.sector')
          .removeClass('btn-secondary')
          .addClass('btn-outline-info')
        $(this)
          .removeClass('btn-outline-info')
          .addClass('btn-secondary');
        $form.find('input[name="sector"]')
          .val($(this).data('sector'))
        $form.find('button[type="submit"]')
          .removeClass('btn-outline-info')
          .addClass('btn-info');
      })
    }
  }

  function initSelect2(){
    $('select.select2-enable').select2({width: '100%'});
    $('select.select2-enable').each((i, e) => {
      var element = $(e);
      var options = { };
      var control = element.select2(options);
    
      if (control.first().prop("multiple")){
        control.next().keyup(function (e) {
          if (e.keyCode === 13) // enter
            control.select2("open");
        });
      }
    });
  }

  return {
    init
  }
})()

home.init()
