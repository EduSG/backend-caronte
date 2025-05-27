import pool from "../../../providers/db";
import { IDBCarona } from "../type";
import { SearchParams } from "../type";

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

  async list_passageiro(
    id: number,
    pagina: number = 1,
    registrosPagina: number = 10,
  ) {
    const offset = (pagina - 1) * registrosPagina;
    const result = await pool.query(
      `SELECT * FROM carona_oferta WHERE id_passageiro = $1 ORDER BY id LIMIT $2 OFFSET $3`,
      [id, registrosPagina, offset],
    );

    const totalResult = await pool.query(
      "SELECT COUNT(*) FROM carona_oferta WHERE id_passageiro = $1",
      [id],
    );
    const total = parseInt(totalResult.rows[0].count, 10);

    return {
      valor: result.rows,
      total,
      pagina,
      registrosPagina,
    };
  }

  async list_motorista(
    id: number,
    pagina: number = 1,
    registrosPagina: number = 10,
  ) {
    const offset = (pagina - 1) * registrosPagina;
    const result = await pool.query(
      `SELECT * FROM carona_oferta WHERE id_motorista = $1 ORDER BY id LIMIT $2 OFFSET $3`,
      [id, registrosPagina, offset],
    );

    const totalResult = await pool.query(
      "SELECT COUNT(*) FROM carona_oferta WHERE id_motorista = $1",
      [id],
    );
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

  async searchCaronas(params: SearchParams) {
    const {
      coords_partida: { lat: latP, lon: lonP },
      coords_destino: { lat: latD, lon: lonD },
      desvio_partida_m: devP,
      desvio_destino_m: devD,
    } = params;

    const R = 6371000; 

    const sql = `
    SELECT *,
      (${R} * 2 * asin(
        sqrt(
          power(sin(radians((coords_partida->>'lat')::float - $1)/2),2) +
          cos(radians($1)) *
          cos(radians((coords_partida->>'lat')::float)) *
          power(sin(radians((coords_partida->>'lon')::float - $2)/2),2)
        )
      )) AS dist_partida,
      (${R} * 2 * asin(
        sqrt(
          power(sin(radians((coords_destino->>'lat')::float - $3)/2),2) +
          cos(radians($3)) *
          cos(radians((coords_destino->>'lat')::float)) *
          power(sin(radians((coords_destino->>'lon')::float - $4)/2),2)
        )
      )) AS dist_destino
    FROM carona_oferta
    WHERE status = true
      AND (${R} * 2 * asin(
            sqrt(
              power(sin(radians((coords_partida->>'lat')::float - $1)/2),2) +
              cos(radians($1)) *
              cos(radians((coords_partida->>'lat')::float)) *
              power(sin(radians((coords_partida->>'lon')::float - $2)/2),2)
            )
         )) <= $5
      AND (${R} * 2 * asin(
            sqrt(
              power(sin(radians((coords_destino->>'lat')::float - $3)/2),2) +
              cos(radians($3)) *
              cos(radians((coords_destino->>'lat')::float)) *
              power(sin(radians((coords_destino->>'lon')::float - $4)/2),2)
            )
         )) <= $6
    ORDER BY dist_partida ASC
  `;
    const values = [
      parseFloat(latP), 
      parseFloat(lonP),
      parseFloat(latD), 
      parseFloat(lonD),
      devP, 
      devD, 
    ];

    const { rows } = await pool.query(sql, values);
    return rows;
  }
}
