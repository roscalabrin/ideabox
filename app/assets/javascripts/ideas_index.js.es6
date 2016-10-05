class IdeasIndex {
  getIdeas () {
    $.getJSON('api/v1/ideas')
      .then(function(data) {
        $('.ideas-container').append(
          data.map(idea => {
             return (`
              <div id=${idea.id} class="idea-details">
                <h4 contenteditable="true">${idea.title}</h4>
                <p contenteditable="true">${idea.body}</p>
                <p id="${idea.id}-quality"><em>${idea.quality}</em></p>
                <button data-id="${idea.id}" class="delete-idea btn btn-default">
                  <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                </button>
                <button type="button" class="btn btn-default" aria-label="thumbs up">
                  <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
                </button>
                <button type="button" class="btn btn-default" aria-label="thumbs up">
                  <span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>
                </button>
                <br>
              </div>
              <br>
              `)
            }).join('')
        );
      })
  }
}