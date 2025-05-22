"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_1 = __importDefault(require("../../../providers/db"));
class UserRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`INSERT INTO usuarios (
        cep, cpf, data_nascimento, especificacoes_acessorio, especificacoes_veiculo,
        nome, numero_casa, score, status, telefone, tipo_usuario, senha
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`, [
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
            ]);
            return result.rows[0];
        });
    }
    list() {
        return __awaiter(this, arguments, void 0, function* (pagina = 1, registrosPagina = 10) {
            const offset = (pagina - 1) * registrosPagina;
            const result = yield db_1.default.query(`SELECT * FROM usuarios ORDER BY id LIMIT $1 OFFSET $2`, [registrosPagina, offset]);
            const totalResult = yield db_1.default.query('SELECT COUNT(*) FROM usuarios');
            const total = parseInt(totalResult.rows[0].count, 10);
            return {
                valor: result.rows,
                total,
                pagina,
                registrosPagina
            };
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM usuarios WHERE id = $1', [id]);
            return result.rows[0] || null;
        });
    }
    getByCPF(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM usuarios WHERE cpf = $1', [cpf]);
            return result.rows[0] || null;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const campos = Object.keys(data);
            const valores = Object.values(data);
            if (campos.length === 0)
                return null;
            const sets = campos.map((campo, idx) => `${campo} = $${idx + 1}`).join(', ');
            const query = `UPDATE usuarios SET ${sets} WHERE id = $${campos.length + 1} RETURNING *`;
            const result = yield db_1.default.query(query, [...valores, id]);
            return result.rows[0] || null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
            return result.rows[0] || null;
        });
    }
}
exports.UserRepository = UserRepository;
