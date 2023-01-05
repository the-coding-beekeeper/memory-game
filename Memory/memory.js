// general settings
let pitch = document.querySelector("#pitch");
let startButton = document.querySelector ("#start");
let image = "";
startButton.addEventListener("click", start);
let turns = 0;
let totalTurns = 0;
let turnedCards = [];
let oldHighScore = 1000;
let newHighScore = 0;
let imageCheckArray = [];
let totalOfPairs = 0;
let cardNumbers = [];
let unsolvedCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];


function start () {
startButton.disabled = true;
 document.getElementById("title").innerText="hey folks, train your brain!";
 document.getElementById("counter").innerText="moves: 0";

// creating memory-cards with class and id`s
  for (let i=0; i<24; i++) {
    let playingCard = document.createElement ("div");
    pitch.appendChild(playingCard);
    playingCard.setAttribute("class", "playing-card");
    playingCard.setAttribute("id", "card"+i);
    playingCard.setAttribute("value", i);
    playingCard.addEventListener("click", turnCard);

    image = document.createElement ("img");
    playingCard.appendChild(image);
    image.setAttribute("class", "images");
    image.setAttribute("id", "image"+i);
    image.setAttribute("src", "./images/background.jpg");

    cardNumbers.push(i);
  }
// creating pairs of memory-cards with values for the images
  for (let imageNumber = 1; imageNumber < 13; imageNumber++ ) {
    let randomCardNumber = Math.floor(Math.random() * cardNumbers.length);
    for (let i=0; i<2; i++) {
      document.getElementById("image" + cardNumbers[randomCardNumber]).setAttribute("value", imageNumber);
      cardNumbers.splice(randomCardNumber, 1);
      randomCardNumber = Math.floor(Math.random() * cardNumbers.length);
    }
  }
}

  // turn around card
function turnCard() {
  totalTurns++;
  turns++;
  let turnedCard = this.getAttribute("value");
  let imageNumberOfTurnedCard = document.getElementById("image"+ turnedCard).getAttribute("value");

  document.getElementById("card"+turnedCard).removeEventListener("click", turnCard);

  document.getElementById("image" + turnedCard).setAttribute("src", "./images/image"+ imageNumberOfTurnedCard +".jpg");
  document.getElementById("image" + turnedCard).style.display="flex";


  //check, if pairs

  turnedCards.push(turnedCard);
  imageCheckArray.push(imageNumberOfTurnedCard);

  if (imageCheckArray[0] === imageCheckArray[1]) {
    setTimeout(pair, 1500);
  }

function pair() {
  console.log("vorher: " + unsolvedCards);


  let firstCard = turnedCards[0]*1;
  console.log("firstCard: " + firstCard);
  console.log(typeof firstCard);

  let indexFirstCard = unsolvedCards.indexOf(firstCard);
  console.log("indexFirstCard: " + indexFirstCard);
  unsolvedCards.splice(indexFirstCard, 1);
  console.log("nachher: " + unsolvedCards);

  let secondCard = turnedCards[1]*1;
  console.log("secondCard: " + secondCard);
  console.log(typeof secondCard);

  let indexSecondCard = unsolvedCards.indexOf(secondCard);
  console.log("indexSecondCard: " + indexSecondCard);
  unsolvedCards.splice(indexSecondCard, 1);
  console.log("nachher: " + unsolvedCards);

  console.log("gratuliere, pärchen");
  
  totalOfPairs++;
  console.log("Anzahl Pärchen: " + totalOfPairs);

  document.getElementById("image"+ turnedCards[0]).style.display = "none";
  document.getElementById("image"+ turnedCards[1]).style.display = "none";

  document.getElementById("card"+ turnedCards[0]).style.backgroundColor="black";
  document.getElementById("card"+ turnedCards[1]).style.backgroundColor="black";

  

}
console.log("turnedCards Array: " + turnedCards);

if (turns > 1) {
  document.getElementById("counter").innerText="moves: " + totalTurns/2;
  for (let i=0; i<24; i++) {
    let wait = document.getElementById("card" + i);
    wait.removeEventListener("click", turnCard);
  }
  setTimeout(turnDownAgain, 1500);
}
}

function turnDownAgain() {
  console.log("genug gezogen");
  document.getElementById("image" + turnedCards[0]).setAttribute("src", "./images/background.jpg");
  document.getElementById("image" + turnedCards[1]).setAttribute("src", "./images/background.jpg");
  for (let i=0; i<unsolvedCards.length; i++) {
    let wait = document.getElementById("card" + unsolvedCards[i]);
    wait.addEventListener("click", turnCard);
  }

  turns = 0;
  turnedCards = [];
  imageCheckArray = [];
  // end of game

if (totalOfPairs*1 > 11) {
  document.getElementById("title").innerText="Congratulations !!!!";
  newHighScore = totalTurns/2;
  if (newHighScore < oldHighScore){
  document.getElementById("best").innerText="best: " + newHighScore;
  oldHighScore = newHighScore;
  }

  startButton.disabled = false;
  totalTurns = 0;
  totalOfPairs = 0;
  cardNumbers = [];
  unsolvedCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  for (let i=0; i<24; i++) {
    let removeCard = document.getElementById ("card" + i);
    removeCard.remove();
}

}
}