import { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
  Grid2,
} from '@mui/material';
import { combustiveis } from '../utils/combustiveis';
import { Venda } from '../interfaces/Venda';
import { Combustivel } from '../interfaces/Combustivel';
import { Save, DoDisturb, LocalGasStation, PropaneTank, EvStation } from '@mui/icons-material';

function Form() {
  const [tipoCombustivel, setTipoCombustivel] = useState<string | null>(null);
  const [litros, setLitros] = useState<string>('');
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  const abrirModal = (combustivelId: string) => {
    setTipoCombustivel(combustivelId);
    setLitros('');
    setModal(true);
  };

  const fecharModal = () => {
    setModal(false);
    setTipoCombustivel(null);
  };

  const salvarVenda = () => {
    if (!tipoCombustivel || !litros || isNaN(Number(litros))) {
      alert('Por favor, insira todos os campos corretamente.');
      return;
    }

    const preco = combustiveis.find((c) => c.id === tipoCombustivel)?.preco || 0;
    const total = (Number(litros) * preco).toFixed(2);
    const novaVenda: Venda = { tipoCombustivel, litros: parseFloat(litros), total: parseFloat(total) };

    const vendasAtualizadas = [...vendas, novaVenda];
    setVendas(vendasAtualizadas);
    localStorage.setItem('vendas', JSON.stringify(vendasAtualizadas));

    alert(`Venda registrada! Valor total: R$ ${total}`);
    fecharModal();
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

      <Modal open={modal} onClose={fecharModal}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: 'rgba(255, 255, 255, 0.08',
            boxShadow: 24,
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Venda de {tipoCombustivel && combustiveis.find((c) => c.id === tipoCombustivel)?.nome}
          </Typography>
          <TextField
            label="Quantidade em litros"
            type="number"
            value={litros}
            onChange={(e) => setLitros(e.target.value)}
            fullWidth
            required
            inputProps={{ min: 0, step: 0.01 }}
            style={{ marginBottom: '20px' }}
          />
          <Grid2 container spacing={1} justifyContent="flex-end">
            <Button color="primary" variant="outlined" onClick={salvarVenda}>
              <Save />
            </Button>
            <Button color="error" variant="outlined" onClick={fecharModal}>
              <DoDisturb />
            </Button>
          </Grid2>
        </Box>
      </Modal>
    </div>
  );
}

export default Form;
