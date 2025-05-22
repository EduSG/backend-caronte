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
exports.MessageRepository = void 0;
const db_1 = __importDefault(require("../../../providers/db"));
class MessageRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_carona, id_remetente, id_destinatario, conteudo, data_envio } = data;
            const result = yield db_1.default.query(`INSERT INTO mensagens (
       id_carona, id_remetente_, id_destinatario,
       conteudo, data_envio 
      ) VALUES (
        $1,$2,$3,$4,$5
      ) RETURNING *`, [id_carona, id_remetente, id_destinatario, conteudo, data_envio]);
            return result.rows[0];
        });
    }
    listMessagesByCarona() {
        return __awaiter(this, arguments, void 0, function* (pagina = 1, registrosPagina = 10, id_carona) {
            const offset = (pagina - 1) * registrosPagina;
            const result = yield db_1.default.query(`SELECT * FROM mensagens WHERE id_carona = $1 ORDER BY id DESC LIMIT $2 OFFSET $3`, [id_carona, registrosPagina, offset]);
            const totalResult = yield db_1.default.query(`SELECT COUNT(*) FROM mensagens WHERE id_carona = $1`, [id_carona]);
            const total = parseInt(totalResult.rows[0].count, 10);
            return {
                mensagens: result.rows,
                total,
                pagina,
                registrosPagina,
            };
        });
    }
}
exports.MessageRepository = MessageRepository;
