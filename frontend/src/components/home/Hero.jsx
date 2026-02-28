import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');

            * {
                font-family: 'Geist', sans-serif;
              }
              h1{
                  font-family: "Urbanist", sans-serif;
                }
          `}
      </style>

      <section className="relative flex flex-col items-center max-md:px-2 bg-[#020319] pb-20 pt-5 bg-[url('https://assets.prebuiltui.com/images/components/hero-section/hero-linear-gradient.png')] bg-cover bg-center bg-no-repeat">
        <nav className="flex items-center w-full max-w-6xl justify-between text-slate-100">
          <a href="#">
            <img src="/resumeCraft.svg" alt="ResumeCraft logo" />
          </a>
          <div
            id="menu"
            className={`${mobileOpen ? "max-md:left-0" : "max-md:-left-full"} max-md:fixed max-md:bg-black/70 max-md:backdrop-blur max-md:top-0 transition-all duration-300 max-md:h-screen max-md:w-full max-md:z-50 max-md:justify-center flex-col md:flex-row flex items-center gap-2 text-sm`}
          >
            <a
              className="px-4 py-2  text-slate-100 hover:text-slate-200"
              href="#"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </a>
            <a
              className="px-4 py-2 text-slate-100 hover:text-slate-200"
              href="#features"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </a>
            <a
              className="px-4 py-2 text-slate-100 hover:text-slate-200"
              href="#testimonials"
              onClick={() => setMobileOpen(false)}
            >
              Testimonials
            </a>
            <a
              className="px-4 py-2 text-slate-100 hover:text-slate-200"
              href="#cta"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </a>
            <div className="mt-6 flex flex-col gap-3 md:hidden w-full max-w-xs">
              {/* Sign up */}
              <Link
                to="/app?state=register"
                onClick={() => setMobileOpen(false)}
                hidden={user}
              >
                <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-3 rounded-full transition">
                  Get started
                </button>
              </Link>

              {/* Login */}
              <Link
                to="/app?state=login"
                onClick={() => setMobileOpen(false)}
                hidden={user}
              >
                <button className="w-full text-white text-sm py-3 rounded-full border border-white/30 hover:bg-white/10 transition">
                  Login
                </button>
              </Link>
              
              <Link
                to="/app?state=register"
                onClick={() => setMobileOpen(false)}
                hidden={!user}
              >
                <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-3 rounded-full transition" >
                  Dashboard
                </button>
              </Link>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden bg-gray-800 hover:bg-black text-white p-2 rounded-md aspect-square font-medium transition mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <button onClick={() => setMobileOpen(true)} className="md:hidden">
            <svg
              className="size-7"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden md:flex items-center gap-3">
            {/* Login button */}
            <Link to="/app?state=login" hidden={user}>
              <button className="text-white/90 hover:text-white text-sm px-4 py-2.5 rounded-full transition cursor-pointer border border-white/20 hover:bg-white/10">
                Login
              </button>
            </Link>

            {/* Get Started button */}
            <Link to="/app?state=register" hidden={user}>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm tracking-wide px-5 py-2.5 rounded-full transition cursor-pointer">
                Get started
              </button>
            </Link>

            <Link
              to="/app"
              className="px-8 py-2 bg-indigo-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white"
              hidden={!user}
            >
              Dashboard
            </Link>
          </div>
        </nav>

        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 pr-4 mt-32 rounded-full bg-white/10 border border-white/20">
          <button className="bg-[#545BF8] border border-white/20 text-white px-3 py-1 rounded-full text-xs">
            New
          </button>
          <p className="text-xs text-gray-50">AI-powered resume builder</p>
        </div>

        <h1 className="text-4xl md:text-7xl/20 text-center font-semibold max-w-3xl mt-5 bg-linear-to-r from-[#858AFF] to-white text-transparent leading-tight bg-clip-text">
          Build an ATS-friendly resume that gets you hired
        </h1>
        <p className="text-slate-200 text-sm md:text-base/6 text-center max-w-117.5 mt-3">
          Create professional resumes in minutes using AI suggestions, smart
          formatting, and recruiter-approved templates — completely free to
          start.
        </p>

        <div className="flex items-center gap-2 mt-8 text-sm">
          <Link to="/app?state=register">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white text-sm px-6 py-3 rounded-full transition cursor-pointer">
              Get started
            </button>
          </Link>

          <div className="p-[0.5px] rounded-full bg-linear-to-r from-white to-white/60">
            <button className="text-indigo-800 hover:bg-indigo-100 text-sm px-5 py-3 rounded-full transition cursor-pointer">
              Explore resume template
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-6 text-sm md:text-base/6 text-slate-200">
          <span className="flex items-center gap-2">Ready in 5 minutes</span>

          <span className="hidden sm:block w-px h-4 bg-slate-300"></span>

          <span className="flex items-center gap-2">
            ATS-optimized templates
          </span>

          <span className="hidden sm:block w-px h-4 bg-slate-300"></span>

          <span className="flex items-center gap-2">
            Smart auto-fill from resume
          </span>
        </div>
      </section>
    </>
  );
};

export default Hero;
