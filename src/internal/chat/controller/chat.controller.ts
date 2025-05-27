import { Request, Response } from 'express';
import * as chatService from '../service/chat.service';

// POST /conversations/:id/messages
export async function postMessage(req: Request, res: Response) {
  const conversationId = parseInt(req.params.id, 10);
  const senderId = req.user!.id;
  const { content } = req.body;

  const message = await chatService.createMessage(conversationId, senderId, content);
  res.status(201).json(message);
}

// GET /conversations/:id/messages?page=1&perPage=20
export async function getMessages(req: Request, res: Response) {
  const conversationId = parseInt(req.params.id, 10);
  const page = parseInt(req.query.page as string, 10) || 1;
  const perPage = parseInt(req.query.perPage as string, 10) || 20;

  const { messages, total } = await chatService.listMessages(conversationId, page, perPage);
  res.json({ messages, total, page, perPage });
}
