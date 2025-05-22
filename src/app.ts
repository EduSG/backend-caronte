import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {
  UsuarioRouter,
  CreateUserRouter,
} from "./internal/users/routes/user.router";
import CaronaRouter from "./internal/caronas/routes/carona.router";
import AuthRouter from "./internal/auth/routes/auth.router";
import MessageRouter from "./internal/mensagens/routes/mensagem.router";
import { authenticateToken } from "./middlewares/auth/auth.middleware";
import { errorMiddleware } from "./middlewares/error/error";
import { NotificationRouter } from "./internal/notifications/routes/notification.router";
import ScoreRouter from "./internal/score/routes/score.router";
import TravelRouter from "./internal/travels/routes/travels.router";

dotenv.config();

console.log(process.env.PGUSER);
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", CreateUserRouter);
app.use("/api", AuthRouter);
app.use("/api", MessageRouter);
app.use("/api", authenticateToken, UsuarioRouter);
app.use("/api", NotificationRouter)
app.use("/api", CaronaRouter);
app.use("/api", ScoreRouter);
app.use("/api", TravelRouter);
app.use(errorMiddleware);

app.listen(process.env.EXPORT, () => {
  console.log("Servidor rodando na porta 3000");
});
