import { TravelRepository } from "../repository/travels.repository";
import { IDBTravel } from "../type";

const travelRepository = new TravelRepository();

export class TravelService {
  async create(data: IDBTravel) {
    const infosToSend = {
      ...data,
    };

    return travelRepository.create(infosToSend as IDBTravel);
  }

  list(pagina: number, registrosPagina: number) {
    return travelRepository.list(pagina, registrosPagina);
  }

  async update(id: number, data: Partial<IDBTravel>) {
    return travelRepository.update(id, data);
  }

  async finalizeTravel(id: number) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const updated = await this.update(id, { horario_desembarque_passageiro: today.toISOString() });
    return updated;
  }

  delete(id: number) {
    return travelRepository.delete(id);
  }
}
