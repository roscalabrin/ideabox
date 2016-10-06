class IdeasIndex {
  getIdeas() {  
    $.getJSON('api/v1/ideas')
      .then(function(data) {
        $('.ideas-container').append(
          data.map(idea => {
            
            function truncateBody(body) {
              if (body.length <= 100) {
                return body
              } else {
                let newBody = ""
                body.split(' ').forEach(function(word) {
                  if (newBody.length + word.length + 1 < 101) {
                    newBody += (word + " ")
                  }
                })
                return `${newBody} ...`
              }
            }
            
             return (`
              <div id=${idea.id} class="idea-details col-sm-4">
                <h4 class="idea-title" contenteditable="true">${idea.title}</h4>
                
                <p class="idea-body" contenteditable="true">${truncateBody(idea.body)}</p>
                
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
        )
      })
     
  }
}