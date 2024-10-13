import { Conversation } from "@/types/conversation";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ConversationStoreProps = {
  conversations: Conversation[];
  addConversation: (conversation: Conversation) => void;
  updateConversation: (conversation: Conversation) => void;
};

export const useConversationStore = create(
  persist<ConversationStoreProps>(
    (set) => ({
      conversations: [],
      addConversation: (conversation: Conversation) =>
        set((state) => ({
          conversations: [...state.conversations, conversation],
        })),
      updateConversation: (conversation: Conversation) =>
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversation.id ? conversation : conv
          ),
        })),
    }),
    {
      name: "conversation-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
