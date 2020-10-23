import $ from 'jquery';
import 'select2';
import util from './utilities.js';
import chart from './chart.js';

const home = (_ => {
  function init(){
    util.init()

    initSearchBar()

    if (util.isPath('dashboard')){
      let chartPeriod = $('.chart').data('period')
      fetch(`/api/trend/?period=${chartPeriod}`)
        .then(data => data.json())
        .then(data => chart.makeChart($('.chart'), data, 
          chartPeriod[0].toUpperCase() + chartPeriod.slice(1)))
    }

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
      $('button.btn-input').on('click', function(){
        let $div = $(this).closest('div')

        // Translate buttons into form inputs
        $div.find('button.btn-input')
          .removeClass('btn-secondary')
          .addClass('btn-outline-info')
        $(this)
          .removeClass('btn-outline-info')
          .addClass('btn-secondary');
        $div.find('input')
          .val($(this).data('value'))
        $div.find('button[type="submit"]')
          .removeClass('btn-outline-info')
          .addClass('btn-info');

        // Submit form
        $(this).closest('form').trigger('submit')
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

  function initSearchBar(){
    $(".navbar-form .api-search").select2({
      ajax: {
        dataType: 'json',
        delay: 150,
        url: "/api/people/",
        minimumInputLength: 1,
        data: function (params) {
          params.term = params.term || '';
          return {
            q: params.term.trim(),
            page: params.page || 1,
          };
        },
        processResults: function(data, params){
          params.page = params.page || 1;
          // add links
          var people = data.people.map(p => {
            p.url = '/people/' + p.id;
            p.text = p.name;
            return p;
          });
          return {
            results: people,
            pagination: {
              more: data.more_results,
            }
          };
        },
      },
      placeholder: '<i class="fas fa-user"></i> Type to find people',
      escapeMarkup: function (markup) { return markup; },
      templateResult: function(d){
        if (d.loading) return 'Loading...';
        return d.name;
      },
      language: {
        errorLoading: function(){ return "Loading..."; },
        noResults: function(){ return "No results found." },
      },
    });

    $('.navbar-form .api-search').on('change', function(e) {
      // Try to handle CTRL+click or middle mouse click (or apple ⌘)
      // from https://stackoverflow.com/questions/16190455/how-to-detect-controlclick-in-javascript-from-an-onclick-div-attribute
      try {
        if (window.event.ctrlKey || window.event.button == 1 || window.event.metaKey){
          // Go to link in new tab
          window.open($(this).select2('data')[0].url);
        } else {
          // Disable select2
          $(this).prop('disabled', true);
          // Go to link
          window.location.href = $(this).select2('data')[0].url;
        }
      } catch (err){
        $(this).prop('disabled', true);
        window.location.href = $(this).select2('data')[0].url;
      }
    });
  }

  return {
    init
  }
})()

home.init()
