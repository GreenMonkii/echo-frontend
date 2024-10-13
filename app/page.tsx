"use client";

import ChatArea from "@/components/chat-area";
import MessageInput from "@/components/message-input";
import NewChatModal from "@/components/new-chat-modal";
import Sidebar from "@/components/sidebar";
import { useSignalR } from "@/contexts/signalr.context";
import { useConversationStore } from "@/store/conversation.store";
import { Message } from "@/types/chat";
import { Conversation } from "@/types/conversation";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const { conversations, addConversation, updateConversation } =
    useConversationStore();
  const { currentGroup, setCurrentGroup } = useSignalR();

  const initializeConnection = useCallback(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5207/chat")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("Connection started");
        setConnection(newConnection);
        toast.success("Connected to the chat hub", {
          id: "chat-connection-success",
        });
        console.log("Connected to the chat hub");
      })
      .catch((error) => {
        toast.error("Failed to connect to the chat hub", {
          id: "chat-connection-failed",
        });
        console.error(error);
      });

    return newConnection;
  }, []);

  useEffect(() => {
    const newConnection = initializeConnection();
    return () => {
      newConnection
        .stop()
        .catch((error) => console.error("Error stopping connection:", error));
    };
  }, [initializeConnection]);

  useEffect(() => {
    if (!connection) return;

    const handleReceiveMessage = (
      user: string,
      content: string,
      sentAt: string
    ) => {
      const message: Message = {
        isUser: user === connection.connectionId,
        content,
        sentAt: new Date(sentAt),
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      if (currentGroup) {
        const conversation: Conversation = {
          id: currentGroup,
          lastMessage: content,
        };
        if (!conversations.find((conv) => conv.id === currentGroup)) {
          addConversation(conversation);
        } else {
          updateConversation({ ...conversation, lastMessage: content });
        }
      }
    };

    const handleNotification = (message: string) => {
      toast(message, { id: "chat-notification" });
    };

    const handleError = (message: string) => {
      toast.error(message, { id: "chat-error" });
    };

    connection.on("ReceiveMessage", handleReceiveMessage);
    connection.on("Notification", handleNotification);
    connection.on("Error", handleError);

    return () => {
      connection.off("ReceiveMessage", handleReceiveMessage);
      connection.off("Notification", handleNotification);
      connection.off("Error", handleError);
    };
  }, [
    connection,
    currentGroup,
    conversations,
    addConversation,
    updateConversation,
  ]);

  const sendMessage = () => {
    if (
      connection &&
      connection.state === "Connected" &&
      input.trim() !== "" &&
      currentGroup
    ) {
      connection
        .send("SendMessageToGroup", currentGroup, input)
        .then(() => {
          const conversation: Conversation = {
            id: currentGroup!,
            lastMessage: input,
          };
          if (!conversations.find((conv) => conv.id === currentGroup)) {
            addConversation(conversation);
          } else {
            updateConversation({ ...conversation, lastMessage: input });
          }
        })
        .catch((error) => {
          toast.error("Failed to send message", {
            id: "chat-send-failed",
          });
          console.error(error);
        });
      setInput("");
    } else if (input.trim() === "") {
      toast.error("Cannot send an empty message");
    } else {
      toast.error("Connection to the chat hub is not established", {
        id: "chat-connection-lost",
      });
    }
  };

  const createGroup = (group: string, passcode: string) => {
    if (connection && connection.state === "Connected") {
      connection
        .send("CreateGroup", group, passcode)
        .then(() => {
          toast.success(`Created group ${group}`, {
            id: "chat-create-success",
          });
        })
        .catch((error) => {
          toast.error("Failed to create group", {
            id: "chat-create-failed",
          });
          console.error(error);
        });
    } else {
      toast.error("Connection to the chat hub is not established", {
        id: "chat-connection-lost",
      });
    }
  };

  const joinGroup = (group: string, passcode: string) => {
    if (connection && connection.state === "Connected") {
      connection
        .send("AddToGroup", group, passcode)
        .then(() => {
          setCurrentGroup(group);
          toast.success(`Joined group ${group}`, {
            id: "chat-join-success",
          });
        })
        .catch((error) => {
          toast.error("Failed to join group", {
            id: "chat-join-failed",
          });
          console.error(error);
        });
    } else {
      toast.error("Connection to the chat hub is not established", {
        id: "chat-connection-lost",
      });
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        onNewChatClick={() => setIsModalOpen(true)}
        chatItems={conversations}
      />
      <div className="flex-1 flex flex-col items-end">
        <div className="h-3/4 w-full max-w-4xl p-4">
          <ChatArea messages={messages} currentGroup={currentGroup} />
        </div>
        <div className="w-full max-w-4xl p-4">
          <MessageInput
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            currentGroup={currentGroup}
          />
        </div>
      </div>
      <NewChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        joinGroup={joinGroup}
        createGroup={createGroup}
      />
    </div>
  );
}
