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
exports.UserService = void 0;
const user_repository_1 = require("../repository/user.repository");
const user_validator_1 = require("../validator/user.validator");
const crypt_1 = require("../../../utils/crypt/crypt");
const errors_1 = require("../../../errors/errors");
const userRepository = new user_repository_1.UserRepository();
class UserService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValid = user_validator_1.IDBUserSchema.parse(data);
            if (!isValid)
                throw new errors_1.ValidationError("Os dados não estão corretos");
            const encryptedPassword = yield (0, crypt_1.encryptPassword)(data.senha);
            const infosToSend = Object.assign(Object.assign({}, data), { senha: encryptedPassword });
            return userRepository.create(infosToSend);
        });
    }
    list(pagina, registrosPagina) {
        return userRepository.list(pagina, registrosPagina);
    }
    getById(id) {
        return userRepository.getById(id);
    }
    getByCPF(cpf) {
        return userRepository.getByCPF(cpf);
    }
    update(id, data) {
        return userRepository.update(id, data);
    }
    delete(id) {
        return userRepository.delete(id);
    }
}
exports.UserService = UserService;
