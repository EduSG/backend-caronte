import { Request, Response } from "express";
import { TravelService } from "../service/travels.service";


const travelService = new TravelService();

export class TravelController {
  async create(req: Request, res: Response) {
    const data = req.body;
    const novo = await travelService.create(data);
    res.status(201).json(novo);
  }

  async list(req: Request, res: Response) {
    const pagina = parseInt(req.query.pagina as string) || 1;
    const registrosPagina = parseInt(req.query.registrosPagina as string) || 10;
    const resultado = await travelService.list(pagina, registrosPagina);
    res.json(resultado);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = req.body;
    const atualizado = await travelService.update(id, data);
    if (!atualizado) res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(atualizado);
  }
  
  async finalizeTravel(req: Request, res: Response){
    const id = parseInt(req.params.id);
    const atualizado = await travelService.finalizeTravel(id);
    if (!atualizado) res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(atualizado);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const deletado = await travelService.delete(id);
    if (!deletado) res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(deletado);
  }
}
