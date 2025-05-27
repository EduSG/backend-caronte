export type IDBCarona = {
  status: boolean;
  local_destino_passageiro: string;
  local_partida_passageiro: string;
  valor_oferta: number;
  dias: diasSemana[];
  horario_carona: string;
  id_passageiro: number;
  data_criacao: string;
  ultima_atualizacao: string;
  id_motorista: number;
  local_destino_motorista: string;
  local_partida_motorista: string;
  coords_destino: string; 
  coords_partida: string;
};

type diasSemana = {
  1: boolean;
  2: boolean;
  3: boolean;
  4: boolean;
  5: boolean;
  6: boolean;
  7: boolean;
};
