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
// ==========================
// 

// ==========================
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJhrDE0-59tOtmv2ZB3nsXFChM9KgI8Nb4ETzB6ePL_z1onJZphewWGEI1GYV0M4ZGS3ZNLs2teOry/pub?output=csv";
async function loadSheetData() {

    try {

        const response = await fetch(SHEET_URL);
        const text = await response.text();

        const rows = text.trim().split("\n").map(r => r.split(","));

        const table = document.getElementById("marketTable");

        table.innerHTML = "";

        // 
        for (let i = 1; i < rows.length; i++) {

            const row = rows[i];

            if (row.length < 4) continue;

            const tr = `
            <tr>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
            </tr>`;

            table.innerHTML += tr;
        }

        // पहला Market ऊपर Live Result में दिखाओ
        if (rows.length > 1) {

            document.getElementById("marketName").innerText = rows[1][1];
            document.getElementById("marketResult").innerText = rows[1][3];

        }

    } catch (e) {

        console.log("Google Sheet Error:", e);

    }

}

// पहली बार Load
loadSheetData();

// हर 10 सेकंड में Update
setInterval(loadSheetData,10000);
