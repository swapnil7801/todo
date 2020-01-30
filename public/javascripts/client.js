
let userData;
$(document).ready(function () {
  userData = getSession('token')
  if (userData) {
    $("#userEmail").html(userData.email);
  }
  getTodo()

})
function deleteTask(todoId) {
  $.ajax({
    url: `api/todo/${todoId}`,
    cache: false,
    headers: {
      'Authorization': `Basic ${userData.token} `,
      'Content-Type': 'application/json'
    },
    contentType: 'application/json',
    processData: false,
    method: 'DELETE',
    type: 'DELETE', // For jQuery < 1.9
    success: function (data) {
      console.log("removed", data)
      $(`#${todoId}`).remove();
    },
    error: function (data) {
      console.log("error", data.responseJSON)
    }
  });
}
function formatDate(dt) {
  const currentDate = new Date(dt);
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  return (month + 1) + "/" + date + "/" + year;
}
function showTask(todoId) {
  $.ajax({
    url: `api/todo/${todoId}`,
    cache: false,
    headers: {
      'Authorization': `Basic ${userData.token} `,
      'Content-Type': 'application/json'
    },
    contentType: 'application/json',
    processData: false,
    method: 'GET',
    type: 'GET', // For jQuery < 1.9
    success: function (data) {
      $('#taskDetails').html(`
       <tr>
       <td>${data.name}</td>
       <td>${data.description}</td>
       <td>${formatDate(data.createdAt)}</td>
     </tr> `);
    },
    error: function (data) {
      console.log("error", data.responseJSON)
    }
  });
}
function getTodo() {
  if (!userData) return null;
  $.ajax({
    url: `/api/todo/list/${userData.id}`,
    cache: false,
    headers: {
      'Authorization': `Basic ${userData.token} `,
      'Content-Type': 'application/json'
    },
    contentType: 'application/json',
    processData: false,
    method: 'GET',
    type: 'GET', // For jQuery < 1.9
    success: function (data) {
      data.forEach(el => {
        $('#taskList').append(`
        <li class="list-group-item" id=${el._id}>${el.name}  
           <button  style="float: right"  onclick="showTask('${el._id}')"> Get Details  </button>
           <button  style="float: right"  onclick="deleteTask('${el._id}')"> Delete Task </button>
           </li>    
      `);
      });
    },
    error: function (data) {
      console.log("error", data.responseJSON)
    }
  });
}
function addTask() {
  const taskName = $('#taskName').val()
  const taskDesc = $('#taskDesc').val()
  if (!(taskName && taskDesc)) {
    $('#addTaskDetails').html(`Please enter  Name and Description`)
    return null
  }
  const postData = { name: taskName, description: taskDesc }
  postData.userId = userData.id
  $.ajax({
    url: '/api/todo',
    data: JSON.stringify(postData),
    cache: false,
    headers: {
      'Authorization': `Basic ${userData.token} `,
      'Content-Type': 'application/json'
    },
    contentType: 'application/json',
    processData: false,
    method: 'POST',
    type: 'POST', // For jQuery < 1.9
    success: function (data) {
      $('#addTaskDetails').html(``)
      $('#taskName').val("")
      $('#taskDesc').val("")
      console.log("data", data)
      console.log("success", data._id, data.name)
      $('#taskList').append(`
      <li class="list-group-item" id=${data._id}>${data.name} 
      <button  style="float: right"  onclick="showTask('${data._id}')"> Get Details  </button>
      <button  style="float: right"  onclick="deleteTask('${data._id}')"> Delete Task </button>
      </li> 
		`);
    },
    error: function (data) {
      console.log("error", data.responseJSON)
    }
  });
}
function logout() {
  removeSession('token')
  window.location.href = '/';
}

function login() {
  const email = $('#email').val()
  const password = $('#password').val()
  const postData = { email, password }
  $.ajax({
    url: 'http://localhost:3000/api/auth/login',
    data: JSON.stringify(postData),
    cache: false,
    contentType: 'application/json',
    processData: false,
    method: 'POST',
    type: 'POST', // For jQuery < 1.9
    success: function (data) {
      console.log("data", data)
      console.log("success", data)
      const token = {
        token: data.token,
        id: data.result._id,
        email: data.result.email
      }
      setSession('token', token)
      window.location.href = '/home';
    },
    error: function (data) {
      console.log("error", data.responseJSON)
    }
  });
}



function setSession(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
function getSession(key) {
  return JSON.parse(window.localStorage.getItem(key));
}
function removeSession(key) {
  localStorage.removeItem(key);
}