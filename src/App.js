import React, { Component } from 'react';

import './App.css';

import Title from './Title.js';
import Board from './Board.js';
import Scoreboard from './Scoreboard.js';

class App extends Component {
  constructor(props){
    super(props);

    // The game state contains card info, info about revealed cards, number of turns, and number of matches
    this.state = {
      cards: [
        {id: 0},
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9},
        {id: 10},
        {id: 11},
        {id: 12},
        {id: 13},
        {id: 14},
        {id: 15}
      ],
      firstRevealId: null,
      numReveals: 0,
      numTurns: 0,
      numMatches: 0
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleClick(id){
    // Most of the matching game logic is contained here.

    // Ignore clicks on previously revealed cards.
    if(!this.state.cards[id].reveal && this.state.numReveals<2){
      // If first reveal of turn, reveal card and update firstRevealId & numReveals.
      if(this.state.numReveals===0) {
        const cards = this.state.cards.map( (card,index) => 
          ((id===index) ? {...card, reveal: true} : card));
        this.setState((prevState,props) => (
          {cards: cards, firstRevealId: id, numReveals: prevState.numReveals+1}
        )); 
      }
      // Else, determine if match was found.
      else {
        // A match happens when card numbers match.
        if(this.state.cards[this.state.firstRevealId].number === this.state.cards[id].number){
          // Both cards are revealed and matched.
          const cards = this.state.cards.map( (card,index) => 
            ((id===index || this.state.firstRevealId===index) ? {...card, reveal: true, match: true} : card));
          
          // Update cards, firstRevealId, numTurns, & numMatches.
          this.setState((prevState,props) => (
            {cards: cards, 
             firstRevealId: null,
             numTurns: prevState.numTurns+1,
             numMatches: prevState.numMatches+1,
             numReveals: 0
            }))
        } 
        else {
          const cards = this.state.cards.map( (card,index) => 
             ((id===index) ? {...card, reveal: true} : card));
           this.setState((prevState,props) => (
            {cards: cards, numReveals: prevState.numReveals+1}
           ));
          //NO MATCH
          setTimeout(() => {
            const cards = this.state.cards.map( (card,index) => 
            ((id===index || this.state.firstRevealId===index) ? {...card, reveal: false, match: false} : card));
            this.setState((prevState,props) => (
              {cards: cards, 
              firstRevealId: null,
              numTurns: prevState.numTurns+1,
              numReveals: 0
              }))
            },800);
        }
      }
    }
  }

  handleReset(){
    this.setState((prevState,props) => (
      {firstRevealId: null, numReveals: 0, numTurns: 0, numMatches: 0}
    )); 

    this.initializeGame();
    // const cards = this.state.cards.map( (card,index) => ({...card, reveal: false, match: false}) );

  }

  initializeGame(){
    // Randomize card numbers and colors.
    var numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    var colors = ["rgb(52, 152, 219)", 
                  "rgb(155, 89, 182)", 
                  "rgb(46, 204, 113)", 
                  "rgb(241, 196, 15)", 
                  "rgb(230, 126, 34)", 
                  "rgb(26, 188, 156)", 
                  "rgb(231, 76, 60)", 
                  "rgb(149, 165, 166)"];

    // Shuffle colors for each new game.
    colors = shuffleArray(colors);

    // Assign random color to each card number.
    var randomCards = numbers.map((val,index) => ({number: val, color: colors[Math.floor(index/2)]}));
    
    // Shuffle cards array.
    randomCards = shuffleArray(randomCards);

    const cards = this.state.cards.map((card,index) => (
      {...card, ...randomCards[index], reveal: false, match: false}
    ));

    this.setState({cards});
  }

  render() {
    return (
      <div className='app'>
        <Title />
        <Board {...this.state} onSelection={this.handleClick}/>
        <Scoreboard score={this.state.numMatches} onReset={this.handleReset}/>
      </div>
    );
  }

  componentDidMount(){
    // Initialize game.
    this.initializeGame();
  }
}

/**
  * Randomize array element order in-place.
  * Using Durstenfeld shuffle algorithm.
  */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

export default App;
