class IdeasIndex {
  getIdeas() {
    $.getJSON('api/v1/ideas')
      .then(function(data) {
        $('.ideas-container').append(
          data.map(idea => {
            let shortBody = $.trim(idea.body).substring(0, 10)
             return (`
              <div id=${idea.id} class="idea-details col-sm-4">
                <h4 class="idea-title" contenteditable="true">${idea.title}</h4>
                <p class="idea-body-short">${shortBody} <a href="#" class="btn-more">More</a></p>
                
                <p class="hide idea-body" contenteditable="true">${idea.body} <a href="#" class="btn-more">Less</a>
                <p id="${idea.id}-quality"><em>${idea.quality}</em></p>
                
                <button data-id="${idea.id}" class="delete-idea btn btn-default">
                  <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                </button>
                
                <button type="button" class="quality-up btn btn-default" aria-label="thumbs up">
                  <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
                </button>
                
                <button type="button" class="quality-down btn btn-default" aria-label="thumbs down">
                  <span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>
                </button>
                <br>
              </div>
              `)
            }).join('')
        );
      })
  }
  
  stringTruncate(string, length) {
    if (string.length > length) {
      return string.substr(0, string.lastIndexOf(' ', length)) + " ...";
    } else {
      return string;
    }
  }
}