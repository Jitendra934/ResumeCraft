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
            Radiant made undercutting all of our competitors an absolute breeze.
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
              <p className="text-gray-500">CTO, Slack</p>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base text-slate-500">
            This platform helped us launch our product twice as fast as
            expected.
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
              <p className="text-gray-500">Product Manager</p>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base text-slate-500">
            Incredible support and a fantastic experience from start to finish.
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
              <p className="text-gray-500">CEO, BrightTech</p>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base text-slate-500">
            Our team’s productivity skyrocketed after switching to this
            solution.
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
              <p className="text-gray-500">Engineering Lead</p>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base text-slate-500">
            A seamless integration that saved us countless developer hours.
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
              <p className="text-gray-500">CTO, DevWorks</p>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base text-slate-500">
            The user experience is outstanding and setup was a breeze.
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
              <p className="text-gray-500">Marketing Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
