
let dices = rollDices(6);
let turnScore = 0;
let score = 0;

const diceImages = [
  'Files/Dices/one.png',
  'Files/Dices/two.png',
  'Files/Dices/three.png',
  'Files/Dices/four.png',
  'Files/Dices/five.png',
  'Files/Dices/six.png'
];
const clickSoundEffects = [
  new Audio('Files/Sound/Click1.wav'),
  new Audio('Files/Sound/Click2.wav'),
  new Audio('Files/Sound/Click3.wav'),
  new Audio('Files/Sound/Click4.wav'),
  new Audio('Files/Sound/Click5.wav'),
  new Audio('Files/Sound/Click6.wav'),
  new Audio('Files/Sound/Click7.wav')
]

function changeVolume(volume){
  clickSoundEffects.forEach(element => {
    clickSoundEffects[element].volume = volume;
  });
}

let turn = 0; // 0 Hrac 1, 1 Hrac 2
let playerOne = {
  score: 0
};
let playerTwo = {
  score: 0
};

playerOne.score = 50;
playerTwo.score = 60;

console.log(playerOne.score + " " + playerTwo.score);

function debugStart(){
  console.log('debug start');
  hideMenuContainer();
  console.log('menu hidden');
  document.getElementById('game').style.display = 'flex';
}

function startGame(setting){
  /*
  inputy:
  0 - hrac proti hraci
  1 - hrac proti ai (easy)
  2 - hrac proti ai (medium)
  3 - hrac proti ai (hard)
  */
}

function updateScore(){
  document.getElementById('scoreA').innerHTML = '<div class="text">' + playerOne.score + '</div>';
  document.getElementById('scoreB').innerHTML = '<div class="text">' + playerTwo.score + '</div>';
}

function generateDices(numbers) {
  const container = document.getElementById("dicesTable");
  container.innerHTML = "";

  const positions = [];
  for (let row = 1; row <= 6; row++) {
      for (let col = 1; col <= 9; col++) {
          positions.push({ row, col });
      }
  }
  positions.sort(() => Math.random() - 0.5);

  for (let i = 0; i < numbers.length; i++) {
      if (i >= positions.length) break;

      const dice = document.createElement("img");
      dice.className = "dice"; 
      dice.src = diceImages[numbers[i] - 1]; // Adjusted index for 0-based array
      dice.setAttribute("draggable", "false");

      const { row, col } = positions[i];

      dice.style.gridColumn = col;
      dice.style.gridRow = row;

      // Slight random movement and rotation
      let offsetX = (Math.random() - 0.5) * 20;
      let offsetY = (Math.random() - 0.5) * 20;
      let rotate = (Math.random() - 0.5) * 20;
      dice.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`;

      container.appendChild(dice);

      dice.addEventListener('click', function() {
        dice.style.border = (dice.style.border === '3px solid red') ? dice.style.border = '3px solid black' : dice.style.border = '3px solid red';
        const soundIndex = Math.floor(Math.random() * clickSoundEffects.length);
        clickSoundEffects[soundIndex].play();              
      });
  }
}
roll();
function roll(){
  generateDices(rollDices(6))
}

function updateSelected(){

}

function rollDices(length)
{
  let result = [];
  for(let i = 0; i < length; i++)
  {
    result.push(getRnd(1,6));
  }
  return result;
}

function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
/*
function logPoints(selected) //vraci pocet pointu
{
  let result = 0;
  selected.sort(function(a, b){return a - b});
  if((Math.min(...selected) == Math.max(...selected) && selected[0] == 1) && selected.length > 2)//jedničky
  {
    result += selected.length * selected[0] * 1000;
  }
  else if((Math.min(...selected) == Math.max(...selected))&& selected. length > 2) //x* cislo
  {
    let multi = (selected.length == 3 || selected.length == 4) ? 2 : (selected.length == 5) ? 1 : -2;
    result += (selected.length - multi) * selected[0] * 100;
    console.log("x*cislo")
  }
  else if((Math.min(...selected) == 1 && Math.max(...selected) == 6) && selected.length == 6) //postupka
  {
    result += 1500; 
    console.log("postupka")
  }
  else
  {
    let pairs = [0, 0, 0, 0, 0, 0];
    for(let i = 0; i < selected.length; i++) // páry
    {
      pairs[selected[i] -1]++;
    }
    if((Math.max(...pairs) == 2) && selected.length == 6)
    {
      result += 1000;
      console.log("pary");
    }
    else
    {
      for(let i = 0; i < selected.length; i++) // 1/5
      {
        result += (selected[i] == 5) ? 50 : (selected[i] == 1) ? 100 : 0;
      }
    }
  }
  return result;
}

function hasPoints() //kontroluje jestli hracovi padla neaka hodnota
{
  if(logPoints(dices) == 0)
  {
    return false;
  }
  else
  {
    return true;
  }
}

function remFromDices(toRemove) // removuje z dices
{
  for(let i = 0; i < toRemove.length; i++)
  {
    let index = dices.indexOf(toRemove[i]);
    dices.splice(index, index);
  }
}

console.log(dices);
remFromDices([dices[1], dices[2], dices[3]]);
console.log(dices);
*/