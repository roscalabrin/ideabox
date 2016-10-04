$(document).ready(function() {
  getIdeas();
  newIdeaForm();
  createIdea();
  
  function getIdeas () {
    $.getJSON('api/v1/ideas')
      .then(function(data) {
        $('.ideas-container').append(formatIdeas(data));
    })
  }
  
  function formatIdeas(data) {
    return data.map(idea => {
     return (`
      <div>
        <h4>${idea.title}</h4>
        <p>${idea.body}</p>
        <p><em>${idea.quality}</em></p>
        <br>
      </div>
      `)
    }).join('')
  }
  
  function newIdeaForm() {
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
    );
    $('.create-idea').on('click', createIdea);
  }
  
  function createIdea () {
    var title = $('.new-idea-title').val();
    var body = $('.new-idea-body').val();
    var quality = $('.new-idea-quality').val();
    var data = {
      title: title,
      body: body,
      quality: quality
    }
    $.ajax({
      type: "POST",
      url: "api/v1/ideas",
      data: data,
      success: success
    })
    
    function success() {
      $('input').val("");
      $('.new-idea-quality').val("");
      $('.ideas-container').empty();
      getIdeas();
    }
  }
  
})


