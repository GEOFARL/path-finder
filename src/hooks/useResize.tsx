import { useCallback, useEffect } from 'react';
import { BoardSize } from '../types';

interface useResizeParameters {
  ref: React.MutableRefObject<HTMLElement | null>;
  changeCellSize: (val: number) => void;
  size: BoardSize;
}

export default function useResize({
  ref,
  changeCellSize,
  size,
}: useResizeParameters) {
  const handleResize = useCallback(() => {
    if (ref.current)
      changeCellSize(Math.floor(ref.current!.offsetWidth / size.cols));
    // eslint-disable-next-line
  }, [window.innerWidth, size]);

  useEffect(() => {
    if (!ref.current) return;
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, ref]);
}
