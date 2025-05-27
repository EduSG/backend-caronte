import { Router } from 'express'
import { postMessage, getMessages, postConversation } from '../controller/chat.controller'

const ChatRouter = Router()

ChatRouter.post('/ride/:id/conversation', postConversation)
ChatRouter.post('/chat/:id/messages', postMessage)
ChatRouter.get('/chat/:id/messages', getMessages)


export default ChatRouter


