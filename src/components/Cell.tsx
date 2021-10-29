import React from 'react';
import styled from 'styled-components';

interface CellProps {
    value: string | null;
    onClick: () => void;
}

function Cell({ value, onClick }: CellProps) {
    return <Container onClick={onClick}>{value}</Container>;
}

const Container = styled.div`
    border: 1px solid black;
`;

export default Cell;
