import Cell from './Cell';
import Generation from './types/Generation';

import './styles/Grid.css';

type Props = {
    generation: Generation,
    toggleCell(x: number, y: number): any,
};

const Grid = ({ generation, toggleCell }: Props) => {
    const onClick = (x: number, y: number) => () => {
        toggleCell(x, y);
    };

    return (
        <div className="grid">
            {generation.grid.map((rows, y) => (
                <div className="row" key={y}>
                    {rows.map((cell, x) => (
                        <Cell cell={cell} onClick={onClick(x, y)} key={x} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;