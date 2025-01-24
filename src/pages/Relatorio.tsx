import { useState, useEffect } from 'react';
import '../assets/App.css'
import CardsRelatorio from '../components/CardsRelatorio';
import TableRelatorio from '../components/TableRelatorio';
import { Venda } from '../interfaces/Venda';

function Relatorio() {
  const [vendas, setVendas] = useState<Venda[]>([]);

  useEffect(() => {
    const vendas = JSON.parse(localStorage.getItem('vendas') || '[]') as Venda[];
    setVendas(vendas);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Relatório de Vendas</h1>
      <CardsRelatorio vendas={vendas} />
      <TableRelatorio vendas={vendas} />
    </>
  );
}

export default Relatorio;
