import { Spinner as Spin, Box } from '@chakra-ui/react';

function Spinner() {
  return (
    <Box sx={{ position: 'absolute', left: '50%', bottom: '50%', zIndex: 1 }}>
      <Spin color="red" size="xl" thickness="4px" sx={{ height: '5rem', width: '5rem' }} />
    </Box>
  );
}

export default Spinner;
