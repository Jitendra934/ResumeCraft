import { Loader2, Sparkles, WandSparkles } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ resumeData, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const enhanceSummary = async () => {
    try {
      setIsEnhancing(true);
      const response = await api.post(`/ai/enhance-aboutme`, resumeData, {
        headers: { Authorization: token },
      });
      // console.log(response);
      // console.log(response.data);
      setResumeData((prev) => ({ ...prev, aboutMe: response.data.data}));
    } catch (error) {
      // console.log("AXIOS ERROR:", error);
      // console.log("RESPONSE:", error?.response);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message,
      );
    } finally {
      setIsEnhancing(false);
    }
  };

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const response = await api.post(`/ai/generate-aboutme`, resumeData, {
        headers: { Authorization: token },
      });
      setResumeData((prev) => ({ ...prev, aboutMe: response.data.data }));
    } catch (error) {
      // console.log("AXIOS ERROR:", error);
      // console.log("RESPONSE:", error?.response);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">Add summary for your resume</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={isGenerating}
            onClick={generateSummary}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 className=" size-4 animate-spin" />
            ) : (
              <WandSparkles className="size-4" />
            )} 
            {isGenerating ? "Generating..." : "AI Generate"}
          </button>
          <button
            disabled={isEnhancing}
            onClick={enhanceSummary}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
          >
            {isEnhancing ? (
              <Loader2 className=" size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {isEnhancing ? "Enhancing..." : "AI Enhance"} 
          </button>
        </div>
      </div>

      <div className="mt-6">
        <textarea
          rows={7}
          value={resumeData.aboutMe || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling about professional summary that highlights your key strengths and carrer objectives..."
        />
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
