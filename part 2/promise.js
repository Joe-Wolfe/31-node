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
deck_id = null
axios.get(`${url}new/shuffle/?deck_count=1`)
    .then(res => {
        deck_id = res.data.deck_id
        return axios.get(`${url}${deck_id}/draw/?count=1`)

    })
    .then(res => {
        let card = res.data.cards[0]
        card1 = `${card.value} of ${card.suit}`
        console.log(card1)
        return axios.get(`${url}${deck_id}/draw/?count=1`)
    })
    .then(res => {
        let card = res.data.cards[0]
        card2 = `${card.value} of ${card.suit}`
        console.log(card2)
    })


let cardsLeft = 51
axios.get(`${url}new/shuffle/?deck_count=1`)
    .then(res => {
        deck_id = res.data.deck_id
    })


document.querySelector('#draw').addEventListener('click', function () {
    axios.get(`${url}${deck_id}/draw/?count=1`)
        .then(res => {
            cardsLeft--
            let draw = res.data.cards[0]
            let cardImg = draw.image
            let card = document.createElement('img')
            card.src = cardImg
            var randomDegree = Math.random() * 360;
            card.style.transform = 'translate(-50%, -50%) rotate(' + randomDegree + 'deg)';
            document.getElementById('pile').appendChild(card)

            console.log(cardsLeft)
            if (cardsLeft === 0) {
                document.querySelector('#draw').disabled = true
            }
        })
})