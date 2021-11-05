import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

interface BoardProps {
    cells: any[];
    onCellClick: (index: number) => void;
}

function Board({ cells, onCellClick }: BoardProps) {
    return (
        <Grid>
            {cells.map((cell, index) => (
                <Cell
                    value={cell}
                    key={index}
                    onClick={() => onCellClick(index)}
                />
            ))}
        </Grid>
    );
}

const Grid = styled.div`
    display: grid;
    gap: 1rem;
    width: fit-content;
    margin: 1rem 0;
    grid-template-rows: 200px 200px 200px;
    grid-template-columns: 200px 200px 200px;
`;

export default Board;
