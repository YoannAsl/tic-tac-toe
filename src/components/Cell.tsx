import React from 'react';
import styled from 'styled-components';
import circleIcon from '../assets/images/circleIcon.svg';
import crossIcon from '../assets/images/crossIcon.svg';

export type CellType = null | 'X' | 'O';

interface CellProps {
    value: CellType;
    onClick: () => void;
}

function Cell({ value, onClick }: CellProps) {
    return (
        <Container onClick={onClick}>
            {value === 'X' && <img src={crossIcon} alt='cross icon' />}
            {value === 'O' && <img src={circleIcon} alt='circle icon' />}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    img {
        width: 150px;
        height: 150px;
    }
`;

export default Cell;
