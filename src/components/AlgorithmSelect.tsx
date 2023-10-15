import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

enum Algorithm {
  A_STAR = 'A*',
  BFS = 'BFS',
}

const AlgorithmSelect: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.A_STAR);

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="select-searching-algorithm">
        Searching Algorithm
      </InputLabel>
      <Select
        labelId="select-searching-algorithm"
        value={algorithm}
        label="Searching Algorithm"
        onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
      >
        {Object.entries(Algorithm).map((value, i) => (
          <MenuItem value={value[0]} key={i}>
            {value[1]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AlgorithmSelect;
