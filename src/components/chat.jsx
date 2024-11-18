import {
    ChatContainer, MessageList, Message, MessageInput, VoiceCallButton, VideoCallButton, TypingIndicator,
    Avatar, ConversationHeader, MessageSeparator, MainContainer, Sidebar, Conversation, ConversationList,
    Search, EllipsisButton
} from '@chatscope/chat-ui-kit-react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { signOut, auth } from '../config/firebase';
import { TbLogout2 } from "react-icons/tb";
import { useContext } from 'react';
import User from '../context/user';

function ChatApp() {
    const user = useContext(User).user

    const logOut = () => {
        signOut(auth)
    }

    return (
        <MainContainer
            responsive
            style={{
                height: '100vh'
            }}
        >
            <Sidebar
                position="left"
            >
                <ConversationHeader>
                    <Avatar
                        name={"Zoe"}
                        src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                    />
                    <ConversationHeader.Content
                        userName={user.username}
                    />
                    <ConversationHeader.Actions>
                        <TbLogout2 onClick={logOut} cursor={"pointer"} size={30} />
                    </ConversationHeader.Actions>
                </ConversationHeader>

                <Search placeholder="Search..." />

                <ConversationList>
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Lilly"
                        name="Lilly"
                    >
                        <Avatar
                            name="Lilly"
                            src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                            status="available"
                        />
                    </Conversation>
                </ConversationList>

            </Sidebar>
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Back />
                    <Avatar
                        name="Zoe"
                        src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                    />
                    <ConversationHeader.Content
                        info="Active 10 mins ago"
                        userName={user.username}
                    />
                    <ConversationHeader.Actions>
                        {/* <VoiceCallButton /> */}
                        {/* <VideoCallButton /> */}
                        <EllipsisButton orientation="vertical" />
                    </ConversationHeader.Actions>
                </ConversationHeader>
                <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
                    <MessageSeparator content="Saturday, 30 November 2019" />
                    <Message
                        model={{
                            direction: 'incoming',
                            message: 'Hello my friend',
                            position: 'single',
                            sender: 'Zoe',
                            sentTime: '15 mins ago'
                        }}
                    >
                        <Avatar
                            name="Zoe"
                            src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                        />
                    </Message>

                    <Message
                        model={{
                            direction: 'outgoing',
                            message: 'Hello my friend',
                            position: 'last',
                            sender: 'Patrik',
                            sentTime: '15 mins ago'
                        }}
                    />

                    <Message
                        avatarSpacer
                        model={{
                            direction: 'incoming',
                            message: 'Hello my friend',
                            position: 'first',
                            sender: 'Zoe',
                            sentTime: '15 mins ago'
                        }}
                    />
                    <Message
                        model={{
                            direction: 'incoming',
                            message: 'Hello my friend',
                            position: 'last',
                            sender: 'Zoe',
                            sentTime: '15 mins ago'
                        }}
                    >
                        <Avatar
                            name="Zoe"
                            src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                        />
                    </Message>
                </MessageList>
                <MessageInput placeholder="Type message here" />
            </ChatContainer>
        </MainContainer>
    )
};

export default ChatApp;