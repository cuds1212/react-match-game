import React from 'react';
import PropTypes from 'prop-types';

import './Board.css';

import Card from './Card.js';

// Board is a stateless component
const Board = (props) => {
    // Map game state to array of Card components
    const cards = props.cards.map(
        (card,index) => (
            <Card key={card.id} {...card} onSelection={props.onSelection}/>
        )
    )

    return (
        <div className='board'>
            {cards}
        </div>
    );
};

Board.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Board;