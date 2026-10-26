const input = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const completedCount = document.querySelector("#completedCount");
const messageEl = document.querySelector("#message");

// stores all tasks
const tasks = [];

function showMessage(text) {
  messageEl.textContent = text;
}

// makes the error text blink
function blinkError() {
  messageEl.classList.remove("blink");
  void messageEl.offsetWidth; // needed so the blink can restart
  messageEl.classList.add("blink");
}

// adds a new task from the input
function addTask() {
  const text = input.value.trim();

  if (text === "") {
    showMessage("Input must not be empty");
    blinkError();
    return;
  }

  showMessage("");
  messageEl.classList.remove("blink");

  tasks.push({
    text: text,
    completed: false
  });

  input.value = "";
  renderTasks(tasks.length - 1); // animate only the new one
}

// creates one <li> for a task
function createTaskItem(task, index, animate) {
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

  if (animate === true) {
    li.classList.add("task-enter");
  }

  // click text to mark done / not done
  li.addEventListener("click", function () {
    toggleTask(index);
  });

  // delete without toggling completed
  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    deleteTask(index);
  });

  li.appendChild(textSpan);
  li.appendChild(deleteButton);
  return li;
}

// redraws the whole list
function renderTasks(animateIndex) {
  taskList.innerHTML = "";

  if (animateIndex === undefined) {
    animateIndex = -1;
  }

  for (let i = 0; i < tasks.length; i++) {
    const li = createTaskItem(tasks[i], i, i === animateIndex);
    taskList.appendChild(li);
  }

  updateCompletedCount();
}

// mark a task as completed or not
function toggleTask(index) {
  showMessage("");
  messageEl.classList.remove("blink");

  if (tasks[index].completed === false) {
    tasks[index].completed = true;
  } else {
    tasks[index].completed = false;
  }

  const li = taskList.children[index];
  if (tasks[index].completed === true) {
    li.classList.add("completed");
  } else {
    li.classList.remove("completed");
  }

  updateCompletedCount();
}

function deleteTask(index) {
  showMessage("");
  messageEl.classList.remove("blink");
  tasks.splice(index, 1);
  renderTasks(-1);
}

// updates the "X completed" text
function updateCompletedCount() {
  let count = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
      count = count + 1;
    }
  }

  completedCount.textContent = count + " completed";
}

addButton.addEventListener("click", addTask);

// hide error when user starts typing
input.addEventListener("input", function () {
  showMessage("");
  messageEl.classList.remove("blink");
});

renderTasks(-1);
