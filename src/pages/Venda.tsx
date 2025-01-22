import React, { useState, useEffect } from 'react';
import '../assets/App.css'
import Form from '../components/Form';
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
      <h1 className="text-2xl font-bold mb-6">Venda de Combustível</h1>

      <Form
        tipoCombustivel={tipoCombustivel}
        setTipoCombustivel={setTipoCombustivel}
        litros={litros}
        setLitros={setLitros}
        precoPorLitro={precoPorLitro}
        vendas={vendas}
        setVendas={setVendas} />

    </div>
  );
}

export default Index;
