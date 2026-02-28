import {
  Layers,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  WandSparkles,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../configs/api";
import { useSelector } from "react-redux";
import { normalizeTextList } from "../configs/normalizeTextList"

const ProjectForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const addProject = () => {
    const newProject = {
      projectTitle: "",
      projectLink: "",
      techStack: "",
      description: "",
    };

    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const enhanceProjectDescription = async (index) => {
    try {
      setIsEnhancing(true);

      const project = data[index]; //get the particular project

      const payload = {
        projectTitle: project.projectTitle,
        description: project.description,
        techStack: normalizeTextList(project.techStack),
      };

      const response = await api.post(`/ai/enhance-project-description`, payload, {
        headers: { Authorization: token },
      });
      updateProject(index, "description", response.data.data.join("\n"));

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message,
      );
    } finally {
      setIsEnhancing(false);
    }
  };

  const generateProjectDescription = async (index) => {
    try {
      setIsGenerating(true);
      const project = data[index]; //get the particular project

      const payload = {
        projectTitle: project.projectTitle,
        techStack: normalizeTextList(project.techStack),
      };

      const response = await api.post(`/ai/generate-project-bullets`, payload, {
        headers: { Authorization: token },
      });

      // console.log(response);
      // console.log(response.data);
      updateProject(index, "description", response.data.data.join("\n"))

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>
          <p className="text-sm text-gray-500">Add your projects</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Layers className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No project added yet.</p>
          <p className="text-sm">Click "Add project" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Project #{index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid gap-3">
                <input
                  type="text"
                  placeholder="Project Name"
                  className="px-3 py-2 text-sm rounded-lg"
                  value={project.projectTitle || ""}
                  onChange={(e) =>
                    updateProject(index, "projectTitle", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Project Link"
                  className="px-3 py-2 text-sm rounded-lg"
                  value={project.projectLink || ""}
                  onChange={(e) =>
                    updateProject(index, "projectLink", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="TechStack Used(e.g., React, Node, MongoDB)"
                  className="px-3 py-2 text-sm rounded-lg"
                  value={project.techStack || ""}
                  onChange={(e) =>
                    updateProject(index, "techStack", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Project Description
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={isGenerating}
                      onClick={() => generateProjectDescription(index)}
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
                      onClick={() => enhanceProjectDescription(index)}
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
                  placeholder="Describe your project..."
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
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

export default ProjectForm;
