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
// PART-4 : GOOGLE SHEET LIVE
// script.js के सबसे नीचे पेस्ट करें
// ==========================

// बाद में यहाँ अपना Published CSV Link डालना
const SHEET_URL = "PASTE_YOUR_GOOGLE_SHEET_CSV_LINK_HERE";

async function loadSheetData() {

    try {

        const response = await fetch(SHEET_URL);
        const text = await response.text();

        const rows = text.trim().split("\n").map(r => r.split(","));

        const table = document.getElementById("marketTable");

        table.innerHTML = "";

        // पहली Row Header होती है
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
