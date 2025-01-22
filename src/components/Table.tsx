import { useState } from 'react'
import '../assets/App.css'
import { Venda } from '../interfaces/Venda';

type TableProps = {
  vendas: Venda[];
};

function Table(props: TableProps) {
  return (
    <div>
        <h2 className="text-xl font-semibold mb-4">Relatórios de Vendas</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Tipo de Combustível</th>
              <th className="border border-gray-300 p-2">Quantidade (litros)</th>
              <th className="border border-gray-300 p-2">Valor Total (R$)</th>
            </tr>
          </thead>
          <tbody>
            {props.vendas.map((venda, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2">{venda.tipoCombustivel}</td>
                <td className="border border-gray-300 p-2">{venda.litros}</td>
                <td className="border border-gray-300 p-2">{venda.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Table
