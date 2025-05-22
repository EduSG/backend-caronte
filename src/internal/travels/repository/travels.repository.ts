import pool from "../../../providers/db";
import { IDBTravel } from "../type";

export class TravelRepository {
  async create(data: IDBTravel) {
    const {
      local_destino_passageiro,
      local_destino_motorista,
      valor,
      id_passageiro,
      id_motorista,
      data_criacao,
      local_partida_passageiro,
      local_partida_motorista,
      horario_embarque_passageiro,
    } = data;

    const result = await pool.query(
      `INSERT INTO viagens (
        local_destino_passageiro,
        local_destino_motorista,
        valor,
        id_passageiro,
        id_motorista,
        data_criacao,
        local_partida_passageiro,
        local_partida_motorista,
        horario_embarque_passageiro,
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
      ) RETURNING *`,
      [
        local_destino_passageiro,
        local_destino_motorista,
        valor,
        id_passageiro,
        id_motorista,
        data_criacao,
        local_partida_passageiro,
        local_partida_motorista,
        horario_embarque_passageiro,
      ],
    );

    return result.rows[0];
  }

  async list(pagina: number = 1, registrosPagina: number = 10) {
    const offset = (pagina - 1) * registrosPagina;
    const result = await pool.query(
      `SELECT * FROM viagens ORDER BY id LIMIT $1 OFFSET $2`,
      [registrosPagina, offset],
    );

    const totalResult = await pool.query("SELECT COUNT(*) FROM viagens");
    const total = parseInt(totalResult.rows[0].count, 10);

    return {
      valor: result.rows,
      total,
      pagina,
      registrosPagina,
    };
  }
  
  async update(id: number, data: Partial<IDBTravel>) {
    const campos = Object.keys(data)
    const valores = Object.values(data)

    if (campos.length === 0) return null

    const sets = campos.map((campo, idx) => `${campo} = $${idx + 1}`).join(', ')
    const query = `UPDATE viagens SET ${sets} WHERE id = $${campos.length + 1} RETURNING *`

    const result = await pool.query(query, [...valores, id])
    return result.rows[0] || null
  }

  async delete(id: number) {
    const result = await pool.query('DELETE FROM viagens WHERE id = $1 RETURNING *', [id])
    return result.rows[0] || null
  }
}
