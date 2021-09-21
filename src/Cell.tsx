import React from 'react';
import CellEnum from './types/Cell';

type Props = {
    cell: CellEnum,
    onClick: React.MouseEventHandler<HTMLDivElement>,
};


const Cell = ({ cell, onClick }: Props) => (
    <div className={cell === CellEnum.Alive ? 'cell-alive' : 'cell-died'} onClick={onClick} />  
)

export default Cell;