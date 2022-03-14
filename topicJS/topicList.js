let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);

let dateString = year + '-' + month  + '-' + day;

const topics = [
  {
    id: 1,
    title: "test",
    description: "test",
    age: 0,
    createAt: dateString,
  },
  {
    id: 2,
    title: "test",
    description: "test",
    age: 0,
    createAt: dateString,
  },
]

// let getTopics = fetch("http://localhost:8080/topic").then((req) => { setTopics(req.data)});
// console.log(getTopics);


$.each(topics, function(index, topic) {
  appendTopicTable(topic);
});


function appendTopicTable(topic) {
  $("#topicList").append(`<tr>
            <td>${topic.id}</td>
            <td><a href="./detail.html/${topic.id}">${topic.title}</a></td>
            <td>${topic.age}</td>
            <td>${topic.createAt}</td>
            <td><button type='button' 
            onclick='topicDelete(this);'>X</button>
        </tr>`);
}

function topicDelete(ctl) {
  $(ctl).parents("tr").remove();
}

$("#addTopic").on("submit", function(e) {
  e.preventDefault();
  let topic = {
    createAt: dateString,
  };

  $('input[name="title"]').val().trim();
  $('input[name="age"]').val().trim();
  $('input[name="desc"]').val().trim();

  $("#addTopic").serializeArray().map(function(data) {
      topic[data.name] = data.value;
  });
  
  let lastTopic = topics[Object.keys(topics).sort().pop()];
  topic.id = lastTopic.id + 1;

  addTopic(topic);
  formClear();
});

function addTopic(topic) {
  topics.push(topic);
  appendTopicTable(topic);
}

function formClear() {
  $('input[name="title"]').val("");
  $('input[name="age"]').val("");
  $('input[name="desc"]').val("");
}

