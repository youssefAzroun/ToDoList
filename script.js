const input = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const completedCount = document.querySelector("#completedCount");

const tasks = [];

function addTask() {
  const text = input.value.trim();

  if (text === "") {
    alert("Du måste skriva något!");
    return;
  }

  tasks.push({
    text: text,
    completed: false
  });

  input.value = "";
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement("li");
    const textSpan = document.createElement("span");
    const deleteButton = document.createElement("button");

    textSpan.textContent = task.text;
    deleteButton.textContent = "🗑️";
    deleteButton.className = "delete-button";
    deleteButton.type = "button";

    if (task.completed === true) {
      li.classList.add("completed");
    }

    li.addEventListener("click", function () {
      toggleTask(i);
    });

    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation();
      deleteTask(i);
    });

    li.appendChild(textSpan);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }

  updateCompletedCount();
}

function toggleTask(index) {
  if (tasks[index].completed === false) {
    tasks[index].completed = true;
  } else {
    tasks[index].completed = false;
  }

  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function updateCompletedCount() {
  let count = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
      count = count + 1;
    }
  }

  completedCount.textContent = "Klart: " + count;
}

addButton.addEventListener("click", addTask);
renderTasks();
