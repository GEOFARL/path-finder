import { Box, Slider, Typography } from '@mui/material';

interface SliderProps {
  value: number;
  handleChange: (e: Event, newValue: number | number[]) => void;
  title: string;
  calculateValue: (value: number) => number;
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
          sm: '200px',
        },
      }}
    >
      <Typography
        id={`slider-${title.split(' ')[0].toLowerCase()}`}
        gutterBottom
      >
        {title}
      </Typography>
      <Slider
        value={value}
        min={1}
        step={1}
        max={11}
        scale={calculateValue}
        getAriaValueText={() => calculateValue(value).toString()}
        valueLabelFormat={() => calculateValue(value).toString()}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby={`slider-${title.split(' ')[0]}`}
      />
    </Box>
  );
};

export default SliderHandle;
