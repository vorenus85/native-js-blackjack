/**
 * Training modular pattern
 */
export const blackJack = (function () {
  const deck = initDeck();
  const getNewCardBTN = document.getElementById("getNewCard");
  const startGameBTN = document.getElementById("startGame");
  const stopBTN = document.getElementById("stop");
  const gamer = document.getElementById("gamer");
  const dealer = document.getElementById("dealer");
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
    const gamerPlayedCards = {
      cards: [],
    };
    const dealerPlayedCards = {
      cards: [],
    };
    localStorage.setItem("gamerPlayedCards", JSON.stringify(gamerPlayedCards));
    localStorage.setItem(
      "dealerPlayedCards",
      JSON.stringify(dealerPlayedCards)
    );
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
  function addPlayedCard(cardID) {
    playedCards.push(cardID);
  }
  function removeCard(numberOfCard) {
    shuffledCards.splice(0, numberOfCard);
  }
  function renderCard(numberOfCard = 1, renderDeck = gamer) {
    const deck = shuffledCards;
    const player = renderDeck.id;
    for (let index = 0; index < numberOfCard; index++) {
      const cardID = deck[index];
      addPlayedCard(cardID);
      let cardElement = document.createElement("div");
      cardElement.classList.add("h-16", "m-2", "pokercard", "col");
      cardElement.setAttribute("id", "card-" + cardID);
      renderDeck.appendChild(cardElement);
      fillPlayerDeck(cardID, player);
    }
    removeCard(numberOfCard);
  }
  /**
   *
   * @param {*} card
   * @param {*} player
   */
  function fillPlayerDeck(card, player = "gamer") {
    let cards = getPlayerCards(player)
    cards.push(card);
    const newPlayedCards = {
      cards: cards,
    };
    localStorage.setItem(
      player + "PlayedCards",
      JSON.stringify(newPlayedCards)
    );
    const points = getPlayerPoints(player);
    renderDeckPoint(points, player);
  }
  function getPlayerCards(player) {
    let playedCards = localStorage.getItem(player + "PlayedCards");
    playedCards = JSON.parse(playedCards);
    return playedCards.cards;
  }
  function getPlayerPoints(player) {
    let cards = getPlayerCards(player);
    let points = 0;
    for (let index = 0; index < cards.length; index++) {
      const element = cards[index];
      let cardPoint;

      // its a 10 card
      if (element.length === 3) {
        cardPoint = 10;
      } else {
        if (isNaN(parseInt(element.charAt(0)))) {
          if (element.charAt(0) === "A") {
            cardPoint = 11;
          } else {
            cardPoint = 10;
          }
        } else {
          cardPoint = parseInt(element.charAt(0));
        }
      }
      points += cardPoint;
    }
    return points;
  }
  function renderDeckPoint(points, player = "gamer") {
    document.getElementById(player + "Points").innerHTML = points;
  }
  function startGame() {
    renderCard(2);
    getNewCard();
  }
  function init() {
    return false;
  }
  function dealerRounds() {
    const dealerPoints  = getPlayerPoints("dealer")

    if(dealerPoints <= 17){
      renderCard(1, dealer);
      setTimeout(function () {
        dealerRounds()
      }, 1000);
    } else {
      startGameBTN.classList.remove("d-none");
      getNewCardBTN.classList.add("d-none");
      stopBTN.classList.add("d-none");
    }
    
  }
  function getNewCard() {
    getNewCardBTN.onclick = function () {
      renderCard(1);
    };
  }
  stopBTN.onclick = function () {
    dealerRounds();
    getNewCardBTN.classList.add("d-none");
  };
  startGameBTN.onclick = function () {
    startGame();
    startGameBTN.classList.toggle("d-none");
    getNewCardBTN.classList.remove("d-none");
    stopBTN.classList.remove("d-none");
  };
  // public methods and properties
  return {
    start: init(),
  };
})();
