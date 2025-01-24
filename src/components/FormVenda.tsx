import { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
  Grid2,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  SnackbarCloseReason,
  Stack,
  CardActionArea,
  Icon,
  Box,
} from '@mui/material';
import { combustiveis } from '../utils/combustiveis';
import { Venda } from '../interfaces/Venda';
import { Combustivel } from '../interfaces/Combustivel';
import { Save, DoDisturb, LocalGasStation, PropaneTank, EvStation } from '@mui/icons-material';

function Form() {
  const [combustivel, setCombustivel] = useState<Combustivel | null>(null);
  const [litros, setLitros] = useState<number>();
  const [valor, setValor] = useState<number>(0);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    const vendasSalvas = JSON.parse(localStorage.getItem('vendas') || '[]') as Venda[];
    setVendas(vendasSalvas);
  }, []);

  const fecharSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  const abrirModal = (combustivel: Combustivel, index: number) => {
    setSelectedCard(index);
    setCombustivel(combustivel);
    setLitros(0);
    setValor(0);
    setModal(true);
  };

  const fecharModal = () => {
    setSelectedCard(null);
    setModal(false);
    setCombustivel(null);
  };

  const salvarVenda = () => {
    if (!litros || isNaN(litros) || litros < 0) {
      setError(true);
      return;
    }

    if (combustivel !== null) {
      const novaVenda: Venda = { combustivel: combustivel, litros: litros, valor: valor, data: new Date().toISOString() };
      const vendasAtualizadas = [...vendas, novaVenda];

      setVendas(vendasAtualizadas);
      localStorage.setItem('vendas', JSON.stringify(vendasAtualizadas));

      setSuccess(true);
      fecharModal();
    }
  };

  const changeLitros = (l: number) => {
    setError(false);
    if (!isNaN(l)) {
      setLitros(l);
      const preco = combustivel?.preco || 0;
      setValor(l * preco);
    }
  };

  const changeValor = (v: number) => {
    setError(false);
    if (!isNaN(v)) {
      setValor(v);
      const preco = combustivel?.preco || 0;
      setLitros(v / preco);
    }
  };

  return (
    <>
      <Grid2 container spacing={3}>
        {combustiveis.map((combustivel: Combustivel, index) => (
          <Grid2 size={{ xs: 12, md: 4 }} key={combustivel.id}>
            <Card>
              <CardActionArea
                onClick={() => abrirModal(combustivel, index)}
                data-active={selectedCard === index ? '' : undefined}
                sx={{
                  height: '100%',
                  '&[data-active]': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                      backgroundColor: 'action.selectedHover',
                    },
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Icon fontSize='large'>
                      <LocalGasStation fontSize="large" style={{ color: combustivel.cor }} />
                    </Icon>
                    <Typography variant="h6">
                      {combustivel.nome}
                    </Typography>
                  </Box>
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    Preço por litro: R$ {combustivel.preco.toFixed(2)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Dialog
        open={modal}
        onClose={fecharModal}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              salvarVenda();
            },
          }
        }}
      >
        <DialogTitle>
          Venda de {combustivel?.nome}
        </DialogTitle>

        <DialogContent>
          <TextField
            label="Quantidade em litros"
            id="litros"
            name="litros"
            type="number"
            value={litros}
            onChange={(e) => changeLitros(e.target.value)}
            error={error}
            helperText={error ? "Preencha os campos corretamente" : ""}
            fullWidth
            required
            style={{ marginTop: '20px', marginBottom: '20px' }}
          />
          <TextField
            label="Valor a Pagar (R$)"
            id="valor"
            name="valor"
            type="number"
            onChange={(e) => changeValor(e.target.value)}
            value={valor}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
        </DialogContent>

        <DialogActions>
          <Button color="primary" variant="outlined" type="submit">
            <Save />
          </Button>
          <Button color="error" variant="outlined" onClick={fecharModal}>
            <DoDisturb />
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={success} autoHideDuration={5000} onClose={fecharSnackbar}>
        <Alert
          onClose={fecharSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Venda registrada! Valor valor: R$ ${valor}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Form;
