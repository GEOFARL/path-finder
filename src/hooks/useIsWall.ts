import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export default function useIsWall() {
  const { walls } = useSelector((state: RootState) => state.board);

  return (row: number, col: number) =>
    walls.some((wallPos) => wallPos.row === row && wallPos.col === col);
}
