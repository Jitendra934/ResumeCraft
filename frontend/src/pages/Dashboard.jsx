import {
  FilePenLineIcon,
  FileTextIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState([]);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [isLoading, setIsLoading] = useState(false);

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post(
        "/resumes/create",
        { title },
        { headers: { Authorization: token } },
      );
      // console.log(data)
      // console.log(data.data)

      setAllResumes([...allResumes, data.data]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.data._id}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message,
      );
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } },
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.data._id}`);
    } catch (error) {
       console.log("AXIOS ERROR:", error);
       console.log("RESPONSE:", error?.response);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message,
      );
    }
    setIsLoading(false);
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.put(
        `/resumes/update-resume`,
        { resumeId: editResumeId, resumeData: { title } },
        {
          headers: { Authorization: token },
        },
      );

      setAllResumes(
        allResumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume,
        ),
      );

      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message,
      );
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume?",
      );
      if (confirm) {
        const { data } = await api.delete(`/resumes/r/${resumeId}`, {
          headers: { Authorization: token },
        });

        setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message,
      );
    }
  };

  useEffect(() => {
    if (!token) return;
    async function loadAllResumes() {
      try {
        const { data } = await api.get("/resumes/all-resumes", {
          headers: { Authorization: token },
        });
        setAllResumes(data.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error?.response?.data ||
            error.message,
        );
      }
    }

    loadAllResumes();
  }, [token]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Resumes
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Create, upload and manage your AI-powered resumes.
            </p>
          </div>
        </div>

        {/* Create + Upload Section */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {/* Create Resume */}
          <button
            onClick={() => setShowCreateResume(true)}
            className="group relative p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-indigo-100"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <PlusIcon className="size-12 p-3 bg-linear-to-br from-indigo-500 to-purple-500 text-white rounded-full group-hover:scale-110 transition" />
              <h3 className="font-semibold text-lg text-slate-800">
                Create New Resume
              </h3>
              <p className="text-sm text-slate-500">
                Start building from scratch.
              </p>
            </div>
          </button>

          {/* Upload Resume */}
          <button
            onClick={() => setShowUploadResume(true)}
            className="group relative p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <UploadCloudIcon className="size-12 p-3 bg-linear-to-br from-purple-500 to-indigo-500 text-white rounded-full group-hover:scale-110 transition" />
              <h3 className="font-semibold text-lg text-slate-800">
                Upload Existing Resume
              </h3>
              <p className="text-sm text-slate-500">
                Improve your current resume using AI.
              </p>
            </div>
          </button>
        </div>

        {allResumes.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Your Resumes
              </h2>
              <p className="text-sm text-slate-500">
                All your previously created and uploaded resumes.
              </p>
            </div>

            <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium">
              {allResumes.length}{" "}
              {allResumes.length === 1 ? "Resume" : "Resumes"}
            </span>
          </div>
        )}

        {/* Resume Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <div
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="group relative rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer p-6 flex flex-col justify-between border"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}30)`,
                  borderColor: baseColor + "40",
                }}
              >
                {/* Actions */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition flex gap-2"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-8 p-2 rounded-lg hover:bg-white/60 text-slate-700 transition"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-8 p-2 rounded-lg hover:bg-white/60 text-slate-700 transition"
                  />
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${baseColor}, ${baseColor}CC)`,
                    }}
                  >
                    <FilePenLineIcon className="size-6" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="font-semibold truncate"
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </h3>

                  <p
                    className="text-xs mt-2"
                    style={{ color: baseColor + "AA" }}
                  >
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {allResumes.length === 0 && (
          <div className="text-center mt-16">
            <h3 className="text-lg font-semibold text-slate-700">
              No resumes yet
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Click “Create New Resume” to get started.
            </p>
          </div>
        )}

        {/* ---------------- CREATE MODAL ---------------- */}
        {showCreateResume && (
          <div
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <form
              onSubmit={createResume}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-200"
            >
              <h2 className="text-xl font-bold mb-6">Create Resume</h2>

              <input
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 border rounded-lg mb-6 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <button className="w-full py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition">
                Create Resume
              </button>
            </form>
          </div>
        )}

        {/* ---------------- UPLOAD MODAL ---------------- */}
        {showUploadResume && (
          <div
            onClick={() => {
              setShowUploadResume(false);
              setResume(null);
              setTitle("");
            }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <form
              onSubmit={uploadResume}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-200 animate-fadeIn"
            >
              <h2 className="text-xl font-bold mb-6 text-slate-800">
                Upload Resume
              </h2>

              {/* Title Input */}
              <input
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* Custom File Upload */}
              <div className="mb-6">
                <label htmlFor="resume-upload" className="block cursor-pointer">
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center transition hover:border-indigo-500 hover:bg-indigo-50/40">
                    {!resume ? (
                      <div className="flex flex-col items-center gap-3 text-slate-500">
                        <UploadCloudIcon className="size-10 stroke-1.5 text-indigo-500" />
                        <p className="text-sm font-medium">
                          Click to upload your resume
                        </p>
                        <p className="text-xs text-slate-400">
                          PDF format only
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3">
                        <div className="flex items-center gap-3">
                          <FileTextIcon className="size-5 text-indigo-600" />
                          <p className="text-sm text-indigo-700 truncate max-w-45">
                            {resume.name}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setResume(null);
                          }}
                          className="text-xs text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </label>

                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={isLoading || !resume}
                className="w-full py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg flex justify-center items-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && (
                  <LoaderCircleIcon className="size-4 animate-spin" />
                )}
                {isLoading ? "Uploading..." : "Upload Resume"}
              </button>
            </form>
          </div>
        )}

        {/* ---------------- EDIT MODAL ---------------- */}
        {editResumeId && (
          <div
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <form
              onSubmit={editTitle}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-200"
            >
              <h2 className="text-xl font-bold mb-6">Edit Resume Title</h2>

              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg mb-6 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
