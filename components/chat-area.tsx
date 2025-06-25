import { Message } from "@/types/chat";
import { Glasses, MessageCircle } from "lucide-react";

interface ChatAreaProps {
  messages: Message[];
  currentGroup: string | null;
}

export default function ChatArea({ messages, currentGroup }: ChatAreaProps) {
  return (
    <div className="flex flex-1 flex-col h-full pb-24">
      {!currentGroup ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Glasses size={40} className="text-primary stroke-[1.5]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Welcome to Echo
            </h2>
            <p className="text-muted-foreground md:text-lg leading-relaxed">
              Connect with others anonymously. Create or join a group to start
              your conversation.
            </p>
          </div>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Ready to chat!
            </h3>
            <p className="text-muted-foreground">
              You&apos;re connected to the group. Send your first message to get the
              conversation started.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md lg:max-w-lg px-6 py-4 rounded-2xl ${
                    msg.isUser
                      ? "bg-primary text-white ml-12"
                      : "bg-secondary border border-border text-foreground mr-12"
                  }`}
                >
                  <p className="text-sm leading-relaxed font-medium">
                    {msg.content}
                  </p>
                  <span
                    className={`text-xs mt-2 block font-medium ${
                      msg.isUser ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {msg.sentAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
