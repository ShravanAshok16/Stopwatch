// Select the elements
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const stopwatchDisplay = document.getElementById('stopwatch');
const lapTimesContainer = document.getElementById('lapTimes');

// Variables for tracking state
let isRunning = false;
let interval; // Stores the interval ID
let seconds = 0; // Elapsed time in seconds
let laps = []; // Store lap times

// Function to update the stopwatch display
function updateStopwatch() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    // Format time in HH:MM:SS
    const formattedTime = `${padTime(hours)}:${padTime(minutes)}:${padTime(sec)}`;
    stopwatchDisplay.textContent = formattedTime;
}

// Function to add leading zeros
function padTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Start/Stop button functionality
startStopButton.addEventListener('click', () => {
    if (isRunning) {
        // Stop the stopwatch and clear the interval
        clearInterval(interval);
        startStopButton.textContent = 'Start';
        lapButton.disabled = true;
    } else {
        // Start the stopwatch and set the interval
        interval = setInterval(() => {
            seconds += 1;
            updateStopwatch();
        }, 1000);
        startStopButton.textContent = 'Stop';
        lapButton.disabled = false; // Enable the lap button when stopwatch is running
    }

    isRunning = !isRunning;
});

// Reset button functionality
resetButton.addEventListener('click', () => {
    clearInterval(interval);
    seconds = 0;
    updateStopwatch();
    startStopButton.textContent = 'Start';
    lapButton.disabled = true;
    isRunning = false;
    laps = []; // Reset laps
    lapTimesContainer.innerHTML = ''; // Clear lap times display
});

// Lap button functionality
lapButton.addEventListener('click', () => {
    const lapTime = formatLapTime(seconds);
    laps.push(lapTime);
    displayLapTimes();
});

// Format lap time into HH:MM:SS format
function formatLapTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(sec)}`;
}

// Display lap times
function displayLapTimes() {
    lapTimesContainer.innerHTML = '<h3>Lap Times:</h3>';
    const ul = document.createElement('ul');
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.innerHTML = `Lap ${index + 1}: <span>${lap}</span>`;
        ul.appendChild(li);
    });
    lapTimesContainer.appendChild(ul);
}
