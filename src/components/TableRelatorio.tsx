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

function TableRelatorio(props: TableProps) {
  return (
    <>
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
              <TableCell>Data de Criação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.vendas.map((venda, index) => (
              <TableRow key={index}>
                <TableCell>{venda.combustivel.nome}</TableCell>
                <TableCell>{venda.litros.toFixed(2)}</TableCell>
                <TableCell>{venda.valor.toFixed(2)}</TableCell>
                <TableCell>{new Date(venda.data).toLocaleDateString('pt-BR')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableRelatorio
