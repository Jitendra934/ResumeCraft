import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import {useSelector} from "react-redux";
import Loader from "../components/Loader";
import Login from "./Login";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }
  // console.log("user: ",user)

  return (
    <div>
      {user ? (
        <div className="min-h-screen bg-linear-to-bl from-[#e9edff] via-[#f0e9ff] to-[#ffffff]">
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Layout;
