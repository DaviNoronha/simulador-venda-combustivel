import { LocalGasStation } from '@mui/icons-material';
import '../assets/App.css';
import { PrecoPorLitro } from '../interfaces/PrecoPorLitro';
import { Venda } from '../interfaces/Venda';
import { Typography, Card, CardContent, Box, Grid2, Icon } from '@mui/material';
import { combustiveis } from '../utils/combustiveis';
import { Combustivel } from '../interfaces/Combustivel';
import { formatarValor } from '../utils/formatarValor';

type CardProps = {
  vendas: Venda[];
};

function CardsRelatorio(props: CardProps) {
  const calcularTotaisPorCombustivel = () => {
    const totais: PrecoPorLitro = { gasolina_comum: { valor: 0, litros: 0 }, gasolina_aditivada: { valor: 0, litros: 0 }, diesel: { valor: 0, litros: 0 }, etanol: { valor: 0, litros: 0 } };
    props.vendas.forEach((venda) => {
      totais[venda.combustivel.id].valor += venda.valor;
      totais[venda.combustivel.id].litros += venda.litros;
    });

    return totais;
  };

  const totais = calcularTotaisPorCombustivel();

  return (
    <>
      <Grid2 container spacing={3}>
        {combustiveis.map((combustivel: Combustivel) => (
          <Grid2 size={{ xs: 12, md: 3 }} key={combustivel.id}>
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
                  Lucro Total: R$ {formatarValor(totais[combustivel.id].valor)}
                </Typography>
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                  Litragem Total: {formatarValor(totais[combustivel.id].litros)} L
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}

export default CardsRelatorio;
