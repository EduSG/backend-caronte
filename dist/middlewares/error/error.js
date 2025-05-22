"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errors_1 = require("../../errors/errors");
const zod_1 = require("zod");
const errorMiddleware = (error, req, res, next) => {
    console.error(error);
    if (error instanceof zod_1.ZodError) {
        const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
        error = new errors_1.ValidationError(messages.join('; '));
    }
    if (error instanceof errors_1.ValidationError) {
        res.status(422).json({ message: error.message });
        return;
    }
    if (error instanceof errors_1.DuplicateError) {
        res.status(409).json({ message: error.message });
        return;
    }
    if (error instanceof errors_1.UnauthorizedError) {
        res.status(401).json({ message: error.message });
        return;
    }
    if (error instanceof errors_1.NotFoundError) {
        res.status(404).json({ message: error.message });
        return;
    }
    if (error instanceof errors_1.ForbiddenError) {
        res.status(403).json({ message: error.message });
        return;
    }
    res.status(500).json({ message: 'Erro interno no servidor' });
};
exports.errorMiddleware = errorMiddleware;
