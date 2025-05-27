import { Router } from 'express'
import { postMessage, getMessages } from '../controller/chat.controller'

const ChatRouter = Router()

ChatRouter.post('/chat/:id/messages', postMessage)
ChatRouter.get('/chat/:id/messages', getMessages)


export default ChatRouter


