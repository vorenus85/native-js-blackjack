
/**
 * Simple JS module to export
 */
 export const blackJack = (function () {
   const deck = initDeck();
   function initDeck(){
     const deck = [];
     const colors = ['H','D','C','S'];
     const cards = ['2','3','4','5','6','7','8','9','10','A','K','Q','J'];
     for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {
       const colorElement = colors[colorIndex];
       for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
        const cardElement = cards[cardIndex];
        deck.push(cardElement+colorElement)
      }
     }
     return deck;
   }
   function shuffleDeck(){
      const array = deck;
      //The Fisher-Yates algorith
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
   }
   function render(){
    const app = document.getElementById('app');
    const deck = shuffleDeck()
    for (let index = 0; index < deck.length; index++) {
      const cardID = deck[index];
      let cardElement = document.createElement('div');
      cardElement.classList.add("h-16", "m-2", "pokercard", "col");
      cardElement.setAttribute('id', 'card-'+cardID);
      app.appendChild(cardElement);
    }
   }
   return {
     deck: deck,
     render: render,
     shuffle: shuffleDeck,
     init: initDeck
   }
  }());