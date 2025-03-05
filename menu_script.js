const menu = document.getElementById('menu');
const buttons = [
    "start",
    "settings",
    "rules",
];
const start = [
    "1vs1",
    "1vsAI",
    "back"
];
const aiDificulty = [
    "easy",
    "medium",
    "hard",
    "back"
];
const settings = [
    "sound",    
    "back"
];
const rules = [
    "back"
];

function updateMenu(){
    menu.innerHTML = "";
    for (let i = 0; i < buttons.length; i++) {
        const button = document.createElement('button');
        button.innerHTML = buttons[i];
        button.onclick = function(){
            switch(buttons[i]){
                case "start":
                    updateStart();
                    break;
                case "settings":
                    updateSettings();
                    break;
                case "rules":
                    updateRules();
                    break;
            }
        }
        menu.appendChild(button);
    }
}
updateMenu();

function updateStart() {
    menu.innerHTML = "";
    for (let i = 0; i < start.length; i++) {
        const button = document.createElement('button');
        button.innerHTML = start[i];
        button.onclick = function(){
            if (start[i] === "back") {
                updateMenu();
            } else if (start[i] === "1vsAI") {
                updateAIDifficulty();
            } else {
                // Handle other start options (1vs1)
                console.log(start[i]);
            }
        }
        menu.appendChild(button);
    }
}

function updateAIDifficulty() {
    menu.innerHTML = "";
    for (let i = 0; i < aiDificulty.length; i++) {
        const button = document.createElement('button');
        button.innerHTML = aiDificulty[i];
        button.onclick = function(){
            if (aiDificulty[i] === "back") {
                updateStart();
            } else {
                // Handle AI difficulty options (easy, medium, hard)
                console.log(aiDificulty[i]);
            }
        }
        menu.appendChild(button);
    }
}

function updateSettings() {
    menu.innerHTML = "";
    for (let i = 0; i < settings.length; i++) {
        const button = document.createElement('button');
        button.innerHTML = settings[i];
        button.onclick = function(){
            if (settings[i] === "back") {
                updateMenu();
            } else {
                // Handle settings options (sound)
                console.log(settings[i]);
            }
        }
        menu.appendChild(button);
    }
}

function updateRules() {
    menu.innerHTML = "";
    for (let i = 0; i < rules.length; i++) {
        const button = document.createElement('button');
        button.innerHTML = rules[i];
        button.onclick = function(){
            if (rules[i] === "back") {
                updateMenu();
            } else {
                // Handle rules options
                console.log(rules[i]);
            }
        }
        menu.appendChild(button);
    }
}