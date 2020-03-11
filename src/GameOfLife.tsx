import React, { useState, useEffect } from 'react';
import produce from 'immer';
import classNames from 'classnames';

import styles from './GameOfLife.module.scss';

const mod = (n: number, m: number): number => {
  	return ((n % m) + m) % m;
};

const generateGrid = (nRows: number, nCols: number): boolean[][] => {
	const rows = [];
	for (let i = 0; i < nRows; i++) {
		rows.push(Array(nCols).fill(false));
	}
	return rows;
}

interface GameOfLifeProps {
	nRows: number,
	nCols: number,
	cellSize: string,
	tickTime: number,
	spawnTime: number,
	style?: React.CSSProperties
}

const spawnCoords = [
	[0, 0],
	[0, 1],
	[0, 2],
	[-1, 2],
	[-2, 1]
];

const GameOfLife: React.FC<GameOfLifeProps> = (props) => {
	const [ grid, setGrid ] = useState(() => generateGrid(props.nRows, props.nCols));

	useEffect(() => {
		const runSimulation = () => {
			setGrid(oldGrid => {
				const newGrid = generateGrid(props.nRows, props.nCols);
				
				for (let i = 0; i < props.nRows; i++) {
					for (let j = 0; j < props.nCols; j++) {
						// count neighbors
						let nNeighbors = 0;
						for (let oi = -1; oi < 2; oi++) {
							for (let oj = -1; oj < 2; oj++) {
								if (oi === 0 && oj === 0) continue;
	
								const ni = mod(i + oi, props.nRows);
								const nj = mod(j + oj, props.nCols);
								nNeighbors += (oldGrid[ni][nj]) ? 1 : 0;
							}
						}
	
						if ((oldGrid[i][j] && (nNeighbors === 2 || nNeighbors === 3))
							|| (!oldGrid[i][j] && (nNeighbors === 3))) {
							newGrid[i][j] = true;
						}
					}
				}
				
				return newGrid;
			});
		}
	
		const runSpawn = () => {
			// pick a random pivot coordinate
			const pi = Math.floor(Math.random() * props.nRows);
			const pj = Math.floor(Math.random() * props.nCols);
			const factor = (-1) ** Math.floor(Math.random() * 2);
	
			setGrid(oldGrid => {
				return produce(oldGrid, newGrid => {
					spawnCoords.forEach(([ oi, oj ]) => {
						const i = mod(pi + oi * factor, props.nRows);
						const j = mod(pj + oj * factor, props.nCols);
						newGrid[i][j] = true;
					});
				});
			});
		}

		const simulationInterval = setInterval(runSimulation, props.tickTime);
		const spawnInterval = setInterval(runSpawn, props.spawnTime);

		return () => {
			clearInterval(simulationInterval);
			clearInterval(spawnInterval);
		}
	}, [props.nRows, props.nCols, props.tickTime, props.spawnTime]);

	const transitionTime = props.tickTime / 1000;

	return (
		<div
			className={styles.container}
			style={{
				gridTemplateRows: `repeat(${props.nRows}, ${props.cellSize})`,
				gridTemplateColumns: `repeat(${props.nCols}, ${props.cellSize})`,
				width: '102vw',
				height: `${props.nRows / props.nCols * 102}vw`,
				...props.style
			}}
		>
			{grid.map((row, i) => 
				row.map((val, j) => (
					<div 
						key={`${i}-${j}`}
						className={classNames({
							[styles.cell]: true,
							[styles.on]: val
						})}
						style={{
							transition: `background-color ${transitionTime}s, box-shadow ${transitionTime}s`,
							transitionTimingFunction: 'linear'
						}}
					/>
				))
			)}
		</div>
	);
}

export default GameOfLife;
