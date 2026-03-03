import Title from "./Title";
import { BadgeCheck, Quote } from "lucide-react";

const Testimonial = () => {
  return (
    <div
      id="testimonials"
      className="flex flex-col items-center my-10 scroll-mt-12"
    >
      <div className="flex items-center gap-2 text-sm text-indigo-800 bg-blue-400/10 border border-indigo-200 rounded-full px-4 py-1">
        <Quote className="size-4.5 stroke-indigo-600" />
        <span>Testimonials</span>
      </div>
      <Title
        title="Don't just take our words"
        description="Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mx-10">
        <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base text-slate-500">
            ResumeCraft made building a professional resume effortless. The AI suggestions improved clarity, structure, and impact without sounding generic.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <img
              className="size-12 rounded-full"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              alt="user image"
            />
            <div>
              <h2 className="flex items-center gap-2 text-base text-gray-900 font-medium">
                Richard Nelson
                <BadgeCheck className="w-4 h-4 text-blue-500 " />
              </h2>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base text-slate-500">
            An intuitive and efficient tool for students and freshers. ResumeCraft helps convert academic and project work into strong, job-ready resume content.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <img
              className="size-12 rounded-full"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
              alt="user image"
            />
            <div>
              <h2 className="flex items-center gap-2 text-base text-gray-900 font-medium">
                Mitchel Johnson
                <BadgeCheck className="w-4 h-4 text-blue-500 " />
              </h2>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base text-slate-500">
            The project and experience enhancement feature significantly improved resume quality. The formatting and wording feel tailored for real job applications.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <img
              className="size-12 rounded-full"
              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60"
              alt="user image"
            />
            <div>
              <h2 className="flex items-center gap-2 text-base text-gray-900 font-medium">
                Liam Carter
                <BadgeCheck className="w-4 h-4 text-blue-500 " />
              </h2>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base text-slate-500">
            ResumeCraft simplified the entire resume-building process. The guided sections and intelligent rewriting made the content more impactful and concise.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <img
              className="size-12 rounded-full"
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60"
              alt="user image"
            />
            <div>
              <h2 className="flex items-center gap-2 text-base text-gray-900 font-medium">
                Sophia Lee
                <BadgeCheck className="w-4 h-4 text-blue-500" />
              </h2>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base text-slate-500">
            The AI-powered recommendations helped highlight strengths and technical skills more confidently. The final resume looked clean and professionally structured.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <img
              className="size-12 rounded-full"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop"
              alt="user image"
            />
            <div>
              <h2 className="flex items-center gap-2 text-base text-gray-900 font-medium">
                Noah Patel
                <BadgeCheck className="w-4 h-4 text-blue-500" />
              </h2>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base text-slate-500">
            The platform transformed a basic draft into a polished, ATS-friendly resume within minutes. The bullet enhancement feature is incredibly effective.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <img
              className="size-12 rounded-full"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png"
              alt="user image"
            />
            <div>
              <h2 className="flex items-center gap-2 text-base text-gray-900 font-medium">
                Oliver Brooks
                <BadgeCheck className="w-4 h-4 text-blue-500" />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
