import {
    ChatContainer, MessageList, Message, MessageInput, VoiceCallButton, VideoCallButton, TypingIndicator,
    Avatar, ConversationHeader, MessageSeparator, MainContainer, Sidebar, Conversation, ConversationList,
    Search, EllipsisButton
} from '@chatscope/chat-ui-kit-react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { signOut, auth } from '../config/firebase';
import { TbLogout2 } from "react-icons/tb";
import { useCallback, useEffect, useContext, useState, } from 'react';
import User from '../context/user';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    db, addDoc, doc, collection, serverTimestamp, updateDoc, onSnapshot, query, orderBy, getDocs, getDoc, where

} from '../config/firebase';
import { formatDistance } from 'date-fns';

function ChatApp() {
    const [messageInputValue, setMessageInputValue] = useState("")
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sidebarStyle, setSidebarStyle] = useState({});
    const [chatContainerStyle, setChatContainerStyle] = useState({});
    const [conversationContentStyle, setConversationContentStyle] = useState({});
    const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});
    const [chats, setChats] = useState([])
    const [chatMessages, setChatMessages] = useState([])
    const [currentChat, setCurrentChat] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const chatIdParam = searchParams.get('chatId');
    // const [value] = useDebounce(messageInputValue, 2000);
    const user = useContext(User).user

    const logOut = () => {
        signOut(auth)
    }

    // const chatId = (currentId) => {
    //     let id = "";
    //     if (user.uid < currentId) {
    //         id = `${user.uid}${currentId}`
    //     } else {
    //         id = `${currentId}${user.uid}`
    //     }
    //     return id
    // }

    const onSend = async () => {
        let chatId = "";
        if (user.uid<currentChat.uid){
            chatId = `${user.uid}${currentChat.uid}`
        }
        else{
            chatId = `${currentChat.uid}${user.uid}`
        }
        await addDoc(collection(db, "messages"), {
            message: messageInputValue,
            sentTime: new Date().toISOString(),
            sender: user.uid,
            receiver: currentChat.uid,
            senderName: user.username,
            receiverName: currentChat.username
            
        });
        setChatMessages([...chatMessages,
        {
            
            sender: "Zoe",
            direction: "outgoing",
            position: "first"
        }
        ])

        // setMessageInputValue("")
        // await addDoc(collection(db, "messages"), {
        //     // chatId: chatId(currentChat.uid),
        //     timeStamp: serverTimestamp()
        // });
        // await updateDoc(doc(db, "users", currentChat.uid), {
        //     [`lastMessages.${chatId(currentChat.uid)}`]: {
        //         lastMessage: messageInputValue,
        //         chatId: chatId(currentChat.uid)
        //     }
        // });
        // await updateDoc(doc(db, "users", user.uid), {
        //     [`lastMessages.${chatId(currentChat.uid)}`]: {
        //         lastMessage: messageInputValue,
        //         chatId: chatId(currentChat.uid)
        //     }
        // });
        setMessageInputValue("")
    }

    const handleBackClick = () => setSidebarVisible(!sidebarVisible);

    const handleConversationClick = useCallback(() => {
        if (sidebarVisible) {
            setSidebarVisible(false);
        }
    }, [sidebarVisible, setSidebarVisible])

    const getAllUsers = async () => {
        if (!user || !user.email) {
            // console.error("User or user email is undefined");
            return;
        }

        try {
            const q = query(collection(db, "users"), where("email", "!=", user.email));
            const querySnapshot = await getDocs(q);
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id });
                console.log(doc.id, "=>", doc.data());
            });
            setCurrentChat(users[0])
            setChats(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, [user]);


    // const setTyping = async (typing) => {

    //     const isTyping = currentChat?.isTyping?.[chatId(currentChat.uid)]?.[user.uid];
    //     console.log("isTyping", isTyping)

    //     if (!isTyping && typing) {
    //         console.log("api call")
    //         await updateDoc(doc(db, "users", currentChat.uid), {
    //             [`isTyping.${chatId(currentChat.uid)}.${user.uid}`]: typing
    //         });
    //         await updateDoc(doc(db, "users", user.uid), {
    //             [`isTyping.${chatId(currentChat.uid)}.${user.uid}`]: typing
    //         });
    //     }
    //     if (!typing) {
    //         await updateDoc(doc(db, "users", currentChat.uid), {
    //             [`isTyping.${chatId(currentChat.uid)}.${user.uid}`]: typing
    //         }); await updateDoc(doc(db, "users", user.uid), {
    //             [`isTyping.${chatId(currentChat.uid)}.${user.uid}`]: typing
    //         });
    //     }

    // }

    // useEffect(() => {
    //     if (messageInputValue) {
    //         console.log("typing....")
    //         setTyping(true)
    //     }
    //     if (value === messageInputValue) {
    //         console.log("typing stopped")
    //         setTyping(false)
    //     }
    // }, [messageInputValue, value])




    // useEffect(() => {
    //     if (chats.length) {
    //         const currentChatIndex = chats.findIndex(v => v.id === chatIdParam);
    //         if (currentChatIndex !== -1) {
    //             searchParams.set("chatId", chats[currentChatIndex].id)
    //             navigate(`/chat?${searchParams}`)
    //             setCurrentChat(chats[currentChatIndex])
    //         } else {
    //             searchParams.set("chatId", chats[0].id)
    //             navigate(`/chat?${searchParams}`)
    //             setCurrentChat(chats[0])
    //         }
    //     }
    // }, [chatIdParam, chats])


    // const getAllMessages = async () => {
    //     const q = query(collection(db, "messages"), where("chatId", "==", chatId(currentChat.uid)), orderBy("timeStamp", "asc"));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const messages = [];
    //         querySnapshot.forEach((doc) => {
    //             messages.push({
    //                 ...doc.data(),
    //                 id: doc.id,
    //                 direction: doc.data().sender === user.uid ? "outgoing" : "incoming"
    //             })
    //         });
    //         setChatMessages(messages)
    //     });
    // }

    // useEffect(() => {
    //     getAllMessages()
    // }, [currentChat])

    useEffect(() => {
        if (sidebarVisible) {
            setSidebarStyle({
                display: "flex",
                flexBasis: "auto",
                width: "100%",
                maxWidth: "100%"
            });
            setConversationContentStyle({
                display: "flex"
            });
            setConversationAvatarStyle({
                marginRight: "1em"
            });
            setChatContainerStyle({
                display: "none"
            });
        } else {
            setSidebarStyle({});
            setConversationContentStyle({});
            setConversationAvatarStyle({});
            setChatContainerStyle({});
        }
    }, [sidebarVisible, setSidebarVisible, setConversationContentStyle, setConversationAvatarStyle, setSidebarStyle, setChatContainerStyle]);

    // const isTyping = currentChat?.isTyping?.[chatId(currentChat.uid)]?.[currentChat.uid];

    return (
        <MainContainer
            responsive
            style={{
                height: '97vh'
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
                    {chats.map((v) => (
                        <Conversation key={v.id} onClick={() => {
                            handleConversationClick()
                            setCurrentChat(v)
                        }}>
                            <Conversation.Content
                                info="Yes i can do it for you"
                                lastSenderName={v.username}
                                name={v.username}
                            />

                            <Avatar
                                name={v.username}
                                src={`https://ui-avatars.com/api/?name=${v.username}&background=random`}
                            // status="available"
                            />
                        </Conversation>
                    ))}
                </ConversationList>

            </Sidebar>
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Back onClick={handleBackClick} />
                    <Avatar
                        name={currentChat.username}
                        src={`https://ui-avatars.com/api/?name=${currentChat.username}&background=random`}
                    />
                    <ConversationHeader.Content
                        info="Active 10 mins ago"
                        userName={currentChat.username}
                    />
                    <ConversationHeader.Actions>
                        {/* <VoiceCallButton /> */}
                        {/* <VideoCallButton /> */}
                        <EllipsisButton orientation="vertical" />
                    </ConversationHeader.Actions>
                </ConversationHeader>

                {/* <MessageList typingIndicator={isTyping ? <TypingIndicator content={currentChat.full_name} /> : false}> */}
                <MessageList>
                    <MessageSeparator content="Saturday, 30 November 2019" />
                    {chatMessages.map((v, i) => (
                        <Message key={i} model={v}>
                            model={{
                                direction: 'outgoing',
                                message: 'Hello my friend',
                                position: 'single',
                                sender: 'Zoe',
                                sentTime: '15 mins ago'
                            }}
                            <Avatar
                                name="Zoe"
                                src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                            />
                            <Message.Footer sentTime={formatDistance(new Date(v.sentTime), new Date(), { addSuffix: true })} />
                        </Message>
                    ))}

                    <Message
                        model={{
                            direction: 'incoming',
                            message: 'Hello my friend',
                            position: 'last',
                            sender: 'Patrik',
                            sentTime: '15 mins ago'
                        }}
                    >
                        <Avatar
                            name="Zoe"
                            src={`https://ui-avatars.com/api/?name=${currentChat.username}&background=random`}
                        />
                    </Message>

                    <Message
                        avatarSpacer
                        model={{
                            direction: 'outgoing',
                            message: 'Hello my friend',
                            position: 'first',
                            sender: 'Zoe',
                            sentTime: '15 mins ago'
                        }}
                    />
                    <Message
                        model={{
                            direction: 'outgoing',
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

                <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend={onSend} />
            </ChatContainer>
        </MainContainer >
    )
};

export default ChatApp;