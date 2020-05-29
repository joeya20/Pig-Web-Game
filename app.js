/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* finds the element with id 'current-0'/'current-1' and makes its text the value of dice

var dice = Math.floor(Math.random() * 6) + 1;
document.querySelector("#current-" + activePlayer).textContent = dice;
document.querySelector("#current-" + activePlayer).innerHTML = '<em>' + dice + '</em>'; 

//just reads the value of #score-0 and stores it in x
var x = document.querySelector('#score-0').textContent;

*/

/* 
function btn()
{
    //call-back function
}
document.querySelector('.btn-roll').addEventListener('click', btn) // no brackets

OR 

document.querySelector('.btn-roll').addEventListener('click', function()
{
    //anonymous function
}) 
*/

/******************************************************************
************************* Start of Code ***************************
******************************************************************/

var globalScores;
var roundScore;
var activePlayer;
var gameOn;
var numOfPlayers = 2;

initilize();

/******************************************************************
*********************** Helper Functions **************************
******************************************************************/

function initilize()
{
    //reset scores
    globalScores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameOn = true;

    //hides the dice
    document.querySelector('.dice').style.display = 'none';

    //reset UI
    for( var i = 0; i < numOfPlayers; i++)
    {
        document.getElementById(`name-${i}`).textContent = 'PLAYER ' + i;
        document.querySelector(`.player-${i}-panel`).classList.remove('active');
        document.querySelector(`.player-${i}-panel`).classList.remove('winner');
        document.getElementById(`score-${i}`).textContent = globalScores[i];
        document.getElementById(`current-${i}`).textContent = roundScore;
    }

    //set player 1 to active
    document.querySelector('.player-0-panel').classList.add('active');
}

function changeActivePlayer()
{
    for( var i = 0; i < numOfPlayers; i++)
    {
        document.querySelector(`.player-${i}-panel`).classList.toggle('active');
    }
    
    //reset current score to zero
    roundScore = 0;
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;

    //change player
    activePlayer == 1 ? activePlayer = 0 : activePlayer = 1;
}

/******************************************************************
************************ Event Handlers ***************************
******************************************************************/

document.querySelector('.btn-roll').addEventListener('click', function()
{
    if( gameOn ){

        //1. random number
        var diceNum = Math.floor(Math.random() * 6) + 1;

        //2. Display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${diceNum}.png`;
        
        //3. Update the score IF the rolled number was NOT a 1
        if ( diceNum != 1)
        {   
            roundScore += diceNum;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        }
        else    //reset round score and change active player
        {
            changeActivePlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function()
{
    if( gameOn ){

    //1. store current in global
    globalScores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent = globalScores[activePlayer];

    //2. check if player won or reset round score and change active player
    if( globalScores[activePlayer] >= 20)
    {
        document.querySelector(`#name-${activePlayer}`).textContent = 'winner!';
        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active'); 
        gameOn = false;
    }
    else
    {
        changeActivePlayer();
    }

    document.querySelector('.dice').style.display = 'none';
    }
});

document.querySelector('.btn-new').addEventListener('click', initilize);
