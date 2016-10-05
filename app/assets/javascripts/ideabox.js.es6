class IdeaBox {
  constructor() {
    this.request = new AjaxRequest()
    this.ideas = new IdeasIndex()
    this.ideas.getIdeas()
    this.newIdeaForm()
    this.addCreateListener()
    this.addDeleteListener()
    this.addEditTitleListener()
  }

  newIdeaForm() {
    $('.new-idea-container').append(
      ` 
        Title:<input type="text" name="title" class="new-idea-title">
        Body:<input type="text" name="body" class="new-idea-body">
        <button class="create-idea">Save</button>
       `
    )
    // $('.create-idea').on('click', this.createIdea);
  }

  createIdea () {
    var title = $('.new-idea-title').val();
    var body = $('.new-idea-body').val();
    var quality = $('.new-idea-quality').val();
    var idea = {
      title: title,
      body: body
    }
    this.requestCreate(idea);
    // $.ajax({
    //   type: "POST",
    //   url: "api/v1/ideas",
    //   data: idea,
    //   success: response => success(response)
    // })
    // 
    // function success(data) {
    //   $('input').val("");
    //   $('.new-idea-quality').val("");
    //   
    //   $('.ideas-container').prepend(
    //     `<div id=${data.id} class="idea-details">
    //       <h4 contenteditable="true">${title}</h4>
    //       <p contenteditable="true">${body}</p>
    //       <p><em>${quality}</em></p>
    //       <button data-id="${data.id}" class="delete-idea btn btn-default">
    //         <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
    //       </button>
    //       <button type="button" class="btn btn-default" aria-label="thumbs up">
    //         <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
    //       </button>
    //       <button type="button" class="btn btn-default" aria-label="thumbs up">
    //         <span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>
    //       </button>
    //       <br>
    //     </div>
    //     <br>`
    //   )
    // }
  }
  
  addCreateListener () {
    $('#parent').on('click', '.create-idea', (e) => {
      this.createIdea()
    })
  }
  addDeleteListener () {
    $('#parent').on('click', '.delete-idea', (e) => {
      var ideaId = e.target.closest('.idea-details').id
      this.requestDelete(ideaId)
    })
  }

  addEditTitleListener () {
    $('#parent').on('keypress', '[contenteditable=true]', (e) => {
      if ( event.which === 13 ) {
        var content = e.target.tagName
        var ideaId = e.target.closest('.idea-details').id
        if (content === 'H4') {
          var ideaTitle = $(e.target).text()
          this.requestUpdate(ideaId, "title", ideaTitle)
        } else {
          var ideaBody = $(e.target).text()
          this.requestUpdate(ideaId, "body", ideaBody)
        }
      }    
    })
    $('#parent').on('blur', '[contenteditable=true]', (e) => {
      var content = e.target.tagName
      var ideaId = e.target.closest('.idea-details').id
      if (content === 'H4') {
        var ideaTitle = $(e.target).text()
        this.requestUpdate(ideaId, "title", ideaTitle)
      } else {
        var ideaBody = $(e.target).text()
        this.requestUpdate(ideaId, "body", ideaBody)
      }
    })
  }
  
  requestCreate(idea) {
    this.request.createIdea(idea)
  }
  
  requestDelete(ideaId) {
    this.request.deleteIdea(ideaId)
  }
  
  requestUpdate(ideaId, contentType, content) {
    this.request.updateTitle(ideaId, contentType, content)
  }

}