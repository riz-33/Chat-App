import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import ChatPage from "../pages/chat";
import { auth, onAuthStateChanged } from "../config/firebase"
import { useEffect, useState } from "react";
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function AppRouter() {
    const [User, setUser] = useState(false)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(true)
            } else {
                setUser(false)
            }
            setLoader(false)
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
                        <Route path="/" element={User ? <LoginPage /> :
                            <Navigate to={"/chatapp"} />} />
                        <Route path="/signup" element={User ? <SignupPage /> :
                            <Navigate to={"/chatapp"} />} />
                        <Route path="chatapp" element={User ? <ChatPage /> :
                            <Navigate to={"/"} />} />
                    </Routes>
                </BrowserRouter>
            }
        </>
    )
}

export default AppRouter;