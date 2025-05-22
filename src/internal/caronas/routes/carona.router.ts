import { Router } from 'express'
import { CaronaController } from '../controller/carona.controller'

const caronaController = new CaronaController()

const CaronaRouter = Router()

CaronaRouter.post('/carona', caronaController.create)
CaronaRouter.get('/carona', caronaController.list)
CaronaRouter.get('/carona/:id', caronaController.getById)
CaronaRouter.put('/carona/:id', caronaController.update)
CaronaRouter.delete('/carona/:id', caronaController.delete)

export default CaronaRouter


