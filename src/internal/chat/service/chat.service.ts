import { Pool } from 'pg';
const pool = new Pool();

/**
 * Cria ou retorna a conversa associada à ride_id
 */
export async function getOrCreateConversation(rideId: number): Promise<ChatConversation> {
  // tenta encontrar conversa existente
  let res = await pool.query<ChatConversation>(
    `SELECT * FROM chat_conversation WHERE ride_id = $1`,
    [rideId]
  );
  if (res.rows.length) {
    return res.rows[0];
  }
  // cria nova conversa
  res = await pool.query<ChatConversation>(
    `INSERT INTO chat_conversation (ride_id) VALUES ($1) RETURNING *`,
    [rideId]
  );
  return res.rows[0];
}

/**
 * Cria nova mensagem em uma conversa
 */
export async function createMessage(
  conversationId: number,
  senderId: number,
  content: string
): Promise<ChatMessage> {
  const result = await pool.query<ChatMessage>(
    `INSERT INTO chat_message (conversation_id, sender_id, content)
     VALUES ($1, $2, $3) RETURNING *`,
    [conversationId, senderId, content]
  );
  return result.rows[0];
}

/**
 * Lista mensagens de uma conversa, da mais nova para a mais antiga
 */
export async function listMessages(
  conversationId: number,
  page: number = 1,
  perPage: number = 20
): Promise<{ messages: ChatMessage[]; total: number }> {
  const offset = (page - 1) * perPage;

  const countRes = await pool.query(
    `SELECT COUNT(*) AS count FROM chat_message WHERE conversation_id = $1`,
    [conversationId]
  );
  const total = parseInt(countRes.rows[0].count, 10);

  const msgsRes = await pool.query<ChatMessage>(
    `SELECT * FROM chat_message WHERE conversation_id = $1
     ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
    [conversationId, perPage, offset]
  );
  return { messages: msgsRes.rows, total };
}
