import React, { Component } from 'react';
import MemoryCard from './components/MemoryCard'
import './App.css';


const shuffle = deck => {
  let j = '';
  let temp = '';
  for (let i = deck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp;
  }
  return deck;
}

const generateDeck = () => {

  const symbols = [`∆`, ` ß`, `£`, `§`, `•`, `$`, `+`, `ø`];
  let deck = [];

  for (let i = 0; i < 16; i++) {
    deck.push({
      isFlipped: false,
      symbol: symbols[i % 8]
    });
  }
  return shuffle(deck);
}



class App extends Component {

  state = {
    deck: generateDeck(),
    pickedCards: [],
  };

  pickCard = cardIndex => {
    const { deck } = this.state;
    if (deck[cardIndex].isFlipped === true) {
      return;
    }
    const cardToFlip = { ...this.state.deck[cardIndex] };
    cardToFlip.isFlipped = true;

    let newDeck = deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip;
      }
      return card;
    });

    let newPickedCards = this.state.pickedCards.concat(cardIndex);
    if (newPickedCards.length === 2) {
      const card1Index = newPickedCards[0];
      const card2Index = newPickedCards[1];
      const firstCard = newDeck[card1Index];
      const secondCard = newDeck[card2Index];

      if (firstCard.symbol !== secondCard.symbol) {
        setTimeout(() => {
          this.unflipCards(card1Index, card2Index);
        }, 1000);
      }

      newPickedCards = [];
    }

    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards
    });
  };


  unflipCards(card1Index, card2Index) {
    const { deck } = this.state;
    const newDeck = deck.map(card => {
      return { ...card };
    });

    newDeck[card1Index].isFlipped = false;
    newDeck[card2Index].isFlipped = false;

    this.setState({
      deck: newDeck,
    })
  }
  render() {
    let cardsJSX = this.state.deck.map((card, index) => {
      return <MemoryCard
        symbol={card.symbol}
        isFlipped={card.isFlipped}
        key={index}
        pickCard={this.pickCard.bind(this, index)}
      />
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1>Memory Game</h1>
          <p className="subtitle">
            Match cards to win
        </p>
        </header>
        <div className="row">
          {cardsJSX.slice(0, 4)}
        </div>
        <div className="row">
          {cardsJSX.slice(4, 8)}
        </div>
        <div className="row">
          {cardsJSX.slice(8, 12)}
        </div>
        <div className="row">
          {cardsJSX.slice(12, 16)}

        </div>
      </div>
    );
  }
}

export default App;
