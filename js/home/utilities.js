module.exports = (_ => {

  function renderActiveTab() {
    if (isPath('people')){
      $('.navbar-nav .people').addClass('active')
    } else if (isPath('connections')){
      $('.navbar-nav .connections').addClass('active')
    }
  }

  const regex = {
    people: /^\/people\//,
    connections: /^\/connections\//,
    personDetail: /^\/people\/[\w-]+\//,
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
