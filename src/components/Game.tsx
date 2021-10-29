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
        // If a player has a winning config
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
            let newIsHumanPlaying = true;

            currentCells[cellIndex] = newIsHumanPlaying ? 'X' : 'O';
            newIsHumanPlaying = !newIsHumanPlaying;
            setIsHumanPlaying(!isHumanPlaying);

            const bestCell = calculateBestCell(
                currentCells,
                isHumanPlaying ? 'X' : 'O'
            );

            if (bestCell !== -1) {
                currentCells[bestCell] = newIsHumanPlaying ? 'X' : 'O';

                setCells(currentCells);
                setIsHumanPlaying(!isHumanPlaying);
            }
        }
    }

    function resetGame() {
        setCells(Array(9).fill(null));
        setIsHumanPlaying(true);
    }

    return (
        <div>
            {winner && `The winner is ${winner}`}
            <Board
                cells={cells}
                onCellClick={(cellIndex: number) => handleCellClick(cellIndex)}
            />
            <button onClick={resetGame}>New game</button>
        </div>
    );
}

function calculateBestCell(board: any[], player: string) {
    const opponent = player === 'X' ? 'O' : 'X';

    function minimax(board: any[], isMaximizing: boolean, depth = 0) {
        const winner = calculateWinner(board);

        if (winner === player) return { cell: -1, score: 1 };
        if (winner === opponent) return { cell: -1, score: -1 };
        if (board.every((cell) => cell !== null)) return { cell: -1, score: 0 };

        const bestCell = {
            cell: -1,
            score: isMaximizing ? -10 : 10,
        };

        for (let i = 0; i < board.length; i++) {
            // If the cell is not filled
            if (!board[i]) {
                board[i] = isMaximizing ? player : opponent;
                const score = minimax(board, !isMaximizing).score;
                // board[i] = null

                if (isMaximizing) {
                    if (score > bestCell.score) {
                        bestCell.score = score;
                        bestCell.cell = i;
                    }
                } else {
                    if (score < bestCell.score) {
                        bestCell.score = score;
                        bestCell.cell = i;
                    }
                }
            }
        }
        return bestCell;
    }
    return minimax(board, true).cell;
}

export default Game;
