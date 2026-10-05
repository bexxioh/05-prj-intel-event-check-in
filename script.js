// Get the form
const form = document.querySelector("#checkInForm");

// Get the name input and team dropdown
const nameInput = document.querySelector("#attendeeName");
const teamSelect = document.querySelector("#teamSelect");

// Get the page elements
const greeting = document.querySelector("#greeting");
const attendeeCount = document.querySelector("#attendeeCount");
const progressBar = document.querySelector("#progressBar");

const waterCount = document.querySelector("#waterCount");
const zeroCount = document.querySelector("#zeroCount");
const powerCount = document.querySelector("#powerCount");

// Attendance goal
const attendanceGoal = 50;


// ----------------------------------------
// ATTENDANCE COUNTERS
// ----------------------------------------

let total = 0;
let water = 0;
let zero = 0;
let power = 0;


// ----------------------------------------
// ATTENDEE LIST
// ----------------------------------------

let attendees = [];


// ----------------------------------------
// LOAD SAVED INFORMATION
// ----------------------------------------

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


// ----------------------------------------
// DISPLAY SAVED COUNTS
// ----------------------------------------

attendeeCount.textContent = total;

waterCount.textContent = water;
zeroCount.textContent = zero;
powerCount.textContent = power;


// ----------------------------------------
// UPDATE PROGRESS BAR
// ----------------------------------------

let progress = (total / attendanceGoal) * 100;

if (progress > 100) {
  progress = 100;
}

progressBar.style.width = `${progress}%`;


// ----------------------------------------
// CREATE ATTENDEE LIST
// ----------------------------------------

const attendeeSection = document.createElement("div");

attendeeSection.className = "attendee-list";

attendeeSection.innerHTML = `
  <h3>Attendees</h3>
  <ul id="attendeeList"></ul>
`;

document.querySelector(".container").appendChild(attendeeSection);

const attendeeList = document.querySelector("#attendeeList");


// Display saved attendees

for (let i = 0; i < attendees.length; i++) {
  const attendeeItem = document.createElement("li");

  attendeeItem.textContent =
    `${attendees[i].name} — ${attendees[i].team}`;

  attendeeList.appendChild(attendeeItem);
}


// ----------------------------------------
// CREATE CELEBRATION MESSAGE
// ----------------------------------------

const celebration = document.createElement("p");

celebration.id = "celebration";

document.querySelector(".container").appendChild(celebration);


// If the goal was already reached before refreshing,
// show the celebration again.

if (total >= attendanceGoal) {

  let winningTeam = "";

  if (water >= zero && water >= power) {
    winningTeam = "Team Water Wise";
  } else if (zero >= water && zero >= power) {
    winningTeam = "Team Net Zero";
  } else {
    winningTeam = "Team Renewables";
  }

  celebration.textContent =
    `🎉 Attendance goal reached! ${winningTeam} is winning!`;
}


// ----------------------------------------
// CHECK-IN
// ----------------------------------------

form.addEventListener("submit", function(event) {

  // Stop the page from refreshing
  event.preventDefault();


  // Get the attendee's name
  const name = nameInput.value;


  // Get the selected team
  const team = teamSelect.value;


  // Get the full team name
  const teamLabel =
    teamSelect.options[teamSelect.selectedIndex].text;


  // ----------------------------------------
  // INCREASE TOTAL ATTENDANCE
  // ----------------------------------------

  total = total + 1;

  attendeeCount.textContent = total;


  // ----------------------------------------
  // UPDATE TEAM COUNT
  // ----------------------------------------

  if (team === "water") {

    water = water + 1;

    waterCount.textContent = water;

  } else if (team === "zero") {

    zero = zero + 1;

    zeroCount.textContent = zero;

  } else if (team === "power") {

    power = power + 1;

    powerCount.textContent = power;
  }


  // ----------------------------------------
  // SHOW WELCOME MESSAGE
  // ----------------------------------------

  greeting.textContent =
    `Welcome, ${name}! You are checked in with ${teamLabel}.`;


  // ----------------------------------------
  // CALCULATE PROGRESS
  // ----------------------------------------

  progress = (total / attendanceGoal) * 100;

  if (progress > 100) {
    progress = 100;
  }


  // Update progress bar
  progressBar.style.width = `${progress}%`;


  // ----------------------------------------
  // ADD ATTENDEE TO LIST
  // ----------------------------------------

  const attendee = {
    name: name,
    team: teamLabel
  };

  attendees.push(attendee);


  const attendeeItem = document.createElement("li");

  attendeeItem.textContent =
    `${name} — ${teamLabel}`;

  attendeeList.appendChild(attendeeItem);


  // ----------------------------------------
  // SAVE EVERYTHING
  // ----------------------------------------

  localStorage.setItem("total", total);

  localStorage.setItem("water", water);

  localStorage.setItem("zero", zero);

  localStorage.setItem("power", power);

  localStorage.setItem(
    "attendees",
    JSON.stringify(attendees)
  );


  // ----------------------------------------
  // CELEBRATION LEVELUP
  // ----------------------------------------

  if (total >= attendanceGoal) {

    let winningTeam = "";

    if (water >= zero && water >= power) {

      winningTeam = "Team Water Wise";

    } else if (zero >= water && zero >= power) {

      winningTeam = "Team Net Zero";

    } else {

      winningTeam = "Team Renewables";
    }


    celebration.textContent =
      `🎉 Attendance goal reached! ${winningTeam} is winning!`;
  }


  // ----------------------------------------
  // RESET THE FORM
  // ----------------------------------------

  form.reset();

});