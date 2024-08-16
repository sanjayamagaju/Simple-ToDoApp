// Function to get the formatted current date in Nepal
function getCurrentDate() {
  var today = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kathmandu",
  };
  return today.toLocaleDateString("ne-NP", options);
}

// Function to calculate and update the achievement percentage
function updateAchievementPercentage() {
  var taskItems = document.querySelectorAll(".task");
  var completedTasks = 0;
  var totalTasks = taskItems.length;

  taskItems.forEach(function (taskItem) {
    if (taskItem.classList.contains("complete")) {
      completedTasks++;
    }
  });

  var percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Check if the percentage has no decimal part
  var formattedPercentage =
    percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(2);

  document.getElementById("achievementPercentage").textContent =
    "Achievement: " + formattedPercentage + "%";
}

// Update the date container with the current date in Nepal
var dateContainer = document.getElementById("dateContainer");
dateContainer.innerHTML = getCurrentDate();

// Retrieve stored tasks from localStorage
var storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  document.getElementById("taskList").innerHTML = storedTasks;
}

// Initialize a variable to keep track of the task number
var taskNumber = 1;

// Function to add a new task with S.N.
function addTaskWithSN(taskText) {
  var taskList = document.getElementById("taskList");
  var taskItem = document.createElement("li");
  taskItem.className = "task";

  // Create and set the S.N.
  var snSpan = document.createElement("span");
  snSpan.className = "task-sn";
  snSpan.textContent = taskNumber + ".";

  // Create and set the task description
  var taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  // Create a delete button
  var deleteButton = document.createElement("button");
  deleteButton.className = "deleteButton";
  deleteButton.textContent = "Delete";

  // Append elements to the task item
  taskItem.appendChild(snSpan);
  taskItem.appendChild(taskSpan);
  taskItem.appendChild(deleteButton);

  // Append the task item to the task list
  taskList.appendChild(taskItem);

  // Increment the task number
  taskNumber++;
}

// Add event listener for the add button
document.getElementById("addButton").addEventListener("click", function () {
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim();

  if (taskText !== "") {
    // Add the task with S.N.
    addTaskWithSN(taskText);

    // Clear the input field
    taskInput.value = "";

    // Store tasks in localStorage
    localStorage.setItem(
      "tasks",
      document.getElementById("taskList").innerHTML
    );

    // Update the achievement percentage
    updateAchievementPercentage();
  }
});

// Add event listener to mark tasks as complete or delete them
document.addEventListener("click", function (event) {
  var target = event.target;
  if (
    target.tagName === "SPAN" &&
    target.parentNode.classList.contains("task")
  ) {
    target.parentNode.classList.toggle("complete");

    // Store tasks in localStorage
    localStorage.setItem(
      "tasks",
      document.getElementById("taskList").innerHTML
    );

    // Update the achievement percentage
    updateAchievementPercentage();
  } else if (
    target.tagName === "BUTTON" &&
    target.classList.contains("deleteButton")
  ) {
    target.parentNode.remove();

    // Store tasks in localStorage
    localStorage.setItem(
      "tasks",
      document.getElementById("taskList").innerHTML
    );

    // Update the achievement percentage
    updateAchievementPercentage();
  } else if (target.id === "deleteAllButton") {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    // Remove tasks from localStorage
    localStorage.removeItem("tasks");

    // Update the achievement percentage
    updateAchievementPercentage();
  }
});

// Initial update of the achievement percentage
updateAchievementPercentage();
