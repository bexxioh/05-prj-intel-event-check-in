// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");


// Attendance counter
let total = 0;


// Team counters
let water = 0;
let zero = 0;
let power = 0;


// Attendance goal
const goal = 50;


// Handle form submission
form.addEventListener("submit", function (event) {

  // Stop the page from refreshing
  event.preventDefault();


  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;


  // Increase total attendance
  total = total + 1;


  // Show updated total count
  attendeeCount.textContent = total;


  // Update the correct team's count

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


  // Calculate percentage of goal completed
  const percentage = (total / goal) * 100;


  // Update progress bar
  progressBar.style.width = `${percentage}%`;


  // Show success message
  greeting.textContent =
    `Welcome, ${name}! You are checked in with ${teamName}.`;


  // Reset the form
  form.reset();

});