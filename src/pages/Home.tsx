import '../assets/App.css';
import { Box, Typography } from '@mui/material';

function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="90vh"
    >
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Bem vindo ao sistema de vendas
      </Typography>
      <img
        srcSet="src/assets/Atem.png"
        src="src/assets/Atem.png"
        alt="Atem"
        loading="lazy"
        style={{
          maxWidth: '700px',
        }}
      />
    </Box>
  );
}

export default Home;
