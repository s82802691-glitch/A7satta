// =========================
// LIVE CLOCK
// =========================

function updateClock() {

const now = new Date();

const options = {
weekday:'long',
day:'2-digit',
month:'long',
year:'numeric'
};

const date = now.toLocaleDateString('en-IN', options);

const time = now.toLocaleTimeString('en-IN');

const clock = document.getElementById("liveClock");

if(clock){

clock.innerHTML = `
${date}<br>
${time}
`;

}

}

setInterval(updateClock,1000);

updateClock();


// =========================
// AUTO REFRESH
// =========================

setInterval(function(){

location.reload();

},10000);


// =========================
// SAMPLE LIVE RESULT
// =========================

document.getElementById("marketName").innerHTML="Loading...";

document.getElementById("marketResult").innerHTML="XX";
