import { EvStation, LocalGasStation, PropaneTank } from '@mui/icons-material';
import '../assets/App.css';
import { PrecoPorLitro } from '../interfaces/PrecoPorLitro';
import { Venda } from '../interfaces/Venda';
import { Typography, Card, CardContent, Box, Grid2 } from '@mui/material';
type CardProps = {
  vendas: Venda[];
};

function Cards(props: CardProps) {
  const calcularTotaisPorCombustivel = () => {
    const totais: PrecoPorLitro = { gasolina: 0, diesel: 0, etanol: 0 };
    props.vendas.forEach((venda) => {
      totais[venda.tipoCombustivel] += venda.total;
    });
    return totais;
  };

  const totais = calcularTotaisPorCombustivel();

  const icones: Record<'gasolina' | 'diesel' | 'etanol', JSX.Element> = {
    gasolina: <LocalGasStation fontSize="large" style={{ color: '#FF9800' }} />,
    diesel: <PropaneTank fontSize="large" style={{ color: '#9C27B0' }} />,
    etanol: <EvStation fontSize="large" style={{ color: '#4CAF50' }} />,
  };

  return (
    <Grid2 container spacing={3} style={{ marginTop: '5px' }}>
      {Object.entries(totais).map(([combustivel, total]) => {
        return (
          <Grid2 size={{ xs: 12, md: 4 }} key={combustivel}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  {icones[combustivel]}
                  <Typography variant="h6" gutterBottom>
                    {combustivel.charAt(0).toUpperCase() + combustivel.slice(1)}
                  </Typography>
                </Box>
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                  Total: R$ {total.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        );
      })}
    </Grid2>
  );
}

export default Cards;
