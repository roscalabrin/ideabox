class IdeasIndex {
  getIdeas () {
    $.getJSON('api/v1/ideas')
      .then(function(data) {
        $('.ideas-container').append(
          data.map(idea => {
             return (`
              <div id=${idea.id}>
                <h4>${idea.title}</h4>
                <p>${idea.body}</p>
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
