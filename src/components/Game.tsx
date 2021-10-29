import React, { useState } from 'react';
import Board from './Board';

const WINNING_CONFIGURATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

function calculateWinner(cells: any[]) {
    for (const config of WINNING_CONFIGURATIONS) {
        const [a, b, c] = config;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c])
            return cells[a];
    }
    return null;
}

function Game() {
    const [cells, setCells] = useState(Array(9).fill(null));
    const [isHumanPlaying, setIsHumanPlaying] = useState(true);
    const winner = calculateWinner(cells);

    function handleCellClick(cellIndex: number) {
        const currentCells = [...cells];

        if (currentCells[cellIndex] === null) {
            currentCells[cellIndex] = isHumanPlaying ? 'X' : 'O';
            setCells(currentCells);
            setIsHumanPlaying(!isHumanPlaying);
        }
    }

    return (
        <div>
            {winner && `The winner is ${winner}`}
            <Board
                cells={cells}
                onCellClick={(cellIndex: number) => handleCellClick(cellIndex)}
            />
        </div>
    );
}

export default Game;
