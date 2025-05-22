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
exports.authenticateToken = authenticateToken;
const errors_1 = require("../../errors/errors");
const jwt_1 = require("../../utils/jwt/jwt");
const user_service_1 = require("../../internal/users/service/user.service");
function authenticateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userService = new user_service_1.UserService();
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new errors_1.UnauthorizedError("Token não fornecido");
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = yield (0, jwt_1.verifyToken)(token);
            const user = yield userService.getByCPF(decoded.cpf);
            req.user = { id: user.id };
            next();
        }
        catch (error) {
            throw new errors_1.ForbiddenError("Token inválido ou expirado");
        }
    });
}
