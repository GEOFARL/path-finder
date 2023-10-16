import { FormControlLabel, Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsAnimationOn,
  setIsAnimationOn,
} from '../app/features/algorithms/algorithmsSlice';

const AnimationSwitch: React.FC = () => {
  const dispatch = useDispatch();
  const isAnimationOn = useSelector(selectIsAnimationOn);

  return (
    <FormControlLabel
      control={
        <Switch
          size="medium"
          checked={isAnimationOn}
          onChange={() => dispatch(setIsAnimationOn(!isAnimationOn))}
        />
      }
      label="Animation"
      labelPlacement="top"
    />
  );
};

export default AnimationSwitch;
