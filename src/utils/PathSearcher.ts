import { calculateValue } from '.';
import { RootState } from '../app/store';
import { IPathSearcher, Position, SearcherResult } from '../types';
import { AlgorithmCharacteristics } from '../types/pathSearcher';
import MinHeap from './MinHeap';

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

interface IAStarPosition extends Position {
  f: number;
  compare: (another: AStarPosition) => 1 | 0 | -1;
  equals(another: AStarPosition): boolean;
}

class AStarPosition implements IAStarPosition {
  constructor(public f: number, public row: number, public col: number) {}

  compare(another: AStarPosition): 1 | 0 | -1 {
    if (this.f > another.f) return 1;
    else if (this.f < another.f) return -1;
    return 0;
  }

  equals(another: AStarPosition): boolean {
    return (
      this.f === another.f &&
      this.col === another.col &&
      this.row === another.row
    );
  }

  getPosition(): Position {
    return {
      col: this.col,
      row: this.row,
    };
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
    const characteristics: AlgorithmCharacteristics = {
      iterationCount: 0,
      maxStatesInMemory: 0,
      totalGeneratedStates: 0,
      timeTaken: 0,
    };
    const start = Date.now();
    this.initBoardGrid('BFS');

    const visitedCellsArray: Position[] = [];
    let path: Position[] = [];

    const queue: Position[] = [];

    queue.push({ row: this.startNode.row, col: this.startNode.col });
    characteristics.totalGeneratedStates += 1;

    this.grid[this.startNode.row][this.startNode.col].visited = 1;
    visitedCellsArray.push(this.startNode);
    characteristics.maxStatesInMemory += 1;

    while (queue.length > 0) {
      const current = queue.shift()!;

      for (let i = 0; i < 4; i += 1) {
        characteristics.iterationCount += 1;

        const col = current.col + PathSearcher.dx[i];
        const row = current.row + PathSearcher.dy[i];

        if (col === this.endNode.col && row === this.endNode.row) {
          visitedCellsArray.push({ row, col });

          path = this.constructPath(row, col, current);

          const end = Date.now();
          characteristics.timeTaken = end - start;
          return {
            visitedCellsArray,
            path,
            error: null,
            characteristics,
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
          characteristics.maxStatesInMemory = Math.max(
            queue.length,
            characteristics.maxStatesInMemory
          );
          characteristics.totalGeneratedStates += 1;
        }
      }
    }

    const end = Date.now();
    characteristics.timeTaken = end - start;
    return {
      visitedCellsArray,
      path,
      error: 'Path is not found',
      characteristics,
    };
  }

  public aStar(): SearcherResult {
    const characteristics: AlgorithmCharacteristics = {
      iterationCount: 0,
      maxStatesInMemory: 0,
      totalGeneratedStates: 0,
      timeTaken: 0,
    };

    const start = Date.now();

    this.initBoardGrid('A_STAR');

    const closeList: Position[] = [];
    const openList = new MinHeap<AStarPosition>();
    const path: Position[] = [];

    const h = this.H(this.startNode, this.endNode);
    characteristics.iterationCount += openList.insert(
      new AStarPosition(h, this.startNode.row, this.startNode.col)
    );
    characteristics.maxStatesInMemory += 1;

    (this.grid as AStarNode[][])[this.startNode.row][
      this.startNode.col
    ].gScore = 0;

    while (!openList.isEmpty()) {
      characteristics.iterationCount += 1;

      const currentNode = openList.getMin();
      closeList.push(currentNode.getPosition());

      characteristics.iterationCount += openList.remove();

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

        const end = Date.now();
        characteristics.timeTaken = end - start;

        return {
          path,
          visitedCellsArray: closeList,
          error: '',
          characteristics,
        };
      }

      for (let i = 0; i < 4; i += 1) {
        const col = currentNode.col + PathSearcher.dx[i];
        const row = currentNode.row + PathSearcher.dy[i];

        characteristics.iterationCount += 1;

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

        characteristics.totalGeneratedStates += 1;

        if ((this.grid as AStarNode[][])[row][col].gScore > newGScore) {
          (this.grid as AStarNode[][])[row][col].gScore = newGScore;

          this.grid[row][col].previousRow = currentNode.row;
          this.grid[row][col].previousCol = currentNode.col;

          const newPos = new AStarPosition(newFScore, row, col);
          const [contains, iterationCount] = openList.contains(newPos);
          characteristics.iterationCount += iterationCount;

          if (!contains) {
            characteristics.iterationCount += openList.insert(newPos);

            characteristics.maxStatesInMemory = Math.max(
              characteristics.maxStatesInMemory,
              openList.length + closeList.length
            );
          }
        }
      }
    }

    const end = Date.now();
    characteristics.timeTaken = end - start;
    return {
      path,
      visitedCellsArray: closeList,
      error: 'Path is not found',
      characteristics,
    };
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
          arr.push(new Node(this.isWall(walls, i, j)));
        } else if (type === 'A_STAR') {
          arr.push(new AStarNode(this.isWall(walls, i, j)));
        }
      }
      this.grid[i] = arr;
    }
  }

  private isWall(walls: Position[], row: number, col: number) {
    return (
      !!walls.find((wallPos) => wallPos.row === row && wallPos.col === col) &&
      !(this.startNode.row === row && this.startNode.col === col) &&
      !(this.endNode.row === row && this.endNode.col === col)
    );
  }
}
