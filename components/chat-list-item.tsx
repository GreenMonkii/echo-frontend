import { MessageCircle } from "lucide-react";

interface ChatListItemProps {
  text: string;
  onClick: () => void;
  selected?: boolean;
}

export default function ChatListItem({
  text,
  onClick,
  selected = false,
}: ChatListItemProps) {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
        selected
          ? "bg-primary text-white shadow-lg shadow-primary/20"
          : "hover:bg-primary/5 hover:shadow-sm"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
          selected
            ? "bg-white/20 text-white"
            : "bg-primary/10 text-primary group-hover:bg-primary/15"
        }`}
      >
        <MessageCircle size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-semibold truncate ${
            selected ? "text-white" : "text-foreground"
          }`}
        >
          {text}
        </p>
        <p
          className={`text-xs mt-1 ${
            selected ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          Anonymous Chat
        </p>
      </div>
    </div>
  );
}
