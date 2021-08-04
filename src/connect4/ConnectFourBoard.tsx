import React from 'react';

type Player = 1 | 2;
type BoardValue = 0 | 1 | 2;

type FindWinner = (board: BoardValue[][]) => Player | void | undefined

const findWinner: FindWinner = (board: BoardValue[][]) => {
    
}

// Returns [Row, Column] in a tuple of the, if row and column are negative, their is
// no move and the game is over.
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
