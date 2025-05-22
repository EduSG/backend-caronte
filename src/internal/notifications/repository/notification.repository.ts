import pool from "../../../providers/db";
import { IDBNotification } from "../type";

export class NotificationRepository {
  async create(data: IDBNotification) {
    const { id_usuario, mensagem, lida } = data;

    const result = await pool.query(
      `INSERT INTO notificacoes (
       id_usuario, mensagem, lida
      ) VALUES (
        $1,$2,$3
      ) RETURNING *`,
      [id_usuario, mensagem, lida],
    );

    return result.rows[0];
  }

  async list(pagina: number = 1, registrosPagina: number = 10) {
    const offset = (pagina - 1) * registrosPagina;
    const result = await pool.query(
      `SELECT * FROM notificacoes ORDER BY id LIMIT $1 OFFSET $2`,
      [registrosPagina, offset],
    );

    const totalResult = await pool.query("SELECT COUNT(*) FROM notificacoes");
    const total = parseInt(totalResult.rows[0].count, 10);

    return {
      valor: result.rows,
      total,
      pagina,
      registrosPagina,
    };
  }
  
  async update(id: number, data: Partial<IDBNotification>) {
    const campos = Object.keys(data)
    const valores = Object.values(data)

    if (campos.length === 0) return null

    const sets = campos.map((campo, idx) => `${campo} = $${idx + 1}`).join(', ')
    const query = `UPDATE notificacoes SET ${sets} WHERE id = $${campos.length + 1} RETURNING *`

    const result = await pool.query(query, [...valores, id])
    return result.rows[0] || null
  }

  async delete(id: number) {
    const result = await pool.query('DELETE FROM notificacoes WHERE id = $1 RETURNING *', [id])
    return result.rows[0] || null
  }
}
