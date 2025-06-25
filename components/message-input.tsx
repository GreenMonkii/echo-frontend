import { Send } from "lucide-react";

interface MessageInputProps {
  input: string;
  currentGroup: string | null;
  setInput: (input: string) => void;
  sendMessage: () => void;
}

export default function MessageInput({
  input,
  currentGroup,
  setInput,
  sendMessage,
}: MessageInputProps) {
  return (
    <div className="border-t border-border bg-secondary/80 backdrop-blur-sm p-6">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <div className="flex-1 relative">
          <input
            name="message"
            type="text"
            className="w-full p-4 bg-input border-2 border-border hover:border-primary/30 focus:border-primary rounded-full focus:outline-none text-foreground text-sm md:text-base placeholder:text-muted-foreground font-medium transition-all duration-200 pr-12"
            value={input}
            autoComplete="off"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={
              currentGroup
                ? "Type your message..."
                : "Join a group to start chatting"
            }
            disabled={!currentGroup}
          />
        </div>
        <button
          className={`p-4 rounded-full transition-all duration-200 font-semibold ${
            input.trim() === "" || !currentGroup
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-hover hover:scale-105 active:scale-95"
          }`}
          onClick={sendMessage}
          disabled={input.trim() === "" || !currentGroup}
          aria-label="Send message"
        >
          <Send size={20} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
