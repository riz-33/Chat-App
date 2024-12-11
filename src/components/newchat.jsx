import {
    ChatContainer, MessageList, Message, MessageInput, Avatar, ConversationHeader, MessageSeparator, MainContainer,
    Sidebar, Conversation, ConversationList, Search, EllipsisButton, TypingIndicator
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useEffect, useContext, useState, useCallback, } from 'react';
import { TbLogout2 } from "react-icons/tb";
import {
    db, addDoc, doc, collection, serverTimestamp, updateDoc, onSnapshot, query, orderBy, getDocs, where, signOut, auth
} from '../config/firebase';
import { useSearchParams, useNavigate } from 'react-router-dom';
import User from '../context/user';
import { message } from 'antd';

function NewChatApp() {
    const [messageInputValue, setMessageInputValue] = useState("")
    const [chats, setChats] = useState([])
    const [chatMessages, setChatMessages] = useState([])
    const [currentChat, setCurrentChat] = useState({})
    const user = useContext(User).user
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const chatIdParam = searchParams.get('chatId');

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
        await updateDoc(doc(db, "users", currentChat.uid), {
            [`lastMessages.${chatId(currentChat.uid)}`]: {
                lastMessage: messageInputValue,
                chatId: chatId(currentChat.uid)
            }
        });
        await updateDoc(doc(db, "users", user.uid), {
            [`lastMessages.${chatId(currentChat.uid)}`]: {
                lastMessage: messageInputValue,
                chatId: chatId(currentChat.uid)
            }
        });
    }

    const getAllUsers = async () => {
        const q = query(collection(db, "users"), where("email", "!=", user.email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                const user = { ...doc.data(), id: doc.id }
                users.push(user)

            });
            setChats(users)
        })
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    const handleConversationClick = useCallback(() => {
    }, [])


    const getAllMessages = async () => {
        const q = query(collection(db, "messages"), where("chatId", "==", chatId(currentChat.uid)),
            orderBy("timeStamp", "asc"));
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

    const handleClick = () => {
        console.log("Button clicked!");
        navigate(`/userprofile?${searchParams}`)
    };

    const myProfile = () => {
        console.log("Button clicked!");
        navigate(`/myprofile?${user.uid}`)
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
                    <Avatar style={{ cursor: 'pointer' }}
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
                    {chats.map((v) => {
                        return (
                            <Conversation style={{
                                backgroundColor: searchParams.get("chatId") === v.id ?
                                    "#c6e3fa" : ""
                            }} key={v.id} onClick={() => {
                                handleConversationClick()
                                setCurrentChat(v)
                                searchParams.set("chatId", v.id)
                                navigate(`/newchatapp?${searchParams}`)
                            }
                            }>
                                <Conversation.Content
                                    info={v?.lastMessages?.[chatId(v.id)]?.lastMessage || ""}
                                    name={v.username}
                                />
                                <Avatar
                                    name={v.username}
                                    src={v.photo || v.photo !== null ? v.photo :
                                        `https://ui-avatars.com/api/?name=${v.username}&background=random`}
                                // status="available"
                                />
                            </Conversation>
                        )
                    })}
                </ConversationList>
            </Sidebar>

            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Back />
                    <Avatar
                        name={currentChat.username}
                        src={currentChat.photo || currentChat.photo !== null ? currentChat.photo :
                            `https://ui-avatars.com/api/?name=${currentChat.username}&background=random`}
                    />
                    <ConversationHeader.Content
                        // info="Active 10 mins ago"
                        userName={currentChat.username}
                    />
                    <ConversationHeader.Actions>
                        <EllipsisButton orientation="vertical" onClick={handleClick} />
                    </ConversationHeader.Actions>
                </ConversationHeader>

                <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
                    <MessageSeparator content="Saturday, 30 November 2019" />
                    {chatMessages.map((v, i) => (
                        <Message key={i} model={v}></Message>
                    ))}
                </MessageList>

                <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val =>
                    setMessageInputValue(val)} onSend={onSend} />

            </ChatContainer>
        </MainContainer>
    )
};

export default NewChatApp;