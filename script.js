// Get the form
const form = document.getElementById("checkInForm");

// Get the form inputs
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Get the page elements
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");

const attendeeList = document.getElementById("attendeeList");
const celebration = document.getElementById("celebration");


// Attendance goal
const goal = 3;


// Starting attendance numbers
let total = 0;
let water = 0;
let zero = 0;
let power = 0;


// List of attendees
let attendees = [];


// ------------------------------------
// LOAD SAVED INFORMATION
// ------------------------------------

const savedTotal = localStorage.getItem("total");
const savedWater = localStorage.getItem("water");
const savedZero = localStorage.getItem("zero");
const savedPower = localStorage.getItem("power");
const savedAttendees = localStorage.getItem("attendees");


if (savedTotal !== null) {
  total = Number(savedTotal);
}

if (savedWater !== null) {
  water = Number(savedWater);
}

if (savedZero !== null) {
  zero = Number(savedZero);
}

if (savedPower !== null) {
  power = Number(savedPower);
}

if (savedAttendees !== null) {
  attendees = JSON.parse(savedAttendees);
}


// ------------------------------------
// SHOW SAVED COUNTS
// ------------------------------------

attendeeCount.textContent = total;

waterCount.textContent = water;

zeroCount.textContent = zero;

powerCount.textContent = power;


// ------------------------------------
// UPDATE PROGRESS BAR
// ------------------------------------

let percentage = (total / goal) * 100;

if (percentage > 100) {
  percentage = 100;
}

progressBar.style.width = `${percentage}%`;


// ------------------------------------
// SHOW SAVED ATTENDEES
// ------------------------------------

for (let i = 0; i < attendees.length; i++) {

  const attendee = document.createElement("li");

  attendee.textContent =
    `${attendees[i].name} - ${attendees[i].team}`;

  attendeeList.appendChild(attendee);
}


// ------------------------------------
// SHOW CELEBRATION IF ALREADY AT GOAL
// ------------------------------------

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
    `🎉 Congratulations! The attendance goal has been reached! ${winningTeam} is winning!`;
}


// ------------------------------------
// LISTEN FOR FORM SUBMISSION
// ------------------------------------

form.addEventListener("submit", function (event) {

  // Stop the page from refreshing
  event.preventDefault();


  // Get the attendee's name
  const name = nameInput.value;


  // Get the selected team
  const team = teamSelect.value;


  // Get the full team name
  const teamName =
    teamSelect.options[teamSelect.selectedIndex].text;


  // ------------------------------------
  // INCREASE TOTAL
  // ------------------------------------

  total = total + 1;

  attendeeCount.textContent = total;


  // ------------------------------------
  // UPDATE TEAM COUNT
  // ------------------------------------

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


  // ------------------------------------
  // CALCULATE PROGRESS
  // ------------------------------------

  percentage = (total / goal) * 100;

  if (percentage > 100) {
    percentage = 100;
  }

  progressBar.style.width = `${percentage}%`;


  // ------------------------------------
  // WELCOME MESSAGE
  // ------------------------------------

  greeting.textContent =
    `Welcome, ${name}! You are checked in with ${teamName}.`;


  // ------------------------------------
  // ADD ATTENDEE TO LIST
  // ------------------------------------

  const newAttendee = {
    name: name,
    team: teamName
  };

  attendees.push(newAttendee);


  const attendeeItem = document.createElement("li");

  attendeeItem.textContent =
    `${name} - ${teamName}`;

  attendeeList.appendChild(attendeeItem);


  // ------------------------------------
  // SAVE PROGRESS
  // ------------------------------------

  localStorage.setItem("total", total);

  localStorage.setItem("water", water);

  localStorage.setItem("zero", zero);

  localStorage.setItem("power", power);

  localStorage.setItem(
    "attendees",
    JSON.stringify(attendees)
  );


  // ------------------------------------
  // CELEBRATION
  // ------------------------------------

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
      `🎉 Congratulations! The attendance goal has been reached! ${winningTeam} is winning!`;
  }


  // ------------------------------------
  // RESET FORM
  // ------------------------------------

  form.reset();

});