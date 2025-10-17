import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    // clean up
    return () => unsubscribeFromMessages();
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col">
      <ChatHeader />

      {/* Messages Area - Scrollable on all devices */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 space-y-4 min-h-[300px] max-h-[400px] md:max-h-none">
        {messages.length > 0 && !isMessagesLoading ? (
          <>
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative max-w-[85%] sm:max-w-[75%] text-sm md:text-base break-words ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Attachment"
                      className="w-full max-w-xs rounded-lg mb-2"
                    />
                  )}
                  {msg.text && (
                    <p className="break-words whitespace-pre-wrap">
                      {msg.text}
                    </p>
                  )}
                </div>
                <div className="chat-footer opacity-50 text-xs mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
            {/* scroll target */}
            <div ref={messageEndRef} />
          </>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder />
        )}
      </div>

      {/* Message Input - Always visible at bottom */}
      <div className="flex-shrink-0 mt-auto">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatContainer;
