import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <img
              srcSet="src\assets\Atem.png"
              src="src\assets\Atem.png"
              alt="Atem"
              loading="lazy"
              style={{
                maxWidth: '100px',
              }}
            />

          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link} to="/"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>

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
