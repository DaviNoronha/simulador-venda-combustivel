import { EvStation, LocalGasStation, PropaneTank } from '@mui/icons-material';
import '../assets/App.css';
import { PrecoPorLitro } from '../interfaces/PrecoPorLitro';
import { Venda } from '../interfaces/Venda';
import { Typography, Card, CardContent, Box, Grid2, Icon } from '@mui/material';
import { combustiveis } from '../utils/combustiveis';
import { Combustivel } from '../interfaces/Combustivel';

type CardProps = {
  vendas: Venda[];
};

function Cards(props: CardProps) {
  const calcularTotaisPorCombustivel = () => {
    const totais: PrecoPorLitro = { gasolina: 0, diesel: 0, etanol: 0 };
    props.vendas.forEach((venda) => {
      totais[venda.combustivel.id] += venda.valor;
    });

    return totais;
  };

  const totais = calcularTotaisPorCombustivel();

  return (
    <>
      <Grid2 container spacing={3}>
        {combustiveis.map((combustivel: Combustivel) => (
          <Grid2 size={{ xs: 12, md: 4 }} key={combustivel.id}>
            <Card>
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
                    Total: R$ {totais[combustivel.id].toFixed(2)}
                  </Typography>
                </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}

export default Cards;
