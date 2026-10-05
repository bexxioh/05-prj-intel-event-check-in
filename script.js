// Get all needed elements
const attendeeList = document.getElementById("attendeeList");
const celebration = document.getElementById("celebration");
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");


// Attendance goal
const goal = 50;


// Attendance counters
let total = 0;
let water = 0;
let zero = 0;
let power = 0;


// Attendee list
let attendees = [];


// Listen for form submission
form.addEventListener("submit", function (e) {

  // Stop the page from refreshing
  e.preventDefault();


  // Get the name and team
  const name = nameInput.value;
  const team = teamSelect.value;

  // Get the full team name
  const teamName =
    teamSelect.options[teamSelect.selectedIndex].text;


  // Increase total attendance
  total = total + 1;


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


  // Update total attendance on page
  attendeeCount.textContent = total;


  // Calculate progress percentage
  const percentage = (total / goal) * 100;


  // Update progress bar
  progressBar.style.width = `${percentage}%`;


  // Show welcome message
  greeting.textContent =
    `Welcome, ${name}! You are checked in with ${teamName}.`;


// --------------------------------
// LEVELUP 1: CELEBRATION
// --------------------------------

if (total >= goal) {

  let winningTeam = "";

  if (water >= zero && water >= power) {
    winningTeam = "Team Water Wise";
  }

  if (zero > water && zero >= power) {
    winningTeam = "Team Net Zero";
  }

  if (power > water && power > zero) {
    winningTeam = "Team Renewables";
  }

  celebration.textContent =
    `🎉 The attendance goal has been reached! ${winningTeam} is winning!`;
}


  // --------------------------------
  // LEVELUP 2: SAVE PROGRESS
  // --------------------------------

  localStorage.setItem("total", total);
  localStorage.setItem("water", water);
  localStorage.setItem("zero", zero);
  localStorage.setItem("power", power);


  // --------------------------------
// LEVELUP 3: ATTENDEE LIST
// --------------------------------

const attendee = document.createElement("li");

attendee.textContent =
  `${name} - ${teamName}`;

attendeeList.appendChild(attendee);
});