import { ScoreRepository } from "../repository/score.repository";
import { CreateScoreDTO, IDBScore } from "../type";

const scoreRepository = new ScoreRepository()

export class ScoreService {
  async create(data: IDBScore, id_user: number){


    return scoreRepository.create({...data, id_avaliador: id_user} as CreateScoreDTO)
  }

  async list(pagina: number, registrosPagina: number){
    return scoreRepository.list(pagina, registrosPagina);
  }

}





