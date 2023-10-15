import { Box, Slider, Typography } from '@mui/material';

interface SliderProps {
  value: number;
  handleChange: (e: Event, newValue: number | number[]) => void;
  title: string;
  calculateValue?: (value: number) => number;
}

const SliderHandle: React.FC<SliderProps> = ({
  value,
  handleChange,
  title,
  calculateValue,
}) => {
  return (
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: '300px',
        },
      }}
    >
      <Typography id="non-linear-slider" gutterBottom>
        {title}
      </Typography>
      <Slider
        value={value}
        min={1}
        step={1}
        max={14}
        scale={calculateValue}
        getAriaValueText={() => title}
        valueLabelFormat={() => title}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
    </Box>
  );
};

export default SliderHandle;
