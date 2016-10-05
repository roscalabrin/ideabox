class IdeaBox {
  constructor() {
    this.request = new AjaxRequest()
    this.ideas = new IdeasIndex()
    this.ideas.getIdeas()
    this.newIdeaForm()
    this.addCreateListener()
    this.addDeleteListener()
    this.addEditListener()
    this.addQualityUpListener()
    this.addQualityDownListener()
  }

  newIdeaForm() {
    $('.new-idea-container').append(
      ` 
        Title:<input type="text" name="title" class="new-idea-title">
        Body:<input type="text" name="body" class="new-idea-body">
        <button class="create-idea">Save</button>
       `
    )
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

  addEditListener () {
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
  
  addQualityUpListener () {
    $('#parent').on('click', '.glyphicon-thumbs-up', (e) => {
      var ideaId = e.target.closest('.idea-details').id
      this.requestUpdate(ideaId, "quality", "increase")
    })
  }
  
  addQualityDownListener () {
    $('#parent').on('click', '.glyphicon-thumbs-down', (e) => {
      var ideaId = e.target.closest('.idea-details').id
      this.requestUpdate(ideaId, "quality", "decrease")
    })
  }
  
  requestCreate(idea) {
    this.request.createIdea(idea)
  }
  
  requestDelete(ideaId) {
    this.request.deleteIdea(ideaId)
  }
  
  requestUpdate(ideaId, contentType, content) {
    this.request.updateIdea(ideaId, contentType, content)
  }
  
  requestQuality(ideaId) {
    this.request.updateQuality(ideaId)
  }

}