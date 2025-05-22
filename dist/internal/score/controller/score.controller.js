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
exports.ScoreController = void 0;
const score_service_1 = require("../service/score.service");
const errors_1 = require("../../../errors/errors");
const scoreService = new score_service_1.ScoreService();
class ScoreController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (!req.user)
                    throw new errors_1.UnauthorizedError("É necessário estar autenticado");
                const id_user = req.user.id;
                const novo = yield scoreService.create(data, id_user);
                res.status(201).json(novo);
            }
            catch (error) {
                next(error);
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagina = parseInt(req.query.pagina) || 1;
            const registrosPagina = parseInt(req.query.registrosPagina) || 10;
            const resultado = yield scoreService.list(pagina, registrosPagina);
            res.json(resultado);
        });
    }
}
exports.ScoreController = ScoreController;
