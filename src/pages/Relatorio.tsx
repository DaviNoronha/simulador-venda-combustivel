import React, { useState, useEffect } from 'react';
import '../assets/App.css'
import Cards from '../components/Cards';
import Table from '../components/Table';
import { Venda } from '../interfaces/Venda';
import { Typography } from '@mui/material';

function Relatorio() {
  const [vendas, setVendas] = useState<Venda[]>([]);

  useEffect(() => {
    const vendasSalvas = JSON.parse(localStorage.getItem('vendas') || '[]') as Venda[];
    setVendas(vendasSalvas);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Relatório de Vendas</h1>

      <Cards
        vendas={vendas} />

      <Table
        vendas={vendas} />
    </div>
  );
}

export default Relatorio;
