$(document).ready(function() {
  getIdeas();
  
  function getIdeas () {
    var request = $.getJSON('api/v1/ideas')
      .then(function(data) {
        $('.ideas-container').append(formatIdeas(data));
    })
  }
  
  function formatIdeas(data) {
    return data.map(idea => {
      return `<div>
                <h4>${idea.title}</h4>
                <p>${idea.body}</p>
              </div>`
    })
  }

})


