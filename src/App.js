import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import Todo from "./components/todo";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./store/slice";
import { auth } from "./firebaseConfig";
import Loader from "./components/loader";


const App = () => {
    const location = window && window.location.pathname;
    const showUser = useSelector((state) => state.todo.user);
    const showLoader = useSelector((state) => state.todo.loader);
    const dispatch = useDispatch()
    onAuthStateChanged(auth, (data) => {
        dispatch(setUser(data?.uid ? data.uid : ""))
    })

    return (
        <>
            <BrowserRouter>
                {
                    showUser === ""
                        ?
                        <Routes>
                            <Route path="/" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/todo" element={<Navigate to={'/'} />} />
                            <Route path={location} element={<Navigate to={'/'} />} />
                        </Routes>
                        :
                    showUser == 'loading'?
                    <Loader />
                    :
                        <Routes>
                            <Route path="/todo" element={<Todo />} />
                        </Routes>
                }
            </BrowserRouter>
        </>
    )
}

export default App;
