class AjaxRequest {
  
  deleteIdea(id) {
    $.ajax({
      type: "DELETE",
      url: `api/v1/ideas/${id}`,
      success: response => success(response)
    })
    function success(data) {
      document.getElementById(data).remove()
    }
  }
  
  updateIdea(id, type, content) {
    $.ajax({
      type: "PUT",
      url: `api/v1/ideas/${id}`,
      data: {type: type, content: content},
      success: response => success(response)
    })
    function success(data) {
      $(`#${data.id}-quality`).text(`${data.quality}`)
    }
  }
  
  createIdea(idea) {
    $.ajax({
      type: "POST",
      url: "api/v1/ideas",
      data: idea,
      success: response => success(response)
    })
    
    function success(data) {
      $('input').val("");
      $('.new-idea-quality').val("");
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
      $('.ideas-container').prepend(
        `<div id=${data.id} class="idea-details col-sm-4">
          <h4 class="idea-title" contenteditable="true">${idea.title}</h4>
          <p class="idea-body" contenteditable="true">${truncateBody(idea.body)}</p>
          <p id="${data.id}-quality"><em>${data.quality}</em></p>
          <button data-id="${data.id}" class="delete-idea btn btn-default">
            <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </button>
          <button type="button" class="quality-up btn btn-default" aria-label="thumbs up">
            <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
          </button>
          <button type="button" class="quality-down btn btn-default" aria-label="thumbs down">
            <span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>
          </button>
        </div>`
      )
    }
  }
  
}