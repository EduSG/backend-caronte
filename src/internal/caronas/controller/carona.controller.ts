import { Request, Response } from 'express'
import { CaronaService } from '../service/carona.service'

const caronaService = new CaronaService()

export class CaronaController {
  async create(req: Request, res: Response) {
    const data = req.body
    const novo = await caronaService.create(data)
    res.status(201).json(novo)
  }

  async list_passageiro(req: Request, res: Response) {
    const id = Number(req.user?.id) || 1
    console.log(id, req.user)
    const pagina = parseInt(req.query.pagina as string) || 1
    const registrosPagina = parseInt(req.query.registrosPagina as string) || 10
    const resultado = await caronaService.list_passageiro(id, pagina, registrosPagina)
    res.json(resultado)
  }

  async list_motorista(req: Request, res: Response) {
    const id = Number(req.user?.id) || 1 
    console.log(id, req.user)
    const pagina = parseInt(req.query.pagina as string) || 1
    const registrosPagina = parseInt(req.query.registrosPagina as string) || 10
    const resultado = await caronaService.list_motorista(id, pagina, registrosPagina)
    res.json(resultado)
  }

  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const usuario = await caronaService.getById(id)
    if (!usuario) res.status(404).json({ erro: 'Usuário não encontrado' })
    res.json(usuario)
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const data = req.body
    const atualizado = await caronaService.update(id, data)
    if (!atualizado) res.status(404).json({ erro: 'Usuário não encontrado' })
    res.json(atualizado)
  }
  
  async setMotorista(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const data = req.body
    const atualizado = await caronaService.update(id, data)
    if (!atualizado) res.status(404).json({ erro: 'Carona não encontrada' })
    res.json(atualizado)
  }

  async removeMotorista(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const atualizado = await caronaService.update(id, { id_motorista: null })
    if (!atualizado) res.status(404).json({ erro: 'Carona não encontrada' })
    res.json(atualizado)
  }

  async search(req: Request, res: Response) {
    const data = req.body
    const atualizado = await caronaService.searchcarona(data)
    if (!atualizado) res.status(404).json({ erro: 'Carona não encontrado' })
    res.json(atualizado)
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const deletado = await caronaService.delete(id)
    if (!deletado) res.status(404).json({ erro: 'Usuário não encontrado' })
    res.json(deletado)
  }
}

