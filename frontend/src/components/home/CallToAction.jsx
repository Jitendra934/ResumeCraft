import { ArrowRight } from "lucide-react";
import React from "react";

const CallToAction = () => {
  return (
    <section
      id="cta"
      className="relative w-full max-w-6xl mx-auto px-6 sm:px-12 mt-10"
    >
      {/* subtle glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)]" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur px-8 sm:px-14 py-14 shadow-sm">
        
        {/* Text */}
        <p className="text-xl sm:text-2xl font-semibold text-slate-900 max-w-xl text-center md:text-left">
          Build a Professional Resume That Helps You
          <span className="text-indigo-600"> Stand Out </span>
          and Get Hired
        </p>

        {/* CTA Button */}
        <a
          href="#"
          className="group flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3.5 text-white font-medium 
          hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <span>Get Started</span> 
          <ArrowRight className="w-4 h-4 text-white" />
        </a>
      </div>
    </section>
    
  );
};


export default CallToAction;
