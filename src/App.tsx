import React from 'react';

import Cell from './types/Cell';
import Generation, { getNextGeneration, toggleCell as _toggleCell } from './types/Generation';

import Grid from './Grid';
import Player from './Player';
import './styles/App.css';

import raw from "raw.macro";


const App = () => {
  const [generation, setGeneration] = React.useState<Generation|null>(null);

  if (generation === null) {
    //TODO: handle unexepected input
    const input = raw("../input.txt");
    const [g, s, ...rows] = input.trim().split("\r\n");
    const n = parseInt(g.replace("Generation ", ""));
    const [rowsLength, columnsLength] = s.split(" ").map<number>(v => parseInt(v));
    
    const generation: Generation = {
      n, rowsLength, columnsLength, grid: []
    };

    rows.forEach((row, i) => {
      generation.grid[i] = new Array(columnsLength);
      for (var j = 0; j < row.length; j++) {
        generation.grid[i][j] = row[j] === '*' ? Cell.Alive : Cell.Dead;
      }
    });

    setGeneration(generation);
  }

  if (!generation) {
    return <>Loading...</>;
  }

  const updateGeneration = () => {
    setGeneration(generation => generation ? getNextGeneration(generation) : generation);
  }

  const toggleCell = (x: number, y: number) => {
    setGeneration(generation => generation ? _toggleCell(generation, x, y) : generation);
  }

  return (
    <div className="app">
      <Player generation={generation} updateGeneration={updateGeneration} />
      <Grid generation={generation} toggleCell={toggleCell} />
    </div>
  );
};

export default App;
