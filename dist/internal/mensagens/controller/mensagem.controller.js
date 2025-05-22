"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const mensagem_service_1 = require("../service/mensagem.service");
const messageService = new mensagem_service_1.MessageService();
class MessageController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const novo = yield messageService.create(data);
            res.status(201).json(novo);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagina = parseInt(req.query.pagina) || 1;
            const registrosPagina = parseInt(req.query.registrosPagina) || 10;
            const resultado = yield messageService.list(pagina, registrosPagina, 2);
            res.json(resultado);
        });
    }
}
exports.MessageController = MessageController;
