class SearchIndex {
  filterIdeas() {
    const titlesDiv = Array.from(document.getElementsByClassName('idea-details'))
    titlesDiv.map(function(idea) {
      const criteria = $('.search-idea').val().toLowerCase()
      if ($(idea).text().toLowerCase().trim().includes(criteria)) {
        $(idea).closest('.idea-details').removeClass("hide")
      } else {
        $(idea).closest('.idea-details').removeClass("hide")
        $(idea).closest('.idea-details').addClass("hide")
      }
    })
  }    
}