import '../assets/App.css'
import { Venda } from '../interfaces/Venda';
import { Paper } from '@mui/material';
import { formatarValor } from '../utils/formatarValor';
import { formatarData } from '../utils/formatarData';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type TableProps = {
  vendas: Venda[];
};

function TableRelatorio(props: TableProps) {
  const colunas: GridColDef[] = [
    {
      field: 'combustivel',
      headerName: 'Tipo de Combustível',
      flex: 1,
      valueGetter: (value, row) => row.combustivel.nome,
    },
    {
      field: 'litros',
      headerName: 'Quantidade (litros)',
      flex: 1,
      valueFormatter: (value, row) => formatarValor(row.litros),
    },
    {
      field: 'valor',
      headerName: 'Valor Total (R$)',
      flex: 1,
      valueFormatter: (value, row) => formatarValor(row.valor),
    },
    {
      field: 'data',
      headerName: 'Data de Criação',
      flex: 1,
      valueFormatter: (value, row) => formatarData(row.data),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
      <Paper sx={{ height: 600, width: '100%', marginTop: '40px' }}>
        <DataGrid
          rows={props.vendas.map((venda, index) => ({ ...venda, id: index }))}
          columns={colunas}
          initialState={{
            pagination: { paginationModel },
          }}
          pageSizeOptions={[5, 10]}
          getRowId={(row) => row.id}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  )
}

export default TableRelatorio
