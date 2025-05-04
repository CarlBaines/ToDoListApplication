const inputField = document.getElementById("user-input");
const listContainer = document.getElementById("task-list");

function getDate(){
    const now = new Date();
    const datetime = now.toLocaleDateString(); // Get the current date and time
    document.getElementById("datetime").innerHTML = datetime; // Display the current date and time
}

getDate(); // Call the function to display the date and time
setInterval(getDate, 1000); // Update the date and time every second

function addTask() {
    if(inputField.value.trim() === "") {
        alert("Please add a task to the to-do list.");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputField.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "&#10006;"; // Unicode for a cross mark
        li.appendChild(span);
    }
    inputField.value = ""; // Clear the input field after adding the task
    saveData(); // Save the updated task list to local storage
}


listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData(); // Save the updated task list to local storage
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData(); // Save the updated task list to local storage
    }
}, false);  


function saveData(){
    localStorage.setItem("taskList", listContainer.innerHTML);
} 

function loadData(){
    listContainer.innerHTML = localStorage.getItem("taskList"); // Load the task list from local storage
}
loadData(); // Load the task list when the page loads
