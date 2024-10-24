import { Conversation } from "@/types/conversation";
import { useEffect, useState } from "react";
import { BsFillMoonFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { RiChat1Fill } from "react-icons/ri";
import ChatListItem from "./chat-list-item";
import { useSignalR } from "@/contexts/signalr.context";
import { useThemeStore } from "@/store/theme.store";

interface SidebarProps {
  chatItems: Conversation[];
  onNewChatClick: () => void;
}

export default function Sidebar({ chatItems, onNewChatClick }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentGroup, setCurrentGroup } = useSignalR();
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleConversationClick = (conversationId: string) => {
    setCurrentGroup(conversationId);
  };

  const handleNewChatClick = () => {
    onNewChatClick();
    setIsSidebarOpen(false);
  };

  return (
    <>
      {!isSidebarOpen && (
        <button
          className="md:hidden bg-primary text-secondary p-3 rounded-full shadow-lg fixed top-4 left-4 z-50 transition-transform duration-300 ease-in-out"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <RiChat1Fill size={20} />
        </button>
      )}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 md:w-1/3 lg:w-1/4 bg-secondary shadow-lg p-4 md:p-6 rounded-r-lg z-40`}
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <button
            className="bg-primary text-secondary px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-md hover:bg-accent flex items-center justify-center transition-colors duration-300 ease-in-out"
            onClick={handleNewChatClick}
            aria-label="Start New Chat"
          >
            <FaPlus className="mr-0 md:mr-2" />
            <span className="hidden md:inline">Start a new chat</span>
          </button>
          <button
            className="bg-primary text-secondary px-2 py-2 md:px-3 md:py-2 rounded-lg shadow-md hover:bg-accent flex items-center transition-colors duration-300 ease-in-out"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <MdSunny className="text-secondary" size={20} />
            ) : (
              <BsFillMoonFill className="text-secondary" size={20} />
            )}
          </button>
        </div>
        <ul className="space-y-4 md:space-y-6">
          {chatItems.length === 0 ? (
            <li className="text-center text-muted-text">
              No conversations yet. Start a new chat!
            </li>
          ) : (
            chatItems.map((item, index) => (
              <ChatListItem
                key={index}
                text={item.lastMessage}
                selected={currentGroup === item.id}
                onClick={() => handleConversationClick(item.id)}
              />
            ))
          )}
        </ul>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
