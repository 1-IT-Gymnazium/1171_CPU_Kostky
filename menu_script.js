// menu_script.js
const root = document.documentElement;
const container = document.getElementById('button-container');

const menu = {
  main: ["start", "rules"],
  start: ["oneVOne", "oneVAI"]
};
const menuCZ = {
  main: ["Hrát", "Pravidla"],
  start: ["1v1", "1vAI"]
};

function createMenu(menuName) {
  showMenuContainer();
    container.innerHTML = ''; // Maže staré tlačítka
  
    const keys = menu[menuName];
    const labels = menuCZ[menuName];
  
    keys?.forEach((key, i) => {
      const btn = document.createElement('button');
      //const sld = document.createElement(''); //tady musi byt slider
      btn.innerText = labels[i]; // ukáže český název
      btn.dataset.key = key; 
      btn.onclick = () => {
        if (menu[key]) {
          createMenu(key); // submenu
        } else {
          handleAction(key); // backend logic
        }
      };
      container.appendChild(btn);
    });
    

  
    if (menuName !== 'main' ) {
      const backBtn = document.createElement('button');
      backBtn.innerText = 'Zpět'; // Czech for Back
      backBtn.onclick = () => createMenu('main');
      container.appendChild(backBtn);
    }
  }
  
  
  function handleAction(name) {
    switch (name) {
        case 'start':
            console.log("Start game");
            startGame();
            break;
        case 'rules':
            console.log("Show rules");
            window.location.href = ("https://www.kramekprodeti.cz/fotky45931/fotov/_ps_42351Pravidla-her-v-kostky.pdf");
            break;
        case 'oneVOne':
            console.log("1v1 game");
            startGame(0);
            break;
        case 'oneVAI':
            console.log("1vAI game");
            startGame(1);
            break;
        default:
            error("Unknown action: " + name);
            break;
    }
  }
  
createMenu('main'); // Start with main menu

document.addEventListener('DOMContentLoaded', () => {
    buttons = document.querySelectorAll('#button-container > *');
    console.log(buttons);
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(-300%)';
        setTimeout(() => {
          button.style.animation = `slideInFromTop 1.5s ease-in forwards`; // Trigger animation
          button.style.animationDelay = `${0.5 + index * 0.25}s`; // Adjust delay for each button
          root.style.setProperty('--menuButtonsOpacity', '1');
        }, 0); // Delay adding the animation class to give time for initial style setup
      });
});

function hideSettringsContainer(){
  document.getElementById('settings').style.display = 'none';
}

function showButtonContainer() {
document.getElementById('button-container').style.display = 'flex';
}

function hideButtonContainer() {
document.getElementById('button-container').style.display = 'none';
}

function showSettingsContainer() {
document.getElementById('settings').style.display = 'flex';
}

function hideMenuContainer() {
document.getElementById('menu').style.display = 'none';
}
function showMenuContainer() {
document.getElementById('menu').style.display = 'flex';
}
function hideGameContainer() {
document.getElementById('game').style.display = 'none';
}