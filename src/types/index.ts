import { AlgorithmCharacteristics } from './pathSearcher';

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

export interface SavedState {
  id: string;
  rows: number;
  cols: number;
  start: Position;
  end: Position;
  walls: Position[];
  stats: AlgorithmCharacteristics;
}

export type { SearcherResult, IPathSearcher } from './pathSearcher';
