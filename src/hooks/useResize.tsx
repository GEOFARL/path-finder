import { useCallback, useEffect } from 'react';
import { BoardSize } from '../types';

interface useResizeParameters {
  ref: React.MutableRefObject<HTMLElement | null>;
  setCellSize: React.Dispatch<React.SetStateAction<number>>;
  size: BoardSize;
}

export default function useResize({
  ref,
  setCellSize,
  size,
}: useResizeParameters) {
  const handleResize = useCallback(() => {
    if (ref.current)
      setCellSize(Math.floor(ref.current!.offsetWidth / size.cols));
    console.log(ref.current!.offsetWidth);
    console.log(window.innerWidth);
    console.log(
      `New size: ${Math.floor(ref.current!.offsetWidth / size.cols)}`
    );
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
