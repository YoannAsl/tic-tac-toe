import React from 'react';
import styled from 'styled-components';
import Cell, { CellType } from './Cell';

interface BoardProps {
    cells: CellType[];
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
    @media only screen and (max-height: 750px) {
        grid-template-rows: 125px 125px 125px;
        grid-template-columns: 125px 125px 125px;
        img {
            height: 110px;
            width: 110px;
        }
    }
`;

export default Board;
