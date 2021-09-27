import { CircularProgress, circularProgressClasses } from '@mui/material';
import Box from '@mui/material/Box';

function Spinner(props) {
  return (
    <Box sx={{ position: 'absolute', left: '50%', bottom: '50%', zIndex: 1 }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: 'rgba(255,0,0,0.1)',
        }}
        size={60}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? 'red' : '#red'),
          animationDuration: '270ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={60}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default Spinner;
