import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Algorithm } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { setAlgorithm } from '../app/features/algorithms/algorithmsSlice';
import { selectAlgorithm } from '../app/features/algorithms/algorithmsSlice';
import { resetSolution } from '../app/features/board/boardSlice';
import useStopSolving from '../hooks/useStopSolving';

const AlgorithmSelect: React.FC = () => {
  const dispatch = useDispatch();
  const { type } = useSelector(selectAlgorithm);
  const stopSolving = useStopSolving();

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="select-searching-algorithm">
        Searching Algorithm
      </InputLabel>
      <Select
        labelId="select-searching-algorithm"
        value={type}
        label="Searching Algorithm"
        onChange={(e) => {
          dispatch(setAlgorithm(e.target.value as Algorithm));
          dispatch(resetSolution());
          stopSolving();
        }}
      >
        {Object.entries(Algorithm).map((value) => (
          <MenuItem value={value[0]} key={value[0]}>
            {value[1]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AlgorithmSelect;
