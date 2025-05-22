import { Request, Response } from 'express'
import { MessageService } from '../service/mensagem.service'

const messageService = new MessageService()

export class MessageController {
  async create(req: Request, res: Response) {
    const data = req.body
    const novo = await messageService.create(data)
    res.status(201).json(novo)
  }

  async list(req: Request, res: Response) {
    const pagina = parseInt(req.query.pagina as string) || 1
    const registrosPagina = parseInt(req.query.registrosPagina as string) || 10
    const resultado = await messageService.list(pagina, registrosPagina, 2)
    res.json(resultado)
  }

}

