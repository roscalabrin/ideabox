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
                <p><em>${idea.quality}</em></p>
                <button data-id="${idea.id}" class="delete-idea">Delete</button>
                <br>
              </div>
              `)
            }).join('')
        );
      })
  }
}
