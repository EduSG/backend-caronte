"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const AuthRouter = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
AuthRouter.post("/login", authController.login);
exports.default = AuthRouter;
