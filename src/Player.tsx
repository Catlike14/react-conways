import React from 'react';
import Generation from './types/Generation';

import './styles/Player.css';

type Props = {
    generation: Generation,
    updateGeneration(): any,
};

const Grid = ({ generation, updateGeneration }: Props) => {
    const [id, setId] = React.useState<NodeJS.Timer|null>(null);

    const onNextGeneration = () => {
        updateGeneration();
        const id = setTimeout(onNextGeneration, 1/10); //~10 fps
        setId(id);
    };

    const onStart = () => {
        if (!id) {
            onNextGeneration();
        }
    }

    const onPause = () => {
        if (id) {
            clearTimeout(id);
            setId(null);
        }
    }

    return (
        <div className="player">
            <div className="info">Generation number: {generation.n}</div>
            <div className="info">Rows: {generation.rowsLength}</div>
            <div className="info">Columns: {generation.columnsLength}</div>
            <div className="controls">
                { id
                    ? <button onClick={onPause}>Pause</button>
                    : <button onClick={onStart}>To infinity and beyond!</button>
                }
            </div>
        </div>
    );
};

export default Grid;