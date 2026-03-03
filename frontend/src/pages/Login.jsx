import { Lock, Mail, User2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import api from "../configs/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = useState(urlState || "login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await api.post("/users/google", {
        token: credentialResponse.credential,
      });

      const { accessToken, refreshToken, user } = data.data;

      dispatch(login({ user, token: accessToken }));

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/app");

      toast.success("Logged in with Google");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message,
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/users/${state}`, formData);
      const { accessToken, refreshToken, user } = data.data;
      dispatch(login({ user, token: accessToken }));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/app");
      toast.success(data.message);
    } catch (error) {
      // console.log("AXIOS ERROR:", error);
      // console.log("RESPONSE:", error?.response);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message,
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("state", state);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [state]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50 relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white/80 backdrop-blur-xl border border-gray-200 
               shadow-xl shadow-indigo-100/40 rounded-2xl p-8 flex flex-col relative z-10"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            ResumeCraft
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Build smarter resumes with AI
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          {state === "login" ? "Sign In" : "Create Account"}
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2">
          {state === "login"
            ? "Welcome back! Please sign in to continue"
            : "Create your account to get started"}
        </p>

        <div className="w-full mt-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Login Failed")}
          />
        </div>

        <div className="flex items-center gap-4 w-full my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs uppercase tracking-wide text-gray-400">
            or continue with
          </span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* FULL NAME */}
        {state !== "login" && (
          <div className="relative w-full mb-4">
            <User2Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="auth-input w-full h-12 pl-11 pr-4 rounded-xl bg-gray-50 
                     border border-gray-200 focus:bg-white 
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 
                     outline-none text-sm transition-all duration-200"
              required
            />
          </div>
        )}

        {/* EMAIL */}
        <div className="relative w-full mb-4">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="auth-input w-full h-12 pl-11 pr-4 rounded-xl bg-gray-50 
                   border border-gray-200 focus:bg-white 
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 
                   outline-none text-sm transition-all duration-200"
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="relative w-full mb-4">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input w-full h-12 pl-11 pr-4 rounded-xl bg-gray-50 
                   border border-gray-200 focus:bg-white 
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 
                   outline-none text-sm transition-all duration-200"
            required
          />
        </div>

        {state === "login" && (
          <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Remember me</span>
            </div>
            <button
              type="button"
              className="hover:text-indigo-600 transition-colors"
            >
              Forgot password?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="mt-6 w-full h-12 rounded-xl bg-gradient-to-r 
                 from-indigo-600 to-blue-600 text-white font-medium 
                 shadow-md hover:shadow-lg 
                 hover:from-indigo-700 hover:to-blue-700 
                 active:scale-[0.98] transition-all duration-200"
        >
          {state === "login" ? "Sign In" : "Create Account"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-5">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            {state === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
