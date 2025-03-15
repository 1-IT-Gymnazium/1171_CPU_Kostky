// menu_script.js

// Define the menus object (with correct syntax)
const menus = {
    'menu': document.getElementById('menu'),
    'start': document.getElementById('start'),
    'settings': document.getElementById('settings'),
    'rules': document.getElementById('rules'),
    'difficulty': document.getElementById('difficulty')
};

// buttons
const startButton = document.getElementById('startButton');
const settingsButton = document.getElementById('settingsButton');
const rulesButton = document.getElementById('rulesButton');
// start buttons
const oneVOneButton = document.getElementById('oneVOneButton');
const oneVAiButton = document.getElementById('oneVAiButton');

// difficulty buttons
const easyButton = document.getElementById('easyButton');
const mediumButton = document.getElementById('mediumButton');
const hardButton = document.getElementById('hardButton');

const volumeSlider = document.getElementById('volumeSlider');
const musicSlider = document.getElementById('musicSlider');

const volumeSliderValue = document.getElementById('volumeSliderValue');
const musicSliderValue = document.getElementById('musicSliderValue');

// Update the volume value when the slider is changed
volumeSlider.addEventListener('input', () => {
    volumeSliderValue.textContent = volumeSlider.value;
    console.log(volumeSlider.value);
    changeVolume(volumeSlider.value);
});

// Update the music volume value when the slider is changed
musicSlider.addEventListener('input', () => {
    musicSliderValue.textContent = musicSlider.value;
});



// Function to update the menu based on menuState
function menuUpdate(menuState) {
    // Hide all menus first
    for (let i in menus) {
        menus[i].style.display = 'none';
    }
    // Show the selected menu
    menus[menuState].style.display = 'flex';
}
function hideMenuContainer(){
    document.getElementById('menuContainer').style.display = 'none';
}

// Event Listeners
startButton.addEventListener("click", () => {
    menuUpdate('start');
});

settingsButton.addEventListener("click", () => {
    menuUpdate('settings');
});

rulesButton.addEventListener("click", () => {
    menuUpdate('rules');
});

oneVOneButton.addEventListener("click", () => {
    debugStart();
    startGame(0);
});

oneVAiButton.addEventListener("click", () => {
    menuUpdate('difficulty');
});

easyButton.addEventListener("click", () => {
    startGame(1);
    // start game with ai on easy difficulty
});
mediumButton.addEventListener("click", () => {
    startGame(2);
    // start game with ai on medium difficulty
});
hardButton.addEventListener("click", () => {
    startGame(3);
    // start game with ai on hard difficulty
});

// This function will be used in your script.js
function startMenu() {
    menuUpdate('menu'); // Start with the main menu visible
}
