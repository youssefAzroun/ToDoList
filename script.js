const input = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const completedCount = document.querySelector("#completedCount");
const messageEl = document.querySelector("#message");

// all tasks live here
const tasks = [];

// put the message in the page (no alert)
function showMessage(text) {
  messageEl.textContent = text;
}

// add a task if the input isn't empty
function addTask() {
  const text = input.value.trim();

  if (text === "") {
    showMessage("Du måste skriva något!");
    return;
  }

  showMessage("");

  tasks.push({
    text: text,
    completed: false
  });

  input.value = "";
  renderTasks();
}

// rebuild the list from the tasks array
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

    // click the task to mark it done / not done
    li.addEventListener("click", function () {
      toggleTask(i);
    });

    // stop delete from also toggling completed
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

// toggle completed on/off
function toggleTask(index) {
  showMessage("");

  if (tasks[index].completed === false) {
    tasks[index].completed = true;
  } else {
    tasks[index].completed = false;
  }

  renderTasks();
}

// remove a task
function deleteTask(index) {
  showMessage("");
  tasks.splice(index, 1);
  renderTasks();
}

// how many tasks are done
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

// clear message when user types again
input.addEventListener("input", function () {
  showMessage("");
});

renderTasks();
