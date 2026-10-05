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

const celebration = document.getElementById("celebration");
const attendeeList = document.getElementById("attendeeList");


// Attendance goal
const goal = 50;


// Get saved attendance numbers
let total = Number(localStorage.getItem("total")) || 0;
let water = Number(localStorage.getItem("water")) || 0;
let zero = Number(localStorage.getItem("zero")) || 0;
let power = Number(localStorage.getItem("power")) || 0;


// Get saved attendee list
let attendees = JSON.parse(localStorage.getItem("attendees")) || [];


// Show saved attendance numbers
attendeeCount.textContent = total;
waterCount.textContent = water;
zeroCount.textContent = zero;
powerCount.textContent = power;


// Show saved progress
let savedPercentage = (total / goal) * 100;

if (savedPercentage > 100) {
  savedPercentage = 100;
}

progressBar.style.width = `${savedPercentage}%`;


// Show saved attendees
for (let i = 0; i < attendees.length; i++) {

  const listItem = document.createElement("li");

  listItem.textContent =
    `${attendees[i].name} - ${attendees[i].team}`;

  attendeeList.appendChild(listItem);
}


// Handle form submission
form.addEventListener("submit", function (event) {

  event.preventDefault();


  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;


  // Increase total attendance
  total = total + 1;


  // Update total on page
  attendeeCount.textContent = total;


  // Update Team Water Wise
  if (team === "water") {

    water = water + 1;

    waterCount.textContent = water;
  }


  // Update Team Net Zero
  if (team === "zero") {

    zero = zero + 1;

    zeroCount.textContent = zero;
  }


  // Update Team Renewables
  if (team === "power") {

    power = power + 1;

    powerCount.textContent = power;
  }


  // Calculate progress percentage
  let percentage = (total / goal) * 100;


  // Do not let progress go over 100%
  if (percentage > 100) {
    percentage = 100;
  }


  // Update progress bar
  progressBar.style.width = `${percentage}%`;


  // Show welcome message
  greeting.textContent =
    `Welcome, ${name}! You are checked in with ${teamName}.`;


  // -----------------------------
  // LEVELUP: ATTENDEE LIST
  // -----------------------------

  const attendee = {
    name: name,
    team: teamName
  };

  attendees.push(attendee);


  const listItem = document.createElement("li");

  listItem.textContent =
    `${name} - ${teamName}`;

  attendeeList.appendChild(listItem);


  // -----------------------------
  // LEVELUP: SAVE PROGRESS
  // -----------------------------

  localStorage.setItem("total", total);
  localStorage.setItem("water", water);
  localStorage.setItem("zero", zero);
  localStorage.setItem("power", power);

  localStorage.setItem(
    "attendees",
    JSON.stringify(attendees)
  );


  // -----------------------------
  // LEVELUP: CELEBRATION
  // -----------------------------

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
      `🎉 Congratulations! Attendance goal reached! ${winningTeam} wins!`;
  }


  // Reset form
  form.reset();

});