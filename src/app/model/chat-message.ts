interface ChatMessage {
  apiKey: string;
  role: 'USER' | 'SYSTEM';
  content: string;
  created_at: string;
  model?: any;
}
