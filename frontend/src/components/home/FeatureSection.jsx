import { CheckCircle, FileUp, Sparkles, Zap } from "lucide-react";
import React from "react";
import Title from "./Title";

const FeatureSection = () => {
  const [isHover, setIsHover] = React.useState(false);
  return (
    <div
      id="features"
      className="flex flex-col items-center my-10 scroll-mt-12"
    >
        {/*Badge */}
      <div className="flex items-center gap-2 text-sm text-indigo-800 bg-blue-400/10 border border-indigo-200 rounded-full px-4 py-1">
        <Zap width={14}/>
        <span>Simple Process</span>
      </div>

      <Title title="Build your resume" description="Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features."/>

      <div className="flex flex-col md:flex-row items-center justify-center xl:-mt-10">
        <img
          className="max-w-2xl w-full xl:-ml-32"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt=""
        />
        <div
          className="px-4 md:px-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            className={
              "flex items-center justify-center gap-6 max-w-md group cursor-pointer"
            }
          >
            <div
              className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300  flex gap-4 rounded-xl transition-colors ${!isHover ? "border-violet-300 bg-violet-100" : ""}`}
            >
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  AI-Powered Resume Writing
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Generate impactful summaries, experience bullet points, and skills tailored to your job role using smart AI assistance.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">
              <FileUp className="w-6 h-6 text-blue-600" />
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Smart Resume Autofill
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Upload an existing resume and instantly populate all sections with clean, editable data—no manual copy-paste.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
              <CheckCircle className="w-6 h-6 text-orange-500" />
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  ATS-Optimized Templates
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Choose from modern, recruiter-approved templates designed to pass applicant tracking systems effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
    </div>
  );
};

export default FeatureSection;
