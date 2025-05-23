// DOM Elements
const inputField = document.getElementById("user-input");
const listContainer = document.getElementById("task-list");
let userName;
// let tasks = []; - Secure Task Storage Version

// Username Management Functions
// Insecure Version - no input validation.
function changeName() {
    userName = prompt("Enter your name: ");
    saveName();
}

/* Secure Version - adds validation and input sanitisation.
function changeName(){

    const newName = prompt("Enter your name: ");
    if (!newName || newName.trim() === "") {
        alert("Please enter a valid name");
        return;
    }
    userName = DOMPurify.sanitize(newName.trim());
    saveName();

}
*/

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
    document.getElementById("datetime").textContent = datetime; // Display the current date and time
}

// Task Management Methods
// Insecure Version - directly manipulates innerHTML.
function addTask() {
    if (inputField.value.trim() === "") {
        alert("Please add a task to the to-do list.");
    }
    else {
        let li = document.createElement("li");
        li.textContent = inputField.value; // Insecure - lack of input sanitisation.
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.textContent = "✖";
        li.appendChild(span);
        updateClearButton();
    }
    inputField.value = ""; // Clear the input field after adding the task
    saveData(); // Save the updated task list to local storage
}

/* Secure version - uses structured data and sanitisation.

function addTask(){
    const taskText = inputField.value.trim();
    if(taskText === ""){
        alert("Please add a task to the to-do list.");
        return;
    }

    const task = {
        id: Date.now(),
        text: DOMPurify.sanitize(taskText), // input sanitisation.
        completed: false
    };

    tasks.push(task);
    renderTask(task);
    inputField.value = "";
    saveData();
    updateClearButton();
}

function renderTask(task) {
    const li = document.createElement("li");
    if (task.completed){
        li.classList.add("checked");
    }
    
    li.textContent = task.text;
    li.dataset.id = task.id;
    
    const span = document.createElement("span");
    span.textContent = "✖";
    li.appendChild(span);
    
    listContainer.appendChild(li);
}

*/

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
    listContainer.textContent = '';
    localStorage.removeItem("taskList");
    updateClearButton();
}

// Event Listener Methods
// Insecure Version - no validation of event target.
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

// Creates an event listener that checks for when a key has been released in the input field.
inputField.addEventListener("keyup", function(e){
    // Checks if the enter key was pressed
    if(e.key === "Enter"){
        // Adds the task to the task list.
        addTask();
    }
});

/* Secure Version - validates targets and uses data attributes.

listContainer.addEventListener("click", function(e) {
    const li = e.target.closest('li');
    if (!li) return;
    
    const taskId = parseInt(li.dataset.id);
    if (!taskId) return;
    
    if (e.target.tagName === "LI") {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            li.classList.toggle("checked");
            saveData();
        }
    }
    else if (e.target.tagName === "SPAN") {
        tasks = tasks.filter(t => t.id !== taskId);
        li.remove();
        saveData();
        updateClearButton();
    }
}, false);

*/

document.getElementById("change-name").addEventListener("click", function () {
    changeName();
    updateGreeting();
});

// Local Storage
// Insecure Version - stores raw HTML in localStorage.
function saveData() {
    localStorage.setItem("taskList", listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem("taskList"); // Load the task list from local storage
}

/* Secure Version - stores structured data

function saveData(){
    localStorage.setItem("taskList", JSON.stringify(tasks));
}

function loadData(){
    const savedTasks = localStorage.getItem("taskList");
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => renderTask(task));
    }
}

*/

// Load the task list and call the username function to either retrieve the username from local storage or ask for a username to be inputted to local storage.
window.onload = () => {
    loadData();
    loadNameGreeting();
    updateClearButton();
}

getDate(); // Call the function to display the date and time
setInterval(getDate, 1000); // Update the date and time every second
setInterval(updateGreeting, 1000); //Update the greeting message every second as it uses the time of day to determine the text content of the HTML element with the id 'greetUser'.