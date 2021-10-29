import React, { useState } from 'react';
import Board from './Board';

function Game() {
    const [cells, setCells] = useState(Array(9).fill(null));
    const [isHumanPlaying, setIsHumanPlaying] = useState(true);

    function handleCellClick(i: number) {
        const currentCells = [...cells];
        currentCells[i] = isHumanPlaying ? 'X' : 'O';

        setCells(currentCells);
        setIsHumanPlaying(!isHumanPlaying);
    }

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
