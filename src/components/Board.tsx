import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

function Board() {
    return (
        <Grid>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
        </Grid>
    );
}

const Grid = styled.div`
    display: grid;
    grid-template-rows: 200px 200px 200px;
    grid-template-columns: 200px 200px 200px;
`;

export default Board;
