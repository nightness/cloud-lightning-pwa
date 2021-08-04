import React from 'react';

type Player = 1 | 2;
type BoardValue = 0 | 1 | 2;

// Returns [Row, Column] in a tuple of the 
type ComputerMove = (board: BoardValue[][], maximizeFor: Player) => [number, number]

const computerMove: ComputerMove = (board, maximizeFor) => {
    let row = -1;
    let column = -1;
    return [row, column]
}


export default function ConnectFourBoard() {
    return (
        <div>
            Connect Four
        </div>
    )
}
