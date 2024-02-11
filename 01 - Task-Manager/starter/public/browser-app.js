// Selects the DOM element with the class "tasks," presumably where tasks will be displayed.
const tasksDOM = document.querySelector(".tasks");

// Selects the DOM element with the class "loading-text," likely used for displaying a loading message.
const loadingDOM = document.querySelector(".loading-text");

// Selects the form element with the class "task-form."
const formDOM = document.querySelector(".task-form");

// Selects the input element inside the form with the class "task-input," where users can enter task names.
const taskInputDOM = document.querySelector(".task-input");

// Selects the div element with the class "form-alert," which may be used for displaying success or error messages.
const formAlertDOM = document.querySelector(".form-alert");

// An asynchronous function that retrieves tasks from the server using Axios (axios.get("/api/v1/tasks")).
const showTasks = async () => {
  // Sets the visibility of the loading message to "visible."
  loadingDOM.style.visibility = "visible";

  try {
    // Retrieves tasks from the server.
    const {
      data: { tasks },
    } = await axios.get("/api/v1/tasks");

    // Checks if there are no tasks.
    if (tasks.length < 1) {
      // Displays a message indicating an empty list.
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      // Hides the loading message.
      loadingDOM.style.visibility = "hidden";
      // Exits the function.
      return;
    }

    // Maps the tasks into HTML elements and joins them into a single string.
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task;
        return `<div class="single-task ${completed && "task-completed"}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">

<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`;
      })
      .join("");

    // Updates the DOM with the tasks.
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    // Displays an error message if there's an error during the request.
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }

  // Hides the loading message.
  loadingDOM.style.visibility = "hidden";
};

// Calls the showTasks function to initially display tasks.
showTasks();

// Event listener for clicks on the "tasks" container.
tasksDOM.addEventListener("click", async (e) => {
  // Retrieves the clicked element.
  const el = e.target;

  // Checks if the clicked element is a delete button.
  if (el.parentElement.classList.contains("delete-btn")) {
    // Sets the visibility of the loading message to "visible."
    loadingDOM.style.visibility = "visible";

    // Retrieves the task ID from the button's data attribute.
    const id = el.parentElement.dataset.id;

    try {
      // Sends a delete request to the server to delete the task.
      await axios.delete(`/api/v1/tasks/${id}`);
      // Calls the showTasks function to update the task list.
      showTasks();
    } catch (error) {
      // Logs the error to the console if there's an error.
      console.log(error);
    }
  }

  // Hides the loading message.
  loadingDOM.style.visibility = "hidden";
});

// Event listener for form submissions on the "task-form."
formDOM.addEventListener("submit", async (e) => {
  // Prevents the default form submission behavior.
  e.preventDefault();

  // Retrieves the task name from the input field.
  const name = taskInputDOM.value;

  try {
    // Sends a post request to add a new task.
    await axios.post("/api/v1/tasks", { name });
    // Calls the showTasks function to update the task list.
    showTasks();
    // Clears the input field.
    taskInputDOM.value = "";
    // Displays a success message in formAlertDOM.
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    // Displays an error message in formAlertDOM if there's an error.
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }

  // Sets a timeout to hide the form alert message after 3000 milliseconds.
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
