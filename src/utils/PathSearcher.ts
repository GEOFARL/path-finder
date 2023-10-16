import { calculateValue } from '.';
import { RootState } from '../app/store';
import { IPathSearcher, Position, SearcherResult } from '../types';

type InitBoard = 'BFS' | 'A_STAR';

class Node {
  public visited: number = 0;
  public previousCol: number = -1;
  public previousRow: number = -1;

  constructor(public isWall: boolean) {}
}

class AStarNode extends Node {
  public gScore: number = +Infinity;

  constructor(isWall: boolean) {
    super(isWall);
  }
}

export default class PathSearcher implements IPathSearcher {
  private grid: (Node | AStarNode)[][] = [];
  private startNode: Position;
  private endNode: Position;
  private rows: number;
  private cols: number;

  constructor(private boardState: RootState['board']) {}

  static dx = [0, -1, 0, 1];
  static dy = [1, 0, -1, 0];

  public BFS(): SearcherResult {
    this.initBoardGrid('BFS');

    const visitedCellsArray: Position[] = [];
    let path: Position[] = [];

    const queue: Position[] = [];
    queue.push({ row: this.startNode.row, col: this.startNode.col });
    this.grid[this.startNode.row][this.startNode.col].visited = 1;
    visitedCellsArray.push(this.startNode);

    while (queue.length > 0) {
      const current = queue.shift()!;

      for (let i = 0; i < 4; i += 1) {
        const col = current.col + PathSearcher.dx[i];
        const row = current.row + PathSearcher.dy[i];

        if (col === this.endNode.col && row === this.endNode.row) {
          visitedCellsArray.push({ row, col });

          path = this.constructPath(row, col, current);

          return {
            visitedCellsArray,
            path,
            error: null,
          };
        } else if (
          col >= 0 &&
          col < this.cols &&
          row >= 0 &&
          row < this.rows &&
          !this.grid[row][col].isWall &&
          this.grid[row][col].visited === 0
        ) {
          this.grid[row][col].visited = 1;
          visitedCellsArray.push({ row, col });

          this.grid[row][col].previousCol = current.col;
          this.grid[row][col].previousRow = current.row;
          queue.push({ row, col });
        }
      }
    }

    return {
      visitedCellsArray,
      path,
      error: 'Path is not found',
    };
  }

  public aStar(): SearcherResult {
    type AStarPosition = Position & { f: number };

    this.initBoardGrid('A_STAR');

    const closeList: AStarPosition[] = [];
    let openList: AStarPosition[] = [];
    const path: Position[] = [];

    const h = this.H(this.startNode, this.endNode);
    openList.push({ f: h, row: this.startNode.row, col: this.startNode.col });

    (this.grid as AStarNode[][])[this.startNode.row][
      this.startNode.col
    ].gScore = 0;

    while (openList.length > 0) {
      let minValueIndex = 0;

      for (let i = 0; i < openList.length; i += 1) {
        if (openList[i].f < openList[minValueIndex].f) {
          minValueIndex = i;
        }
      }

      const currentNode = openList[minValueIndex];
      closeList.push(currentNode);

      openList = openList.filter((_, i) => i !== minValueIndex);

      if (
        currentNode.row === this.endNode.row &&
        currentNode.col === this.endNode.col
      ) {
        const temp = {
          row: currentNode.row,
          col: currentNode.col,
        };

        path.push({
          row: temp.row,
          col: temp.col,
        });

        while (this.grid[temp.row][temp.col].previousCol !== -1) {
          const tmpCol = this.grid[temp.row][temp.col].previousCol;
          const tmpRow = this.grid[temp.row][temp.col].previousRow;

          temp.col = tmpCol;
          temp.row = tmpRow;
          path.push({ row: temp.row, col: temp.col });
        }
        return {
          path,
          visitedCellsArray: closeList,
          error: '',
        };
      }

      for (let i = 0; i < 4; i += 1) {
        const col = currentNode.col + PathSearcher.dx[i];
        const row = currentNode.row + PathSearcher.dy[i];

        if (
          !(
            col >= 0 &&
            col < this.cols &&
            row >= 0 &&
            row < this.rows &&
            !this.grid[row][col].isWall
          )
        ) {
          continue;
        }

        const newGScore =
          (this.grid as AStarNode[][])[currentNode.row][currentNode.col]
            .gScore + 1;
        const newHScore = this.H({ row, col }, this.endNode);
        const newFScore = newGScore + newHScore;

        if ((this.grid as AStarNode[][])[row][col].gScore > newGScore) {
          (this.grid as AStarNode[][])[row][col].gScore = newGScore;
          this.grid[row][col].previousRow = currentNode.row;
          this.grid[row][col].previousCol = currentNode.col;

          if (
            !openList.find(
              (aStarNode) =>
                aStarNode.f === newFScore &&
                aStarNode.col === col &&
                aStarNode.row === row
            )
          ) {
            openList.push({
              f: newFScore,
              row,
              col,
            });
          }
        }
      }
    }

    return { path, visitedCellsArray: closeList, error: 'Path is not found' };
  }

  private H(source: Position, dest: Position): number {
    return Math.sqrt(
      Math.pow(Math.abs(dest.col - source.col), 2) +
        Math.pow(Math.abs(dest.row - source.row), 2)
    );
  }

  private constructPath(
    row: number,
    col: number,
    current: {
      row: number;
      col: number;
    }
  ) {
    const path = [];

    this.grid[row][col].previousCol = current.col;
    this.grid[row][col].previousRow = current.row;

    const temp = { col, row };

    path.push({ col: temp.col, row: temp.row });

    while (this.grid[temp.row][temp.col].previousCol !== -1) {
      const tmpCol = this.grid[temp.row][temp.col].previousCol;
      const tmpRow = this.grid[temp.row][temp.col].previousRow;

      temp.col = tmpCol;
      temp.row = tmpRow;

      path.push({ row: temp.row, col: temp.col });
    }

    return path;
  }

  private initBoardGrid(type: InitBoard) {
    const { numOfCols, numOfRows, startPosition, endPosition, walls } =
      this.boardState;

    this.startNode = startPosition;
    this.endNode = endPosition;
    this.rows = calculateValue(numOfRows);
    this.cols = calculateValue(numOfCols);

    this.grid = new Array(this.rows);
    for (let i = 0; i < this.rows; i += 1) {
      const arr = [];

      for (let j = 0; j < this.cols; j += 1) {
        if (type === 'BFS') {
          arr.push(
            new Node(
              !!walls.find((wallPos) => wallPos.row === i && wallPos.col === j)
            )
          );
        } else if (type === 'A_STAR') {
          arr.push(
            new AStarNode(
              !!walls.find((wallPos) => wallPos.row === i && wallPos.col === j)
            )
          );
        }
      }

      this.grid[i] = arr;
    }
  }
}
