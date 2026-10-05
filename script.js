// Get the form
const form = document.getElementById("checkInForm");

// Get the name input
const nameInput = document.getElementById("attendeeName");

// Get the team dropdown
const teamSelect = document.getElementById("teamSelect");

// Get the greeting
const greeting = document.getElementById("greeting");

// Get the attendance count
const attendeeCount = document.getElementById("attendeeCount");

// Get the progress bar
const progressBar = document.getElementById("progressBar");

// Get the team counts
const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");


// Attendance total
let total = 0;


// Team totals
let water = 0;
let zero = 0;
let power = 0;


// Attendance goal
const goal = 50;


// Listen for the form submission
form.addEventListener("submit", function (event) {

  // Prevent the page from refreshing
  event.preventDefault();


  // Get the name
  const name = nameInput.value;


  // Get the selected team
  const team = teamSelect.value;


  // Get the full team name
  const teamName =
    teamSelect.options[teamSelect.selectedIndex].text;


  // Increase total attendance
  total = total + 1;


  // Show the total
  attendeeCount.textContent = total;


  // Update the correct team
  if (team === "water") {

    water = water + 1;

    waterCount.textContent = water;
  }


  if (team === "zero") {

    zero = zero + 1;

    zeroCount.textContent = zero;
  }


  if (team === "power") {

    power = power + 1;

    powerCount.textContent = power;
  }


  // Calculate progress
  const percentage = (total / goal) * 100;


  // Update progress bar
  progressBar.style.width = `${percentage}%`;


  // Show welcome message
  greeting.textContent =
    `Welcome, ${name}! You are checked in with ${teamName}.`;


  // Reset the form
  form.reset();

});