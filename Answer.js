// Question No-1

function describeValue(value){

const type = typeof value;

const truthiness = value ? "truthy": "falsy";

return `${type} | ${truthiness}`;

}

// Question No- 2

function getDayType(day){

const d = day.toLowerCase();

switch (d){

case "friday":

case "saturday":

return "Weekend";

case "sunday":

case "monday":

case "tuesday":

case"wednesday":

case"thursday":

return "Working Day";

default:

return "Invalid Day";


}

}

// Question NO-3

function validateUsername(username) {

if (username.length < 4)

return "Too Short";

if (username.includes(" "))

return "No Space Allowed";

if (username.toLowerCase().includes("admin"))

return "Reserved Word";

return "Available";


}

//Question -04

function getCngFare(distance, isNight = false, waitingMinutes = 0){

let fare = 50;

if (distance >2){

fare += (distance -2)*15;

}

const waitingCharge = waitingMinutes *2;

let total = fare + waitingCharge ;

if (isNight){

total = total * 1.2;

}

return total ;

}

// Question No-5

const getChaseVerdict = (target, scored, ballsLeft) =>{

const runsNeeded = target - scored;

if (runsNeeded <= 0)

return "Won";


if (ballsLeft <= 0)

return "Lost";

const requiredRate = (runsNeeded / ballsLeft) * 6;

let verdict;

if (requiredRate <= 6){

verdict = "Comfortable";

}else if (requiredRate <= 12){

verdict = "Tough";

}else{

verdict = "Almost Impossible";

}

return `Need ${runsNeeded} runs in ${ballsLeft} balls | ${verdict}`;

};
