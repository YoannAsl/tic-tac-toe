import React, { useState } from 'react';
import Board from './Board';
import styled from 'styled-components';
import { CellType } from './Cell';

const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

function checkForTie(cells: any[]) {
    if (cells.every((cell) => cell !== null)) return true;
    return false;
}

function checkForWinner(cells: any[]) {
    for (const condition of WIN_CONDITIONS) {
        const [a, b, c] = condition;
        // If a player has a win condition, return the player
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c])
            return cells[a];
    }
    return null;
}

function Game() {
    const [cells, setCells] = useState<CellType[]>(Array(9).fill(null));
    const winner = checkForWinner(cells);
    const tie = checkForTie(cells);

    function handleCellClick(cellIndex: number) {
        const currentCells = [...cells];

        if (
            checkForWinner(currentCells) === null &&
            checkForTie(currentCells) === false
        ) {
            if (currentCells[cellIndex] === null) {
                currentCells[cellIndex] = 'X';

                // AI move
                const bestCell = calculateBestCell(currentCells, 'O');
                if (bestCell !== -1) {
                    currentCells[bestCell] = 'O';
                }
            }
            setCells(currentCells);
        }
    }

    function resetGame() {
        setCells(Array(9).fill(null));
    }

    return (
        <Container>
            {winner && `The winner is ${winner} !`}
            {tie && `It's a tie !`}
            <Board
                cells={cells}
                onCellClick={(cellIndex: number) => handleCellClick(cellIndex)}
            />
            <button onClick={resetGame}>New game</button>
        </Container>
    );
}

function calculateBestCell(board: any[], player: string) {
    const opponent = 'X';

    function minimax(board: any[], isMaximizing: boolean, depth = 0) {
        const winner = checkForWinner(board);
        const tie = checkForTie(board);

        if (winner === player) return { cell: -1, score: 1 };
        if (winner === opponent) return { cell: -1, score: -1 };
        if (tie) return { cell: -1, score: 0 };

        const bestCell = {
            cell: -1,
            score: isMaximizing ? -1000 : 1000,
        };

        for (let i = 0; i < board.length; i++) {
            // If the cell is not filled
            if (!board[i]) {
                // Make a move
                board[i] = isMaximizing ? player : opponent;
                // Rerun the algorithm with the new move
                const score = minimax(board, !isMaximizing).score;
                // Cancel the move
                board[i] = null;

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

const Container = styled.main`
    background-color: #2a2b2e;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: white;
    padding-top: 5rem;
    box-sizing: border-box;
    align-items: center;
    & > button {
        width: fit-content;
    }
`;

export default Game;
