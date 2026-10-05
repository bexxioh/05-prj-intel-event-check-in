// Get the form
const form = document.getElementById("checkInForm");

// Get the input and dropdown
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Get the page elements
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


// ------------------------------------
// CREATE LEVELUP ELEMENTS
// ------------------------------------

// Create the celebration message
const celebration = document.createElement("p");

celebration.id = "celebration";

document.querySelector(".container").appendChild(celebration);


// Create the attendee list heading
const attendeeHeading = document.createElement("h3");

attendeeHeading.textContent = "Attendee List";

document.querySelector(".container").appendChild(attendeeHeading);


// Create the attendee list
const attendeeList = document.createElement("ul");

attendeeList.id = "attendeeList";

document.querySelector(".container").appendChild(attendeeList);


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
// SHOW SAVED PROGRESS
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
// LISTEN FOR FORM SUBMISSION
// ------------------------------------

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


  // ------------------------------------
  // INCREASE TOTAL ATTENDANCE
  // ------------------------------------

  total = total + 1;


  // Show the new total
  attendeeCount.textContent = total;


  // ------------------------------------
  // UPDATE TEAM COUNTER
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


  // Update progress bar
  progressBar.style.width = `${percentage}%`;


  // ------------------------------------
  // WELCOME MESSAGE
  // ------------------------------------

  greeting.textContent =
    `Welcome, ${name}! You are checked in with ${teamName}.`;


  // ------------------------------------
  // LEVELUP 3
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
  // LEVELUP 2
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
  // LEVELUP 1
  // CELEBRATION
  // ------------------------------------

  if (total >= goal) {

    let winningTeam = "";


    if (water >= zero && water >= power) {

      winningTeam = "Team Water Wise";

    } else if (zero >= water && zero >= power) {

      winningTeam = "Team Net Zero";

    } else {

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