import { Chat, ChatMessage } from "@/types";

export function openChatSession(): Chat {
  let c: Chat = {
    messages: [],
    id: Date.now().toString(),
  };
  return c;
}

export function newMessage(chat: Chat, message: ChatMessage, updateChat: any) {
  let chatCopy = { ...chat };
  if (!message.content) return;
  chatCopy.messages.push(message);
  updateChat(chatCopy);
}

export function clearChat(updateChat: any) {
  let c = openChatSession();
  updateChat(c);
  return c;
}
