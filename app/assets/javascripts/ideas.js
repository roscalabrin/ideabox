$(document).ready(function() {
  getIdeas();
  
  function getIdeas () {
    return $.getJSON('api/v1/ideas');
  }
  
})


