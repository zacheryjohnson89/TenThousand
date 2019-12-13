
var gamePlaying, nextMove, activePlayer, scores, roundScore, dice, currentDice, selectedDice, selectedState, slopValues, tempScore;

init();

function init() {
  gamePlaying = true;
  nextMove = true;
  activePlayer = 0;

  scores = [0, 0];
  roundScore = 0;
  tempScore = 0;
  dice = [0, 0, 0, 0, 0, 0];
  selectedDice = [0, 0, 0, 0, 0, 0];
  selectedState = [false, false, false, false, false, false];
  slopValues = [0, 0, 0, 0, 0, 0];

  document.querySelector(".current-hand-value").textContent = 0;
  document.querySelector(".score-0").textContent = 0;
  document.querySelector(".score-1").textContent = 0;

  document.querySelector(".dice-1").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";
  document.querySelector(".dice-3").style.display = "none";
  document.querySelector(".dice-4").style.display = "none";
  document.querySelector(".dice-5").style.display = "none";
  document.querySelector(".dice-6").style.display = "none";

  document.querySelector(".rules").style.display = "none";

}

///////////////////////////               New Game button                            ////////////////////////////////

document.querySelector(".btn-new").addEventListener("click", function() {

  init();

})



///////////////////////////                next Player function                       ///////////////////////////////

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  nextMove = true;
  roundScore = 0;
  tempScore = 0;
  dice = [0, 0, 0, 0, 0, 0];
  selectedDice = [0, 0, 0, 0, 0, 0];
  selectedState = [false, false, false, false, false, false];
  slopValues = [0, 0, 0, 0, 0, 0];

  document.querySelector(".player-0").classList.toggle("active");
  document.querySelector(".player-1").classList.toggle("active");

  document.querySelector(".current-hand-value").textContent = 0;

  document.querySelector(".dice-1").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";
  document.querySelector(".dice-3").style.display = "none";
  document.querySelector(".dice-4").style.display = "none";
  document.querySelector(".dice-5").style.display = "none";
  document.querySelector(".dice-6").style.display = "none";

}


////////////////////////////////           event listener for rolling dice                ////////////////////////////

document.querySelector(".btn-roll-dice").addEventListener("click", function() {
  if (gamePlaying) {
    if (nextMove) {
      dice = [diceCalc(), diceCalc(), diceCalc(), diceCalc(), diceCalc(), diceCalc() ]

      //calculates random number between 1 and 6
      function diceCalc() {
        var diceCalc = Math.floor(Math.random() * 6) + 1;
        return diceCalc;
      }

      //takes dice number and dice value and displays the correct dice
      function diceDom(diceNumber, diceValue) {
        var diceDOM = document.querySelector(".dice-" + diceNumber);
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + diceValue + ".png";
      }

      //resets dice if all six are selected
      var allSixSelected = stateCounter();

      if (allSixSelected === 6) {
        selectedDice = [0, 0, 0, 0, 0, 0];
        selectedState = [false, false, false, false, false, false];

        for (i = 0; i < selectedState.length; i++) {
            document.getElementById("dice-" + (i + 1)).classList.remove("selected-dice");
        }
      } else {};

      //evaluates the dice already selected to know which to display
      for (i = 0; i < dice.length; i++) {
        if (selectedState[i] === false) {
           diceDom(i + 1, dice[i]);
        } else {};
      }

      //counts the selectedState variable
      function stateCounter() {
        var count = 0;
        for (i = 0; i < selectedState.length; i++) {
          if (selectedState[i]) {
             count++;
          } else {};
        }
        return count;
      }


      //set slop slopValues
      for (i = 0; i < dice.length; i++) {
        if (selectedState[i] === false) {
           slopValues[i] = dice[i]
        } else {
          slopValues[i] = 0;
        };
      }

      //checks for 1,2,3,4,5,6 roll
      if (slopValues.includes(1) && slopValues.includes(2) && slopValues.includes(3) && slopValues.includes(4) && slopValues.includes(5) && slopValues.includes(6)) {
        tempScore += 1500;
      } else {

        //update for 1s
        oneCount = diceCounter(1);
        if (oneCount === 1) {
          tempScore += 100;
        } else if (oneCount === 2) {
          tempScore += 200;
        } else if (oneCount === 3) {
          tempScore += 1000;
        } else if (oneCount === 4) {
          tempScore += 1100;
        } else if (oneCount === 5) {
          tempScore += 1200;
        } else if (oneCount === 6) {
          tempScore += 2000;
        } else {
          slopRemove(1);
        };

        //update for 2s
        twoCount = diceCounter(2);
        if (twoCount >= 3 && twoCount < 6) {
          tempScore += 400;
        } else if (twoCount === 6) {
          tempScore += 400;
        } else {
          slopRemove(2);
        };

        //update for 3s
        threeCount = diceCounter(3);
        if (threeCount >= 3 &&  threeCount < 6) {
          tempScore += 300;
        } else if (threeCount === 6) {
          tempScore += 600;
        } else {
          slopRemove(3);
        };

        //update for 4s
        fourCount = diceCounter(4);
        if (fourCount >= 3 && fourCount < 6) {
          tempScore += 400;
        } else if (fourCount === 6) {
          tempScore += 800;
        } else {
          slopRemove(4);
        };

        //update for 5s
        fiveCount = diceCounter(5);
        if (fiveCount === 1) {
          tempScore += 50;
        } else if (fiveCount === 2) {
          tempScore += 100;
        } else if (fiveCount === 3) {
          tempScore += 500;
        } else if (fiveCount === 4) {
          tempScore += 550;
        } else if (fiveCount === 5) {
          tempScore += 600;
        } else if (fiveCount === 6) {
          tempScore += 1000;
        } else {
          slopRemove(5);
        };

        //update for 6s
        sixCount = diceCounter(6);
        if (sixCount >= 3 && sixCount < 6) {
          tempScore += 600;
        } else if (sixCount === 6) {
          tempScore += 1200;
        } else {
          slopRemove(6);
        };

      };


      //Counts the number of X dice in slop values
      function diceCounter(diceValue) {
        var count = 0;
        for (i = 0; i < slopValues.length; i++) {
          if (slopValues[i] === diceValue) {
             count++;
          } else {};
        }
        return count;
      }

      //deletes the number of x dice in slop values
      function slopRemove(diceValue) {
        for (i = 0; i < slopValues.length; i++) {
          if (slopValues[i] === diceValue) {
             slopValues[i] = 0;
          } else {};
        }
      }

      //analyzes slop and moves to the next player
      if (tempScore === 0) {
        nextPlayer();
        nextMove = true
      } else {
        nextMove = false;
      };

      tempScore = 0;

    }
  }

})






///////////////////////////           Event listeners for selecting dice                 //////////////////////////////////

  document.querySelector(".dice-1").addEventListener("click", function() {
    if (slopValues[0] !== 0) {
      var select = document.getElementById("dice-1");
      select.classList.toggle("selected-dice");

      addSelectedDiceValue(0, dice[0]);
    } else {};
    nextMove = false;
  });

  document.querySelector(".dice-2").addEventListener("click", function() {
    if (slopValues[1] !== 0) {
      var select = document.getElementById("dice-2");
      select.classList.toggle("selected-dice");

      addSelectedDiceValue(1, dice[1]);
    } else {};
    nextMove = false;
  });

  document.querySelector(".dice-3").addEventListener("click", function() {
    if (slopValues[2] !== 0) {
      var select = document.getElementById("dice-3");
      select.classList.toggle("selected-dice");

      addSelectedDiceValue(2, dice[2]);
    } else {};
    nextMove = false;
  });


  document.querySelector(".dice-4").addEventListener("click", function() {
    if (slopValues[3] !== 0) {
      var select = document.getElementById("dice-4");
      select.classList.toggle("selected-dice");

      addSelectedDiceValue(3, dice[3]);
    } else {};
    nextMove = false;
  });

  document.querySelector(".dice-5").addEventListener("click", function() {
    if (slopValues[4] !== 0) {
      var select = document.getElementById("dice-5");
      select.classList.toggle("selected-dice");

      addSelectedDiceValue(4, dice[4]);
    } else {};
    nextMove = false;
  });

  document.querySelector(".dice-6").addEventListener("click", function() {
    if (slopValues[5] !== 0) {
      var select = document.getElementById("dice-6");
      select.classList.toggle("selected-dice");

      addSelectedDiceValue(5, dice[5]);
    } else {};
    nextMove = false;
  });




////////////////////////////          puts selected dice value into selectedDice global variable              //////////////
function addSelectedDiceValue(diceNumber, selectedDiceValue) {
  if (document.getElementById("dice-" + (diceNumber + 1)).classList.contains("selected-dice")) {
    selectedDice[diceNumber] = selectedDiceValue;
    //state diceValue
    selectedState[diceNumber] = true;
  } else {
    selectedDice[diceNumber] = 0;
    selectedState[diceNumber] = false;
  }
}






/////////////////////////          Event listener for keeping dice               ////////////////////////////////////////////////

document.querySelector(".btn-keep-dice").addEventListener("click", function() {
  if(gamePlaying) {
    if (nextMove === false) {

        //checks for 1,2,3,4,5,6 roll
        if (selectedDice.includes(1) && selectedDice.includes(2) && selectedDice.includes(3) && selectedDice.includes(4) && selectedDice.includes(5) && selectedDice.includes(6)) {
          roundScore += 1500;
        } else {

          //update for 1s
          oneCount = diceCounter(1);
          if (oneCount === 1) {
            roundScore += 100;
          } else if (oneCount === 2) {
            roundScore += 200;
          } else if (oneCount === 3) {
            roundScore += 1000;
          } else if (oneCount === 4) {
            roundScore += 1100;
          } else if (oneCount === 5) {
            roundScore += 1200;
          } else if (oneCount === 5) {
            roundScore += 2000;
          } else {};

          //update for 2s
          twoCount = diceCounter(2);
          if (twoCount === 3) {
            roundScore += 200;
          } else if (twoCount === 6) {
            roundScore += 400;
          } else {};

          //update for 3s
          threeCount = diceCounter(3);
          if (threeCount === 3) {
            roundScore += 300;
          } else if (threeCount === 6) {
            roundScore += 600;
          } else {};

          //update for 4s
          fourCount = diceCounter(4);
          if (fourCount === 3) {
            roundScore += 400;
          } else if (fourCount === 6) {
            roundScore += 800;
          } else {};

          //update for 5s
          fiveCount = diceCounter(5);
          if (fiveCount === 1) {
            roundScore += 50;
          } else if (fiveCount === 2) {
            roundScore += 100;
          } else if (fiveCount === 3) {
            roundScore += 500;
          } else if (fiveCount === 4) {
            roundScore += 550;
          } else if (fiveCount === 5) {
            roundScore += 600;
          } else if (fiveCount === 5) {
            roundScore += 1000;
          } else {};

          //update for 6s
          sixCount = diceCounter(6);
          if (sixCount === 3) {
            roundScore += 600;
          } else if (sixCount === 6) {
            roundScore += 1200;
          } else {};

        };

        //Counts the number of X dice selected (for example there are 4x 6s) and deletes them from the selectedDice array
        function diceCounter(diceValue) {
          var count = 0;
          for (i = 0; i < selectedDice.length; i++) {
            if (selectedDice[i] === diceValue) {
               count++;
            } else {};
          }
          return count;
        }

        document.querySelector(".current-hand-value").textContent = roundScore;

        //removes displayed dice
        function diceDomRemove(diceNumber) {
          document.querySelector(".dice-" + (diceNumber + 1)).style.display = "none";
        }

        //reset hand to remove selected variables

          for (i = 0; i < selectedState.length; i++) {
            if (selectedState[i]) {
              diceDomRemove(i)
              document.getElementById("dice-" + (i + 1)).classList.remove("selected-dice");
              selectedDice[i] = 0;
          } else {}
        }
      }

      nextMove = true;
  }

})





/////////////////////////          Event listener for hold button              ////////////////////////////////////////////////

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    if (nextMove === true) {
      //Round score is added to players total score
      if (activePlayer === 0) {
        scores[0] += roundScore;
        document.querySelector(".score-0").textContent = scores[0];
      } else {
        scores[1] += roundScore;
        document.querySelector(".score-1").textContent = scores[1];
      }

      //Checks if game is Won

      if (scores[activePlayer] >= 10000) {
        document.querySelector(".score-" + activePlayer).textContent = "Winner!";

        document.querySelector(".current-hand-value").textContent = 0;

        document.querySelector(".dice-1").style.display = "none";
        document.querySelector(".dice-2").style.display = "none";
        document.querySelector(".dice-3").style.display = "none";
        document.querySelector(".dice-4").style.display = "none";
        document.querySelector(".dice-5").style.display = "none";
        document.querySelector(".dice-6").style.display = "none";

        gamePlaying = false;

      } else {
        //Switches to next player
        nextPlayer();
      }
    }
  }

})

////////////////////////////////              rules                     //////////////////////////////////////////

document.querySelector(".btn-rules").addEventListener("click", function() {

  var rulesDiv = document.querySelector(".rules");
  rulesDiv.style.display = rulesDiv.style.display == "none" ? "block" : "none"
})
