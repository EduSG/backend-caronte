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
exports.CaronaController = void 0;
const carona_service_1 = require("../service/carona.service");
const caronaService = new carona_service_1.CaronaService();
class CaronaController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const novo = yield caronaService.create(data);
            res.status(201).json(novo);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagina = parseInt(req.query.pagina) || 1;
            const registrosPagina = parseInt(req.query.registrosPagina) || 10;
            const resultado = yield caronaService.list(pagina, registrosPagina);
            res.json(resultado);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const usuario = yield caronaService.getById(id);
            if (!usuario)
                res.status(404).json({ erro: 'Usuário não encontrado' });
            res.json(usuario);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const data = req.body;
            const atualizado = yield caronaService.update(id, data);
            if (!atualizado)
                res.status(404).json({ erro: 'Usuário não encontrado' });
            res.json(atualizado);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const deletado = yield caronaService.delete(id);
            if (!deletado)
                res.status(404).json({ erro: 'Usuário não encontrado' });
            res.json(deletado);
        });
    }
}
exports.CaronaController = CaronaController;
