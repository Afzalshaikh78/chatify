import { XIcon, ArrowLeftIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <header className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 p-3 sm:p-4 min-h-[60px] sm:min-h-[70px]">
      <div className="flex items-center gap-3">
        {/* Mobile Back Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden p-1 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          <ArrowLeftIcon className="size-5 text-slate-400" />
        </button>

        <div className="relative">
          <img
            src={selectedUser.avatar || "/avatar.png"}
            alt="User Avatar"
            className="size-8 sm:size-10 rounded-full object-cover"
          />
          <span
            className={`absolute bottom-0 right-0 size-2.5 sm:size-3 rounded-full border-2 border-slate-800 ${
              isOnline ? "bg-green-500" : "bg-gray-500"
            }`}
          />
        </div>

        <div>
          <h3 className="font-semibold text-slate-200 text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
            {selectedUser.fullName}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Desktop Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="hidden md:block p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors"
      >
        <XIcon className="size-5 text-slate-400" />
      </button>
    </header>
  );
}

export default ChatHeader;
