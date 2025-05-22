"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const score_controller_1 = require("../controller/score.controller");
const scoreController = new score_controller_1.ScoreController();
const ScoreRouter = (0, express_1.Router)();
ScoreRouter.post("/score", scoreController.create);
ScoreRouter.get("/score", scoreController.list);
exports.default = ScoreRouter;
