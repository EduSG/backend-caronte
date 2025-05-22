import { Router } from 'express'
import { UsuarioController } from '../controller/user.controller'

const usuarioController = new UsuarioController() 

const UsuarioRouter = Router()
const CreateUserRouter = Router()

CreateUserRouter.post('/usuarios', usuarioController.create)
UsuarioRouter.get('/usuarios', usuarioController.list)
UsuarioRouter.get('/usuarios/:id', usuarioController.getById)
UsuarioRouter.put('/usuarios/:id', usuarioController.update)
UsuarioRouter.delete('/usuarios/:id', usuarioController.delete)

export { UsuarioRouter, CreateUserRouter }

