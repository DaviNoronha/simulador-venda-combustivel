import React, { useState, useEffect } from 'react';
import '../assets/App.css'
import Cards from '../components/Cards';
import Table from '../components/Table';
import { Venda } from '../interfaces/Venda';
import { PrecoPorLitro } from '../interfaces/PrecoPorLitro';

function Index() {
  const [tipoCombustivel, setTipoCombustivel] = useState<string>('');
  const [litros, setLitros] = useState<string>('');
  const [precoPorLitro, setPrecoPorLitro] = useState<PrecoPorLitro>({ gasolina: 5.5, diesel: 4.2, etanol: 3.9 });
  const [vendas, setVendas] = useState<Venda[]>([]);

  useEffect(() => {
    const vendasSalvas = JSON.parse(localStorage.getItem('vendas') || '[]') as Venda[];
    setVendas(vendasSalvas);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tabela de Combustível</h1>

      <Cards
        vendas={vendas} />

      <Table
        vendas={vendas} />
    </div>
  );
}

export default Index;
