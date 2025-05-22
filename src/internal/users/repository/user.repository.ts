import pool from "../../../providers/db"
import { IDBUser } from "../type"

export class UserRepository {
  async create(data: IDBUser) {
    const result = await pool.query(
      `INSERT INTO usuarios (
        cep, cpf, data_nascimento, especificacoes_acessorio, especificacoes_veiculo,
        nome, numero_casa, score, status, telefone, tipo_usuario, senha
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [
        data.cep,
        data.cpf,
        data.data_nascimento,
        JSON.stringify(data.especificacoes_acessorio),
        JSON.stringify(data.especificacoes_veiculo),
        data.nome,
        data.numero_casa,
        data.score,
        data.status,
        data.telefone,
        data.tipo_usuario,
        data.senha,
      ]
    )
    return result.rows[0]
  }

  async list(pagina: number = 1, registrosPagina: number = 10) {
    const offset = (pagina - 1) * registrosPagina
    const result = await pool.query(
      `SELECT * FROM usuarios ORDER BY id LIMIT $1 OFFSET $2`,
      [registrosPagina, offset]
    )

    const totalResult = await pool.query('SELECT COUNT(*) FROM usuarios')
    const total = parseInt(totalResult.rows[0].count, 10)

    return {
      valor: result.rows,
      total,
      pagina,
      registrosPagina
    }
  }

  async getById(id: number) {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id])
    return result.rows[0] || null
  }

  async getByCPF(cpf: string) {
    const result = await pool.query('SELECT * FROM usuarios WHERE cpf = $1', [cpf])
    return result.rows[0] || null
  }
  
  async update(id: number, data: Partial<IDBUser>) {
    const campos = Object.keys(data)
    const valores = Object.values(data)

    if (campos.length === 0) return null

    const sets = campos.map((campo, idx) => `${campo} = $${idx + 1}`).join(', ')
    const query = `UPDATE usuarios SET ${sets} WHERE id = $${campos.length + 1} RETURNING *`

    const result = await pool.query(query, [...valores, id])
    return result.rows[0] || null
  }

  async delete(id: number) {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id])
    return result.rows[0] || null
  }
}


