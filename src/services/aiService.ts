import { AiChatMessage } from '../types';
import { apiClient } from './apiClient';

export interface AiRequestOptions {
  history?: AiChatMessage[];
}

export const sendAiMessage = async (
  prompt: string, 
  options?: AiRequestOptions
): Promise<AiChatMessage> => {
  try {
    const formattedHistory = options?.history?.map(h => ({
      role: h.sender === 'user' ? ('user' as const) : ('assistant' as const),
      content: h.content
    }));

    const response = await apiClient.sendAiChat(prompt, formattedHistory);

    return {
      id: `ai_${Date.now()}`,
      sender: 'assistant',
      content: response.reply,
      timestamp: 'Hozirgina',
      suggestedActions: response.suggestedActions
    };
  } catch (err: any) {
    console.error('AI Service Error:', err);
    return {
      id: `ai_err_${Date.now()}`,
      sender: 'assistant',
      content: `Kechirasiz, sun'iy intellekt xizmati bilan bog'lanishda vaqtinchalik uzilish yuz berdi. Iltimos, bir ozdan so'ng qayta urinib ko'ring.`,
      timestamp: 'Hozirgina',
      suggestedActions: [
        { label: "Barcha mahsulotlar", url: "/products" },
        { label: "Aloqa markazi", url: "/contact" }
      ]
    };
  }
};
