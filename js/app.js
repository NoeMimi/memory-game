/*
 * Create a list that holds all of your cards
 */
const allCards = document.querySelectorAll('.card');
//Minimum time to wait before hiding cards;
let waiting;
//Restart button
const restart = document.querySelector('.restart');
//Moves counter
let moves = document.querySelector('.moves');
//Star rating
let stars = document.querySelector('.stars');
//Timer
let clock;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Function to convert seconds in HHMMSS format from https://stackoverflow.com/questions/6312993
String.prototype.toHHMMSS = function () {
    let sec_num = parseInt(this, 10); // don't forget the second param
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = '0'+hours;}
    if (minutes < 10) {minutes = '0'+minutes;}
    if (seconds < 10) {seconds = '0'+seconds;}

    if (hours != 0)
        return hours+' hours '+minutes+' minutes '+seconds+' seconds';
    else
        if(minutes != 0)
            return minutes+' minutes '+seconds+' seconds';
        else
            return seconds+' seconds';
}

// Function to convert array in nodes to display it
function arrayToNode(array, parentNode){
    const maxSize = array.length;
    let i = 0;
    while (i < maxSize){
        parentNode.appendChild(array[i]);
        i++;
    }   
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 //Function to display card's symbol
 function showSymbol(oneCard){
    oneCard.classList.add('show');
 }
 //Function to flip open a card
 function addToOpenCardList(notYetOpenedCard){
    //Add the card to a *list* of "open" cards
    notYetOpenedCard.classList.add('open');
 }
 // Function to lock the cards in the open position
 function lockMatchingCards(cardsToLock){
    const maxMatchingCards = 2;
    let i = 0;
    while (i < maxMatchingCards){
        cardsToLock[i].classList.add('match');
        cardsToLock[i].classList.remove('open');
        cardsToLock[i].classList.remove('show');
        i++;
    }
 }
 //Function to remove the cards from the opened list and hide the card's symbol
 function clearOpenedAndHideSymbol(notMatchingCards){
    for(let notMatchingCard of notMatchingCards){
        notMatchingCard.classList.remove('open');
        notMatchingCard.classList.remove('show');
    }
 }

 function isMatching(){
    //*list* of "open" cards
    let openedCards = document.querySelectorAll('.open');
    //If the list already has another card, check to see if the two cards match
    if(openedCards.length == 2)
        //if the cards do match, lock the cards in the open position
        if((openedCards[0].lastElementChild).isEqualNode(openedCards[1].lastElementChild))
            lockMatchingCards(openedCards);
        //if the cards do not match, remove the cards from the list and hide the card's symbol
        else{
            setTimeout(function(){
                clearOpenedAndHideSymbol(openedCards);
              }, 700);
        }
 }
 //Function to increment the move counter, display it on the page, and decrement star rating
 function incrementMoveCounter(){
    let incrementMoves = parseInt(moves.innerHTML)+1;
    moves.innerHTML = incrementMoves;
    // If number of moves is 18, down to 2 stars
    if(incrementMoves == 18)
        stars.firstElementChild.remove();
    // If number of moves is 25, down to 1 star
    if(incrementMoves == 25)
        stars.firstElementChild.remove();
 }
 //Function to reset the moves counter and the star rating
 function resetMovesAndStars(){
    moves.innerHTML = 0;
    // Copy existing star to have 3 stars
    while(stars.childElementCount < 3){
        stars.appendChild(stars.firstElementChild.cloneNode(true));
    }
 }

 //Function to check if all cards have matched
 function haveTheyAllMatched(){
     let notYetMatchedCards = document.querySelectorAll('li:not(.match).card');
     if(notYetMatchedCards.length == 0)
        setTimeout(function(){
            let timeInSeconds = clock.getTime().time;
            let time = timeInSeconds.toString().toHHMMSS();
            let starRating = stars.childElementCount;
            starRating = starRating + (starRating > 1 ? ' stars' : ' star');
            let userChoice = confirm('Congratulations you won!\nYou finished the game in '+time+'.\nYou scored ' +starRating+ '.\nDo you want to play again?');
            clock.stop();
            if(userChoice == true)
                restart.click();
        }, 200);
 }
 //Function to clear the board
 function clearBoard(){
    const boardSize = allCards.length;
    let i = 0;
    while (i < boardSize){
        allCards[i].classList.remove('match');
        allCards[i].classList.remove('open');
        allCards[i].classList.remove('show');
        i++;
    }
 }
 
 //Loop through each card
 for(const card of allCards){
    //Set up the click event listener when a card is clicked
    card.addEventListener('click', function memoryGameRules() {
        //Display card's symbol
        showSymbol(this);
        //Open/Flip the card
        addToOpenCardList(this);
        //Check if cards are matching
        isMatching();
        //Increments the move counter and display it on the page
        incrementMoveCounter();
        //Check if all cards have matched
        haveTheyAllMatched();
    });
 }

 restart.addEventListener('click', function restartGame(){
    clearBoard();
    resetMovesAndStars();
    let restartArray = Array.from(allCards);
    let shuffledCards = shuffle(restartArray);
    let allCardsParent = document.querySelector('.deck');
    while (allCardsParent.firstChild) {
        allCardsParent.removeChild(allCardsParent.firstChild);
    }
    arrayToNode(shuffledCards, allCardsParent);
    clock.stop(function() {
        clock.reset();
        setTimeout(function() {
            clock.start();
        }, 1500);
    });
});
  
 $(document).ready(function() {
    clock = new FlipClock($('.timer'),{
        clockFace: 'HourlyCounter',
        countdown: false
    });

    $('.restart').click();
});