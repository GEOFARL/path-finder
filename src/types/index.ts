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
  VISITED,
  PATH,
}

export interface Position {
  row: number;
  col: number;
}

export type { SearcherResult, IPathSearcher } from './pathSearcher';
