import { Router } from "express";
import { ScoreController } from "../controller/score.controller";

const scoreController = new ScoreController()

const ScoreRouter = Router()

ScoreRouter.post("/score", scoreController.create)
ScoreRouter.get("/score", scoreController.list)

export default ScoreRouter







