/**
 * Training modular pattern
 */
export const blackJack = (function () {
  const deck = initDeck();
  const getNewCardBTN = document.getElementById("getNewCard")
  const app = document.getElementById("app");
  let shuffledCards = shuffle();
  let playedCards = [];
  function initDeck() {
    const deck = [];
    const colors = ["H", "D", "C", "S"];
    const cards = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "A",
      "K",
      "Q",
      "J",
    ];
    for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {
      const colorElement = colors[colorIndex];
      for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
        const cardElement = cards[cardIndex];
        deck.push(cardElement + colorElement);
      }
    }
    return deck;
  }
  function shuffle() {
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
  function addPlayedCard(cardID){
    playedCards.push(cardID)
  }
  function removeCard(numberOfCard){
    shuffledCards.splice(0,numberOfCard)
  }
  function renderCard(numberOfCard = 1) {
    const deck = shuffledCards;
    //console.log(playedCards)
    //console.log(shuffledCards)
    for (let index = 0; index < numberOfCard; index++) {
      const cardID = deck[index];
      addPlayedCard(cardID)
      let cardElement = document.createElement("div");
      cardElement.classList.add("h-16", "m-2", "pokercard", "col");
      cardElement.setAttribute("id", "card-" + cardID);
      app.appendChild(cardElement);
    }
    removeCard(numberOfCard)
    //console.log(playedCards)
    //console.log(shuffledCards)
  }
  function init(){
    renderCard(2);
    getNewCard();
  }
  function getNewCard(){
    getNewCardBTN.onclick = function(){
      renderCard(1)
    }
  }
  return {
    start: init()
  };
})();
