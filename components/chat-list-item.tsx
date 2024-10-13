import { BiSolidGhost } from "react-icons/bi";
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
    <li
      onClick={onClick}
      className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
        selected
          ? "bg-muted-primary text-primary shadow-lg"
          : "bg-secondary text-foreground hover:bg-muted"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          selected ? "bg-primary" : "bg-muted"
        }`}
      >
        <BiSolidGhost
          className={selected ? "text-secondary" : "text-foreground"}
        />
      </div>
      <p
        className={`text-lg font-medium flex-1 truncate ${
          selected ? "text-primary" : "text-foreground"
        }`}
      >
        {text}
      </p>
    </li>
  );
}
