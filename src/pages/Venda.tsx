import '../assets/App.css'
import FormVenda from '../components/FormVenda';

function AppVenda() {
  return (
    <>
      <h1 className="text-2xl font-bold">Venda de Combustível</h1>
      <h3 className="text-2xl font-bold mb-6">Selecione um dos combustíveis disponíveis abaixo: </h3>
      <FormVenda/>
    </>
  );
}

export default AppVenda;
