import { useState, useEffect } from "react";
import { Copy, RefreshCw, Eye, EyeOff, X } from "lucide-react";
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-secondary border border-border rounded-xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-4 p-1 hover:bg-muted rounded-lg transition-colors duration-200"
          onClick={handleClose}
          aria-label="Close Modal"
        >
          <X size={20} className="text-muted-foreground" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Create New Chat
          </h2>
          <p className="text-sm text-muted-foreground">
            Share the code and passcode with others to start chatting
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Chat Code
            </label>
            <div className="flex gap-2">
              <div
                className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-foreground font-mono cursor-pointer hover:bg-muted/80 transition-colors duration-200"
                onClick={copyToClipboard}
              >
                {chatCode}
              </div>
              <button
                className="px-3 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-200 flex items-center gap-1"
                onClick={copyToClipboard}
                aria-label="Copy Chat Code"
              >
                <Copy size={16} />
              </button>
              <button
                className="px-3 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors duration-200 flex items-center gap-1"
                onClick={regenerateCode}
                aria-label="Regenerate Chat Code"
              >
                <RefreshCw size={16} />
              </button>
            </div>
            {copySuccess && (
              <p className="text-xs text-primary mt-1">{copySuccess}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Passcode
            </label>
            <div className="relative">
              <input
                type={showCreatePasscode ? "text" : "password"}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground"
                placeholder="Enter a secure passcode"
                value={createPasscode}
                onChange={(e) => setCreatePasscode(e.target.value)}
                autoComplete="off"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={() => setShowCreatePasscode(!showCreatePasscode)}
              >
                {showCreatePasscode ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg transition-colors duration-200 font-medium"
            onClick={joinCreatedChat}
            disabled={!createPasscode || isCreating}
          >
            {isCreating ? "Creating..." : "Create & Join Chat"}
          </button>
        </div>

        <div className="border-t border-border pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Join Existing Chat
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter the chat code and passcode to join
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Chat Code
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground"
                placeholder="Enter chat code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Passcode
              </label>
              <div className="relative">
                <input
                  type={showJoinPasscode ? "text" : "password"}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground"
                  placeholder="Enter passcode"
                  value={joinPasscode}
                  onChange={(e) => setJoinPasscode(e.target.value)}
                  autoComplete="off"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={() => setShowJoinPasscode(!showJoinPasscode)}
                >
                  {showJoinPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <div className="text-sm text-destructive">{error}</div>}

            <button
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg transition-colors duration-200 font-medium"
              onClick={joinChat}
              disabled={!joinCode || !joinPasscode || isJoining}
            >
              {isJoining ? "Joining..." : "Join Chat"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
