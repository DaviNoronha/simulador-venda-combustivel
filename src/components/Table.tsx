import '../assets/App.css'
import { Venda } from '../interfaces/Venda';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

type TableProps = {
  vendas: Venda[];
};

function AppTable(props: TableProps) {
  return (
    <div>
      <TableContainer component={Paper} style={{
        marginTop: '40px', maxHeight: '600px',
        overflow: 'auto'
      }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Tipo de Combustível</TableCell>
              <TableCell>Quantidade (litros)</TableCell>
              <TableCell>Valor Total (R$)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.vendas.map((venda, index) => (
              <TableRow key={index}>
                <TableCell>{venda.tipoCombustivel}</TableCell>
                <TableCell>{venda.litros}</TableCell>
                <TableCell>{venda.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AppTable
