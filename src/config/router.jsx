import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/chat";
import LoginForm from "../pages/login";
import SignupForm from "../pages/signup";
import UpdateProfile from "../pages/updateprofile";
import MyProfile from "../pages/myprofile";
import UserProfile from "../pages/user";
import UserInfo from "../pages/userinfo";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged, doc, getDoc, db } from "./firebase";
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function AppRouter() {
    const [User, setUser] = useState(false)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUser(true)
                }
            } else {
                setUser(false)
            }
            setLoader(false);
        })
    }, [])

    return (
        <>
            {loader ?
                <div style={{ padding: 180, textAlign: "center" }}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 90 }} spin />} />
                </div>
                :
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={User ? <Navigate to={"/chatapp"} /> : <LoginForm />} />
                        <Route path="/signup" element={User ? <Navigate to={"/chatapp"} /> : <SignupForm />} />
                        <Route path="/chatapp" element={User ? <ChatPage /> : <Navigate to={"/"} />} />
                        {/* <Route path="/newchatapp" element={<NewChatPage/>}/> */}
                        <Route path="/updateprofile" element={User ? <UpdateProfile /> : <Navigate to={"/"} />} />
                        <Route path="/myprofile" element={User ? <MyProfile /> : <Navigate to={"/"} />} />
                        <Route path="/userprofile" element={User ? <UserProfile /> : <Navigate to={"/"} />} />
                        <Route path="/userinfo" element={User ? <UserInfo /> : <Navigate to={"/"} />} />
                    </Routes>
                </BrowserRouter>
            }
        </>
    )
}

export default AppRouter;