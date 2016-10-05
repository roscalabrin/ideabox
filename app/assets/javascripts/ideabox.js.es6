class IdeaBox {
  constructor() {
    this.request = new AjaxRequest()
    this.ideas = new IdeasIndex()
    this.ideas.getIdeas()
    this.newIdeaForm()
    this.addDeleteListener()
  }

  newIdeaForm() {
    $('.new-idea-container').append(
      ` 
        Title:<input type="text" name="title" class="new-idea-title">
        Body:<input type="text" name="body" class="new-idea-body">
        Quality:<select name="quality" class="new-idea-quality">
          <option value="">Select one option</option>
          <option value="genius">genius</option>
          <option value="plausible">plausible</option>
          <option value="swill">swill</option>
        </select>
        <button class="create-idea">Save</button>
       `
    )
    $('.create-idea').on('click', this.createIdea);
  }

  createIdea () {
    var title = $('.new-idea-title').val();
    var body = $('.new-idea-body').val();
    var quality = $('.new-idea-quality').val();
    var idea = {
      title: title,
      body: body,
      quality: quality
    }
    $.ajax({
      type: "POST",
      url: "api/v1/ideas",
      data: idea,
      success: response => success(response)
    })
  
    function success(data) {
      $('input').val("");
      $('.new-idea-quality').val("");
      
      $('.ideas-container').prepend(
        `<div id=${data.id}>
          <h4>${title}</h4>
          <p>${body}</p>
          <p><em>${quality}</em></p>
          <button data-id="${data.id}" class="delete-idea">Delete</button>
          <br>
        </div>`
      )
    }
  }
  
  addDeleteListener () {
    $('#parent').on('click', '.delete-idea', function (e) {
      var elem = this;
      // this.requestDelete(elem.dataset.id)
      $.ajax({
        type: "DELETE",
        url: `api/v1/ideas/${elem.dataset.id}`,
        success: response => success(response)
      })
      function success(data) {
        document.getElementById(data).remove()
      }
    })
    
  }
    
  // requestDelete(id) {
  //   this.request.deleteIdea(id)
  // }
  
  
  
  

}