import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/chat";
import LoginForm from "../pages/login";
import SignupForm from "../pages/mysignup";
import UpdateProfile from "../components/profile";
import UserProfile from "../components/user";
import User2Profile from "../components/user2";
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
                        <Route path="/updateprofile" element={User ? <UpdateProfile /> : <Navigate to={"/"} />} />
                        <Route path="/userprofile" element={User ? <UserProfile /> : <Navigate to={"/"} />} />
                        <Route path="/user2profile" element={User ? <User2Profile /> : <Navigate to={"/"} />} />
                    </Routes>
                </BrowserRouter>
            }
        </>
    )
}

export default AppRouter;