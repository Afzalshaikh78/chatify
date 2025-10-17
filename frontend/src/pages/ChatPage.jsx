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
      <div className="h-full w-full flex relative overflow-hidden rounded-xl">
        {/* LEFT SIDEBAR - Hidden on mobile when chat is selected */}
        <div
          className={`
          w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col
          ${selectedUser ? "hidden md:flex" : "flex"}
        `}
        >
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-hidden">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE - Chat Container */}
        <div
          className={`
          flex-1 flex flex-col
          ${selectedUser ? "flex" : "hidden md:flex"}
        `}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </div>
    </BorderAnimatedContainer>
  );
}

export default ChatPage;
