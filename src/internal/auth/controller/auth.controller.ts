import { RequestHandler } from "express";
import AuthService from "../service/auth.service";

export class AuthController {
  private authService = new AuthService();

  public login: RequestHandler = async (req, res, next) => {
    try {
      const loginData = await this.authService.login(req.body);
      res.status(200).json(loginData);
    } catch (error) {
      next(error);
    }
  };
}
