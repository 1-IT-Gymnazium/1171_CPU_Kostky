// menu_script.js
const root = document.documentElement;
const container = document.getElementById('button-container');

const menu = {
  main: ["start", "rules", "settings"],
  settings: ["volume", "music volume"],
};
const menuCZ = {
  main: ["Hrát", "Pravidla", "Nastavení"],
  settings: ["Hlasitost", "Hlasitost hudby"],
};

function createMenu(menuName) {
    container.innerHTML = ''; // Clear old buttons
  
    const keys = menu[menuName]; // backend keys
    const labels = menuCZ[menuName]; // display labels
  
    keys?.forEach((key, i) => {
      const btn = document.createElement('button');
      btn.innerText = labels[i]; // show Czech label
      btn.dataset.key = key; // store backend key
      btn.onclick = () => {
        if (menu[key]) {
          createMenu(key); // submenu
        } else {
          handleAction(key); // backend logic
        }
      };
      container.appendChild(btn);
    });
  
    if (menuName !== 'main') {
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
            startGame();
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

function hideMenuContainer() {
document.getElementById('menu').style.display = 'none';
}