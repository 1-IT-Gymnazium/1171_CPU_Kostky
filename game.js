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
const bg_music = new Audio('Files/Sound/bg_music.mp3');
bg_music.loop = true;

const clickSoundEffects = [
  new Audio('Files/Sound/Click1.wav'),
  new Audio('Files/Sound/Click2.wav'),
  new Audio('Files/Sound/Click3.wav'),
  new Audio('Files/Sound/Click4.wav'),
  new Audio('Files/Sound/Click5.wav'),
  new Audio('Files/Sound/Click6.wav'),
  new Audio('Files/Sound/Click7.wav')
]
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
  updateInfo();
  turnScore += logPoints(getSelectedDices());
  if(logPoints(getSelectedDices()) == 0){ // jestli hrac detostane zadne skore tak konci tah
    turnScore = 0;
    endTurnButton();
  }

  dicesTurnCount -= getSelectedDices().length;
  roll(dicesTurnCount);
}
function endTurnButtonFunction(){
  rollButtonFunction();
  saveScore();
  if(players[0].isPlaying){
    players[0].isPlaying = false;
    players[1].isPlaying = true;
  }
  else{
    players[0].isPlaying = true;
    players[1].isPlaying = false;
  }
  console.log("player 1 score is " + players[0].score);
  console.log("player 2 score is " + players[1].score);
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
  updateInfo();
  dicesTurnCount = 6;
  turnScore = 0;
  roll(dicesTurnCount);
}
function updateInfo(){
  let onTurn = players.find(player => player.isPlaying).name -1;
  console.log(onTurn);
  document.getElementById('playerName').innerText = players[onTurn].name;
  document.getElementById('playerScore').innerText = players[onTurn].score;
  document.getElementById('playerRolls').style.backgroundColor = turnScore;
  //document.getElementById('playerRoll').style.backgroundColor = currentroll;
}

function updateScore(){
  let onTurn = players.find(player => player.isPlaying).name;
  console.log(onTurn);
  players[onTurn].score += turnScore;
  checkGameOver();
  turnScore = 0;
  document.getElementById('playerScore').innerText = players[onTurn].score;
}

function checkGameOver(){
  if(players.find(player => player.score == 2500) < 0){
    // game over
  }
}

function startGame(){
  hideMenuContainer();
  console.log('menu hidden');
  document.getElementById('game').style.display = 'flex';
  dices = roll(6);
  bg_music.play();
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

function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false; // Check length first

  // Sort both arrays and compare them
  return arr1.sort().toString() === arr2.sort().toString();
}

function subtractArrays(arr1, arr2) {
  return arr1.filter(item => !arr2.includes(item));
}

function sequence(selected)
{
  let result = 0;
  let seq = [1,2,3,4,5,6];
  if(areArraysEqual(selected,seq)) //postupka
  {
    result = 1500;
    console.log("postupka");
  }
  return result;
}

function singls(ints){
  let sinRes = 0;
      for(let i = 0; i < ints.length; i++){
        if(ints[i] == 5){
          sinRes += 50;
        }
        if(ints[i] == 1){
          sinRes += 100;
        }
      } 
    console.log("pade nebo sto");
    return sinRes;
}

function filterNums(ints){
  results = [
    {
      count: 0,
      num: 0
    },
    {
      count: 0,
      num: 0
    }]
  let resultIndex = 0;

  for(let i = 1; i <= 6; i++){
    let count = 0;
    for(let  j = 0; j < ints.length; j++){
      count = ints.filter((n) => n == i ).length;
    }
    if(count > 2){
      results[resultIndex] = {
        count: count,
        num: i
      }
      resultIndex++; //muze obsahovat vicekrat 3 cisla
    }
  }

  return results;
}

function multiNums(ints){
  let result = 0;
  result += xTimesNum(ints,0);
  let filter = filterNums(ints);
  if(filter[1].num != 0 ){
    result += xTimesNum(ints, 1);
  }
  return result;
}

function xTimesNum(ints, filterIndex){
  let filter = filterNums(ints)[filterIndex];
  let result = 0;
    let multi = (filter.count == 3) ? 100 : (filter.count == 4) ? 200 : (filter.count == 5) ? 400 : 800;
    let isOne = (filter.num == 1) ? 10 : 1;
    result += (filter.num) * multi * isOne;
    console.log(filter);
    console.log("x*cislo");
  let toRemove = [];
  for(let i = 0; i < filter.count; i++){
    toRemove[i] = filter.num;
  }
  nums = subtractArrays(nums, toRemove);
  return result;
}

function isAllPairs(arr) {
    if (arr.length !== 6) return 0; // Ensure the array has exactly 6 elements

    const countMap = arr.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {});

    return Object.values(countMap).every(count => count === 2) ? 1000 : 0;
}

let nums = []
function logPoints(selected) //vraci pocet pointu
{
  selected.sort(function(a, b){return a - b});
  nums = selected;
  let result = 0;
  if(sequence(nums) != 0){
    result += sequence(nums);
  }
  else if (isAllPairs(nums) != 0){
    result += isAllPairs(nums);
  }
  else{
    result += multiNums(nums);
    result += singls(nums);
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