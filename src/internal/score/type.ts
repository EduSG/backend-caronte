export type IDBScore = {
  id: number
  id_avaliador: number 
  id_avaliado: number 
  id_viagem: number 
  valor: number 
  observacao: string
}

export type CreateScoreDTO = {
  id_avaliador: number 
  id_avaliado: number
  id_viagem: number 
  valor: number 
  observacao: string
}
