let topicId = new URL(window.location.href).searchParams.get("id");
let id = Number(topicId)
fetch(`http://localhost:8080/topic/${id}`).then((res) => { return res.json() } ).then((topic) =>  { 
    $("#updateTopicDiv").append(`<form id="editTopic">
    <label> Title: 
        <input  type="text" name="title" placeholder="${topic.title}" required>
    </label>
    </br>
    <label> AGE: 
        <input  type="number" name="age"  max= "100" placeholder="${topic.age}" required>
    </label>
    </br>
    <label> Description: 
        <input  type="text" name="desc" placeholder="${topic.description}" required>
    </label>
    </br>
    <button type="submit">수정</button>
</form>`);
});

$("#editTopic").on("submit", function(e) {
    e.preventDefault();
  
    let topic = {
        id: id,
        title : $('input[name="title"]').val().trim(),
        age : $('input[name="age"]').val().trim(),
        description : $('input[name="desc"]').val().trim(),
        createAt: new Date(),
    };
  
    fetch(`http://localhost:8080/topic/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(topic)
    });
});
  

