import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import ChatPage from "../pages/chat";
import { auth, onAuthStateChanged } from "./firebase";
import { useEffect, useState } from "react";
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Login from "../components/newlogin";
import SignUp from "../components/newsignup";

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
            console.log(user);
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
                    <Route path="/" element={User ? <Navigate to={"/chatapp"} /> : <Login />} />

                        {/* <Route path="/" element={User ? <Navigate to={"/chatapp"} /> : <LoginPage />} /> */}
                        <Route path="/signup" element={User ? <Navigate to={"/chatapp"} /> : <SignUp />} />
                        <Route path="chatapp" element={User ? <ChatPage /> : <Navigate to={"/"} />} />
                    </Routes>
                </BrowserRouter>
            }
        </>
    )
}

export default AppRouter;