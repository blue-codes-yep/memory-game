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

  pickCard(cardIndex) {
    if (this.state.deck[cardIndex].isFlipped) {
      return;
    }
    let cardToFlip = { ...this.state.deck[cardIndex] };
    cardToFlip.isFlipped = true;

    let newPickedCards = this.state.pickedCards.concat(cardIndex);

    let newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip;
      }
      return card;
    });

    if (newPickedCards === 2) {
      let card1Index = newPickedCards[0],
          card2Index = newPickedCards[1];

      if (card1Index !== card2Index) {
        setTimeout(
					this.unflipCards.bind(this, card1Index, card2Index),
					1000
				)
      }
      newPickedCards = [];
    }
    this.setState({ deck: newDeck, pickedCards: newPickedCards });
  }


  unflipCards(card1Index, card2Index) {
    let card1 = { ...this.state.deck[card1Index] },
      card2 = { ...this.state.deck[card2Index] }

    card1.isFlipped = false;
    card2.isFlipped = false;

    let newDeck = this.state.deck.map((card, index) => {
      if (index === card1) {
        return card1;
      }
      if (index === card2) {
        return card2;
      }
      return card;
    }
    )
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
