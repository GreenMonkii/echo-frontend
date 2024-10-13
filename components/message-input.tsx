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
    <div className="bg-secondary p-4 md:p-6 shadow-lg rounded-lg m-4 md:m-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 max-w-full md:max-w-2xl lg:max-w-3xl mx-auto">
      <input
        name="message"
        type="text"
        className="flex-1 p-3 bg-input-background border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-auto"
        value={input}
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
      />
      <button
        className={`bg-primary text-secondary px-6 py-3 rounded-lg shadow-md hover:bg-accent w-full md:w-auto ${
          input.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={sendMessage}
        disabled={input.trim() === "" || !currentGroup}
      >
        Send
      </button>
    </div>
  );
}
