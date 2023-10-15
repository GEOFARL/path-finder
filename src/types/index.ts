export interface BoardSize {
  rows: number;
  cols: number;
}

export enum AnimationSpeed {
  SLOW = 'SLOW',
  MEDIUM = 'MEDIUM',
  FAST = 'FAST',
}

export enum Algorithm {
  A_STAR = 'A*',
  BFS = 'BFS',
}

export enum CellType {
  WALL,
  START,
  END,
  EMPTY,
}

export interface Position {
  row: number;
  col: number;
}
