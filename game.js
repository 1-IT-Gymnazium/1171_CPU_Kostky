const dices = rollDices(6);
let turnScore = 0;
let score = 0;

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
        console.log(selected[i])
      }
    }
  }
  return result;
}



console.log(logPoints([1,1,5]));
