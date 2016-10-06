class IdeaBox {
  constructor() {
    this.request = new AjaxRequest()
    this.ideas   = new IdeasIndex()
    this.search  = new SearchIndex()
    this.ideas.getIdeas()
    this.newIdeaForm()
    this.searchForm()
    this.addCreateListener()
    this.addDeleteListener()
    this.addEditListener()
    this.addQualityUpListener()
    this.addQualityDownListener()
    this.addSearchListener()
    this.addShowLessListener()
    this.addShowMoreListener()
  }

  searchForm() {
    $('.search-form').append(
      ` 
        Search Ideas <input type="text" name="search" class="search-idea"> 
       `
    )
  }
  
  newIdeaForm() {
    $('.new-idea-container').append(
      ` 
        Title <input type="text" name="title" class="new-idea-title">
        Body <input type="text" name="body" class="new-idea-body">
        <button class="create-idea btn btn-secondary">Save</button>
       `
    )
  }

  createIdea() {
    const title = $('.new-idea-title').val();
    const body = $('.new-idea-body').val();
    const quality = $('.new-idea-quality').val();
    const idea = {
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
      const ideaId = e.target.closest('.idea-details').id
      this.requestDelete(ideaId)
    })
  }

  addEditListener () {
    $('#parent').on('keypress', '[contenteditable=true]', (e) => {
      if ( event.which === 13 ) {
        const content = e.target.tagName
        const ideaId = e.target.closest('.idea-details').id
        if (content === 'H4') {
          const ideaTitle = $(e.target).text()
          this.requestUpdate(ideaId, "title", ideaTitle)
        } else {
          const ideaBody = $(e.target).text()
          this.requestUpdate(ideaId, "body", ideaBody)
        }
      }    
    })
    $('#parent').on('blur', '[contenteditable=true]', (e) => {
      const content = e.target.tagName
      const ideaId = e.target.closest('.idea-details').id
      if (content === 'H4') {
        const ideaTitle = $(e.target).text()
        this.requestUpdate(ideaId, "title", ideaTitle)
      } else {
        const ideaBody = $(e.target).text()
        this.requestUpdate(ideaId, "body", ideaBody)
      }
    })
  }
  
  addQualityUpListener () {
    $('#parent').on('click', '.quality-up', (e) => {
      const ideaId = e.target.closest('.idea-details').id
      this.requestUpdate(ideaId, "quality", "increase")
    })
  }
  
  addQualityDownListener () {
    $('#parent').on('click', '.quality-down', (e) => {
      const ideaId = e.target.closest('.idea-details').id
      this.requestUpdate(ideaId, "quality", "decrease")
    })
  }

  addSearchListener () {
    $('#parent').on('keyup', '.search-idea', (e) => {
      const criteria = $('.search-idea').val()
      this.search.filterIdeas()
    })
  }
  
  addShowMoreListener () {
    $('#parent').on('click', '.btn-more', (e) => {
      console.log("hi")
      $(this).parent().addClass('hide')
      $(this).parent().siblings('.idea-body').toggleClass('hide')
    })
  }
  
  addShowLessListener () {
    $('#parent').on('click', '.btn-less', (e) => {
      $(this).parent().addClass('hide')
      $(this).parent().siblings('.idea-body-short').removeClass('hide')
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