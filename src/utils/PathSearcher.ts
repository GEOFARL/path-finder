import { calculateValue } from '.';
import { RootState } from '../app/store';
import { IPathSearcher, Position, SearcherResult } from '../types';

class Node {
  public visited: number = 0;
  public previousX: number = -1;
  public previousY: number = -1;

  constructor(public isWall: boolean) {}
}

export default class PathSearcher implements IPathSearcher {
  private grid: Node[][] = [];
  private startNode: Position;
  private endNode: Position;
  private rows: number;
  private cols: number;

  constructor(boardState: RootState['board']) {
    this.initBoardGrid(boardState);
  }

  static dx = [0, -1, 0, 1];
  static dy = [1, 0, -1, 0];

  public BFS(): SearcherResult {
    const visitedCellsArray: Position[] = [];
    const path: Position[] = [];

    const queue: Position[] = [];
    queue.push({ row: this.startNode.row, col: this.startNode.col });
    this.grid[this.startNode.row][this.startNode.col].visited = 1;
    visitedCellsArray.push(this.startNode);

    while (queue.length > 0) {
      const current = queue.shift()!;

      for (let i = 0; i < 4; i += 1) {
        const x = current.col + PathSearcher.dx[i];
        const y = current.row + PathSearcher.dy[i];

        if (x === this.endNode.col && y === this.endNode.row) {
          visitedCellsArray.push({ row: y, col: x });

          this.grid[y][x].previousX = current.col;
          this.grid[y][x].previousY = current.row;

          const temp = { x, y };

          path.push({ col: temp.x, row: temp.y });

          while (this.grid[temp.y][temp.x].previousX !== -1) {
            const tmpX = this.grid[temp.y][temp.x].previousX;
            const tmpY = this.grid[temp.y][temp.x].previousY;

            temp.x = tmpX;
            temp.y = tmpY;

            path.push({ row: temp.y, col: temp.x });
          }

          return {
            visitedCellsArray,
            path,
            error: null,
          };
        } else if (
          x >= 0 &&
          x < this.cols &&
          y >= 0 &&
          y < this.rows &&
          !this.grid[y][x].isWall &&
          this.grid[y][x].visited === 0
        ) {
          this.grid[y][x].visited = 1;
          visitedCellsArray.push({ row: y, col: x });

          this.grid[y][x].previousX = current.col;
          this.grid[y][x].previousY = current.row;
          queue.push({ row: y, col: x });
        }
      }
    }

    return {
      visitedCellsArray,
      path,
      error: 'Path is not found',
    };
  }

  public aStar(): SearcherResult {}

  private initBoardGrid(boardState: RootState['board']) {
    const { numOfCols, numOfRows, startPosition, endPosition, walls } =
      boardState;

    this.startNode = startPosition;
    this.endNode = endPosition;
    this.rows = calculateValue(numOfRows);
    this.cols = calculateValue(numOfCols);

    this.grid = new Array(this.rows);
    for (let i = 0; i < this.rows; i += 1) {
      const arr = [];

      for (let j = 0; j < this.cols; j += 1) {
        arr.push(
          new Node(
            !!walls.find((wallPos) => wallPos.row === i && wallPos.col === j)
          )
        );
      }

      this.grid[i] = arr;
    }
  }
}
