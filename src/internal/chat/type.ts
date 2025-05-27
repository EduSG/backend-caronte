interface ChatConversation {
  id: number;
  ride_id: number;
  created_at: string;
}

interface ChatMessage {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  created_at: string;
}
