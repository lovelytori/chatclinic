
export type Sender = 'user' | 'monday' | 'gaebot';

export interface ChatMessage {
  id: string;
  sender: Sender;
  message: string;
}
