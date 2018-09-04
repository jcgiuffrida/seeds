module.exports = (_ => {

  function renderActiveTab() {
    if (isPath('people')){
      $('.navbar-nav .people').addClass('active')
    } else if (isPath('conversations')){
      $('.navbar-nav .conversations').addClass('active')
    }
  }

  const regex = {
    people: /^\/people\//,
    conversations: /^\/conversations\//,
    personDetail: /^\/people\/[\w-]+\//,
    personEdit: /^\/people\/([\w-]+\/)?[(edit)|(add)]\//,
    conversationEdit: /^\/conversations\/(\w{3,}\/)?(edit|add)\//,
  }

  function isPath(page, path = window.location.pathname) {
    return regex[page].test(path)
  }

  function init(){
    renderActiveTab()
  }

  return {
    init,
    isPath,
  }

})()