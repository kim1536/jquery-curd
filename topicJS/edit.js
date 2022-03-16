// 1. 파라미터러 잔달된 topic를 id, title, age, description를 구한다.
// 2. 구한 값를 form에 적용한다.
// 3. 입력 창에 입력 받은 값을 서버로 전달한다.
// 4. 목록 화면에 이동한다.

let topicId = new URL(window.location.href).searchParams.get("id");
let topicTitle = new URL(window.location.href).searchParams.get("title");
let topicAge = new URL(window.location.href).searchParams.get("age");
let topicDesc = new URL(window.location.href).searchParams.get("desc");
debugger;
$("#updateTopicDiv").append(`<form id="editTopic">
    <label> Title: 
        <input  type="text" name="title" placeholder="${topicTitle}" required>
    </label>
    </br>
    <label> AGE: 
        <input  type="number" name="age"  max= "100" placeholder="${topicAge}" required>
    </label>
    </br>
    <label> Description: 
        <input  type="text" name="desc" placeholder="${topicDesc}" required>
    </label>
    </br>
    <button type="submit">수정</button>
</form>`);



$("#editTopic").on("submit", function(e) {
    e.preventDefault();
  
    let topic = {
        id: topicId,
        title : $('input[name="title"]').val().trim(),
        age : $('input[name="age"]').val().trim(),
        description : $('input[name="desc"]').val().trim(),
        createAt: new Date(),
    };
  
    fetch(`http://localhost:8080/topic/${topicId}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(topic)
    });
    window.history.back();;
});
  

