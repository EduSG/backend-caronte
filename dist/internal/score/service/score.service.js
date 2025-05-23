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
exports.ScoreService = void 0;
const score_repository_1 = require("../repository/score.repository");
const scoreRepository = new score_repository_1.ScoreRepository();
class ScoreService {
    create(data, id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            return scoreRepository.create(Object.assign(Object.assign({}, data), { id_avaliador: id_user }));
        });
    }
    list(pagina, registrosPagina) {
        return __awaiter(this, void 0, void 0, function* () {
            return scoreRepository.list(pagina, registrosPagina);
        });
    }
}
exports.ScoreService = ScoreService;
