import React from 'react';

import './Scoreboard.css';

// Scoreboard is a stateless component
const Scoreboard = (props) => {
    // Determine if game is finished
    const gameOver = (props.score===8);
    // Set scoreboard class name based on whether the game is finished
    const scoreboardClassName = 'scoreboard ' + (gameOver ? 'finished' : '');
    // Set scoreboard message based on whether the game is finished
    const message = gameOver ? "You win!!!" : "Number of Matches: " + props.score;
    // Set reset button class name based on whether the game is finished
    const buttonClassName = gameOver ? 'final' : '';
//<button type="button" className = {buttonClassName} onClick={props.onReset}>
    return (
        <div className={scoreboardClassName}>
            <span className="score">{message}</span>
            <a href=""><button type="button" className={buttonClassName}>
                <span>Reset</span><i className="fa fa-refresh fa-2x" aria-hidden="true"></i>
            </button></a>

        </div>
    );
};

export default Scoreboard;