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
        <button class="create-idea btn btn-secondary">Save</button>
       `
    )
  }

  createIdea () {
    let title = $('.new-idea-title').val();
    let body = $('.new-idea-body').val();
    let quality = $('.new-idea-quality').val();
    let idea = {
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
      let ideaId = e.target.closest('.idea-details').id
      this.requestDelete(ideaId)
    })
  }

  addEditListener () {
    $('#parent').on('keypress', '[contenteditable=true]', (e) => {
      if ( event.which === 13 ) {
        let content = e.target.tagName
        let ideaId = e.target.closest('.idea-details').id
        if (content === 'H4') {
          let ideaTitle = $(e.target).text()
          this.requestUpdate(ideaId, "title", ideaTitle)
        } else {
          let ideaBody = $(e.target).text()
          this.requestUpdate(ideaId, "body", ideaBody)
        }
      }    
    })
    $('#parent').on('blur', '[contenteditable=true]', (e) => {
      let content = e.target.tagName
      let ideaId = e.target.closest('.idea-details').id
      if (content === 'H4') {
        let ideaTitle = $(e.target).text()
        this.requestUpdate(ideaId, "title", ideaTitle)
      } else {
        let ideaBody = $(e.target).text()
        this.requestUpdate(ideaId, "body", ideaBody)
      }
    })
  }
  
  addQualityUpListener () {
    $('#parent').on('click', '.quality-up', (e) => {
      let ideaId = e.target.closest('.idea-details').id
      this.requestUpdate(ideaId, "quality", "increase")
    })
  }
  
  addQualityDownListener () {
    $('#parent').on('click', '.quality-down', (e) => {
      let ideaId = e.target.closest('.idea-details').id
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
