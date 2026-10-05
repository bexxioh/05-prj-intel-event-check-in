// Get the form and page elements
const form = document.querySelector("#check-in-form");

const nameInput = document.querySelector("#name");
const teamSelect = document.querySelector("#team");

const greeting = document.querySelector("#greeting");
const totalCount = document.querySelector("#total-count");

const progressBar = document.querySelector("#progress-bar");

const waterWiseCount = document.querySelector("#water-wise-count");
const netZeroCount = document.querySelector("#net-zero-count");
const renewablesCount = document.querySelector("#renewables-count");

const attendeeList = document.querySelector("#attendee-list");
const celebration = document.querySelector("#celebration");

// Attendance goal
const attendanceGoal = 50;

// Starting counts
let total = 0;

let waterWise = 0;
let netZero = 0;
let renewables = 0;

// Store attendees
let attendees = [];


// ----------------------------------------
// LOAD SAVED PROGRESS
// ----------------------------------------

const savedTotal = localStorage.getItem("total");
const savedWaterWise = localStorage.getItem("waterWise");
const savedNetZero = localStorage.getItem("netZero");
const savedRenewables = localStorage.getItem("renewables");
const savedAttendees = localStorage.getItem("attendees");

if (savedTotal !== null) {
    total = Number(savedTotal);
}

if (savedWaterWise !== null) {
    waterWise = Number(savedWaterWise);
}

if (savedNetZero !== null) {
    netZero = Number(savedNetZero);
}

if (savedRenewables !== null) {
    renewables = Number(savedRenewables);
}

if (savedAttendees !== null) {
    attendees = JSON.parse(savedAttendees);
}


// ----------------------------------------
// UPDATE THE PAGE WITH SAVED INFORMATION
// ----------------------------------------

totalCount.textContent = total;

waterWiseCount.textContent = waterWise;
netZeroCount.textContent = netZero;
renewablesCount.textContent = renewables;


// Calculate the progress percentage
let progress = (total / attendanceGoal) * 100;

// Don't let the progress bar go over 100%
if (progress > 100) {
    progress = 100;
}

progressBar.style.width = `${progress}%`;


// Display saved attendees
for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];

    const attendeeItem = document.createElement("li");

    attendeeItem.textContent = `${attendee.name} - ${attendee.team}`;

    attendeeList.appendChild(attendeeItem);
}


// ----------------------------------------
// CHECK-IN FORM
// ----------------------------------------

form.addEventListener("submit", function(event) {

    // Stop the page from refreshing
    event.preventDefault();

    // Get the attendee's name
    const name = nameInput.value;

    // Get the selected team
    const team = teamSelect.value;

    // Get the full team name from the selected option
    const teamLabel = teamSelect.options[teamSelect.selectedIndex].text;

    // Increase total attendance
    total = total + 1;

    // Increase the correct team's count
    if (team === "water-wise") {
        waterWise = waterWise + 1;
        waterWiseCount.textContent = waterWise;
    }

    if (team === "net-zero") {
        netZero = netZero + 1;
        netZeroCount.textContent = netZero;
    }

    if (team === "renewables") {
        renewables = renewables + 1;
        renewablesCount.textContent = renewables;
    }


    // ----------------------------------------
    // WELCOME MESSAGE
    // ----------------------------------------

    greeting.textContent = `Welcome, ${name}! You are checked in with ${teamLabel}.`;


    // ----------------------------------------
    // UPDATE TOTAL
    // ----------------------------------------

    totalCount.textContent = total;


    // ----------------------------------------
    // UPDATE PROGRESS BAR
    // ----------------------------------------

    progress = (total / attendanceGoal) * 100;

    if (progress > 100) {
        progress = 100;
    }

    progressBar.style.width = `${progress}%`;


    // ----------------------------------------
    // ADD ATTENDEE TO THE LIST
    // ----------------------------------------

    const attendee = {
        name: name,
        team: teamLabel
    };

    attendees.push(attendee);

    const attendeeItem = document.createElement("li");

    attendeeItem.textContent = `${name} - ${teamLabel}`;

    attendeeList.appendChild(attendeeItem);


    // ----------------------------------------
    // SAVE PROGRESS
    // ----------------------------------------

    localStorage.setItem("total", total);
    localStorage.setItem("waterWise", waterWise);
    localStorage.setItem("netZero", netZero);
    localStorage.setItem("renewables", renewables);
    localStorage.setItem("attendees", JSON.stringify(attendees));


    // ----------------------------------------
    // CELEBRATION FEATURE
    // ----------------------------------------

    if (total >= attendanceGoal) {

        let winningTeam = "";

        if (
            waterWise >= netZero &&
            waterWise >= renewables
        ) {
            winningTeam = "Team Water Wise";
        }

        if (
            netZero > waterWise &&
            netZero >= renewables
        ) {
            winningTeam = "Team Net Zero";
        }

        if (
            renewables > waterWise &&
            renewables > netZero
        ) {
            winningTeam = "Team Renewables";
        }

        celebration.textContent =
            `🎉 Attendance goal reached! ${winningTeam} is currently winning!`;
    }


    // ----------------------------------------
    // RESET THE FORM
    // ----------------------------------------

    form.reset();

});