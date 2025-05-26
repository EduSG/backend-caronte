import { UserRepository } from "../repository/user.repository";
import { IDBUser } from "../type";
import { IDBUserSchema } from "../validator/user.validator";
import { encryptPassword } from "../../../utils/crypt/crypt";
import { ValidationError } from "../../../errors/errors";
import { DuplicateError } from "../../../errors/errors";

const userRepository = new UserRepository();

export class UserService {
  async create(data: IDBUser) {
    const isValid = IDBUserSchema.parse(data);

    const isDuplicated = await this.getByCPF(data.cpf) 

    if(!isValid) throw new ValidationError("Os dados não estão corretos") 
    if(isDuplicated) throw new DuplicateError("O CPF já se encontra cadastrado")
    
    const encryptedPassword = await encryptPassword(data.senha)
    
    const infosToSend = {
      ...data,
      senha: encryptedPassword
    }
    
    return userRepository.create(infosToSend as IDBUser);
  }

  list(pagina: number, registrosPagina: number) {
    return userRepository.list(pagina, registrosPagina);
  }

  getById(id: number) {
    return userRepository.getById(id);
  }

  getByCPF(cpf: string) {
    return userRepository.getByCPF(cpf);
  }

  update(id: number, data: IDBUser) {
    return userRepository.update(id, data);
  }

  delete(id: number) {
    return userRepository.delete(id);
  }
}
