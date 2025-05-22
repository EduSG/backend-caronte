
import { Router } from 'express'
import { NotificationController } from '../controller/notification.controller'

const notificationController = new NotificationController() 

const NotificationRouter = Router()

NotificationRouter.post('/notifications', notificationController.create)
NotificationRouter.get('/notifications', notificationController.list)
NotificationRouter.put('/notifications/:id', notificationController.update)
NotificationRouter.delete('/notifications/:id', notificationController.delete)

export { NotificationRouter }

