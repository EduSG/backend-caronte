import { Router } from "express";
import { MessageController } from "../controller/mensagem.controller";

const messageController = new MessageController()

const MessageRouter = Router()

MessageRouter.post('message', messageController.create)
MessageRouter.get('message', messageController.list)

export default MessageRouter
