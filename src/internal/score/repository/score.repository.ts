import pool from "../../../providers/db";
import { CreateScoreDTO } from "../type";

export class ScoreRepository {
  async create(data: CreateScoreDTO) {
    const { id_avaliador, id_avaliado, id_viagem, valor, observacao } = data;

    const result = await pool.query(
      `INSERT INTO avaliacao (
       id_avaliador, id_avaliado, id_viagem, valor, observacao
      ) VALUES (
        $1,$2,$3,$4,$5
      ) RETURNING *`,
      [id_avaliador, id_avaliado, id_viagem, valor, observacao],
    );

    return result.rows[0];
  }

  async list(pagina: number = 1, registrosPagina: number = 10) {
    const offset = (pagina - 1) * registrosPagina;
    const result = await pool.query(
      `SELECT * FROM avaliacao ORDER BY id LIMIT $1 OFFSET $2`,
      [registrosPagina, offset],
    );

    const totalResult = await pool.query("SELECT COUNT(*) FROM avaliacao");
    const total = parseInt(totalResult.rows[0].count, 10);

    return {
      valor: result.rows,
      total,
      pagina,
      registrosPagina,
    };
  }

}
