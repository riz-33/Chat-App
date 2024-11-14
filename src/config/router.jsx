import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/chat";
import { auth, onAuthStateChanged } from "./firebase";
import { useEffect, useState } from "react";
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import LoginForm from "../pages/login";
import SignupForm from "../pages/mysignup";

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
            // console.log(user);
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
                    </Routes>
                </BrowserRouter>
            }
        </>
    )
}

export default AppRouter;