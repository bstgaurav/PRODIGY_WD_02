
const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const lapList = document.getElementById("lapList");

let startTime = 0;
let elapsedTime = 0;
let timer = null;
let lapCount = 0;

function updateDisplay() {
    const currentTime = Date.now() - startTime + elapsedTime;

    const hours = Math.floor(currentTime / 3600000);
    const minutes = Math.floor((currentTime % 3600000) / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = Math.floor((currentTime % 1000) / 10);

    display.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0");
}

startBtn.addEventListener("click", function () {
    if (timer === null) {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
    }
});

pauseBtn.addEventListener("click", function () {
    if (timer !== null) {
        elapsedTime += Date.now() - startTime;
        clearInterval(timer);
        timer = null;
    }
});

resetBtn.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;

    startTime = 0;
    elapsedTime = 0;
    lapCount = 0;

    display.textContent = "00:00:00.00";
    lapList.innerHTML = "";
});

lapBtn.addEventListener("click", function () {
    if (timer !== null) {
        lapCount++;

        const lapTime = display.textContent;

        const li = document.createElement("li");

        li.innerHTML = `<span>Lap ${lapCount}</span><span>${lapTime}</span>`;

        lapList.prepend(li);
    }
});
