/*
1. Make a request to the [Deck of Cards API](http://deckofcardsapi.com/) to request a single card from a newly shuffled deck. 
Once you have the card, ***console.log*** the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make 
a request to the same API to get one more card from the **same** deck.  
    
Once you have both cards, ***console.log*** the values and suits of both cards.
    
3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck,
and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are 
no cards left in the deck.

*/

let card1 = null
let card2 = null


let url = "https://deckofcardsapi.com/api/deck/"
class Deck {

    constructor() {
        this.deck_id = null
    }

    async newDeck() {
        let res = await axios.get(`${url}new/shuffle/?deck_count=1`)
        this.deck_id = res.data.deck_id
    }

    async drawCard() {
        let res = await axios.get(`${url}${this.deck_id}/draw/?count=1`)
        let card = res.data.cards[0]
        console.log(`${card.value} of ${card.suit}`)
        return card;
    }
}


async function question1() {
    let deck = new Deck()
    await deck.newDeck()
    await deck.drawCard()
}

async function question2() {
    let deck = new Deck()
    await deck.newDeck()
    await deck.drawCard()
    await deck.drawCard()
}

async function question3() {
    let deck = new Deck()
    let cardsLeft = 52
    await deck.newDeck()
    document.querySelector('#draw').addEventListener('click', async function () {
        showCard(await deck.drawCard())
        cardsLeft--
        if (cardsLeft === 0) {
            document.querySelector('#draw').disabled = true
        }

    })
}

function showCard(card) {
    let cardImg = card.image
    let cardElement = document.createElement('img')
    cardElement.src = cardImg
    var randomDegree = Math.random() * 360;
    cardElement.style.transform = 'translate(-50%, -50%) rotate(' + randomDegree + 'deg)';
    document.getElementById('pile').appendChild(cardElement)
}

question1()
question2()
question3()