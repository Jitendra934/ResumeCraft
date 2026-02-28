import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = () => {

  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutUser = () => {
    navigate("/")
    dispatch(logout())
  }

  return (
    <div className="shadow bg-linear-to-r from-purple-400 via-violet-400 to-indigo-400">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5text-slate-800 transition-all">
        <Link to="/">
          <img src="/resumeCraft.svg" alt="logo" className="h-11 w-auto" />
        </Link>
        <div className="flex items-center gap-4 text-sm ">
          <p className="max-sm:hidden text-sm font-medium text-white">Hi , {user?.fullName}</p>
          <button
            onClick={logoutUser}
            className= "bg-linear-to-r from-white to-white/60 text-indigo-800 border border-indigo-200 hover:bg-indigo-50 px-7 py-1.5 rounded-full active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
