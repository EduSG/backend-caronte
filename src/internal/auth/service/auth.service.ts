import { UserService } from "../../users/service/user.service";
import { NotFoundError, UnauthorizedError } from "../../../errors/errors";
import { comparePassword } from "../../../utils/crypt/crypt";
import { generateToken } from "../../../utils/jwt/jwt";

interface ISessionData {
  token: string 
  sessionData: {
    nome: string 
    cpf: string 
    cep: string 
    score: number
    tipo_usuario: number 
    telefone: string 
  }
}

export default class AuthService extends UserService {
  constructor(){
    super()
  }

  async login(payload: {cpf: string, password: string}): Promise<ISessionData>{
    const userSearch = await this.getByCPF(payload.cpf)
    
    if(!userSearch) throw new NotFoundError("O CPF não possui cadastro!");

    const isCorrectPassword = await comparePassword(
      payload.password,
      userSearch.senha
    )

    if(!isCorrectPassword) throw new UnauthorizedError("O CPF ou a senha se encontram divergentes!")

    const token = generateToken({
      nome: userSearch.nome,
      cpf: userSearch.cpf,
    }) 

    const sessionData = {
      nome: userSearch.nome,
      cpf: userSearch.cpf,
      cep: userSearch.cep,
      score: userSearch.score,
      tipo_usuario: userSearch.tipo_usuario,
      telefone: userSearch.telefone,
      id: userSearch.id,
    }

    

    return { token, sessionData}
  }
}
