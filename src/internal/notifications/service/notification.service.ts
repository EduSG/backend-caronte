import { NotificationRepository } from "../repository/notification.repository";
import { IDBNotification } from "../type";

const notificationRepository = new NotificationRepository()

export class NotificationService {
 
  async create(data: IDBNotification){
   
    return notificationRepository.create(data)
  }

  list(pagina: number, registrosPagina: number) {
    return notificationRepository.list(pagina, registrosPagina);
  }

  update(id: number, data: IDBNotification) {
    return notificationRepository.update(id, data);
  }

  delete(id: number) {
    return notificationRepository.delete(id);
  }
}


