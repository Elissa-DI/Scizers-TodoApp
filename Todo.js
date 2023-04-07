// Array to store tasks
var tasks = [];

// Function to add a user
function addUser() {
    var username = document.getElementById("username").value;
    if (username !== "") {
        // alert("User " + username + " added successfully.");
        document.getElementById("username").value = "";
    } else {
        alert("Please enter a username.");
    }
}

// Function to add a task
function addTask() {
    var taskName = document.getElementById("task-name").value;
    var dueDate = document.getElementById("due-date").value;
    if (taskName !== "" && dueDate !== "") {
        tasks.push({name: taskName, dueDate: dueDate, status: "pending"});
        document.getElementById("task-name").value = "";
        document.getElementById("due-date").value = "";
        displayTasks();
    } else {
        alert("Please enter a task name and due date.");
    }
}

// Function to display tasks
function displayTasks() {
    var taskList = document.getElementById("task-list");
    taskList.innerHTML = "<tr><th>Task Name</th><th>Due Date</th><th>Status</th><th>Action</th></tr>";
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + task.name + "</td><td>" + task.dueDate + "</td><td class='" + task.status + "'>" + task.status + "</td><td><button onclick='deleteTask(" + i + ")'>Delete</button><button onclick='editTask(" + i + ")'>Edit</button><button onclick='changeTaskStatus(" + i + ")'>Mark " + (task.status === "pending" ? "completed" : "pending") + "</button></td>";
        taskList.appendChild(row);
    }
}

// Function to delete a task
function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        displayTasks();
    }
}

// Function to edit a task
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

// Function to change the status of a task
function changeTaskStatus(index) {
    var task = tasks[index];
    task.status = (task.status === "pending" ? "completed" : "pending");
    displayTasks();
}

// Function to filter tasks
function filterTasks() {
    var taskName = document.getElementById("filter-task-name").value.toLowerCase();
    var status = document.getElementById("filter-status").value.toLowerCase();
    var dueDate = document.getElementById("filter-due-date").value;
    var filteredTasks = tasks.filter(function(task) {
        return task.name.toLowerCase().includes(taskName) &&
            (status === "" || task.status === status) &&
            (dueDate === "" || task.dueDate === dueDate);
    });
    tasks = filteredTasks;
    displayTasks();
}

// Display all tasks initially
displayTasks();
