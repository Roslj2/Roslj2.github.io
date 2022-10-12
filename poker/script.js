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

//const computerCardSlot = document.querySelector(".computer-card-slot")
//const playerCardSlot = document.querySelector(".player-card-slot")
//const computerDeckElement = document.querySelector(".computer-deck")
//const playerDeckElement = document.querySelector(".player-deck")
const pokerCardSlot = document.querySelector("poker-card-slot")
const pokerDeckElement = docmument.querySelector("poker-deck")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")

//let playerDeck, computerDeck, inRound, stop
let pokerDeck, playerDeck, inRound, stop

document.addEventListener("click", () => {
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

startGame()
function startGame() {
  const deck = new Deck()
  deck.shuffle()

  //const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  // playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
  // computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
  const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
  pokerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
  inRound = false
  stop = false

  cleanBeforeRound()
}

function cleanBeforeRound() {
  inRound = false
  //computerCardSlot.innerHTML = ""
  pokerCardSlot.innerHTML = ""
  playerCardSlot.innerHTML = ""
  text.innerText = ""

  updateDeckCount()
}

function flipCards() {
  inRound = true

  const playerCard = playerDeck.pop()
  const pokerCard = pokerDeck.pop()
  //const computerCard = computerDeck.pop()

  playerCardSlot.appendChild(playerCard.getHTML())
  pokerCardSlot.appendChild(pokerCard.getHTML())
  //computerCardSlot.appendChild(computerCard.getHTML())

  updateDeckCount()

  if (isRoundWinner(playerCard, pokerCard)) {
    text.innerText = "Win"
    playerDeck.push(playerCard)
    playerDeck.push(pokerCard)
  } else if (isRoundWinner(pokerCard, playerCard)) {
    text.innerText = "Lose"
    pokerDeck.push(playerCard)
    pokerDeck.push(pokerCard)
  } else {
    text.innerText = "Draw"
    playerDeck.push(playerCard)
    pokerDeck.push(pokerCard)
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!!"
    stop = true
  } else if (isGameOver(pokerDeck)) {
    text.innerText = "You Win!!"
    stop = true
  }
}

function updateDeckCount() {
  //computerDeckElement.innerText = computerDeck.numberOfCards
  pokerDeckElement.innerText = pokerDeck.numberOfCards
  playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
  return deck.numberOfCards === 0
}
