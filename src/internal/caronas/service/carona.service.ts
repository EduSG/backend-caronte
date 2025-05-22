import { IDBCarona } from "../type"
import { CaronaRepository } from "../repository/carona.repository"

const caronaRepository = new CaronaRepository()

export class CaronaService {
  create(data: IDBCarona) {
    return caronaRepository.create(data)
  }

  list(pagina: number, registrosPagina: number) {
    return caronaRepository.list(pagina, registrosPagina)
  }

  getById(id: number) {
    return caronaRepository.getById(id)
  }

  update(id: number, data: IDBCarona) {
    return caronaRepository.update(id, data)
  }

  delete(id: number) {
    return caronaRepository.delete(id)
  }
}


