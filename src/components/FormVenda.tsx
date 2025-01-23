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
} from '@mui/material';
import { combustiveis } from '../utils/combustiveis';
import { Venda } from '../interfaces/Venda';
import { Combustivel } from '../interfaces/Combustivel';
import { Save, DoDisturb, LocalGasStation, PropaneTank, EvStation } from '@mui/icons-material';

function Form() {
  const [tipoCombustivel, setTipoCombustivel] = useState<string | null>(null);
  const [litros, setLitros] = useState<number>();
  const [total, setTotal] = useState<number>(0);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const vendasSalvas = JSON.parse(localStorage.getItem('vendas') || '[]') as Venda[];
    setVendas(vendasSalvas);
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  const abrirModal = (combustivelId: string) => {
    setTipoCombustivel(combustivelId);
    setLitros(0);
    setTotal(0);
    setModal(true);
  };

  const fecharModal = () => {
    setModal(false);
    setTipoCombustivel(null);
  };

  const salvarVenda = () => {
    if (!litros || isNaN(litros) || litros < 0) {
      setError(true);
      return;
    }

    const novaVenda: Venda = { tipoCombustivel, litros: litros, total: total };
    const vendasAtualizadas = [...vendas, novaVenda];

    setVendas(vendasAtualizadas);
    localStorage.setItem('vendas', JSON.stringify(vendasAtualizadas));

    setSuccess(true);
    fecharModal();
  };

  const changeLitros = (l: string) => {
    setError(false);
    const valor = Number(l);
    if (!isNaN(valor)) {
      setLitros(valor);
      const preco = combustiveis.find((c) => c.id === tipoCombustivel)?.preco || 0;
      setTotal(Number((valor * preco).toFixed(2)));
    }
  };

  const icones = {
    gasolina: <LocalGasStation fontSize="large" style={{ color: '#FF9800' }} />,
    diesel: <PropaneTank fontSize="large" style={{ color: '#9C27B0' }} />,
    etanol: <EvStation fontSize="large" style={{ color: '#4CAF50' }} />,
  };

  return (
    <div>
      <Grid2 container spacing={3}>
        {combustiveis.map((combustivel: Combustivel) => (
          <Grid2 size={{ xs: 12, md: 4 }} key={combustivel.id}>
            <Card>
              <CardContent>
                <IconButton
                  onClick={() => abrirModal(combustivel.id)}
                  style={{ display: 'block', margin: '0 auto' }}
                >
                  {icones[combustivel.id]}
                </IconButton>
                <Typography variant="h6" align="center">
                  {combustivel.nome}
                </Typography>
              </CardContent>
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
          Venda de {tipoCombustivel && combustiveis.find((c) => c.id === tipoCombustivel)?.nome}
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
            id="total"
            name="total"
            type="number"
            value={total.toFixed(2)}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
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

      <Stack spacing={2} sx={{ maxWidth: 600 }}>
        <Snackbar open={success} autoHideDuration={5000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Venda registrada! Valor total: R$ ${total}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default Form;
