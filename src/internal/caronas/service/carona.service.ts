import { IDBCarona, SearchParams } from "../type"
import { CaronaRepository } from "../repository/carona.repository"

const caronaRepository = new CaronaRepository()

export class CaronaService {
  create(data: IDBCarona) {
    return caronaRepository.create(data)
  }

  list_passageiro(id: number, pagina: number, registrosPagina: number) {
    return caronaRepository.list_passageiro(id, pagina, registrosPagina)
  }

  list_motorista(id: number, pagina: number, registrosPagina: number) {
    return caronaRepository.list_motorista(id, pagina, registrosPagina)
  }

  getById(id: number) {
    return caronaRepository.getById(id)
  }

  update(id: number, data: Partial<IDBCarona>) {
    return caronaRepository.update(id, data)
  }

  searchcarona(data: SearchParams){
    return caronaRepository.searchCaronas(data)
  }

  delete(id: number) {
    return caronaRepository.delete(id)
  }
}


