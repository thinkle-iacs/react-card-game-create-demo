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
  return deck;
};

const Card = ({ onClick, rank, suit, faceUp } = { faceUp: true }) => {
  if (faceUp) {
    return (
      <div className={"card faceUp " + colors[suit]} onClick={onClick}>
        {rank}
      </div>
    );
  } else {
    return <div className="card faceDown"></div>;
  }
};

const App = () => {
  const [deck, setDeck] = useState(buildDeck());

  return (
    <main>
      <h1>War!</h1>
      <p>A Card Game</p>
      {/*<button onClick={deal}>Deal Cards</button>*/}
      {/*} <div className="hand playerA">{hand.length} cards...</div>
      vs.
      <div className="hand playerB">{hand2.length} cards...</div>
  <button onClick={doRound}>Play!</button>*/}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          gap: 20,
        }}
      >
        <div className="player-a">
          Player A
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
          <Card suit={DIAMOND} rank="7" faceUp={true} />
        </div>
        <div className="player-b">
          Player B
          <Card faceUp={false} />
        </div>
      </div>
    </main>
  );
};

export default App;
