import pool from "../../../providers/db";
import { IDBMessage } from "../type";

export class MessageRepository {
  async create(data: IDBMessage) {
    const { id_carona, id_remetente, id_destinatario, conteudo, data_envio } =
      data;

    const result = await pool.query(
      `INSERT INTO mensagens (
       id_carona, id_remetente_, id_destinatario,
       conteudo, data_envio 
      ) VALUES (
        $1,$2,$3,$4,$5
      ) RETURNING *`,
      [id_carona, id_remetente, id_destinatario, conteudo, data_envio],
    );

    return result.rows[0];
  }

  async listMessagesByCarona(
    pagina: number = 1,
    registrosPagina: number = 10,
    id_carona: number,
  ) {
    const offset = (pagina - 1) * registrosPagina;

    const result = await pool.query(
      `SELECT * FROM mensagens WHERE id_carona = $1 ORDER BY id DESC LIMIT $2 OFFSET $3`,
      [id_carona, registrosPagina, offset],
    );

    const totalResult = await pool.query(
      `SELECT COUNT(*) FROM mensagens WHERE id_carona = $1`,
      [id_carona],
    );

    const total = parseInt(totalResult.rows[0].count, 10);

    return {
      mensagens: result.rows,
      total,
      pagina,
      registrosPagina,
    };
  }
}
