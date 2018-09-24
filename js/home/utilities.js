module.exports = (_ => {

  function renderActiveTab() {
    if (isPath('people')){
      $('.navbar-nav .people').addClass('active')
    } else if (isPath('conversations')){
      $('.navbar-nav .conversations').addClass('active')
    }
  }

  const regex = {
    dashboard: /^\/dashboard\//,
    people: /^\/people\//,
    personList: /^\/people\/$/,
    conversations: /^\/conversations\//,
    conversationList: /^\/conversations\/$/,
    personDetail: /^\/people\/[\w-]+\//,
    personEdit: /^\/people\/([\w-]+\/)?(edit|add)\//,
    conversationEdit: /^\/conversations\/(\w{3,}\/)?(edit|add)\//,
    conversationCreate: /^\/conversations\/add\//,
  }

  function isPath(page, path = window.location.pathname) {
    return regex[page].test(path)
  }

  function init(){
    renderActiveTab()
    $('form').on('submit', function(){
      $(this).find('a.btn.submit, button[type="submit"], input[type="submit"]').prop('disabled', true);
    });
  }

  return {
    init,
    isPath,
  }

})()
