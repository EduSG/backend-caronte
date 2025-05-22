import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user.service";

const userService = new UserService();

export class UsuarioController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const novo = await userService.create(data);
      res.status(201).json(novo);
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response) {
    const pagina = parseInt(req.query.pagina as string) || 1;
    const registrosPagina = parseInt(req.query.registrosPagina as string) || 10;
    const resultado = await userService.list(pagina, registrosPagina);
    res.json(resultado);
  }

  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const usuario = await userService.getById(id);
    if (!usuario) res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = req.body;
    const atualizado = await userService.update(id, data);
    if (!atualizado) res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(atualizado);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const deletado = await userService.delete(id);
    if (!deletado) res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(deletado);
  }
}
