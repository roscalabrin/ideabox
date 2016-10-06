class SearchIndex {
  
  filterIdeas() {
    const titlesDiv = Array.from(document.getElementsByClassName('idea-details'))
    titlesDiv.map(function(idea) {
      const criteria = $('.search-idea').val()

      if ($(idea).find('.idea-title').text().includes(criteria)) {
        $(idea).closest('.idea-details').removeClass("hide")
      } else if ($(idea).find('.idea-body').text().includes(criteria)) {
        $(idea).closest('.idea-details').removeClass("hide")
      } else {
        $(idea).closest('.idea-details').toggleClass("hide")
      }
      //   debugger
      //   if ($(idea).find('.idea-body').text() === undefined) {
      //     console.log("remove")
      //   } else {  
      //   }
      // } else {  
      // }
      // if ($(idea).text().includes(criteria)) {
      //   // nothing
      // } else {
      //     const criteria = $('.search-idea').val()
      //     if ($(idea).text().includes(criteria)) {
      //       // nothing
      //     } else {
      //     console.log($(idea))  
      //     }
      })
    
  }
    
}