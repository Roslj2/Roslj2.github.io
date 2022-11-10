import Deck from "./deck.js"

const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

/*
const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")
*/

const dealerCardSlot = document.querySelector(".dealer-deck")
const cardSlot1 = document.querySelector(".card-slot-1")
const cardSlot2 = document.querySelector(".card-slot-2")
const cardSlot3 = document.querySelector(".card-slot-3")
const cardSlot4 = document.querySelector(".card-slot-4")
const cardSlot5 = document.querySelector(".card-slot-5")
const text = document.querySelector(".text")

let dealerCard, card1, card2, card3, card4, card5

let isCard1Selected = false
let isCard2Selected = false
let isCard3Selected = false
let isCard4Selected = false
let isCard5Selected = false
let roundNumber = 0
let money = 10
let DONUserSelection
//let DONCard1 = false
//let DONCard2 = false
//let DONCard3 = false
//let DONCard4 = false

//let playerDeck, computerDeck, inRound, stop
let dealerDeck, inRound, stop
//let roundNumber = 0 // 0 = new game; 1 = first hand; 2 = final hand; 3 = double or nothing

//document.addEventListener("click", () => {
dealerCardSlot.addEventListener("click", () => {

  if (stop) {
    startGame()
    return
  }

  roundNumber++;

  flipCards()

/*
  if (inRound) {
    cleanBeforeRound()
  } else {
    flipCards()
  }
*/
})

// Set event listener for card 1
cardSlot1.addEventListener("click", () => {
  if (inRound) {
    if (isCard1Selected == false){
      cardSlot1.className = "selected-card"
    }
    else{
      isCard1Selected = false
      cardSlot1.className = "card-slot-1"
    }
  }
})

// Set event listener for card 2
cardSlot2.addEventListener("click", () => {
  if (roundNumber == 3){
    DONUserSelection = CARD_VALUE_MAP[card2.value]
    //DONCard1 = true
    cardSlot2.className = 'selected-card'
    revealAllCards();
  }
  
  if (inRound) {
    if (isCard2Selected == false){
      isCard2Selected = true
      cardSlot2.className = "selected-card"
    }
    else{
      isCard2Selected = false
      cardSlot2.className = "card-slot-2"
    }
  }
})

// Set event listener for card 3
cardSlot3.addEventListener("click", () => {
  if (roundNumber == 3){
    DONUserSelection = CARD_VALUE_MAP[card3.value]
    //DONCard2 = true
    cardSlot3.className = 'selected-card'
    revealAllCards();
  }
  
  if (inRound) {
    if (isCard3Selected == false){
      isCard3Selected = true
      cardSlot3.className = "selected-card"
    }
    else{
      isCard3Selected = false
      cardSlot3.className = "card-slot-3"
    }
  }
})

// Set event listener for card 4
cardSlot4.addEventListener("click", () => {
  if (roundNumber == 3){
    DONUserSelection = CARD_VALUE_MAP[card4.value]
    //DONCard3 = true
    cardSlot4.className = 'selected-card'
    revealAllCards();
  }
  
  if (inRound){
    if (isCard4Selected == false){
      isCard4Selected = true
      cardSlot4.className = "selected-card"
    }
    else{
      isCard4Selected = false
      cardSlot4.className = "card-slot-4"
    }
  }
})

// Set event listener for card 5
cardSlot5.addEventListener("click", () => {
  if (roundNumber == 3){
    DONUserSelection = CARD_VALUE_MAP[card5.value]
    //DONCard4 = true
    cardSlot5.className = 'selected-card'
    revealAllCards();
  }
  
  if (inRound){
    if (isCard5Selected == false){
      isCard5Selected = true
      cardSlot5.className = "selected-card"
    }
    else{
      isCard5Selected = false
      cardSlot5.className = "card-slot-5"
    }
  }
})

//const dealerCardSlot = document.getElementById('dealer');

const button = document.getElementById('button');

startGame()

function startGame() {

  text.innerText = "Inside start game"
  //roundNumber = 1

  const deck = new Deck()
  deck.shuffle()

  //const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  //playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
  //computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))

  //dealerDeck = new Deck(52)
  dealerDeck = new Deck()
  dealerDeck.shuffle()

  inRound = false
  stop = false

if (roundNumber == 0) {
  DONbutton.style.visibility = 'hidden'
  }

  cleanBeforeRound()
}

function cleanBeforeRound() {
  inRound = false
  //computerCardSlot.innerHTML = ""
  //playerCardSlot.innerHTML = ""
  dealerCardSlot.innerText = ""
  cardSlot1.innerHTML = ""
  cardSlot2.innerHTML = ""
  cardSlot3.innerHTML = ""
  cardSlot4.innerHTML = ""
  cardSlot5.innerHTML = ""
  text.innerText = ""

  cardSlot1.className = "card-slot-1"
  cardSlot2.className = "card-slot-2"
  cardSlot3.className = "card-slot-3"
  cardSlot4.className = "card-slot-4"
  cardSlot5.className = "card-slot-5"

  isCard1Selected = false
  isCard2Selected = false
  isCard3Selected = false
  isCard4Selected = false
  isCard5Selected = false

  updateDeckCount()
}

function flipCards() {
  inRound = true

//  if (isCard1Selected){
//    text.innerText = "Yes Marc, card 1 is selected"
//  }

/*
  const card1 = dealerDeck.pop()
  const card2 = dealerDeck.pop()
  const card3 = dealerDeck.pop()
  const card4 = dealerDeck.pop()
  const card5 = dealerDeck.pop()

  cardSlot1.appendChild(card1.getHTML())
  cardSlot2.appendChild(card2.getHTML())
  cardSlot3.appendChild(card3.getHTML())
  cardSlot4.appendChild(card4.getHTML())
  cardSlot5.appendChild(card5.getHTML())
*/

  //let tempCard1, tempCard2, tempCard3, tempCard4, tempCard5

  if (!isCard1Selected) {
    cardSlot1.innerHTML = ""
    card1 = dealerDeck.pop()
    cardSlot1.appendChild(card1.getHTML())
  }
  if (!isCard2Selected) {
    cardSlot2.innerHTML = ""
    card2 = dealerDeck.pop()
    cardSlot2.appendChild(card2.getHTML())
  }
  if (!isCard3Selected) {
    cardSlot3.innerHTML = ""
    card3 = dealerDeck.pop()
    cardSlot3.appendChild(card3.getHTML())
  }
  if (!isCard4Selected) {
    cardSlot4.innerHTML = ""
    card4 = dealerDeck.pop()
    cardSlot4.appendChild(card4.getHTML())
  }
  if (!isCard5Selected) {
    cardSlot5.innerHTML = ""
    card5 = dealerDeck.pop()
    cardSlot5.appendChild(card5.getHTML())
  }

  text.innerText = ""
  updateDeckCount()


  if (roundNumber == 2) {
    inRound = false
    isWinningHand(card1, card2, card3, card4, card5)
    stop = true
    promptDoubleOrNothing();

    dealerCardSlot.addEventListener('click', () => {
      if (DONbutton.style.visibility == 'visible') {
        DONbutton.style.visibility = 'hidden';
        roundNumber = 0
    } else {
      DONbutton.style.visibility = 'visible';
  }
});  

    /* if (roundNumber == 3) {
      dealerCardSlot.addEventListener('click', () => {
        if (stop == true) {
          startGame()
          return
        }else {

        }
      });
    } */

  if (dealerDeck.numberOfCards < 5) {
    stop = true
    text.innerText = "Game over!"
  }

}

/* 
  -Start with ten
  -Bet one each time deal
  -If two pairs (min) win 1
  -Three of a kind 2
  -Straight 3
  -Flush 4
  -Full House 5
  -Four of a kind 12
  -Straight flush 25
  -Royal flush 100
*/

/*
  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "Win"
    playerDeck.push(playerCard)
    playerDeck.push(computerCard)
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "Lose"
    computerDeck.push(playerCard)
    computerDeck.push(computerCard)
  } else {
    text.innerText = "Draw"
    playerDeck.push(playerCard)
    computerDeck.push(computerCard)
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!!"
    stop = true
  } else if (isGameOver(computerDeck)) {
    text.innerText = "You Win!!"
    stop = true
  }

 */
}

function isWinningHand(card1, card2, card3, card4, card5) {

  // Load current hand into an array
  var currentHand = [CARD_VALUE_MAP[card1.value], CARD_VALUE_MAP[card2.value], CARD_VALUE_MAP[card3.value], CARD_VALUE_MAP[card4.value], CARD_VALUE_MAP[card5.value]]

  // Sort the array numerically
  currentHand.sort((a,b)=>a-b)

  let pairValue

  // Check for 1 pair. If found, record the pair value.
  for (let firstIndex=0; firstIndex < currentHand.length; firstIndex++)
  {
    for (let secondIndex=firstIndex+1; secondIndex < currentHand.length; secondIndex++) {
      if (currentHand[firstIndex] == currentHand[secondIndex]) {
        pairValue = currentHand[firstIndex]
        text.innerText = "You have a pair!!"
      }
    }
  }

  // Check for a flush (matching suits)
  if (card1.suit == card2.suit && card1.suit == card3.suit && card1.suit == card3.suit && card1.suit == card4.suit && card1.suit == card5.suit) {
    text.innerText = "You have a flush!"
  }


}

function updateDeckCount() {
  //computerDeckElement.innerText = computerDeck.numberOfCards
  //playerDeckElement.innerText = playerDeck.numberOfCards
  dealerCardSlot.innerText = dealerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
  //return deck.numberOfCards === 0
}

function revealAllCards() {
  cardSlot2.appendChild(card2.getHTML())
  cardSlot3.appendChild(card3.getHTML())
  cardSlot4.appendChild(card4.getHTML())
  cardSlot5.appendChild(card5.getHTML())

  if (DONUserSelection > CARD_VALUE_MAP[card1.value]){
    text.innerText = "YOU WON DOUBLE OR NOTHING!"
    roundNumber = 0;
  } else {
    text.innerText = "You lost Dounle or Nothing!"
    roundNumber = 0;
  }
  roundNumber = 0
}


//The function for Double or Nothing
function doubleOrNothing() {
  
  text.innerText = "Pick the card that is higher than the dealer"

  dealerDeck = new Deck()
  dealerDeck.shuffle()

    cardSlot1.innerHTML = ""
    card1 = dealerDeck.pop()
    cardSlot1.appendChild(card1.getHTML())

    cardSlot2.innerHTML = ""
    card2 = dealerDeck.pop()
    cardSlot2.className = 'computer-deck'

    cardSlot3.innerHTML = ""
    card3 = dealerDeck.pop()
    cardSlot3.className = 'computer-deck'

    cardSlot4.innerHTML = ""
    card4 = dealerDeck.pop()
    cardSlot4.className = 'computer-deck'

    cardSlot5.innerHTML = ""
    card5 = dealerDeck.pop()
    cardSlot5.className = 'computer-deck'

/*
    if (card1.value > DONCard1.value && card1.value > DONCard2.value && card1.value > DONCard2.value && card1.value > DONCard3.value && card1.value > DONCard4.value) {
      text.innerText = "You loose"
    } else{
      text.innerText = "You win! Double or Nothing?"
    }
*/
  }


//let btn = document.createElement("button");

function promptDoubleOrNothing() {
  //text.innerText = "Would you like double or nothing?"
  //button.innerText = "Double or Nothing?";
  //document.body.appendChild(btn);

  DONbutton.style.visibility = 'visible';

  DONbutton.addEventListener("click", () => {
    doubleOrNothing()
    roundNumber++;
  });

}



