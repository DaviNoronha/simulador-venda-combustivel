import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <Box>
            <Typography
              variant="h5"
              noWrap
              component={Link} to="/"
              sx={{
                mr: 2,
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              ATEM
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link} to="/venda"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Vendas
            </Button>
            <Button
              component={Link} to="/relatorio"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Relatorio
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default Navbar;
