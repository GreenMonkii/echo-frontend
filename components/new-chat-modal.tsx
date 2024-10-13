import { useState, useEffect } from "react";
import { FaCopy, FaSync, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { generateRandomCode } from "@/lib/utils";

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  joinGroup: (group: string, passcode: string) => void;
  createGroup: (group: string, passcode: string) => void;
}

export default function NewChatModal({
  isOpen,
  onClose,
  joinGroup,
  createGroup,
}: NewChatModalProps) {
  const [copySuccess, setCopySuccess] = useState("");
  const [chatCode, setChatCode] = useState<string | null>(null);
  const [joinCode, setJoinCode] = useState("");
  const [createPasscode, setCreatePasscode] = useState("");
  const [joinPasscode, setJoinPasscode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");
  const [showCreatePasscode, setShowCreatePasscode] = useState(false);
  const [showJoinPasscode, setShowJoinPasscode] = useState(false);

  useEffect(() => {
    setChatCode(generateRandomCode(6));
  }, []);

  if (!chatCode) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(chatCode).then(
      () => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      },
      () => {
        setCopySuccess("Failed to copy!");
      }
    );
  };

  const regenerateCode = () => {
    setChatCode(generateRandomCode(6));
    setCopySuccess("");
  };

  const clearFields = () => {
    setJoinCode("");
    setCreatePasscode("");
    setJoinPasscode("");
    setError("");
  };

  const validatePasscode = (code: string) => {
    if (code.length < 6) {
      setError("Passcode must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const joinChat = () => {
    if (!validatePasscode(joinPasscode)) return;

    setIsJoining(true);
    joinGroup(joinCode, joinPasscode);
    setIsJoining(false);
    clearFields();
    onClose();
  };

  const handleClose = () => {
    clearFields();
    onClose();
  };

  const joinCreatedChat = () => {
    if (!validatePasscode(createPasscode)) return;

    setIsCreating(true);
    createGroup(chatCode, createPasscode);
    joinGroup(chatCode, createPasscode);
    setIsCreating(false);
    clearFields();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 md:p-6">
      <div className="bg-secondary p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
        <h2 className="text-foreground text-2xl font-semibold mb-4">
          Create a new chat
        </h2>
        <div className="flex items-center mb-4 space-x-2">
          <p
            className="text-foreground cursor-pointer flex-1 truncate"
            onClick={copyToClipboard}
            aria-label="Chat Code"
          >
            {chatCode}
          </p>
          <button
            className="bg-primary text-secondary px-3 py-2 rounded-lg shadow-md hover:bg-accent flex items-center"
            onClick={copyToClipboard}
            aria-label="Copy Chat Code"
          >
            <FaCopy className="mr-2" />
            Copy
          </button>
          <button
            className="bg-primary text-secondary px-3 py-2 rounded-lg shadow-md hover:bg-accent flex items-center"
            onClick={regenerateCode}
            aria-label="Regenerate Chat Code"
          >
            <FaSync className="mr-2" />
            Regenerate
          </button>
        </div>
        <div className="relative mb-4">
          <input
            type={showCreatePasscode ? "text" : "password"}
            className="w-full p-3 bg-input-background border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Passcode"
            value={createPasscode}
            onChange={(e) => setCreatePasscode(e.target.value)}
            aria-label="Passcode"
            autoComplete="off"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
            onClick={() => setShowCreatePasscode(!showCreatePasscode)}
            aria-label="Toggle Passcode Visibility"
          >
            {showCreatePasscode ? (
              <FaRegEyeSlash size={24} />
            ) : (
              <FaRegEye size={24} />
            )}
          </button>
        </div>
        <button
          className={`bg-primary text-secondary px-6 py-3 rounded-lg shadow-md hover:bg-accent w-full
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isCreating ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={joinCreatedChat}
          disabled={!createPasscode || isCreating}
          aria-label="Join Created Chat"
        >
          {isCreating ? "Creating..." : "Join Created Chat"}
        </button>
        {copySuccess && (
          <p className="text-primary font-semibold mt-4">{copySuccess}</p>
        )}
        <h2 className="text-foreground text-2xl font-semibold mb-4 mt-6">
          Join an existing chat
        </h2>
        <input
          type="text"
          className="w-full p-3 mb-4 bg-input-background border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Chat Code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          aria-label="Chat Code"
          autoComplete="off"
        />
        <div className="relative mb-4">
          <input
            type={showJoinPasscode ? "text" : "password"}
            className="w-full p-3 bg-input-background border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Passcode"
            value={joinPasscode}
            onChange={(e) => setJoinPasscode(e.target.value)}
            aria-label="Passcode"
            autoComplete="off"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
            onClick={() => setShowJoinPasscode(!showJoinPasscode)}
            aria-label="Toggle Passcode Visibility"
          >
            {showJoinPasscode ? (
              <FaRegEyeSlash size={24} />
            ) : (
              <FaRegEye size={24} />
            )}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className={`bg-primary text-secondary px-6 py-3 rounded-lg shadow-md hover:bg-accent w-full
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isJoining ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={joinChat}
          disabled={!joinCode || !joinPasscode || isJoining}
          aria-label="Join Chat"
        >
          {isJoining ? "Joining..." : "Join Chat"}
        </button>
        <button
          className="bg-primary text-secondary px-6 py-3 rounded-lg shadow-md hover:bg-accent mt-4 w-full"
          onClick={handleClose}
          aria-label="Close Modal"
        >
          Close
        </button>
      </div>
    </div>
  );
}
