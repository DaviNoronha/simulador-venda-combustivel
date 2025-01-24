import { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
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
  CardActionArea,
  Icon,
  Box,
} from '@mui/material';
import { combustiveis } from '../utils/combustiveis';
import { Venda } from '../interfaces/Venda';
import { Combustivel } from '../interfaces/Combustivel';
import { Save, DoDisturb, LocalGasStation } from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

function Form() {
  const [combustivel, setCombustivel] = useState<Combustivel | null>(null);
  const [litros, setLitros] = useState<number>();
  const [valor, setValor] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

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
    setLitros(1);
    setValor(combustivel.preco);
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
      const vendas: Venda[] = JSON.parse(localStorage.getItem('vendas') || '[]') as Venda[];
      const novaVenda: Venda = { combustivel: combustivel, litros: Number(litros), valor: Number(valor), data: new Date().toISOString() };
      const vendasAtualizadas: Venda[] = [...vendas, novaVenda];

      localStorage.setItem('vendas', JSON.stringify(vendasAtualizadas));

      setSuccess(true);
      fecharModal();
    }
  };

  const changeLitros = (litros: number) => {
    setError(false);

    if (isNaN(litros)) {
      setLitros(0);
      setValor(0);
    } else {
      const preco: number = combustivel?.preco || 0;
      setLitros(litros);
      setValor(litros * preco);
    }
  };

  const changeValor = (valor: number) => {
    setError(false);

    if (isNaN(valor)) {
      setLitros(0);
      setValor(0);
    } else {
      const preco = combustivel?.preco || 0;
      setValor(valor);
      setLitros(valor / preco);
    }
  };

  const formatInput = (input: string) => {
    const inputFormatado = input.replace('R$', '').trim()
        .replace(/\./g, '')
        .replace(',', '.');

    return parseFloat(inputFormatado);
  }

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
          <NumericFormat
            value={litros}
            onChange={e => {
              changeLitros(formatInput(e.target.value));
            }}
            customInput={TextField}
            valueIsNumericString
            thousandSeparator="."
            decimalSeparator=","
            suffix=" L"
            allowLeadingZeros={true}
            decimalScale={2}
            inputMode="numeric"
            label="Quantidade em litros"
            variant="outlined"
            fullWidth
            allowNegative={false}
            error={error}
            helperText={error ? "Preencha os campos corretamente" : ""}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          />
          <NumericFormat
            value={valor}
            onChange={e => {
              changeValor(formatInput(e.target.value));
            }}
            customInput={TextField}
            valueIsNumericString
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            allowLeadingZeros={true}
            decimalScale={2}
            fixedDecimalScale={true}
            inputMode="numeric"
            label="Valor"
            variant="outlined"
            fullWidth
            allowNegative={false}
            error={error}
            helperText={error ? "Preencha os campos corretamente" : ""}
          />
        </DialogContent>

        <DialogActions>
          <Button endIcon={<Save />} color="primary" variant="outlined" type="submit" disabled={litros == 0 || valor == 0}>
            Salvar
          </Button>
          <Button endIcon={<DoDisturb />} color="error" variant="outlined" onClick={fecharModal}>
            Cancelar
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
