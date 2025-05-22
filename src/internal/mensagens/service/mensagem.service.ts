import { IDBMessage } from "../type"
import { MessageRepository } from "../repository/mensagem.repository"

const messageRepository = new MessageRepository()

export class MessageService {
  create(data: IDBMessage) {
    return messageRepository.create(data)
  }

  list(pagina: number, registrosPagina: number, id_carona: number) {
    return messageRepository.listMessagesByCarona(pagina, registrosPagina, id_carona)
  }
}


