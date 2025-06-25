import { Conversation } from "@/types/conversation";
import { useEffect, useState } from "react";
import { Moon, Sun, Plus, MessageCircle } from "lucide-react";
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
      {/* Mobile menu button */}
      {!isSidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-3 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-200"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <MessageCircle size={20} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-80 md:w-80 lg:w-80 bg-white border-r border-border z-40 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-primary">Echo</h1>
            </div>
            <button
              className="p-2.5 hover:bg-primary/10 rounded-lg transition-colors duration-200 border border-primary/20"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-primary" />
              ) : (
                <Moon size={18} className="text-primary" />
              )}
            </button>
          </div>
          <button
            className="w-full gradient-primary text-white px-4 py-3 rounded-xl transition-all duration-200 font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            onClick={handleNewChatClick}
            aria-label="Start New Chat"
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {chatItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={32} className="text-primary/60" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                No conversations yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Start a new chat to begin messaging
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Recent Chats
              </h2>
              {chatItems.map((item, index) => (
                <ChatListItem
                  key={index}
                  text={item.lastMessage}
                  selected={currentGroup === item.id}
                  onClick={() => handleConversationClick(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
