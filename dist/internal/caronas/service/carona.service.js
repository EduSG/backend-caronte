"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaronaService = void 0;
const carona_repository_1 = require("../repository/carona.repository");
const caronaRepository = new carona_repository_1.CaronaRepository();
class CaronaService {
    create(data) {
        return caronaRepository.create(data);
    }
    list(pagina, registrosPagina) {
        return caronaRepository.list(pagina, registrosPagina);
    }
    getById(id) {
        return caronaRepository.getById(id);
    }
    update(id, data) {
        return caronaRepository.update(id, data);
    }
    delete(id) {
        return caronaRepository.delete(id);
    }
}
exports.CaronaService = CaronaService;
