import { useState } from "react";
import "./App.css";

const SPADE = "♠";
const HEART = "♥";
const DIAMOND = "♦";
const CLUB = "♣";

const rankName = {
  1: "A",
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: "J",
  12: "Q",
  13: "K",
};

const colors = {
  [SPADE]: "black",
  [CLUB]: "black",
  [HEART]: "red",
  [DIAMOND]: "red",
};

const buildDeck = () => {
  let deck = [];
  const suits = [HEART, DIAMOND, CLUB, SPADE];
  for (let i = 0; i < 13; i++) {
    for (let suit = 0; suit < 4; suit++) {
      const card = {
        rank: i + 1,
        suit: suits[suit],
      };
      deck.push(card);
    }
  }
  console.log("Built deck", deck);
  return deck;
};

const Card = ({ onClick, rank, suit, faceUp } = { faceUp: true }) => {
  if (faceUp) {
    return (
      <div className={"card faceUp " + colors[suit]} onClick={onClick}>
        {rank}
        {suit}
      </div>
    );
  } else {
    return <div className="card faceDown" onClick={onClick}></div>;
  }
};

const App = () => {
  //const [deck, setDeck] = useState(buildDeck());
  const [playerHand, setPlayerHand] = useState([
    { rank: 12, suit: DIAMOND },
    { rank: 2, suit: DIAMOND },
    { rank: 3, suit: DIAMOND },
    { rank: 4, suit: DIAMOND },
    { rank: 6, suit: DIAMOND },
  ]);
  const [otherHand, setOtherHand] = useState([
    { rank: 1, suit: CLUB },
    { rank: 2, suit: CLUB },
    { rank: 3, suit: CLUB },
    { rank: 4, suit: CLUB },
    { rank: 6, suit: CLUB },
  ]);
  const [playerPlayed, setPlayerPlayed] = useState([]);
  const [otherPlayed, setOtherPlayed] = useState([]);

  const dealHands = () => {
    // All the cards
    let deck = buildDeck();
    // Player A
    let playerDeck = [];
    // Player B
    let otherDeck = [];
    // Which deck I'm dealing to NOW
    let currentDeck = deck;
    // While I still have cards in the deck
    while (deck.length > 0) {
      // Pick a random card
      let randomIndex = Math.floor(Math.random() * deck.length);
      // Take the card out of the deck
      let card = deck.splice(randomIndex, 1)[0];
      // Give it to deck
      currentDeck.push(card);
      // Change deck to other deck
      if (currentDeck == playerDeck) {
        currentDeck = otherDeck;
      } else {
        currentDeck = playerDeck;
      }
    }

    setPlayerHand(playerDeck);
    setOtherHand(otherDeck);
  };
  const playCard = () => {
    console.log("PLAY CARD!");
    let updatedHand = [...playerHand];
    let updatedOther = [...otherHand];
    let newCard = updatedHand.pop();
    let otherCard = updatedOther.pop();

    setPlayerPlayed([newCard]);
    setOtherPlayed([otherCard]);
    setPlayerHand(updatedHand);
    setOtherHand(updatedOther);
    console.log("updatedHand,", updatedHand, "=>", newCard);
    console.log("updatedOther", updatedOther, "=>", otherCard);
  };

  const play4MoreCards = () => {};

  const doWar = (hand1, hand2, played1, played2) => {
    hand1 = [...hand1];
    hand2 = [...hand2];
    let lastCard1 = played1[played1.length - 1];
    let lastCard2 = played2[played2.length - 1];
    if (!lastCard1 || !lastCard2) {
      return;
    }
    if (lastCard1.rank == lastCard2.rank) {
      // If there is a tie...
      // Repeat 3 times...
      for (let i = 0; i < 4; i++) {
        if (hand1.length) {
          // if there is a card
          // add it to the hand...
          played1 = [...played1, hand1.pop()];
        }
        if (hand2.length) {
          played2 = [...played2, hand2.pop()];
        }
      }
      setPlayerHand(hand1);
      setOtherHand(hand2);
      setPlayerPlayed(played1);
      setOtherPlayed(played2);
      return; // end function here -- they need to click again!
    } else {
      if (lastCard1.rank > lastCard2.rank) {
        let newCards = [...played1, ...played2, ...hand1];
        setPlayerHand(newCards);
      } else {
        let newCards = [...played1, ...played2, ...hand2];
        setOtherHand(newCards);
      }
      setPlayerPlayed([]);
      setOtherPlayed([]);
    }
  };

  const doNextThing = () => {
    if (playerHand.length == 0 || otherHand.length == 0) {
      dealHands();
    } else if (playerPlayed.length == 0) {
      playCard();
    } else {
      doWar(playerHand, otherHand, playerPlayed, otherPlayed);
    }
  };

  return (
    <main onClick={doNextThing}>
      <h1>War!</h1>
      <p>A Card Game</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          gap: 20,
        }}
      >
        <div className="player-a">
          Player A ({playerHand.length})
          <Card faceUp={false} />
        </div>
        <div
          className="battle"
          style={{
            width: "calc(4*var(--card-width))",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 3,
            }}
          >
            {playerPlayed.map((c) => (
              <Card faceUp={true} rank={c.rank} suit={c.suit} />
            ))}
          </div>
          vs
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: 3,
            }}
          >
            {otherPlayed.map((c) => (
              <Card faceUp={true} rank={c.rank} suit={c.suit} />
            ))}
          </div>
        </div>
        <div className="player-b">
          Player B ({otherHand.length})
          <Card faceUp={false} onClick={playCard} />
        </div>
      </div>
    </main>
  );
};

export default App;
