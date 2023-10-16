import { Position } from '.';

export interface SearcherResult {
  path: Position[];
  visitedCellsArray: Position[];
  error: null | string;
}

export interface IPathSearcher {
  BFS(): SearcherResult;
  aStar(): SearcherResult;
}
