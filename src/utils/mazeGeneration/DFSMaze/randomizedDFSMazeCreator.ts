import { Position } from '../../../types';

interface Coordinate {
  x: number;
  y: number;
}

export default class RandomizedDFSMazeCreator {
  private visitedCellsArray: Position[] = [];
  private visitedCellsBooleans: boolean[][] = [];

  constructor(private rows: number, private cols: number) {
    this.rows = rows;
    this.cols = cols;
  }

  public getWallsArray() {
    this.visitedCellsArray = [];
    this.visitedCellsBooleans = new Array(this.rows);

    for (let i = 0; i < this.rows; i++) {
      const cols = [];
      for (let j = 0; j < this.cols; j++) {
        cols.push(false);
      }

      this.visitedCellsBooleans[i] = cols;
    }

    this.DFS(1, 1);
    return this.visitedCellsArray;
  }

  private DFS(row: number, col: number): void {
    this.visitedCellsBooleans[row][col] = true;
    this.visitedCellsArray.push({ row, col });

    const stack = [];
    stack.push({ x: col, y: row });

    while (stack.length > 0) {
      const currentPosition = stack[stack.length - 1];

      const neighbors = this.getNeighbors(currentPosition);

      if (neighbors.length > 0) {
        const randomNeighbor =
          Math.floor(Math.random() * 10) % neighbors.length;
        const neighborPosition: Coordinate = {
          x: neighbors[randomNeighbor][0],
          y: neighbors[randomNeighbor][1],
        };
        this.addWalls(currentPosition, neighborPosition);

        stack.push(neighborPosition);
        this.visitedCellsBooleans[neighborPosition.y][neighborPosition.x] =
          true;
      } else {
        stack.pop();
      }
    }
  }

  private getNeighbors(position: Coordinate): number[][] {
    const dx = [2, -2, 0, 0];
    const dy = [0, 0, 2, -2];

    const arr = [];
    for (let i = 0; i < 4; i += 1) {
      const x = position.x + dx[i];
      const y = position.y + dy[i];

      if (this.isValidNeighbor({ x, y })) {
        arr.push([x, y]);
      }
    }

    return arr;
  }

  private isValidNeighbor(position: Coordinate): boolean {
    const { x, y } = position;
    return (
      x >= 0 &&
      y >= 0 &&
      x < this.cols &&
      y < this.rows &&
      !this.visitedCellsBooleans[y][x]
    );
  }

  private addWalls(source: Coordinate, destination: Coordinate): void {
    const { x: x0, y: y0 } = source;
    const { x: x1, y: y1 } = destination;

    if (y1 === y0) {
      if (x1 < x0) {
        for (let i = x0 - 1; i >= x1; i -= 1) {
          this.visitedCellsArray.push({ row: y1, col: i });
        }
      } else {
        for (let i = x0 + 1; i <= x1; i++) {
          this.visitedCellsArray.push({ row: y1, col: i });
        }
      }
    } else {
      if (y1 < y0) {
        for (let i = y0 - 1; i >= y1; i -= 1) {
          this.visitedCellsArray.push({ row: i, col: x1 });
        }
      } else {
        for (let i = y0 + 1; i <= y1; i += 1) {
          this.visitedCellsArray.push({ row: i, col: x1 });
        }
      }
    }
  }
}
