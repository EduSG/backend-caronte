"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mensagem_controller_1 = require("../controller/mensagem.controller");
const messageController = new mensagem_controller_1.MessageController();
const MessageRouter = (0, express_1.Router)();
MessageRouter.post('message', messageController.create);
MessageRouter.get('message', messageController.list);
exports.default = MessageRouter;
