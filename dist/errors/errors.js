"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateError = exports.ForbiddenError = exports.NotFoundError = exports.UnauthorizedError = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.name = "ValidationError";
        this.status = status;
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends Error {
    constructor(message, status = 401) {
        super(message);
        this.name = "UnauthorizedError";
        this.status = status;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class NotFoundError extends Error {
    constructor(message, status = 404) {
        super(message);
        this.name = "NotFoundError";
        this.status = status;
    }
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends Error {
    constructor(message, status = 403) {
        super(message);
        this.name = "ForbiddenError";
        this.status = status;
    }
}
exports.ForbiddenError = ForbiddenError;
class DuplicateError extends Error {
    constructor(message, status = 409) {
        super(message);
        this.name = "DuplicateError";
        this.status = status;
    }
}
exports.DuplicateError = DuplicateError;
