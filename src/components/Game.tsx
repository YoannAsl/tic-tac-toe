import React from 'react';
import Board from './Board';

function Game() {
    return (
        <div>
            <Board
                cells={cells}
                onCellClick={(i: number) => handleCellClick(i)}
            />
        </div>
    );
}

export default Game;
