let dices = [];
let turnScore = 0;
let score = 0;

const dicesTable = document.getElementsByClassName('dicesTable');

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
let dicesTurnCount = 6;
const rollButton = document.getElementById('rollButton');
rollButton.addEventListener('click', function() {
  rollButtonFunction();
});
const endTurnButton = document.getElementById('endTurnButton');
endTurnButton.addEventListener('click', function() {
  endTurnButtonFunction();
});

function rollButtonFunction(){
  turnScore += logPoints(getSelectedDices());
  dicesTurnCount -= getSelectedDices().length;
  roll(dicesTurnCount);
}
function endTurnButtonFunction(){
  turnScore += logPoints(getSelectedDices());
  saveScore();
  if(players[0].isPlaying){
    players[0].isPlaying = false;
    players[1].isPlaying = true;
  }
  else{
    players[0].isPlaying = true;
    players[1].isPlaying = false;
  }
  console.log(players[0].score);
  console.log(players[1].score);
  startNewTurn();
}
function saveScore(){
  let onTurn = players.find(player => player.isPlaying).name - 1;
  players[onTurn].score += turnScore;
  turnScore = 0;
}
function startNewTurn(){
  //let onTurn = players.find(player => player.isPlaying).name - 1;
  //dicesTable.style.backgroundColor = players[onTurn].color;
  dicesTurnCount = 6;
  turnScore = 0;
  roll(dicesTurnCount);
}

let players = [
  {
    name: 1,
    score: 0,
    isPlaying: true,
    color: '#ff0000'
  },
  {
    name: 2,
    score: 0,
    isPlaying: false,
    color: '#0000ff'
  }
]

function updateScore(){
  let onTurn = players.find(player => player.isPlaying).name;
  console.log(onTurn);
  players[onTurn].score += turnScore;
  turnScore = 0;
  document.getElementById('playerScore').innerText = players[onTurn].score;
}

function startGame(setting){
  /*
  inputy:
  0 - hrac proti hraci
  1 - hrac proti ai (easy)
  2 - hrac proti ai (medium)
  3 - hrac proti ai (hard)
  */
  hideMenuContainer();
  console.log('menu hidden');
  document.getElementById('game').style.display = 'flex';
 dices = roll(6);
}

function setScore() 
{
  
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
      dice.index = numbers[i];// asdfjasdfj
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

function getSelectedDices(){
  let dices = document.getElementsByClassName('dice');
  let selected = [];
  for(let i = 0; i < dices.length; i++){
    if(dices[i].style.border === '3px solid red'){
      selected.push(dices[i].index);
    }
  }
  return selected;
}

//roll(6);
function roll(count){// 6 deflaut
  generateDices(rollDices(count))
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

  function isAllPairs(arr) {
      if (arr.length !== 6) return false; // Ensure the array has exactly 6 elements
  
      const countMap = arr.reduce((acc, num) => {
          acc[num] = (acc[num] || 0) + 1;
          return acc;
      }, {});
  
      return Object.values(countMap).every(count => count === 2);
}

function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false; // Check length first

  // Sort both arrays and compare them
  return arr1.sort().toString() === arr2.sort().toString();
}

function logPoints(selected){
  let result = 0;
  selected.sort(function(a, b){return a - b});
  console.log(selected);
  for(let i = selected.length -1; i >= 0; i--){
    for(let j = 0; j < selected.length; j++){
      result += getPoints(checkForMax(selected, i,j));
      console.log(checkForMax(selected, i,j));
      if(getPoints(checkForMax(selected, i,j)) > 0){
        selected = subtractArrays(selected, checkForMax(selected, i,j));
      }
    }
  }
  return result;
}
function subtractArrays(arr1, arr2) {
  return arr1.filter(item => !arr2.includes(item));
}
function getPoints(selected) //vraci pocet pointu
{
  let result = 0;
  let seq = [1,2,3,4,5,6];
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
  else if(areArraysEqual(selected,seq)) //postupka
  {
    result += 1500; 
    console.log("postupka")
  }
  else
  {
    if(isAllPairs(selected) == true)
    {
      result += 1000;
      console.log("mary");
    }
    else if(selected.length < 3)
    {
      for(let i = 0; i < selected.length; i++){
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

function easyBot(playersDices){
  let maxScore = 0;
  for(let i = 1; i <= playersDices.length; i++)
  {
    for(let j = 0; j < (playersDices.length - i) +1; j++)
    {
      let currentScore = logPoints(checkForMax(playersDices, i, j));
      maxScore = (maxScore < currentScore) ? currentScore : maxScore;
    }
  }
  return maxScore;
}

function checkForMax(arr,length, index){
  let result  = new Array(length);
  for(let i = 0; i < length; i++)
  {
    if(i + index < arr.length)
    {
      result[i] = arr[i + index];
    }
    else
    {
      result[i] = arr[(i + index) - arr.length];
    }
  }
  return result;
}