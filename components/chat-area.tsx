import { Message } from "@/types/chat";

interface ChatAreaProps {
  messages: Message[];
  currentGroup: string | null;
}

export default function ChatArea({ messages, currentGroup }: ChatAreaProps) {
  return (
    <div className="flex flex-1 overflow-y-auto p-4 md:p-6 bg-secondary rounded-lg shadow-lg m-4 md:m-6 custom-scrollbar max-w-full md:max-w-2xl lg:max-w-3xl mx-auto h-full justify-center items-center">
      {!currentGroup ? (
        <div className="text-center text-muted-text">
          You need to join a group to start chatting.
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center text-muted-text">
          No messages yet. Start the conversation!
        </div>
      ) : (
        <div className="flex flex-col space-y-4 w-full">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 md:p-4 rounded-lg shadow-md max-w-full border-none ${
                msg.isUser
                  ? "bg-primary text-secondary self-end"
                  : "bg-muted text-foreground self-start"
              }`}
            >
              <p>{msg.content}</p>
              <span className={`text-xs ${msg.isUser ? "text-secondary" : ""}`}>
                {msg.sentAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
