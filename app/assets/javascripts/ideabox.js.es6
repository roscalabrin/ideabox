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
    this.addReloadEditListener()
  }

  searchForm() {
    $('.search-form').append(
      ` 
        <input type="text" name="search" class="search-idea" placeholder="Search Ideas"> 
       `
    )
  }
  
  newIdeaForm() {
    $('.new-idea-container').append(
      ` 
        <input type="text" name="title" class="new-idea-title" placeholder="Title">
        <input type="text" name="body" class="new-idea-body" placeholder="Body">
        <button class="create-idea btn btn-secondary">Save</button>
       `
    )
  }

  createIdea() {
    const title   = $('.new-idea-title').val();
    const body    = $('.new-idea-body').val();
    const quality = $('.new-idea-quality').val();
    const idea    = {
      title: title,
      body: body
    }
    this.requestCreate(idea);
  }
  
  addCreateListener() {
    $('#parent').on('click', '.create-idea', (e) => {
      this.createIdea()
    })
  }
  addDeleteListener() {
    $('#parent').on('click', '.delete-idea', (e) => {
      const ideaId = e.target.closest('.idea-details').id
      this.requestDelete(ideaId)
    })
  }

  addReloadEditListener() {
    $('#parent').on('click', '[contenteditable=true]', function() {
      let id = $(this).siblings('.delete-idea').data().id
      $.ajax({
        type: "GET",
        url: `api/v1/ideas/${id}`,
        data: {id: id},
        success: response => success(response)
      })
      function success(data) {
        $(`#${data.id}-quality`).text(`${data.quality}`)
      }
    })
  }
  
  addEditListener() {
    $('#parent').on('keypress', '[contenteditable=true]', (e) => {
      if ( event.which === 13 ) {
        this.captureContent(e)  
      } 
    })
    
    $('#parent').on('blur', '[contenteditable=true]', (e) => {
      this.captureContent(e)
    })
  }
  
  captureContent(e) {
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
  
  addQualityUpListener() {
    $('#parent').on('click', '.quality-up', (e) => {
      const ideaId = e.target.closest('.idea-details').id
      this.requestUpdate(ideaId, "quality", "increase")
    })
  }
  
  addQualityDownListener() {
    $('#parent').on('click', '.quality-down', (e) => {
      const ideaId = e.target.closest('.idea-details').id
      this.requestUpdate(ideaId, "quality", "decrease")
    })
  }

  addSearchListener() {
    $('#parent').on('keyup', '.search-idea', (e) => {
      const criteria = $('.search-idea').val()
      this.search.filterIdeas()
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