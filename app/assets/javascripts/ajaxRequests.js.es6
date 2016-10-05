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
  
  updateTitle(id, title) {
    $.ajax({
      type: "PUT",
      url: `api/v1/ideas/${id}`,
      data: {title: title},
      // success: response => success(response)
    })
    // function success(data) {
    //   // console.log($(`#${data} h4`).text())
    // }
  }
  
}