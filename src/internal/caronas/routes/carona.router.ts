import { Router } from 'express'
import { CaronaController } from '../controller/carona.controller'

const caronaController = new CaronaController()

const CaronaRouter = Router()

CaronaRouter.post('/carona', caronaController.create)
CaronaRouter.get('/carona_passageiro', caronaController.list_passageiro)
CaronaRouter.get('/carona_motorista', caronaController.list_motorista)
CaronaRouter.get('/carona/:id', caronaController.getById)
CaronaRouter.put('/carona/:id', caronaController.update)
CaronaRouter.delete('/carona/:id', caronaController.delete)
CaronaRouter.patch('/setMotorista/:id', caronaController.setMotorista)
CaronaRouter.patch('/removeMorotista/:id', caronaController.removeMotorista)
CaronaRouter.post('/searchCarona', caronaController.search)

export default CaronaRouter


