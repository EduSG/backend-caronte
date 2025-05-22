"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const mensagem_repository_1 = require("../repository/mensagem.repository");
const messageRepository = new mensagem_repository_1.MessageRepository();
class MessageService {
    create(data) {
        return messageRepository.create(data);
    }
    list(pagina, registrosPagina, id_carona) {
        return messageRepository.listMessagesByCarona(pagina, registrosPagina, id_carona);
    }
}
exports.MessageService = MessageService;
