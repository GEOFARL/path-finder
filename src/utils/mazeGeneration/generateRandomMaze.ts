import { calculateValue } from '..';
import { RootState } from '../../app/store';

export default function generateRandomMaze(boardState: RootState['board']) {
  const walls = [];
  const { numOfRows, numOfCols, startPosition, endPosition } = boardState;
  const rows = calculateValue(numOfRows);
  const cols = calculateValue(numOfCols);

  for (let i = 0; i < rows; i += 1) {
    const columnCoordinates = new Set();

    for (let j = 0; j < cols / 4; j += 1) {
      columnCoordinates.add(Math.floor(5 * cols * Math.random()) % cols);
    }

    for (const colVal of columnCoordinates) {
      if (
        !(startPosition.col === colVal && startPosition.row === i) &&
        !(endPosition.col === colVal && endPosition.row === i)
      )
        walls.push({ row: i, col: colVal as number });
    }
  }

  return walls;
}
