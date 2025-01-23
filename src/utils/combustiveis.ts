import { Combustivel } from "../interfaces/Combustivel";
import { LocalGasStation, PropaneTank, EvStation } from '@mui/icons-material';

export const combustiveis: Combustivel[] = [
  {
    id: 'gasolina',
    nome: 'Gasolina',
    preco: 5.5,
  },
  {
    id: 'diesel',
    nome: 'Diesel',
    preco: 4.2,
  },
  {
    id: 'etanol',
    nome: 'Etanol',
    preco: 3.9,
  },
];
