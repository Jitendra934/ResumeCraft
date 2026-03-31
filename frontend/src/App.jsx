import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Preview from "./pages/Preview";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import { useDispatch } from "react-redux";
import api from "./configs/api";
import { login, setLoading } from "./app/features/authSlice";
import {Toaster} from 'react-hot-toast';

const App = () => {
  const dispatch = useDispatch();
  const [isWakingUp, setIsWakingUp] = useState(false);

  const getUserData = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      if (token) {
        const { data } = await api.get("/users/getUser", {
          headers: { Authorization: token }
        });
        // console.log("response: ", data);
        // console.log(data.data);

        if(data.data) {
          dispatch(login({ user: data.data, token }))
        }
        dispatch(setLoading(false));
      }
      else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, [])

  useEffect(() => {
    const handleWake = () => setIsWakingUp(true);
    const handleAwake = () => setIsWakingUp(false);

    window.addEventListener("server-waking", handleWake);
    window.addEventListener("server-awake", handleAwake);

    return () => {
      window.removeEventListener("server-waking", handleWake);
      window.removeEventListener("server-awake", handleAwake);
    };
  }, []);

  return (
    <>
    <Toaster />

    {isWakingUp && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-999 
        bg-white border shadow-lg px-4 py-2 rounded-full text-sm flex items-center gap-2">
          <span className="animate-pulse">⚡</span>
          Server waking up... please wait a few seconds
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        <Route path="view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;
