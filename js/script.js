// DOM Elements
const inputField = document.getElementById("user-input");
const listContainer = document.getElementById("task-list");
let userName;

// Username Management Functions
function changeName() {
    userName = prompt("Enter your name: ");
    saveName();
}

function saveName() {
    localStorage.setItem("userName", userName);
}

// Method that returns a time of day string for display purposes.
function getTimeOfDay() {
    const hour = new Date().getHours();
    let timeOfDay;
    if (hour < 12) {
        timeOfDay = "Morning";
    }
    else if (hour < 17) {
        timeOfDay = "Afternoon";
    }
    else {
        timeOfDay = "Evening";
    }
    return timeOfDay;
}

// Method that attempts to store and retrieve a username from local storage for use in the greeting display.
function loadNameGreeting() {
    const storedUserName = localStorage.getItem("userName");
    if (!storedUserName || storedUserName === "null" || storedUserName === "undefined") {
        changeName();
    }
    else {
        userName = storedUserName;
    }

    updateGreeting();
}

// Method which retrieves the time of the day from a sub method and changes the text content of the HTML element with the id 'greetUser'
function updateGreeting() {
    const timeOfDay = getTimeOfDay();
    document.getElementById("greetUser").textContent = "Good " + timeOfDay + ", " + userName;
}

// Date Display Method and Calls
function getDate() {
    const now = new Date();
    const datetime = now.toLocaleDateString(); // Get the current date and time
    document.getElementById("datetime").innerHTML = datetime; // Display the current date and time
}

// Task Management Methods
function addTask() {
    if (inputField.value.trim() === "") {
        alert("Please add a task to the to-do list.");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputField.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "&#10006;"; // Unicode for a cross mark
        li.appendChild(span);
        updateClearButton();
    }
    inputField.value = ""; // Clear the input field after adding the task
    saveData(); // Save the updated task list to local storage
}

// Method that changes the visibility of the clear task button accordingly.
function updateClearButton() {
    const clearButton = document.querySelector('.clear-tasks-btn');
    if (listContainer.children.length > 0) {
        clearButton.style.display = 'block';
    }
    else {
        clearButton.style.display = 'none';
    }
}

// Method that clears the tasks stored in the taskList. It is called when the clear tasks button is clicked.
function clearTasks() {
    listContainer.innerHTML = '';
    localStorage.removeItem("taskList");
    updateClearButton();
}

// Event Listener Methods
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(); // Save the updated task list to local storage
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(); // Save the updated task list to local storage
    }
}, false);

document.getElementById("change-name").addEventListener("click", function () {
    changeName();
    updateGreeting();
});

// Local Storage
function saveData() {
    localStorage.setItem("taskList", listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem("taskList"); // Load the task list from local storage
}

// Load the task list and call the username function to either retrieve the username from local storage or ask for a username to be inputted to local storage.
window.onload = () => {
    loadData();
    loadNameGreeting();
}

getDate(); // Call the function to display the date and time
setInterval(getDate, 1000); // Update the date and time every second
setInterval(updateGreeting, 1000); //Update the greeting message every second as it uses the time of day to determine the text content of the HTML element with the id 'greetUser'.