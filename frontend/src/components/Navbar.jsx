import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div
      className="sticky top-0 z-50 
                    bg-linear-to-r 
                    from-indigo-700/95 via-indigo-800/95 to-blue-800/95 backdrop-blur-md
                    shadow-lg shadow-indigo-700/20"
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3 text-white">
        <Link to="/">
          <img src="/resumeCraft.svg" alt="logo" className="h-11 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <p className="max-sm:hidden text-sm font-medium text-white">
            Hi,{" "}
            {user?.fullName?.split(" ")?.[0] || "User"}
          </p>
          <button
            onClick={logoutUser}
            className="px-5 py-1.5 rounded-full text-sm font-medium
                       bg-white text-indigo-700
                       hover:bg-indigo-50
                       active:scale-95 transition-all duration-200 shadow"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
