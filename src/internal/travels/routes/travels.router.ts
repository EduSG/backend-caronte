import { Router } from 'express'
import { TravelController } from '../controller/travels.controller'

const travelController = new TravelController()

const TravelRouter = Router()

TravelRouter.post('/carona', travelController.create)
TravelRouter.get('/carona', travelController.list)
TravelRouter.put('/carona/:id', travelController.update)
TravelRouter.patch('/carona/:id', travelController.update)
TravelRouter.delete('/carona/:id', travelController.delete)

export default TravelRouter


