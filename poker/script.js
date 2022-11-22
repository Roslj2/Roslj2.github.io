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

const dealerCardSlot = document.querySelector(".dealer-deck")
const cardSlot1 = document.querySelector(".card-slot-1")
const cardSlot2 = document.querySelector(".card-slot-2")
const cardSlot3 = document.querySelector(".card-slot-3")
const cardSlot4 = document.querySelector(".card-slot-4")
const cardSlot5 = document.querySelector(".card-slot-5")
const text = document.querySelector(".text")
const DONButtonYes = document.querySelector(".DONButtonYes") // This is the double or nothing button
const DONButtonNo = document.querySelector(".DONButtonNo") // This is the double or nothing button

let card1, card2, card3, card4, card5

let isCard1Selected = false
let isCard2Selected = false
let isCard3Selected = false
let isCard4Selected = false
let isCard5Selected = false
let totalMoney = 10
let roundMoney = 0

//let playerDeck, computerDeck, inRound, stop
let dealerDeck, inRound, stop, winningHandBoolean, doubleOrNothingSelection
let roundNumber = 0 // 0 = new game; 1 = first hand; 2 = final hand; 3 = double or nothing

//document.addEventListener("click", () => {
dealerCardSlot.addEventListener("click", () => {

  if (roundNumber != 3) {
    //  if (stop) {
    if (roundNumber == 0) {
      startGame()
      return
    }

    flipCards()
  }

})

// Set event listener for card 1
cardSlot1.addEventListener("click", () => {
  if (inRound) {
    if (isCard1Selected == false){
      isCard1Selected = true
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
//  if (inRound) {
    if (roundNumber != 3) {
      if (isCard2Selected == false){
        isCard2Selected = true
        cardSlot2.className = "selected-card"
      }
      else{
        isCard2Selected = false
        cardSlot2.className = "card-slot-2"
      }
    } else {
      doubleOrNothingSelection = CARD_VALUE_MAP[card2.value]
      revealAllCards()
      isDoubleOrNothingWinner()
    }

})

// Set event listener for card 3
cardSlot3.addEventListener("click", () => {
  //if (inRound) {
  if (roundNumber != 3) {
    if (isCard3Selected == false){
      isCard3Selected = true
      cardSlot3.className = "selected-card"
    }
    else{
      isCard3Selected = false
      cardSlot3.className = "card-slot-3"
    }
  } else {
      doubleOrNothingSelection = CARD_VALUE_MAP[card3.value]
      revealAllCards()
      isDoubleOrNothingWinner()
    }
})

// Set event listener for card 4
cardSlot4.addEventListener("click", () => {
  //if (inRound){
  if (roundNumber != 3) {
    if (isCard4Selected == false){
      isCard4Selected = true
      cardSlot4.className = "selected-card"
    }
    else{
      isCard4Selected = false
      cardSlot4.className = "card-slot-4"
    }
  } else {
      doubleOrNothingSelection = CARD_VALUE_MAP[card4.value]
      revealAllCards()
      isDoubleOrNothingWinner()
    }
})

// Set event listener for card 5
cardSlot5.addEventListener("click", () => {
  //if (inRound){
  if (roundNumber != 3) {
    if (isCard5Selected == false){
      isCard5Selected = true
      cardSlot5.className = "selected-card"
    }
    else{
      isCard5Selected = false
      cardSlot5.className = "card-slot-5"
    }
  } else {
      doubleOrNothingSelection = CARD_VALUE_MAP[card5.value]
      revealAllCards()
      isDoubleOrNothingWinner()
    }
})

// Set event listener for DONButtonYes
DONButtonYes.addEventListener("click", () => {
    // If it's round 3, clicking DONButton should start the double or nothing flow
    if (roundNumber == 3){
      doDoubleOrNothing()
    }
})

// Set event listener for DONButtonNo
DONButtonNo.addEventListener("click", () => {
    // If it's round 3 and this is clicked, the user does not want to double or nothing. Update score, hide DON buttons, and reset deck.
    if (roundNumber == 3){
      stop = true
      DONButtonYes.style.visibility = 'hidden'
      DONButtonNo.style.visibility = 'hidden'
      startGame()
    }
})


startGame()

function startGame() {

  text.innerText = "Inside start game"
  roundNumber = 1

  const deck = new Deck()
  deck.shuffle()

  //dealerDeck = new Deck(52)
  dealerDeck = new Deck()
  dealerDeck.shuffle()

  inRound = false
  stop = false

  cleanBeforeRound()
}

function cleanBeforeRound() {

  DONButtonYes.style.visibility = 'hidden'
  DONButtonNo.style.visibility = 'hidden'

  inRound = false
  winningHandBoolean = false

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

  // If it's round 2, meaning the user has been dealt cards twice, check if it's a winning hand.
  if (roundNumber == 2) {
    isWinningHand(card1, card2, card3, card4, card5)

    // If there's a winning hand, prompt for double or nothing
    if (winningHandBoolean == true) {
      promptForDoubleOrNothing()
    } else {
      text.innerText = "Not a winner. Click deck to start a new round."
      roundNumber = 0
      totalMoney--
    }

  }


  //text.innerText = ""
  updateDeckCount()

  if (roundNumber != 0) {
    roundNumber++
  }
  //roundNumber++

  if (dealerDeck.numberOfCards < 5) {
    stop = true
    text.innerText = "Game over!"
  }

}

function isWinningHand(card1, card2, card3, card4, card5) {

  // Load current hand into an array
  var currentHand = [CARD_VALUE_MAP[card1.value], CARD_VALUE_MAP[card2.value], CARD_VALUE_MAP[card3.value], CARD_VALUE_MAP[card4.value], CARD_VALUE_MAP[card5.value]]

  // Sort the array numerically
  currentHand.sort((a,b)=>a-b)

  // Check for a straight
  if ((currentHand[0] == currentHand[1]-1) && (currentHand[1] == currentHand[2]-1) && (currentHand[2] == currentHand[3]-1) && (currentHand[3] == currentHand[4]-1)) {
    text.innerText = "You have a STRAIGHT! Double or nothing?"
    winningHandBoolean = true

  }

  let pairValue

  // Check for 1 pair. If found, record the pair value.
  for (let firstIndex=0; firstIndex < currentHand.length; firstIndex++)
  {
    for (let secondIndex=firstIndex+1; secondIndex <= currentHand.length; secondIndex++) {
      if (currentHand[firstIndex] == currentHand[secondIndex]) {
        pairValue = currentHand[firstIndex]
        //if (pairValue >= 11) {
          text.innerText = "You have a pair! Double or nothing?"
          winningHandBoolean = true
        //}
        // Check for 3 of a kind
        for (let thirdIndex=secondIndex+1; thirdIndex <= currentHand.length; thirdIndex++) {
          if (currentHand[secondIndex] == currentHand[thirdIndex]) {
            text.innerText = "You have THREE of a kind! Double or nothing?"
            winningHandBoolean = true

            // Check for 4 of a kind
            for (let fourthIndex=thirdIndex+1; fourthIndex <= currentHand.length; fourthIndex++) {
            if (currentHand[thirdIndex] == currentHand[fourthIndex]) {
              text.innerText = "You have FOUR of a kind! Double or nothing?"
              winningHandBoolean = true
              return
            } else {
              // It's just a 3 of a kind
              return
            }
          }
        }
      }
    }
  }
}

  // Check for a flush (matching suits)
  if (card1.suit == card2.suit && card1.suit == card3.suit && card1.suit == card3.suit && card1.suit == card4.suit && card1.suit == card5.suit) {
    text.innerText = "You have a flush! Double or nothing?"
    winningHandBoolean = true
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

function promptForDoubleOrNothing() {

  // Display the double or nothing buttons (yes/no)
  DONButtonYes.style.visibility = 'visible'
  //DONButtonYes.innerText = "Yes"

  DONButtonNo.style.visibility = 'visible'
  //DONButtonYes.innerText = "No"
}

function doDoubleOrNothing() {

  DONButtonYes.style.visibility = 'hidden'
  DONButtonNo.style.visibility = 'hidden'

  roundNumber = 3

  // Get a fresh deck and reset all selections
  dealerDeck = new Deck()
  dealerDeck.shuffle()
  cleanBeforeRound()
  text.innerText = "Pick the card that is higher than the dealer"

  // Deal 5 cards but only turn over one of them
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

}

function isDoubleOrNothingWinner() {
  if (doubleOrNothingSelection > CARD_VALUE_MAP[card1.value]) {
    text.innerText = "YOU WON DOUBLE OR NOTHING! Double or Nothing again?"
    promptForDoubleOrNothing()
    roundNumber = 3
  } else {
    text.innerText = "YOU LOST DOUBLE OR NOTHING!"
  }
  roundNumber = 0
}

function revealAllCards() {
  cardSlot2.appendChild(card2.getHTML())
  cardSlot3.appendChild(card3.getHTML())
  cardSlot4.appendChild(card4.getHTML())
  cardSlot5.appendChild(card5.getHTML())
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device

}else{
  // false for not mobile device
  document.write("not mobile device");
}






