import pool from "../../../providers/db";
import { IDBCarona } from "../type";

export class CaronaRepository {
  async create(data: IDBCarona) {
    const {
      status,
      local_destino_passageiro,
      local_partida_passageiro,
      valor_oferta,
      dias,
      horario_carona,
      id_passageiro,
      data_criacao,
      ultima_atualizacao,
      id_motorista,
      local_destino_motorista,
      local_partida_motorista,
      coords_destino,
      coords_partida,
    } = data;

    const result = await pool.query(
      `INSERT INTO carona_oferta (
        status, local_destino_passageiro, local_partida_passageiro,
        valor_oferta, dias, horario_carona, id_passageiro,
        data_criacao, ultima_atualizacao, id_motorista,
        local_destino_motorista, local_partida_motorista, coords_destino,
      coords_partida
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14
      ) RETURNING *`,
      [
        status,
        local_destino_passageiro,
        local_partida_passageiro,
        valor_oferta,
        JSON.stringify(dias),
        horario_carona,
        id_passageiro,
        data_criacao,
        ultima_atualizacao,
        id_motorista,
        local_destino_motorista,
        local_partida_motorista,
        JSON.stringify(coords_destino),
        JSON.stringify(coords_partida),
      ],
    );

    return result.rows[0];
  }

  async list_passageiro(id: number, pagina: number = 1, registrosPagina: number = 10) {
    const offset = (pagina - 1) * registrosPagina;
    const result = await pool.query(
      `SELECT * FROM carona_oferta WHERE id_passageiro = $1 ORDER BY id LIMIT $2 OFFSET $3`,
      [id, registrosPagina, offset],
    );

    const totalResult = await pool.query("SELECT COUNT(*) FROM carona_oferta");
    const total = parseInt(totalResult.rows[0].count, 10);

    return {
      valor: result.rows,
      total,
      pagina,
      registrosPagina,
    };
  }

  async list_motorista(id: number, pagina: number = 1, registrosPagina: number = 10) {
    const offset = (pagina - 1) * registrosPagina;
    const result = await pool.query(
      `SELECT * FROM carona_oferta WHERE id_motorista = $1 ORDER BY id LIMIT $2 OFFSET $3`,
      [id, registrosPagina, offset],
    );

    const totalResult = await pool.query("SELECT COUNT(*) FROM carona_oferta");
    const total = parseInt(totalResult.rows[0].count, 10);

    return {
      valor: result.rows,
      total,
      pagina,
      registrosPagina,
    };
  }



  async getById(id: number) {
    const result = await pool.query(
      "SELECT * FROM carona_oferta WHERE id = $1",
      [id],
    );
    return result.rows[0] || null;
  }

  async update(id: number, data: Partial<IDBCarona>) {
    const campos = Object.keys(data);
    const valores = Object.values(data);

    if (campos.length === 0) return null;

    const sets = campos
      .map((campo, idx) => `${campo} = $${idx + 1}`)
      .join(", ");
    const query = `UPDATE carona_oferta SET ${sets} WHERE id = $${campos.length + 1} RETURNING *`;

    const result = await pool.query(query, [...valores, id]);
    return result.rows[0] || null;
  }

  async delete(id: number) {
    const result = await pool.query(
      "DELETE FROM carona_oferta WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rows[0] || null;
  }
}
