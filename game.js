const dices = rollDices(6);

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

function logPoints(selected)
{
  let turnScore = 0;
  selected.sort(function(a, b){return a - b});
  console.log(Math.min(...selected) +"," +  Math.max(...selected));
  if(Math.min(...selected) == Math.max(...selected) && selected[0] == 1)//jedničky
  {
    turnScore += selected.length * selected[0] * 1000;
  }
  else if(Math.min(...selected) == Math.max(...selected)) //x* cislo
  {
    let multi = (selected.length == 3 || selected.length == 4) ? 2 : (selected.length == 5) ? 1 : -2;
    turnScore += (selected.length - multi) * selected[0] * 100;
    console.log("x*cislo")
  }
  else if((Math.min(...selected) == 1 && Math.max(...selected) == 6) && selected.length == 6) //postupka
  {
    turnScore += 1500; 
    console.log("postupka")
  }
  else
  {
    let pairs = [0, 0, 0, 0, 0, 0];
    //let pairs = new Array(6);
    for(let i = 0; i < selected.length; i++) // páry
    {
      pairs[selected[i] -1]++;
    }
    console.log(Math.min(...pairs) +"," +  Math.max(...pairs));
    console.log(pairs);
    if((Math.max(...pairs) == 2) && selected.length == 6)
    {
      turnScore += 1000;
      console.log("pary");
    }
    else
    {
      for(let i = 0; i < selected; i++) // 1/5
      {
        turnScore += (selected[i] == 5) ? 50 : (selected[i] == 1) ? 100 : 0;
        console.log("1/5")
      }
    }
  }
  return turnScore;
}

console.log(logPoints([3,3,3,3,3,3]));
