let dices = [];
let turnScore = 0;
//let score = 0;
let gameIsOver = false;

const dicesTable = document.getElementsByClassName('dicesTable');
const endGameButton = document.getElementById('endGame');

const diceImages = [
  'Files/Dices/one.png',
  'Files/Dices/two.png',
  'Files/Dices/three.png',
  'Files/Dices/four.png',
  'Files/Dices/five.png',
  'Files/Dices/six.png'
];
const bg_musics = [
  'Files/Sound/bg_music1.mp3',
  'Files/Sound/bg_music2.mp3',
  'Files/Sound/bg_music3.mp3',
  'Files/Sound/bg_music4.mp3'
];

//const bg_music = new Audio('Files/Sound/bg_music1.mp3');
const bg_music = new Audio(bg_musics[getRnd(0,3)]);

bg_music.addEventListener('ended', () => {
  bg_music.src = bg_musics[getRnd(0,3)]; // Pick a new random sound
  bg_music.play(); // Play the new sound
});

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
    isWinner: false,
    color: '#ff0000',
    isBot: false
  },
  {
    name: 2,
    score: 0,
    isPlaying: false,
    isWinner: false,
    color: '#0000ff',
    isBot: true
  }
]

function changeVolume(volume){ //mnění hlasitost sound efectů (ne hudby)
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
endGameButton.addEventListener('click', function() {
  createMenu('main');
  hideGameContainer();
  bg_music.pause();
});

function rollButtonFunction(){ //tlacitko pro dalsi roll
  turnScore += logPoints(getSelectedDices());
  console.log(turnScore);
  let onTurn = players.find(player => player.isPlaying).name - 1;
  updateInfo();
  if(logPoints(getSelectedDices()) == 0){ // jestli hrac detostane zadne skore tak konci tah
    turnScore = 0;
    endTurnButtonFunction();
  }
  else{
    if(players[onTurn].isBot){
      dicesTurnCount -= (dicesTurnCount - nums.length);
    }
    else{
      dicesTurnCount -= getSelectedDices().length;
    }
      if(dicesTurnCount < 1)
      {
        dicesTurnCount = 6;
     }
      roll(dicesTurnCount);
}
}
function endTurnButtonFunction(){ //tlacitko na ukonceni tahu
  updateInfo();
  turnScore += logPoints(getSelectedDices());
  console.log(turnScore);
  if(logPoints(getSelectedDices()) == 0){ // jestli hrac detostane zadne skore tak konci tah
    turnScore = 0;
  }
  if((turnScore + logPoints(getSelectedDices())) >= 400 && ((dicesTurnCount - getSelectedDices().length) < 3)){
  saveScore();
  }
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
  checkGameOver();
  startNewTurn();
}
function saveScore(){ //uklada score
  let onTurn = players.find(player => player.isPlaying).name - 1;
  players[onTurn].score += turnScore;
  turnScore = 0;
}
function startNewTurn(){ //zacina novy tah
  //dicesTable.style.backgroundColor = players[onTurn].color;
  updateInfo();
  dicesTurnCount = 6;
  turnScore = 0;
  roll(dicesTurnCount);
  botTurn(); //triggers only if bot on turn
}

function botTurn(){
  let onTurn = players.find(player => player.isPlaying).name - 1;
  if(players[onTurn].isBot){
    if((turnScore + logPoints(getAllDices())) >= 400 && (dicesTurnCount - getAllDices().length) < 3){
      endTurnButtonFunction();
    }
    else{
      rollButtonFunction(true);
      setTimeout(botTurn, 3000);
    }
  }
}

function updateInfo(){ //aktualizuje score jmeno hrace adt. 
  if(!gameIsOver)
  {
    document.getElementById('player1Name').innerText = players[0].name;
    document.getElementById('player1Score').innerText = players[0].score;
    document.getElementById('player2Name').innerText = players[1].name;
    document.getElementById('player2Score').innerText = players[1].score;
    document.getElementById('turnScore').innerText = turnScore;
    document.getElementById('turn').innerText = "" + players.find((player) => player.isPlaying).name;
  }
  else{
    [...document.getElementsByClassName('innerGameContainer')].forEach(el => el.style.display = 'none');
    if(players.find((player) => player.isWinner) != undefined){
      document.getElementById('end').innerText = "Player " + players.find((player) => player.isWinner).name + " Won!"; // ten kdo vyhra
      console.log("smrdi ti koule")
    }
    else{
      console.error("neproslo ti to sracko");
      
    }
  }

}

function updateScore(){
  let onTurn = players.find(player => player.isPlaying).name;
  console.log(onTurn);
  players[onTurn].score += turnScore;
  turnScore = 0;
  document.getElementById('playerScore').innerText = players[onTurn].score;
}

function checkGameOver(){
  let winner = players.find(player => player.score >=  2500)
  if(winner != undefined){
    gameIsOver = true;
    if(winner.name == 1){
     players[0].isWinner = true;
     console.log("player 1 wins");
    }
    if(winner.name == 2){
      players[1].isWinner = true;
      console.log("player 2 wins");
    }
  }
  updateInfo();
}

function startGame(){ //zacatek
  hideMenuContainer();
  console.log('menu hidden');
  document.getElementById('game').style.display = 'flex';
  dices = roll(6);
  bg_music.play();
  updateInfo();
  setTimeout(botTurn()); //triggers only if bot is in game
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
  if(selected.length == 0)
  {
    selected = getAllDices();
  }
  return selected;
}

function getAllDices(){
  let preDices = document.getElementsByClassName('dice');
  let dices = [];
  for(let i = 0; i < preDices.length; i++){
    dices.push(preDices[i].index);
  }
  return dices;
}


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

function sequence(selected) //checks for sequence
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

function singls(ints){ //checks for 1s and 5s
  let sinRes = 0;
      for(let i = 0; i < ints.length; i++){
        if(ints[i] == 5){
          sinRes += 50;
          console.log(" + 50");
        }
        if(ints[i] == 1){
          sinRes += 100;
          console.log(" + 100");
        }
      } 
    return sinRes;
}

function filterNums(ints){ //filtruje cisla ktera nejsou ve trojici a vice
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

function xTimesNum(ints, filterIndex){ //vraci pocet bodu za x krat cislo
  let filter = filterNums(ints)[filterIndex];
  let result = 0;
    let multi = (filter.count == 3) ? 100 : (filter.count == 4) ? 200 : (filter.count == 5) ? 400 : 800;
    let isOne = (filter.num == 1) ? 10 : 1;
      result += (filter.num) * multi * isOne;
    console.log("3 x " + filter.num);
  let toRemove = [];
  for(let i = 0; i < filter.count; i++){
    toRemove[i] = filter.num;
  }
  nums = subtractArrays(nums, toRemove);
  return result;
}

function isAllPairs(arr) { //checks for pairs
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
  let onTurn = players.find(player => player.isPlaying).name - 1;
  let isBot = players[onTurn].isBot;
  if(selected.length == 0)
    {
      return 0;
    }
  else{
  selected.sort(function(a, b){return a - b});
  nums = selected;
  let result = 0;
  if((sequence(nums) != 0)){
    result += sequence(nums);
  }
  else if (isAllPairs(nums) != 0){
    result += isAllPairs(nums);
  }
  else{
    result += multiNums(nums);
    result += singls(nums);
    nums = subtractArrays(nums, [1,5]);
    if(nums.length != 0 && !isBot){
      result = 0;
    }
  }
    return result;
}
}