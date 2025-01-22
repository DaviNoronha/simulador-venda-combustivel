import { useState } from 'react'
import '../assets/App.css'
import { PrecoPorLitro } from '../interfaces/PrecoPorLitro';
import { Venda } from '../interfaces/Venda';

type FormProps = {
  tipoCombustivel: string;
  setTipoCombustivel: React.Dispatch<React.SetStateAction<string>>;
  litros: string;
  setLitros: React.Dispatch<React.SetStateAction<string>>;
  precoPorLitro: PrecoPorLitro;
  vendas: Venda[];
  setVendas: React.Dispatch<React.SetStateAction<Venda[]>>;
};

function Form(props: FormProps) {
  const salvarVenda = () => {
    if (!props.tipoCombustivel || !props.litros || isNaN(Number(props.litros))) {
      alert('Por favor, insira todos os campos corretamente.');
      return;
    }

    const total = (Number(props.litros) * props.precoPorLitro[props.tipoCombustivel]).toFixed(2);
    const novaVenda: Venda = { tipoCombustivel: props.tipoCombustivel, litros: parseFloat(props.litros), total: parseFloat(total) };

    const vendasAtualizadas = [...props.vendas, novaVenda];
    props.setVendas(vendasAtualizadas);
    localStorage.setItem('vendas', JSON.stringify(vendasAtualizadas));

    alert(`Venda registrada! Valor total: R$ ${total}`);
    props.setTipoCombustivel('');
    props.setLitros('');
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Tipo de combustível:
          <select
            className="w-full p-2 border rounded-md"
            value={props.tipoCombustivel}
            onChange={(e) => props.setTipoCombustivel(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="gasolina">Gasolina</option>
            <option value="diesel">Diesel</option>
            <option value="etanol">Etanol</option>
          </select>
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Quantidade em litros:
          <input
            className="w-full p-2 border rounded-md"
            type="number"
            value={props.litros}
            onChange={(e) => props.setLitros(e.target.value)}
            min="0"
            step="0.01"
          />
        </label>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={salvarVenda}
      >
        Salvar Venda
      </button>
    </div>
  )
}

export default Form
