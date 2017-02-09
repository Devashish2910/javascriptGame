/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Variables Define
var playerOneName, playerTwoName, globalScore, localScore, activePlayer, winningTotal, x;

inquiries();
init();

//Roll dice button onclick event
document.querySelector('.btn-roll').addEventListener('click', function () {

    // Get random value by rolling dice
    var dice = Math.floor((Math.random() * 6) + 1);

    // Display dice image according to dice value
    document.getElementById('img').style.display = 'block';
    document.getElementById('img').src = "dice-" + dice + ".png";

    // Add the Localscore of an Active Player if it is not 1.
    if (dice !== 1) {
        localScore += dice;
        document.getElementById('local-' + activePlayer).textContent = localScore;
    }
    else {
        // Local Score and Global Score for an active player will be 0
        localScore = 0;
        document.getElementById('local-' + activePlayer).textContent = localScore;
        //globalScore[activePlayer] = 0;
        //document.getElementById('global-' + activePlayer).textContent = globalScore[activePlayer];

        // Active toggle function called for changing the active player
        activeToggle();
    }
});

// Hold button onclick event
document.querySelector('.btn-hold').addEventListener('click', function () {

    diceOff();

    // Store and display Localscore into Globalscore
    globalScore[activePlayer] += localScore;
    document.getElementById('global-' + activePlayer).textContent = globalScore[activePlayer];

    // Localscore will be set to 0
    localScore = 0;
    document.getElementById('local-' + activePlayer).textContent = localScore;

    // Check whether player has won?
    if (globalScore[activePlayer] >= winningTotal) {

        document.querySelector('#name-' + activePlayer).textContent = "Winner";
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        diceOff();

        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    }
    else {
        activeToggle();
    }
});

// Newgame button onclick event
document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-reset').addEventListener('click', function(){
    x = "reset";
});

function activeToggle() {

    // Which one is active player checked by using ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // active class will be toggled between player 1 and 2
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

/*function resetGame(){
     winningTotal = parseInt(prompt("Please Enter Winning Score (between 1 to 1000)"));
    // Check the validation
    if (isNaN(winningTotal) || winningTotal < 1 || winningTotal > 1000) {
        alert("Are you dumb?? Please, read instruction carefully.")
        resetGame();
    }
    else {
        document.getElementById('name-0').textContent = playerOneName;
        document.getElementById('name-1').textContent = playerTwoName;
    }
    init();

};*/

function newGame() {

    location.href = "HomePage.html"

}

function inquiries(){
     // Take input for winning score
    winningTotal = parseInt(prompt("Please Enter Winning Score (between 100 to 1000)"));
    // Check the validation
    if (isNaN(winningTotal) || winningTotal < 100 || winningTotal > 1000) {
        alert("Are you dumb?? Please, read instruction carefully.")
        inquiries();
    }
    else {
        playerOneName = prompt("Enter Player One Name:");
        if(playerOneName == ""){
           playerOneName =  document.getElementById('name-0').textContent;
        }
        else{
             document.getElementById('name-0').textContent = playerOneName;
        }
        playerTwoName = prompt("Enter Player Two Name");
        if(playerTwoName == ""){
             document.getElementById('name-1').textContent
        }
        else{
             document.getElementById('name-1').textContent = playerTwoName;
        }


    }
}

function init(){

     // Initialize variables
    globalScore = [0, 0];
    localScore = 0;
    activePlayer = 0;
    // Display all score zero
    document.getElementById('local-0').textContent = '0';
    document.getElementById('global-0').textContent = '0';
    document.getElementById('local-1').textContent = '0';
    document.getElementById('global-1').textContent = '0';
    diceOff();
    // Display on for roll and hold button
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    // Add and remove active class from Player 1 to Player 2 respectively
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

}
function diceOff() {
    // Dice display off
    document.getElementById('img').style.display = 'none';
}
