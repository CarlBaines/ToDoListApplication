const winInput = document.getElementById("user-input");
const dateInput = document.getElementById("date-input");
const winList = document.getElementById("win-list");
const winsTitle = document.querySelector(".wins-list h1");

function addWin(){
    if(winInput.value.trim() === "" || dateInput.value.trim() === "") {
        alert("Please add a win and a date.");
        return;
    }

    // Show title if this is the first win
    if (winList.children.length === 0) {
        winsTitle.style.display = "block";
    }

    const li = document.createElement("li");
    const winText = document.createElement("span");
    const dateText = document.createElement("span");

    winText.textContent = winInput.value;
    dateText.textContent = formatDate(dateInput.value);
    dateText.className = "date";

    li.appendChild(winText);
    li.appendChild(dateText);
    winList.appendChild(li);

    winInput.value = "";
    dateInput.value = "";
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}