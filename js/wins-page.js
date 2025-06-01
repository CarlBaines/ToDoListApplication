// DOM elements
const winInput = document.getElementById("user-input");
const dateInput = document.getElementById("date-input");
const winList = document.getElementById("listings");
const winsTitle = document.querySelector(".wins-list h1");
const clearWinsBtn = document.querySelector(".clear-wins-btn");
// let wins = []; - Secure Wins Storage Version

loadData();

// Insecure Version - No input sanitisation.
function addWin() {
    // Input validation
    if (winInput.value.trim() === "" || dateInput.value.trim() === "") {
        alert("Please add a win and a date.");
        return;
    }

    // Show the 'Your Wins' title once a win has been inputted.
    if (winList.children.length === 0) {
        winsTitle.style.display = "block";
        clearWinsBtn.style.display = "block";
    }

    // Creates HTML elements.
    const li = document.createElement("li");
    const winText = document.createElement("span");
    const dateText = document.createElement("span");

    // Changes their text content.
    winText.textContent = winInput.value;
    dateText.textContent = formatDate(dateInput.value);
    // Check if the formatDate method returns undefined. If it does, an invalid date has been entered.
    if (dateText.textContent === "undefined") {
        alert("Enter a date that is not in the future!");
        dateInput.value = "";
        if (winList.children.length === 0) {
            winsTitle.style.display = "none";
            clearWinsBtn.style.display = "none";
        }
    }
    else {
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
}

winInput.addEventListener("keyup", onEnterKey);
dateInput.addEventListener("keyup", onEnterKey);

function onEnterKey(e) {
    // Check if both win and date inputs have been made if enter key has been pressed
    if (e.key === "Enter") {
        if (winInput.value.trim() === "" || dateInput.value.trim() === "") {
            alert("Please add a win and a date.");
            return;
        }
        else {
            addWin();
        }
    }
}

/* Secure Version - input sanitisation, structured data and new renderWin method.

function addWin() {
    const winText = winInput.value.trim();
    const dateText = dateInput.value.trim();
    
    if (!winText || !dateText) {
        alert("Please add a win and a date.");
        return;
    }

    const win = {
        id: Date.now(),
        text: DOMPurify.sanitize(winText),
        date: dateText,
        formattedDate: formatDate(dateText)
    };

    wins.push(win);
    renderWin(win);
    
    winInput.value = "";
    dateInput.value = "";
    saveData();
}

function renderWin(win) {
    const li = document.createElement("li");
    li.dataset.id = win.id;
    
    const winText = document.createElement("span");
    winText.textContent = win.text;
    
    const dateText = document.createElement("span");
    dateText.textContent = win.formattedDate;
    dateText.className = "date";
    
    li.appendChild(winText);
    li.appendChild(dateText);
    winList.appendChild(li);
}

*/

// Date formatter method
function formatDate(dateString) {
    // converts the inputted dateString into a formatted date object.
    const date = new Date(dateString);
    // Get the current date.
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    // Bug fix: This line of code compares the date objects as opposed to formatted strings.
    if(date > currentDate){
        return "undefined";
    }
    // Formats the date for display.
    const convertedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    // Return the formatted date string.
    return convertedDate;
}


// Local storage methods
// Insecure Version - Stores raw HTML in localStorage.
function loadData() {
    const savedData = localStorage.getItem('listings');
    if (savedData) {
        winList.innerHTML = savedData;
        winsTitle.style.display = "block";
        clearWinsBtn.style.display = "block";
    }
    else {
        winsTitle.style.display = "none";
        clearWinsBtn.style.display = "none";
    }
}

function saveData() {
    localStorage.setItem('listings', winList.innerHTML);
}

/* Secure Version - Uses Structured Data.

function loadData(){
    const savedData = localStorage.getItem('listings');
    if (savedData) {
        wins = JSON.parse(savedData);
        wins.forEach(win => renderWin(win));
        winsTitle.style.display = wins.length > 0 ? "block" : "none";
    }
}

function saveData() {
    localStorage.setItem('listings', JSON.stringify(wins));
}

*/

// Insecure Version - does not properly clean up data.
function clearWins() {
    winList.textContent = '';
    localStorage.removeItem('listings');
    winsTitle.style.display = "none";
    clearWinsBtn.style.display = "none";
}

/* Secure Version - properly cleans up structured data.

function clearWins() {
    wins = [];
    winList.innerHTML = '';
    localStorage.removeItem('listings');
    winsTitle.style.display = "none";
}

*/


