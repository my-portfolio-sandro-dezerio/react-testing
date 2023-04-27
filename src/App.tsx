import { Box, Typography } from '@mui/material';
import { LoginForm } from './pages';
import './App.css';

export default function App() {
  return (
    <Box
      className='App'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Typography variant='h2' mb='20px' textAlign='center'>
        React - Testing
      </Typography>
      <LoginForm />
    </Box>
  )
}