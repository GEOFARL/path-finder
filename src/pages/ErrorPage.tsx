import { useRouteError } from 'react-router-dom';
import Header from '../components/Header';
import { Box, Container, Typography } from '@mui/material';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <Header />
      <Container>
        <Box
          mt={'6rem'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Typography variant="body1">
            Sorry, an unexpected error has occurred.
          </Typography>
          <Typography variant="h3" color={'error'}>
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
            {error.statusText || error.message}
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
          </Typography>
        </Box>
      </Container>
    </>
  );
}
