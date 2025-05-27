import { Pool } from 'pg';
const pool = new Pool();

// Criar nova mensagem
export async function createMessage(
  conversationId: number,
  senderId: number,
  content: string
): Promise<ChatMessage> {
  const result = await pool.query<ChatMessage>(
    `INSERT INTO chat_message (conversation_id, sender_id, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [conversationId, senderId, content]
  );
  return result.rows[0];
}

// Listar mensagens (do mais recente ao mais antigo)
export async function listMessages(
  conversationId: number,
  page: number = 1,
  perPage: number = 20
): Promise<{ messages: ChatMessage[]; total: number }> {
  const offset = (page - 1) * perPage;

  // Total de mensagens
  const countRes = await pool.query(
    `SELECT COUNT(*) AS count
     FROM chat_message
     WHERE conversation_id = $1`,
    [conversationId]
  );
  const total = parseInt(countRes.rows[0].count, 10);

  // Listagem paginada
  const msgsRes = await pool.query<ChatMessage>(
    `SELECT *
     FROM chat_message
     WHERE conversation_id = $1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [conversationId, perPage, offset]
  );

  return { messages: msgsRes.rows, total };
}
