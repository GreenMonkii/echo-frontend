import { BiSolidMessageDots } from "react-icons/bi";

interface ChatListItemProps {
  text: string;
  selected?: boolean;
}

export default function ChatListItem({
  text,
  selected = false,
}: ChatListItemProps) {
  return (
    <li
      className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
        selected ? "bg-primary text-secondary" : "bg-secondary text-foreground"
      }`}
    >
      <div className="bg-muted w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
        <BiSolidMessageDots
          className={selected ? "text-secondary" : "text-foreground"}
        />
      </div>
      <p
        className={`text-lg font-medium flex-1 truncate ${
          selected ? "text-secondary" : "text-foreground"
        }`}
      >
        {text}
      </p>
    </li>
  );
}
