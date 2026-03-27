import fs from "fs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Resume } from "../models/resume.models.js";
import { isValidObjectId } from "mongoose";
import imagekit from "../utils/imagekit.js";


const createResume = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    throw new ApiError(400, "Title is required for resume")
  }
  if (title.trim() === "") {
    throw new ApiError(400, "Title is required for resume")
  }

  const resume = await Resume.create({
    owner: req.user?._id,
    title,
  });

  const createdResume = await Resume.findById(resume?._id)
    .populate("owner", "fullName email")

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdResume,
        "Resume created successfully"
      )
    )
})

const getResumeById = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;

  if (!isValidObjectId(resumeId)) {
    throw new ApiError(400, "Invalid resume Id")
  }

  const resume = await Resume.findById(resumeId);

  if (!resume) {
    throw new ApiError(404, "Resume not found")
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        resume,
        "Resume fetched successfully"
      )
    )
})

const getAllResumesByUser = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ owner: req.user?._id });

  if (!resumes) {
    throw new ApiError(404, "No resumes found")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        resumes,
        "User resumes fetched successfully"
      )
    )
})

const deleteResume = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;

  if (!isValidObjectId(resumeId)) {
    throw new ApiError(400, "Invalid resume Id")
  }

  const resume = await Resume.exists({ _id: resumeId });

  if (!resume) {
    throw new ApiError(400, "Resume not found")
  }

  await Resume.findByIdAndDelete(resumeId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Resume deleted successfully"
      )
    )
})

const updateResume = asyncHandler(async (req, res) => {
  const image = req.file;
  const { resumeId, removeBackground } = req.body;

  // Parse resumeData (FormData sends strings)
  let resumeData = {};

  if (req.body.resumeData) {
    resumeData =
      typeof req.body.resumeData === "string"
        ? JSON.parse(req.body.resumeData)
        : req.body.resumeData;
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    owner: req.user?._id,
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  const updateData = {};

  if (image) {
    const response = await imagekit.files.upload({
      file: fs.createReadStream(image.path),
      fileName: "resume.jpg",
      folder: "user-resumes",
      transformation: {
        pre:
          "w-300,h-300,fo-face,z-0.75" +
          (removeBackground ? ",e-bgremove" : ""),
      },
    });
    fs.unlinkSync(image.path);
    updateData.personalInfo = {};
    updateData.personalInfo.image = response.url;
  }


  if (resumeData.title) updateData.title = resumeData.title;
  if (resumeData.aboutMe?.trim()) updateData.aboutMe = resumeData.aboutMe;
  if (resumeData.template) updateData.template = resumeData.template;
  if (resumeData.accent_color) updateData.accent_color = resumeData.accent_color;
  if (resumeData.skills) updateData.skills = resumeData.skills;

  if (resumeData.personalInfo) {
    updateData.personalInfo = {
      ...updateData.personalInfo,
      ...resumeData.personalInfo,
    };
  }

  if (resumeData.experience?.length) {
    updateData.experience = resumeData.experience.map((exp) => ({

      name: exp.name,
      jobTitle: exp.jobTitle,
      jobDescription: exp.jobDescription,
      responsibilities: exp.responsibilities,
      startDate: exp.startDate,
      endDate: exp.endDate,
      currentlyWorking: exp.currentlyWorking,
    }));
  }

  if (resumeData.projects?.length) {
    updateData.projects = resumeData.projects.map((project) => ({
      projectTitle: project.projectTitle,
      projectLink: project.projectLink,
      description: project.description,
      techStack: project.techStack,
    }));
  }

  if (resumeData.education?.length) {
    updateData.education = resumeData.education.map((edu) => ({
      instituteName: edu.instituteName,
      degree: edu.degree,
      field: edu.field,
      startYear: edu.startYear,
      graduationYear: edu.graduationYear,
      gpa: edu.gpa
    }));
  }

  const updatedResume = await Resume.findOneAndUpdate(
    { _id: resumeId, owner: req.user?._id },
    { $set: updateData },
    { new: true, runValidators: true }
  )
    .select("-experience.responsibilities")
    .populate("owner", "fullName email");

  return res.status(200).json(
    new ApiResponse(200, updatedResume, "Saved successfully!")
  );
});




export {
  createResume,
  getResumeById,
  deleteResume,
  updateResume,
  getAllResumesByUser,
}