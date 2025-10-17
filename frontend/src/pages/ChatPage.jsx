import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <BorderAnimatedContainer>
      <div className="w-full min-h-[600px] md:h-full flex flex-col md:flex-row relative overflow-hidden rounded-xl">
        {/* LEFT SIDEBAR - Hidden on mobile when chat is selected */}
        <div
          className={`
          w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col
          ${selectedUser ? "hidden md:flex" : "flex"}
          min-h-[300px] md:min-h-0
        `}
        >
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE - Chat Container */}
        <div
          className={`
          w-full md:flex-1 flex flex-col
          ${selectedUser ? "flex" : "hidden md:flex"}
          min-h-[500px] md:min-h-0
        `}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </div>
    </BorderAnimatedContainer>
  );
}

export default ChatPage;
