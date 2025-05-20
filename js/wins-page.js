// DOM elements
const winInput = document.getElementById("user-input");
const dateInput = document.getElementById("date-input");
const winList = document.getElementById("listings");
const winsTitle = document.querySelector(".wins-list h1");

loadData();

function addWin() {
    // Input validation
    if (winInput.value.trim() === "" || dateInput.value.trim() === "") {
        alert("Please add a win and a date.");
        return;
    }

    // Show the 'Your Wins' title once a win has been inputted.
    if (winList.children.length === 0) {
        winsTitle.style.display = "block";
    }

    // Creates HTML elements.
    const li = document.createElement("li");
    const winText = document.createElement("span");
    const dateText = document.createElement("span");

    // Changes their text content.
    winText.textContent = winInput.value;
    dateText.textContent = formatDate(dateInput.value);
    dateText.className = "date";

    // Adds the span elements to the list and appends the list to the div.
    li.appendChild(winText);
    li.appendChild(dateText);
    winList.appendChild(li);

    // Clears the input fields.
    winInput.value = "";
    dateInput.value = "";

    // Saves to local storage.
    saveData();
}

// Date formatter method
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}


// Local storage methods
function loadData() {
    const savedData = localStorage.getItem('listings');
    if (savedData) {
        winList.innerHTML = savedData;
        winsTitle.style.display = "block";
    }
    else {
        winsTitle.style.display = "none";
    }
}

function saveData() {
    localStorage.setItem('listings', winList.innerHTML);
}

function clearWins() {
    winList.innerHTML = '';
    localStorage.removeItem('listings');
    winsTitle.style.display = "none";
}


