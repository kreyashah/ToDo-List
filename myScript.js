const addTaskButton = document.getElementById("add-button");
const taskInput = document.getElementById("todo-input");
const taskList = document.getElementById("tasks-list");
const taskCount = document.getElementById("task-count");
const allTasksButton = document.getElementById("all-tasks");
const completedTasksButton = document.getElementById("completed-tasks");
const pendingTasksButton = document.getElementById("pending-tasks");


let taskId = 1;

//Add button click event
addTaskButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  //Create dynamic list
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <input type="checkbox" id="task-${taskId}">
    <label for="task-${taskId}">${taskText}</label>
    <button class="delete-button">x</button>
  `;

  //For Animation
  taskItem.style.opacity = 1;
  taskItem.style.transform = "translateX(0)";

  //Add list
  taskList.appendChild(taskItem);
  taskInput.value = "";
  taskId++;

  setTimeout(updateTaskCount, 600);
});

//Animation
addTaskButton.addEventListener("click", function () {
  addTaskButton.style.transform = "scale(1.1)";
  setTimeout(function () {
    addTaskButton.style.transform = "scale(1)";
  }, 200); // Reset the scale after 200 milliseconds
});

//Delete button click event
taskList.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("delete-button")) {
    const task = e.target.parentElement;
    task.style.opacity = 0;
    setTimeout(() => {
      task.remove();
      updateTaskCount();
    }, 300); // Remove the task after the animation is complete
  }
});

//Task count
function updateTaskCount() {
  const tasks = document.querySelectorAll("li");
  taskCount.textContent = tasks.length;
}

//Show all tasks
allTasksButton.addEventListener("click", function () {
  showAllTasks();
});

//Show completed tasks
completedTasksButton.addEventListener("click", function () {
  showCompletedTasks();
});

//Show pending tasks
pendingTasksButton.addEventListener("click", function () {
  showPendingTasks();
});

function showAllTasks() {
  const tasks = document.querySelectorAll("li");
  tasks.forEach((task) => {
    task.style.display = "flex";
  });
  //Update the count to all tasks count
  taskCount.textContent = tasks.length;
}

function showCompletedTasks() {
  const tasks = document.querySelectorAll("li");
  let completedCount = 0;

  tasks.forEach((task) => {
    const checkbox = task.querySelector("input[type='checkbox']");
    if (checkbox.checked) {
      task.style.display = "flex";
      completedCount++;
    } else {
      task.style.display = "none";
    }
  });
  //Update the count to completed tasks count
  taskCount.textContent = completedCount;
}

function showPendingTasks() {
  const tasks = document.querySelectorAll("li");
  let pendingCount = 0;

  tasks.forEach((task) => {
    const checkbox = task.querySelector("input[type='checkbox']");
    if (!checkbox.checked) {
      task.style.display = "flex";
      pendingCount++;
    } else {
      task.style.display = "none";
    }
  });
  //Update the count to pending tasks count
  taskCount.textContent = pendingCount;
}