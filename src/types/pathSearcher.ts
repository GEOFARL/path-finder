import { Position } from '.';

export interface SearcherResult {
  path: Position[];
  visitedCellsArray: Position[];
  error: null | string;
  characteristics?: AlgorithmCharacteristics;
}

export interface AlgorithmCharacteristics {
  iterationCount: number;
  deadEndsCount?: number;
  maxStatesInMemory: number;
  totalGeneratedStates: number;
}

export interface IPathSearcher {
  BFS(): SearcherResult;
  aStar(): SearcherResult;
}
