import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    if (isSoundEnabled) playRandomKeyStrokeSound();
    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });

    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-3 sm:p-4 bg-slate-800/50 border-t border-slate-700/50">
      {imagePreview && (
        <div className="mb-3 relative inline-block">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-700"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          >
            <XIcon className="size-3 text-white" />
          </button>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex items-end gap-2 sm:gap-3"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base resize-none"
          placeholder="Type your message..."
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 sm:p-2.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600/50 transition-colors"
        >
          <ImageIcon className="size-4 sm:size-5 text-slate-400" />
        </button>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2 sm:p-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg transition-colors"
        >
          <SendIcon className="size-4 sm:size-5 text-white" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
