import { NextFunction, Request, Response } from "express";
import { ScoreService } from "../service/score.service";
import { UnauthorizedError } from "../../../errors/errors";

const scoreService = new ScoreService();

export class ScoreController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      if(!req.user) throw new UnauthorizedError("É necessário estar autenticado")
      const id_user: number = req.user.id
      const novo = await scoreService.create(data, id_user);
      res.status(201).json(novo);
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response) {
    const pagina = parseInt(req.query.pagina as string) || 1;
    const registrosPagina = parseInt(req.query.registrosPagina as string) || 10;
    const resultado = await scoreService.list(pagina, registrosPagina);
    res.json(resultado);
  }
}
