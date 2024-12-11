import {
    ChatContainer, MessageList, Message, MessageInput, VoiceCallButton, VideoCallButton, TypingIndicator,
    Avatar, ConversationHeader, MessageSeparator, MainContainer, Sidebar, Conversation, ConversationList,
    Search, EllipsisButton
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useCallback, useEffect, useContext, useState, } from 'react';
import { formatDistance } from 'date-fns';
import { TbLogout2 } from "react-icons/tb";
import {
    db, addDoc, doc, collection, serverTimestamp, updateDoc, onSnapshot, query, orderBy, getDocs, getDoc, where,
    signOut, auth
} from '../config/firebase';
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import User from '../context/user';
import { useDebounce } from 'use-debounce'
import UpdateProfile from './updateprofile';

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
    const user = useContext(User).user
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const chatIdParam = searchParams.get('chatId');
    const [value] = useDebounce(messageInputValue, 2000);

    const logOut = () => {
        signOut(auth)
    }

    const chatId = () => {
        let id = "";
        if (user.uid < currentChat.uid) {
            id = `${user.uid}${currentChat.uid}`
        }
        else {
            id = `${currentChat.uid}${user.uid}`
        }
        return id;
    }

    const onSend = async () => {
        setMessageInputValue("")
        await addDoc(collection(db, "messages"), {
            message: messageInputValue,
            sentTime: new Date().toISOString(),
            sender: user.uid,
            receiver: currentChat.uid,
            senderName: user.username,
            receiverName: currentChat.username,
            chatId: chatId(),
            timeStamp: serverTimestamp()
        });
        await updateDoc(doc(db, "users", user.uid), {
            lastMessage: messageInputValue
        });

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
    }

    const handleBackClick = () => setSidebarVisible(!sidebarVisible);

    const handleConversationClick = useCallback(() => {
        if (sidebarVisible) {
            setSidebarVisible(false);
        }
    }, [sidebarVisible, setSidebarVisible])

    const getAllUsers = async () => {
        if (!user || !user.email) {
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
            searchParams.set("chatId", users[0].id)
            navigate(`/chatapp?${searchParams}`)
            setCurrentChat(users[0])
            setChats(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, [user]);


    const setTyping = async (typing) => {
        if (!currentChat || !user) {
            console.error("currentChat or user is undefined");
            return;
        }

        const chatIdValue = chatId(currentChat.uid);
        if (!chatIdValue) {
            console.error("Invalid chatId value:", chatIdValue);
            return;
        }

        const typingPath = `isTyping.${chatIdValue}.${user.uid}`;
        try {
            await updateDoc(doc(db, "users", currentChat.uid), { [typingPath]: typing });
            await updateDoc(doc(db, "users", user.uid), { [typingPath]: typing });
        } catch (error) {
            console.error("Failed to update typing status:", error);
        }
    };

    useEffect(() => {
        if (!currentChat || !user) return;

        const isTyping = messageInputValue && messageInputValue !== value;
        const debounce = setTimeout(() => {
            setTyping(isTyping);
        }, 2000);

        return () => clearTimeout(debounce);
    }, [messageInputValue, value]);


    // const setTyping = async (typing) => {
    //     const isTyping = currentChat?.isTyping?.[chatId(currentChat.uid)]?.[user.uid];
    //     console.log("isTyping", isTyping)
    //     if (!isTyping && typing) {
    //         console.log("api call")
    //         await updateDoc(doc(db, "users", currentChat.uid), {
    //             [`isTyping.${chatId(currentChat.uid)}.${user.uid}`]: typing
    //         });
    //         await updateDoc(doc(db, "users", user.uid),  {
    //             [`isTyping.${chatId(currentChat.uid)}.${user.uid}`]: typing
    //         });
    //     }
    //     if (!typing) {
    //         await updateDoc(doc(db, "users", currentChat.uid), {
    //             [`isTyping.${chatId(currentChat.uid)}.${user.uid}`]: typing
    //         });
    //         await updateDoc(doc(db, "users", user.uid), {
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


    const getAllMessages = async () => {
        const q = query(collection(db, "messages"), where("chatId", "==", chatId(currentChat.uid)), orderBy("timeStamp", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({
                    ...doc.data(),
                    id: doc.id,
                    direction: doc.data().sender === user.uid ? "outgoing" : "incoming"
                })
            });
            setChatMessages(messages)
        });
    }

    useEffect(() => {
        getAllMessages()
    }, [currentChat])

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

    const isTyping = currentChat?.isTyping?.[chatId(currentChat.uid)]?.[currentChat.uid];
    console.log(isTyping)

    const handleClick = () => {
        console.log("Button clicked!");
        navigate (`/userprofile?${searchParams}`)
    };

    const myProfile = () => {
        console.log("Button clicked!");
        navigate (`/myprofile?${user.uid}`)
    };

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
                    <Avatar style={{cursor: 'pointer'}}
                        name={"Zoe"}
                        src={user.photo || user.photo !== null ? user.photo :
                            `https://ui-avatars.com/api/?name=${user.username}&background=random`}
                            onClick={myProfile}
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
                        <Conversation style={{ backgroundColor: searchParams.get("chatId") === v.id ? "#c6e3fa" : "" }} key={v.id} onClick={() => {
                            handleConversationClick()
                            setCurrentChat(v)
                            searchParams.set("chatId", v.id)
                            navigate(`/chatapp?${searchParams}`)
                        }}>
                            <Conversation.Content
                                info={v?.lastMessages?.[chatId(v.id)]?.lastMessage || ""}
                                // lastSenderName={v.username}
                                name={v.username}
                            />

                            <Avatar
                                name={v.username}
                                src={v.photo || v.photo !== null ? v.photo :
                                    `https://ui-avatars.com/api/?name=${v.username}&background=random`}
                            // src={`https://ui-avatars.com/api/?name=${v.username}&background=random`}
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
                        src={currentChat.photo || currentChat.photo !== null ? currentChat.photo :
                            `https://ui-avatars.com/api/?name=${currentChat.username}&background=random`}
                    // src={`https://ui-avatars.com/api/?name=${currentChat.username}&background=random`}
                    />
                    <ConversationHeader.Content
                        info="Active 10 mins ago"
                        userName={currentChat.username}
                    />
                    <ConversationHeader.Actions>
                        {/* <VoiceCallButton /> */}
                        {/* <VideoCallButton /> */}
                        <EllipsisButton orientation="vertical" onClick={handleClick} />
                    </ConversationHeader.Actions>
                </ConversationHeader>

                <MessageList typingIndicator={
                    !isTyping ?
                        <TypingIndicator content="Zoe is typing" /> : false}>
                    {/* <MessageList> */}
                    <MessageSeparator content="Saturday, 30 November 2019" />
                    {chatMessages.map((v, i) => (
                        <Message key={i} model={v}>
                            {/* <Avatar */}
                            {/* name="Zoe" */}
                            {/* src={`https://ui-avatars.com/api/?name=${user.uid === v.sender ? user.username : */}
                            {/* currentChat?.username}&background=random`} */}
                            {/* /> */}
                            {/* <Message.Footer sentTime={formatDistance(new Date(v.sentTime), new Date(), { addSuffix: true })} /> */}
                        </Message>
                    ))}
                </MessageList>

                <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend={onSend} />
            </ChatContainer>
        </MainContainer >
    )
};

export default ChatApp;