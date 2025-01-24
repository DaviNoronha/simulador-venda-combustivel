import { Combustivel } from "./Combustivel";

export interface Venda {
  combustivel: Combustivel;
  litros: number;
  valor: number;
  data: string;
}
