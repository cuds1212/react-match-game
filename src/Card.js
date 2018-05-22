import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

// Card is a stateless component
const Card = (props) => {
    // Extract props
    const {id, number, color, reveal, match, onSelection} = props;

    // Set background color based on whether the card is revealed
    // Defaults to color specified in Card.css
    var cardStyle = {};

    if(reveal){
        cardStyle.backgroundColor = color;
    }

    // Set class based on whether the card is revealed or matched
    const cardClass = 'card' + 
        (reveal ? ' reveal' : '') + 
        (match ? ' match' : '');

    return (
        <div className={cardClass} style={cardStyle} onClick={() => onSelection(id)}>
            <span className='number'>{number}</span>
        </div>
    );
};

// Default props.
Card.defaultProps = {
    reveal: false,
    match: false
};

// Props type checking.
Card.propTypes = {
    number: PropTypes.number,
    color: PropTypes.string,
    reveal: PropTypes.bool,
    match: PropTypes.bool
};

export default Card;