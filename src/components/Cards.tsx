import '../assets/App.css'
import { PrecoPorLitro } from '../interfaces/PrecoPorLitro';
import { Venda } from '../interfaces/Venda';

type CardProps = {
  vendas: Venda[];
};

function Cards(props: CardProps) {
  const calcularTotaisPorCombustivel = () => {
    const totais: PrecoPorLitro = { gasolina: 0, diesel: 0, etanol: 0 };
    props.vendas.forEach((venda) => {
      totais[venda.tipoCombustivel] += venda.total;
    });
    return totais;
  };

  const totais = calcularTotaisPorCombustivel();

  return (
    <div>
      <div className="flex justify-around my-6">
        <div className="border p-4 rounded-md text-center bg-gray-100">
          <h3 className="text-lg font-bold">Gasolina</h3>
          <p>Total: R$ {totais.gasolina.toFixed(2)}</p>
        </div>
        <div className="border p-4 rounded-md text-center bg-gray-100">
          <h3 className="text-lg font-bold">Diesel</h3>
          <p>Total: R$ {totais.diesel.toFixed(2)}</p>
        </div>
        <div className="border p-4 rounded-md text-center bg-gray-100">
          <h3 className="text-lg font-bold">Etanol</h3>
          <p>Total: R$ {totais.etanol.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default Cards
