//Variables Define
var playerOneName, playerTwoName, globalScore, localScore, activePlayer, winningTotal, lastLocalScore, dice, dice1, dice2, x;

// Check if it's a new game request or reset request
if (x == "reset") {
    resetGame();
}
else {
    inquiries();
    init();
}

// 'Roll dice' button onclick event
document.querySelector('.btn-roll').addEventListener('click', function () {
    
    // Roll both dice first
    rollDice();
    
    // Display dice image according to dice value
    document.getElementById('img').style.display = 'block';
    document.getElementById('img1').style.display = 'block';
    document.getElementById('img').src = "../Images/dice-" + dice1 + ".png";
    document.getElementById('img1').src = "../Images/dice-" + dice2 + ".png";
    
    // Add the Localscore of an Active Player if it is not 1.
    if (dice1 == 1 || dice2 == 1) {
        
        // Local Score and Global Score for an active player will be 0
        localScore = 0;
        document.getElementById('local-' + activePlayer).textContent = localScore;

        // Active toggle function called for changing the active player
        activeToggle();
    }
    else {
        
        // Set this round local score as last local score
        lastLocalScore = dice;
        
        // Add local scores
        localScore += dice;
        document.getElementById('local-' + activePlayer).textContent = localScore;
    }
    /*
    if (dice !== 1) {
        lastLocalScore = dice;
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
    } */
});

// 'Hold' button onclick event
document.querySelector('.btn-hold').addEventListener('click', function () {
    
    // Dice display off
    diceOff();
    
    // Store and display Localscore into Globalscore
    globalScore[activePlayer] += localScore;
    document.getElementById('global-' + activePlayer).textContent = globalScore[activePlayer];
    
    // Localscore will be set to 0
    localScore = 0;
    document.getElementById('local-' + activePlayer).textContent = localScore;
    
    // Check whether player has won?
    if (globalScore[activePlayer] >= winningTotal) {
        
        // Announce him winner
        document.querySelector('#name-' + activePlayer).textContent = "Winner!!";
        
        // Assign the winner class
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
        // Dice display off
        diceOff();
        
        // 'Rolldice' and 'Holdbutton' display off
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    }
    else {
        
        // Interchange the active class
        activeToggle();
    }
});

// 'Newgame' button onclick event
document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame() {
    
    // Page redirect to Home Page
    location.href = "../HTML/HomePage.html"
}

// 'Reset' button onclick event
document.querySelector('.btn-reset').addEventListener('click', function () {
    
    // assign  value to x for reset
    x = "reset";
    
    // resetGame event fire
    resetGame();
});

// Resetgame event fire
function resetGame() {
    
    //Remove winner class
     document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    
    askWinningScore();
    function askWinningScore() {
        winningTotal = parseInt(prompt("Please Enter Winning Score (between 10 to 1000)"));
        document.getElementById('txtWinningTotal').textContent = 'Winning Total: ' + winningTotal;
        
        // Check the validation
        if (isNaN(winningTotal) || winningTotal < 10 || winningTotal > 1000) {
            alert("Are you dumb?? Please, read instruction carefully.")
            askWinningScore();
        }
        else {
            init();
            document.getElementById('name-0').textContent = playerOneName;
            document.getElementById('name-1').textContent = playerTwoName;
        }
    }
}

// function for interchange active class
function activeToggle() {
    
    // Which one is active player checked by using ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    // active class will be toggled between player 1 and 2
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// fuction for initial prompts 
function inquiries() {
    
    // Take input for winning score
    winningTotal = parseInt(prompt("Please Enter Winning Score (between 10 to 1000)"));
    document.getElementById('txtWinningTotal').innerHTML = 'Winning Total: ' + winningTotal;
    
    // Check the validation
    if (isNaN(winningTotal) || winningTotal < 10 || winningTotal > 1000) {
        alert("Are you dumb?? Please, read instruction carefully.")
        inquiries();
    }
    else {
        
        playerOneName = prompt("Enter Player One Name:");
        if (playerOneName == "") {
            playerOneName = document.getElementById('name-0').textContent;
        }
        else {
            document.getElementById('name-0').textContent = playerOneName;
        }
        playerTwoName = prompt("Enter Player Two Name");
        if (playerTwoName == "") {
            document.getElementById('name-1').textContent
        }
        else {
            document.getElementById('name-1').textContent = playerTwoName;
        }
    }
}

//function for intialization
function init() {
    
    // Initialize variables
    globalScore = [0, 0];
    localScore = 0;
    activePlayer = 0;
    lastLocalScore = 0;
    dice = 0;
    dice1 = 0;
    dice2 = 0;
    x = "";
    
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
    document.getElementById('img1').style.display = 'none';
}

function rollDice() {
    
    // Get random value by rolling dice
    // dice = Math.floor((Math.random() * 6) + 1);
    dice1 = Math.floor((Math.random() * 6) + 1);
    dice2 = Math.floor((Math.random() * 6) + 1);
    dice = dice1 + dice2;
    
    checkDiceScore();
}

function checkDiceScore() {
    
    // If Last Score and this Local Score is 12 then global and local both will be 0
    if (lastLocalScore === 12 && dice === 12) {
        // Local Score and Global Score for an active player will be 0
        localScore = 0;
        document.getElementById('local-' + activePlayer).textContent = localScore;
        globalScore[activePlayer] = 0;
        document.getElementById('global-' + activePlayer).textContent = globalScore[activePlayer];
        //Active toggle function calledfor changing the active player
        activeToggle();
    }
}