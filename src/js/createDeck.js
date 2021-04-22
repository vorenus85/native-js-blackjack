
/**
 * Simple JS module to export
 */
 export function createDeck() {
   const deck = [];
   const colors = ['H','D','C','S'];
   const cards = ['2','3','4','5','6','7','8','9','10','A','K','Q','J'];
   function initDeck(){
     for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {
       const colorElement = colors[colorIndex];
       for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
        const cardElement = cards[cardIndex];
        deck.push(cardElement+colorElement)
      }
     }
     return deck;
   }
   function render(){
    const app = document.getElementById('app');
    const deck = initDeck()
    for (let index = 0; index < deck.length; index++) {
      const cardID = deck[index];
      let cardElement = document.createElement('div');
      cardElement.classList.add("h-16", "m-2", "pokercard", "col");
      cardElement.setAttribute('id', 'card-'+cardID);
      app.appendChild(cardElement);
    }
   }
   return {
     render: render,
     init: initDeck
   }
 }