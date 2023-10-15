import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

enum AnimationSpeed {
  SLOW = 'SLOW',
  MEDIUM = 'MEDIUM',
  FAST = 'FAST',
}

const SpeedSelect: React.FC = () => {
  const [speed, setSpeed] = useState<AnimationSpeed>(AnimationSpeed.MEDIUM);
  return (
    <ToggleButtonGroup
      value={speed}
      exclusive
      onChange={(_, newSpeed) => setSpeed(newSpeed as AnimationSpeed)}
      aria-label="text alignment"
      fullWidth
      size="small"
      color="standard"
    >
      {Object.entries(AnimationSpeed).map((value) => (
        <ToggleButton value={value[0]} aria-label={value[1]}>
          {value[1]}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default SpeedSelect;
