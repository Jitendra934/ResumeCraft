import {
  Briefcase,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  WandSparkles,
} from "lucide-react";
import { useSelector } from "react-redux";
import { normalizeResponsibilities } from "../configs/normalizeResponsibilities";
import api from "../configs/api";
import toast from "react-hot-toast";
import { useState } from "react";

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const addExperience = () => {
    const newExperience = {
      name: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      jobDescription: "",
      responsibilities: "",
      currentlyWorking: false,
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const enhanceExperienceDescription = async (index) => {
    try {
      setIsEnhancing(true);

      const experience = data[index]; //get the particular experience

      const payload = {
        jobTitle: experience.jobTitle,
        jobDescription: experience.jobDescription,
      };

      console.log("DATA PASSED TO AI", experience);

      const response = await api.post(
        `/ai/enhance-experience-description`,
        payload,
        {
          headers: { Authorization: token },
        },
      );
      updateExperience(index, "jobDescription", response.data.data.join("\n"));
    } catch (error) {
      console.log("AXIOS ERROR:", error);
      console.log("RESPONSE:", error?.response);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message,
      );
    } finally {
      setIsEnhancing(false);
    }
  };

  const generateExperienceDescription = async (index) => {
    try {
      setIsGenerating(true);
      const experience = data[index]; //get the particular experience

      const payload = {
        jobTitle: experience.jobTitle,
        responsibilities: normalizeResponsibilities(
          experience.responsibilities,
        ),
      };

      console.log("DATA PASSED TO AI", experience);

      const response = await api.post(
        `/ai/generate-experience-bullets`,
        payload,
        {
          headers: { Authorization: token },
        },
      );

      updateExperience(index, "jobDescription", response.data.data.join("\n"));
    } catch (error) {
      console.log("AXIOS ERROR:", error);
      console.log("RESPONSE:", error?.response);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">Add your job experience</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Experience #{index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm rounded-lg"
                  value={experience.name || ""}
                  onChange={(e) =>
                    updateExperience(index, "name", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Job Title"
                  className="px-3 py-2 text-sm rounded-lg"
                  value={experience.jobTitle || ""}
                  onChange={(e) =>
                    updateExperience(index, "jobTitle", e.target.value)
                  }
                />

                <input
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg"
                  value={experience.startDate || ""}
                  onChange={(e) =>
                    updateExperience(index, "startDate", e.target.value)
                  }
                />

                <input
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                  value={experience.endDate || ""}
                  onChange={(e) =>
                    updateExperience(index, "endDate", e.target.value)
                  }
                  disabled={experience.currentlyWorking}
                />
              </div>

              <textarea
                rows={4}
                type="text"
                placeholder="Key responsibilities (e.g., Designed frontend, integrated backend)"
                className="w-full px-3 py-2 text-sm rounded-lg resize-none"
                value={
                  Array.isArray(experience.responsibilities)
                    ? experience.responsibilities.join(", ")
                    : experience.responsibilities
                }
                onChange={(e) =>
                  updateExperience(index, "responsibilities", e.target.value)
                }
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.currentlyWorking || false}
                  onChange={(e) => {
                    updateExperience(
                      index,
                      "currentlyWorking",
                      e.target.checked ? true : false,
                    );
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={isGenerating}
                      onClick={() => generateExperienceDescription(index)}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <Loader2 className=" size-4 animate-spin" />
                      ) : (
                        <WandSparkles className="size-4" />
                      )}
                      {isGenerating ? "Generating..." : "AI Generate"}
                    </button>
                    <button
                      disabled={isGenerating}
                      onClick={() => enhanceExperienceDescription(index)}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
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
                <textarea
                  rows={4}
                  className="w-full text-sm px-3 py-2 rounded-lg resize-none"
                  placeholder="Describe your key responsibilities and achievements..."
                  value={experience.jobDescription || ""}
                  onChange={(e) =>
                    updateExperience(index, "jobDescription", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
