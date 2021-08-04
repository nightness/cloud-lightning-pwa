import React from 'react';

type Player = 1 | 2;

// Returns [Row, Column] in a tuple of the 
type ComputerMove = (board: number[][], maximizeFor: Player) => [number, number]

const computerMove: ComputerMove = (board, maximizeFor) => {
    let row = 0;
    let column = 0;
    return [row, column]
}


export default function ConnectFourBoard() {
    return (
        <div>
            Connect Four
        </div>
    )
}
