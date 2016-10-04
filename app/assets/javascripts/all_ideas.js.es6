class AllIdeas {
  getIdeas () {
    $.getJSON('api/v1/ideas')
      .then(function(data) {
        $('.ideas-container').append(
          data.map(idea => {
             return (`
              <div>
                <h4>${idea.title}</h4>
                <p>${idea.body}</p>
                <p><em>${idea.quality}</em></p>
                <br>
              </div>
              `)
            }).join('')
        );
      })
  }
}
