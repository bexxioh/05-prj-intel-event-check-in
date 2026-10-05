const form = document.getElementById("checkInForm");

const nameInput = document.getElementById("attendeeName");

const teamSelect = document.getElementById("teamSelect");

const greeting = document.getElementById("greeting");


form.addEventListener("submit", function (event) {

  event.preventDefault();

  const name = nameInput.value;

  const teamName = teamSelect.options[teamSelect.selectedIndex].text;

  greeting.textContent =
    `Welcome, ${name}! You are checked in with ${teamName}.`;

});