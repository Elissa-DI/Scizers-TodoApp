var tasks = [];
var users = [];

function addUser() {
    var username = document.getElementById("username").value;
    if (username !== "") {
        users.push({username: username});
        document.getElementById("username").value = "";
        displayTasks();
        document.getElementById("ren-username").textContent = "Username: " + username;
    } else {
        alert("Please enter a username.");
    }
}
function addTask(e) {
    var taskName = document.getElementById("task-name").value;
    var dueDate = document.getElementById("due-date").value;
    if (taskName !== "" && dueDate !== "") {
        tasks.push({name: taskName, dueDate: dueDate, status: "pending"});
        document.getElementById("task-name").value = "";
        document.getElementById("due-date").value = "";
        displayTasks();
        e.preventDefault();
    } else {
        alert("Please enter a task name and due date.");
    }
}
function displayTasks() {
    var taskList = document.getElementById("task-list");
    var userList = document.getElementById("ren-username");
    taskList.innerHTML = "<tr><th>Task Name</th><th>Due Date</th><th>Status</th><th>Action</th></tr>";
    userList.innerHTML = "<p></p>";
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var user = users[i];
        var row = document.createElement("tr");
        var userL = document.createElement("p");
        row.innerHTML = "<td>" + task.name + "</td><td>" + task.dueDate + "</td><td class='" + task.status + "'>" + task.status + "</td><td><button onclick='deleteTask(" + i + ")' class='delete-btn'>Delete</button><button onclick='editTask(" + i + ")' class='edit-btn'>Edit</button><button onclick='changeTaskStatus(" + i + ")' class='mark-btn'>" + (task.status === "pending" ? "completed" : "pending") + "</button></td>";
        taskList.appendChild(row);
    }
}
function deleteTask(index) {
        tasks.splice(index, 1);
        displayTasks();
    }
function editTask(index) {
    var task = tasks[index];
    var newTaskName = prompt("Enter a new name for this task:", task.name);
    var newDueDate = prompt("Enter a new due date for this task:", task.dueDate);
    if (newTaskName !== "" && newDueDate !== "") {
        task.name = newTaskName;
        task.dueDate = newDueDate;
        displayTasks();
    } else {
        alert("Please enter a task name and due date.");
    }
}

function changeTaskStatus(index) {
    var task = tasks[index];
    task.status = (task.status === "pending" ? "completed" : "pending");
    displayTasks();
}
function filterTasks() {
    var filterTaskName = document.getElementById("filter-task-name").value.toLowerCase();
    var filterStatus = document.getElementById("filter-status").value.toLowerCase();
    var filterDueDate = document.getElementById("filter-due-date").value;
    var taskTable = document.getElementById("task-list");
    var rows = taskTable.getElementsByTagName("tr");
    
    for (var i = 1; i < rows.length; i++) {
      var taskName = rows[i].getElementsByTagName("td")[0].textContent.toLowerCase();
      var dueDate = rows[i].getElementsByTagName("td")[1].textContent;
      var status = rows[i].getElementsByTagName("td")[2].textContent.toLowerCase();
      
      if (taskName.includes(filterTaskName) && status.includes(filterStatus) && (filterDueDate == "" || dueDate == filterDueDate)) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
displayTasks(filterTasks);

//Highlight searched task
function highlightSearchedTask(taskName) {
    var taskNameCells = document.getElementsByClassName("task-name");
    for (var i = 0; i < taskNameCells.length; i++) {
      var cell = taskNameCells[i];
      var text = cell.textContent.toLowerCase();
      if (text.includes(taskName)) {
        cell.style.backgroundColor = "red";
      } else {
        cell.style.backgroundColor = "white";
      }
    }
  }