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
