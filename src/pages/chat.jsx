import AppButton from "../components/button";
import ChatApp from "../components/chat";

function ChatPage() {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Chat App</h1>
            <AppButton title={"SignOut"}/>
            <ChatApp />
        </div>
    );
}

export default ChatPage;
