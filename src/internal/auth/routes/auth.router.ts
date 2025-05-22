import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const AuthRouter = Router();
const authController = new AuthController();

AuthRouter.post("/login", authController.login);

export default AuthRouter;



