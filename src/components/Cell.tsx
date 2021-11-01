import React from 'react';
import styled from 'styled-components';
import circleIcon from '../assets/images/circleIcon.svg';
import crossIcon from '../assets/images/crossIcon.svg';

interface CellProps {
    value: string | null;
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
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 150px;
        height: 150px;
    }
`;

export default Cell;
