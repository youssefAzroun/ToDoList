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

// restart the red blink on the error message
function blinkError() {
  messageEl.classList.remove("blink");
  // force reflow so the animation can play again
  void messageEl.offsetWidth;
  messageEl.classList.add("blink");
}

// add a task if the input isn't empty
function addTask() {
  const text = input.value.trim();

  if (text === "") {
    showMessage("Du måste skriva något!");
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
  // only animate the new task (last index)
  renderTasks(tasks.length - 1);
}

// build one list item for a task
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

  // new task slides up + fades in
  if (animate === true) {
    li.classList.add("task-enter");
  }

  // click the task to mark it done / not done
  li.addEventListener("click", function () {
    toggleTask(index);
  });

  // stop delete from also toggling completed
  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    deleteTask(index);
  });

  li.appendChild(textSpan);
  li.appendChild(deleteButton);
  return li;
}

// rebuild the list from the tasks array
// animateIndex = which task should play the enter animation (or -1 for none)
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

// toggle completed on/off – class change lets CSS fade to gray
function toggleTask(index) {
  showMessage("");
  messageEl.classList.remove("blink");

  if (tasks[index].completed === false) {
    tasks[index].completed = true;
  } else {
    tasks[index].completed = false;
  }

  // update the existing li so the gray fade can run
  const li = taskList.children[index];
  if (tasks[index].completed === true) {
    li.classList.add("completed");
  } else {
    li.classList.remove("completed");
  }

  updateCompletedCount();
}

// remove a task
function deleteTask(index) {
  showMessage("");
  messageEl.classList.remove("blink");
  tasks.splice(index, 1);
  renderTasks(-1);
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
  messageEl.classList.remove("blink");
});

renderTasks(-1);
