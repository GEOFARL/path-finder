import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AnimationSpeed } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { setSpeed } from '../app/features/algorithms/algorithmsSlice';
import { selectAnimationSpeedType } from '../app/features/algorithms/algorithmsSlice';

const SpeedSelect: React.FC = () => {
  const dispatch = useDispatch();
  const animationSpeed = useSelector(selectAnimationSpeedType);

  return (
    <ToggleButtonGroup
      value={animationSpeed}
      exclusive
      onChange={(_, newSpeed) => dispatch(setSpeed(newSpeed as AnimationSpeed))}
      aria-label="text alignment"
      fullWidth
      size="small"
      color="standard"
    >
      {Object.entries(AnimationSpeed).map((value) => (
        <ToggleButton value={value[0]} aria-label={value[1]} key={value[1]}>
          {value[1]}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default SpeedSelect;
