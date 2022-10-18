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

//let playerDeck, computerDeck, inRound, stop
let dealerDeck, inRound, stop

//document.addEventListener("click", () => {
dealerCardSlot.addEventListener("click", () => {
  //text.innerText = "You clicked"

  if (stop) {
    startGame()
    return
  }

  if (inRound) {
    cleanBeforeRound()
  } else {
    flipCards()
  }
})

// Set event listener for card 1, 2, 3, 4, 5
let cardsPicked = 0;
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 0;
let counter5 = 0;

cardSlot1.addEventListener("click", () => {
  counter1++;
  text.innerText = "You chose Card 1"
  //make different counter to unpick a card
  //storeGuess(captureInput.value);

  if (counter1 = 1) {
    cardsPicked++; 
  }

  if (counter1 >= 2) {
    counter1 = 0
  } 

cardSlot2.addEventListener("click", () => {
  counter2++;
  text.innerText = "You chose Card 2"
  //storeGuess(captureInput.value);

  if (counter2 <= 1) {
    cardsPicked++; 
  }

  if (counter2 >= 2) {
    counter2 = 0
  } 

})

cardSlot3.addEventListener("click", () => {
  counter3++;
  text.innerText = "You chose Card 3"
  //storeGuess(captureInput.value);

  if (counter3 >= 1) {
    cardsPicked++; 
  }

  if (counter3 >= 2) {
    counter3 = 0
  } 

})

cardSlot4.addEventListener("click", () => {
  counter4++;
  text.innerText = "You chose Card 4"
  //storeGuess(captureInput.value);

  if (counter4 >= 1) {
    cardsPicked++; 
  }

  if (counter4 >= 2) {
    counter4 = 0
  } 

})

cardSlot5.addEventListener("click", () => {
  counter5++;
  text.innerText = "You chose Card 5"
  //storeGuess(captureInput.value);

  if (counter5 >= 1) {
    cardsPicked++; 
  }

  if (counter5 >= 2) {
    counter5 = 0
  } 

})

  })

startGame()

function startGame() {

  text.innerText = "Inside start game"

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

  updateDeckCount()
}

function flipCards() {
  inRound = true

  //const playerCard = playerDeck.pop()
  //const computerCard = computerDeck.pop()

  const card1 = dealerDeck.pop()
  const card2 = dealerDeck.pop()
  const card3 = dealerDeck.pop()
  const card4 = dealerDeck.pop()
  const card5 = dealerDeck.pop()

  //playerCardSlot.appendChild(playerCard.getHTML())
  //computerCardSlot.appendChild(computerCard.getHTML())

  cardSlot1.appendChild(card1.getHTML())
  cardSlot2.appendChild(card2.getHTML())
  cardSlot3.appendChild(card3.getHTML())
  cardSlot4.appendChild(card4.getHTML())
  cardSlot5.appendChild(card5.getHTML())

  updateDeckCount()

  isWinningHand(card1, card2, card3, card4, card5)

  if (dealerDeck.numberOfCards < 5) {
    stop = true
    text.innerText = "Game over!"
  }

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


}

function updateDeckCount() {
  //computerDeckElement.innerText = computerDeck.numberOfCards
  //playerDeckElement.innerText = playerDeck.numberOfCards
  dealerCardSlot.innerText = dealerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}
