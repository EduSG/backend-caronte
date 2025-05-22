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
const user_service_1 = require("../../users/service/user.service");
const errors_1 = require("../../../errors/errors");
const crypt_1 = require("../../../utils/crypt/crypt");
const jwt_1 = require("../../../utils/jwt/jwt");
class AuthService extends user_service_1.UserService {
    constructor() {
        super();
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSearch = yield this.getByCPF(payload.cpf);
            if (!userSearch)
                throw new errors_1.NotFoundError("O CPF não possui cadastro!");
            const isCorrectPassword = yield (0, crypt_1.comparePassword)(payload.password, userSearch.senha);
            if (!isCorrectPassword)
                throw new errors_1.UnauthorizedError("O CPF ou a senha se encontram divergentes!");
            const token = (0, jwt_1.generateToken)({
                nome: userSearch.nome,
                cpf: userSearch.cpf,
            });
            const sessionData = {
                nome: userSearch.nome,
                cpf: userSearch.cpf,
                cep: userSearch.cep,
                score: userSearch.score,
                tipo_usuario: userSearch.tipo_usuario,
                telefone: userSearch.telefone,
            };
            return { token, sessionData };
        });
    }
}
exports.default = AuthService;
