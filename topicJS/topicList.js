let topics = [];

// ----------- topic 목록 -----------

// 조회버튼을 클릭 했을때... 조회조건에 해당되되는 topic 목록을 서버 rest api를 호출하여 화면에 출력한다.
$("#searchBtn").on("click", function(){
  getTopicList();
});

// 1. 화면에 입력된 조회조건을 구하여 rest api 파라미터로 설정한다.
  // TODO 조회조건 없이 프로그램이 정상 작동되면 제목을 조건으로 조회 되도록 해보자.

  // 2. 파라미터가 설정된 rest api를 호출한 결과로 topic 목록을 구한다.
const getTopicList = async() =>{ const res = await fetch('http://localhost:8080/topic');
  const topicsDate = await res.json();
    // 3.1. 기존 화면에 출력된 topic 목록을 화면에서 재거한다.
    for (let trLen = $("#topicTable tr").length; trLen > 1; trLen--) {
      $("#topicTable > tbody:last > tr:last").remove();
    }
    try{
      // 3. 결과로 구해진 topic 목록을 화면에 출력한다.
      topics = topicsDate;
      topics.forEach(topic => { appendTopicTable(topic) })
    }
    catch(err){
    // 2.1. 만약 topic 목록 조회를 실패한 경우 실패 사유가 포힘된 메시지를 화면에 뛰운다.  
    alert("topic 목록 조회를 실패하였습니다. 제시도 해주세요.");
  };
}


// 신규버튼을 클릭 했을때... topic 등록 화면을 보여준다.
$("#createBtn").on("click", function(){
  // 1. topic 등록 화면에 해당되는 div 디스플레이 스타일을 block으로 설정하여 화면에 보이개 한다.
  $("#createTopicDiv").show();
});

function appendTopicTable(topic) {
  $("#topicList").append(`<tr>
            <td>${topic.id}</td>
            <td><a id="detailTopic" href="./detail.html?id=${topic.id}">${topic.title}</a></td>
            <td>${topic.age}</td>
            <td>${topic.createAt}</td>
            <td><button type='button' onclick="location.href='edit.html?id=${topic.id}'");'>수정</button></td>
            <td><button type='button' onclick='topicDelete(${topic.id});'>X</button></td>
        </tr>`);
}



// 삭제 버튼 클릭시 해당되는 topic를 삭제 한다.
function topicDelete(topicId) {
  // 1. 삭제 대상인 topic에 id를 구해서 서버에 삭제 요청 후 결과를 화면에 호출한다.  
  fetch(`http://localhost:8080/topic/${topicId}`,{
    method: "DELETE",
    headers:{'Content-Type': 'application/json'},
  }).then(res => res.json).then(res => {return res});
  getTopicList();
}

// 신규 등록을 위해 rest api 호출하고 실패시 시 실패를 알리는 메시지를 화면에 출력하며
// 성공시에는 rest api를 통해 목록을 조히 하여 화면에 다시 출력한다. 
// ...
$("#addTopic").on("submit", function(e) {
  e.preventDefault();

  let today = new Date();

  let topic = {
    title : $('input[name="title"]').val().trim(),
    age : $('input[name="age"]').val().trim(),
    description : $('input[name="desc"]').val().trim(),
    createAt: today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2)  + '-' + ('0' + today.getDate()).slice(-2),
  };

  fetch('http://localhost:8080/topic',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(topic)
  });
  formClear();
});


function formClear() {
  $('input[name="title"]').val("");
  $('input[name="age"]').val("");
  $('input[name="desc"]').val("");
}

