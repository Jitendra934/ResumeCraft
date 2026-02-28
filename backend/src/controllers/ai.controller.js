import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Resume } from "../models/resume.models.js";
import { genAI } from "../config/gemini.js";


const geminiModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

const normalizeBulletPoints = (text) =>
    text
        .split("\n")
        .map((line) => line.replace(/^[-•*]\s*/, "").trim())
        .filter(Boolean)


const generateProjectBulletPoints = asyncHandler(async (req, res) => {
    try {
        const { projectTitle, techStack } = req.body;

        if (!projectTitle || !Array.isArray(techStack) || techStack.length === 0) {
            throw new ApiError(400, "Project title and techStack are required to generate a proper description")
        }

        const prompt = `
            You are a professional resume writer.

            Task:
            
            Rewrite and enhance the following project description into EXACTLY 4 resume bullet points.
            Input:
            Project Title: ${projectTitle}
            Tech Stack: ${techStack.join(", ")}

            STRICT OUTPUT RULES:
            - Return ONLY bullet points
            - NO markdown
            - NO bold (**)
            - NO headings
            - NO labels
            - NO symbols (*, -, •)
            - NO emojis
            - NO first-person pronouns
            - Do NOT repeat project title or tech stack
            - Do NOT add new features or assumptions
            - Use strong action verbs
            - One bullet per line
            - ATS-friendly language
            - Concise and professional

            FORMAT ENFORCEMENT:
            - Each bullet must be a single complete sentence
            - No prefixes, suffixes, or decorative characters
            - No blank lines before or after output

            FAILURE HANDLING:
            If any rule above is violated, regenerate the response silently and correct all issues.

            Now output the 4 resume bullet points.
            `;

        const result = await geminiModel.generateContent(prompt);
        const bullets = normalizeBulletPoints(result.response.text());

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    bullets,
                    "Bullet points generated successfully"
                )
            )
    } catch (error) {
        console.log("Gemini Error: ", error);
        console.log("Error : ", error.message);
        throw new ApiError(500, "Failed to generate bullet points")
    }
})

const generateExperienceBulletPoints = asyncHandler(async (req, res) => {
    try {
        const { jobTitle, responsibilities } = req.body;

        if (!jobTitle || !responsibilities) {
            throw new ApiError(400, "Job title and responsibilities are required to generate a proper description.")
        }

        const prompt = `
            You are a professional ATS resume writer and formatter.

            ROLE:
            Generate resume bullet points that pass applicant tracking systems and hiring manager screening.

            TASK:
            Rewrite the job responsibilities below into EXACTLY 4 high-quality resume bullet points.

            INPUT DATA:
            Job Title: ${jobTitle}
            Responsibilities:
            ${responsibilities}

            STRICT OUTPUT RULES:
            - Return ONLY bullet points
            - NO markdown
            - NO bold (**)
            - NO headings
            - NO labels
            - NO symbols (*, -, •)
            - NO emojis
            - NO first-person pronouns
            - Do NOT repeat project title or tech stack
            - Do NOT add new features or assumptions
            - Use strong action verbs
            - One bullet per line
            - ATS-friendly language
            - Concise and professional

            QUALITY REQUIREMENTS:
            - Each bullet should explain WHAT was done and WHY it mattered
            - Include scope, purpose, or outcome where possible
            - Aim for medium-length bullets (1-1.5 lines on a resume)
            - Prefer clarity and professionalism over brevity


            FORMAT ENFORCEMENT:
            - Each bullet must be a single complete sentence
            - No prefixes, suffixes, or decorative characters
            - No blank lines before or after output

            FAILURE HANDLING:
            If any rule above is violated, regenerate the response silently and correct all issues.

            Now output the 4 resume bullet points.
        `;

        const result = await geminiModel.generateContent(prompt);
        const bullets = normalizeBulletPoints(result.response.text());

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    bullets,
                    "Bullet point generated successfully"
                )
            )
    } catch (error) {
        console.error(" DEBUG GEMINI ERROR:", error);
        console.error(" ERROR MESSAGE:", error?.message);
        console.error(" ERROR STACK:", error?.stack);
        console.log("Gemini Error: ", error);
        console.log("Error : ", error.message);
        throw new ApiError(500, "Failed to generate bullet points")
    }
})

const generateAboutMe = asyncHandler(async (req, res) => {
    try {
        const data = req.body;

        const skills = Array.isArray(data.skills)
            ? data.skills.join(", ")
            : data.skills || "Not provided";

        const education = data.education
            ? JSON.stringify(data.education)
            : "Not provided";

        const prompt = `
            Write a concise, professional "About Me" section for a resume using the details below.

            Skills:
            ${skills}

            Education:
            ${education}

            Guidelines:
            - 2-3 short, impactful lines
            - Professional, confident, and realistic (no exaggeration)
            - Suitable for a fresher / student profile
            - No first-person pronouns (no "I", "my", "me")
            - No emojis or casual language
            - Do NOT mention GPA, grades, percentages, or academic scores
            - Focus on strengths, learning mindset, and career readiness
            - Output only one polished final version (no alternatives, no explanations)
        `;
        // console.log("skills:", skills);
        // console.log("education:", education);
        // console.log(" PROMPT:", prompt);

        const result = await geminiModel.generateContent(prompt);

        // console.log(" GEMINI RAW RESULT:", result);

        const text = result.response.text();

        // console.log(" GENERATED TEXT:", text);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    text,
                    "About me generated successfully"
                )
            )
    } catch (error) {
        console.log("Gemini Error: ", error);
        console.log("Error : ", error.message);
        throw new ApiError(500, "Failed to generate bullet points")
    }
})

const enhanceProjectDescription = asyncHandler(async (req, res) => {
    try {
        const { projectTitle, techStack, description } = req.body;

        if (!projectTitle || !Array.isArray(techStack) || !description) {
            throw new ApiError(400, "Project title, techStack and description are required to enhance project description")
        }

        const prompt = `
            You are a professional resume writer.

            Task:
            
            Rewrite and enhance the following project description into EXACTLY 5 resume bullet points.
            Input:
            Project Title: ${projectTitle}
            Tech Stack: ${techStack.join(", ")}
            Existing Description:${description}

            STRICT OUTPUT RULES:
            - Return ONLY bullet points
            - NO markdown
            - NO bold (**)
            - NO headings
            - NO labels
            - NO symbols (*, -, •)
            - NO emojis
            - NO first-person pronouns
            - Do NOT repeat project title or tech stack
            - Do NOT add new features or assumptions
            - Use strong action verbs
            - One bullet per line
            - ATS-friendly language
            - Concise and professional

            FORMAT RULES:
            - One bullet per line
            - Bullets must describe accomplishments and implementations only
            - - If any rule is violated, regenerate silently and fix it.

            Now generate the enhanced bullet points.
            `;

        const result = await geminiModel.generateContent(prompt);
        const bullets = normalizeBulletPoints(result.response.text());


        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    bullets,
                    "Project description enhanced successfully"
                )
            )
    } catch (error) {
        console.log("Gemini Error: ", error);
        console.log("Error : ", error.message);
        throw new ApiError(500, "Failed to enhance project description")
    }
})

const enhanceExperienceDescription = asyncHandler(async (req, res) => {
    try {
        const { jobTitle, jobDescription } = req.body;

        if (!jobTitle || !jobDescription) {
            throw new ApiError(400, "Job title and description are required to enhance description")
        }

        const prompt = `
            You are a professional resume writer and ATS optimization expert.

            Task:
            Rewrite and enhance the following work experience description for a resume.

            Job Title:
            ${jobTitle}

            Existing Description:
            ${jobDescription}

            Output Requirements:
            - Generate exactly 5 bullet points
            - Each bullet must start with a strong action verb
            - Focus on impact, responsibilities, and results (only if explicitly mentioned)
            - Keep language professional and concise
            - Use ATS-friendly keywords where relevant
            - Do NOT use first-person pronouns (I, me, my, we)
            - Do NOT add emojis, numbering, or headings
            - Do NOT invent or assume missing information
            - Avoid filler words and vague phrases
            - Each bullet should be one sentence only

            QUALITY REQUIREMENTS:
            - Each bullet should explain WHAT was done and WHY it mattered
            - Include scope, purpose, or outcome where possible
            - Aim for medium-length bullets (1-2 lines on a resume)
            - Prefer clarity and professionalism over brevity

            Formatting Rules:
            - Return only the bullet points
            - Use "-" (hyphen) for each bullet
            - No extra text before or after the bullets
        `;

        const result = await geminiModel.generateContent(prompt);
        const bullets = normalizeBulletPoints(result.response.text());

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    bullets,
                    "Experience description enhanced successfully"
                )
            )
    } catch (error) {
        console.log("Gemini Error: ", error);
        console.log("Error : ", error.message);
        throw new ApiError(500, "Failed to enhance experience description")
    }
})

const enhanceAboutMe = asyncHandler(async (req, res) => {
    try {
        const data = req.body;

        if (!data?.aboutMe) {
            throw new ApiError(400, "aboutMe is required to enhance");
        }

        const prompt = `
            Rewrite and enhance the following about me for a resume
            About me: ${data.aboutMe}
            Skills: ${data.skills}
            Education: ${data.education}
        
            Rules:
            - 2-3 lines
            - Professional, confident, and realistic (no exaggeration)
            - Suitable for a fresher / student profile
            - No first-person pronouns (no "I", "my", "me")
            - No emojis or casual language

            - Focus on strengths, learning mindset, and career readiness
            - Output only one polished final version (no alternatives, no explanations)
        `;

        const result = await geminiModel.generateContent(prompt);
        const enhancedText = result.response.text().trim();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    enhancedText,
                    "About Me enhanced successfully"
                )
            )
    } catch (error) {
        console.log("Gemini Error: ", error);
        console.log("Error : ", error.message);
        throw new ApiError(500, "Failed to enhance about me")
    }
})

const uploadResume = asyncHandler(async (req, res) => {
    const { title, resumeText } = req.body;

    const owner = req.user?._id;

    if (!resumeText) {
        throw new ApiError(400, "Missing required fields")
    }

    const prompt = `
        You are an expert AI Agent to extract data from resume.

        Return ONLY raw JSON.
        Do NOT include explanations.
        Provide data in the following JSON format with no additional text before or after:
            {
                personalInfo: {
                    image: {
                        type: String, 
                        default: ""
                    },
                    fullName: {
                        type: String,
                        trim: true,
                        default: ""
                    },
                    email: {
                        type: String,
                        lowercase: true,
                        trim: true,
                        default: ""
                    },
                    phoneNumber: {
                        type: String,
                        default: "",
                        match: [/^\d{10,15}$/, "Phone Number must be between 10-15 digits"]
                    },
                    location: {
                        type: String,
                        default: ""
                    },
                    linkedInUrl: {
                        type: String,
                        default: "",
                        match: [/^https?:\/\/.+/, "Invalid LinkedIn URL"]
                },
                },
        
                education: [
                    {
                        instituteName: {
                            type: String,
                        },
                        degree: {
                            type: String,
                        },
                        field: {
                            type: String
                        },
                        startYear: {
                            type: Number,
                            min: 1950,
                            max: new Date().getFullYear() + 5
                        },
                        graduationYear: {
                            type: Number,
                            validate: {
                                validator: function(value) {
                                    return value >= startYear;
                                },
                                message: "Graduation year must be greater than or equal to start year"
                            }
                        },
                        gpa: {
                            type: String,
                        }
                    }
                ],
        
                projects: [
                    {
                        projectTitle: {
                            type: String,
                            default: ""
                        },
                        projectLink: {
                            type: String,
                            match: [/^https?:\/\/.+/, "Invalid project link"]
                        },
                        techStack: {
                            type: [String],
                            default: ""
                        },
                        description: {
                            type: [String],
                            default: "",
                        }
                    }
                ],
        
                experience: [
                    {
                        name: {
                            type: String,
                            trim: true
                        },
                        jobTitle: {
                            type: String,
                            trim: true
                        },
                        location: {
                            type: String,
                        },
                        responsibilities: {
                            type: [String],
                            default: []
                        },
                        jobDescription: {
                            type: [String],
                            validate: {
                                validator: (arr) => arr.length > 0,
                                message: "Experience description must have at least one bullet point"
                            }
                        },
                        startDate: {
                            type: Date,
                            set: normalizeMonthYear
                        },
                        endDate: {
                            type: Date,
                            set: normalizeMonthYear,
                            validate: {
                                validator: function (value) {
                                    return !value || value >= this.startDate
                                },
                                message: "End date cannot be before start date"
                            }
                        },
                        currentlyWorking: {
                            type: Boolean,
                            default: false
                        }
                    }
                ],
        
                skills: {
                    type: [String],
                },
        
                aboutMe: {
                    type: String,
                    default: "",
                    trim: true,
                },
            }

    Resume Text:
    """${resumeText}"""
    `;

    const result = await geminiModel.generateContent(prompt);
    const rawText = result.response.text();

    // Remove ```json and ``` fences
    const cleanedText = rawText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    let parsedData;
    try {
        parsedData = JSON.parse(cleanedText);
    } catch (err) {
        console.error("AI RAW RESPONSE:", rawText);
        throw new ApiError(500, "AI returned invalid JSON");
    }
    const newResume = await Resume.create({ owner, title, ...parsedData });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                newResume,
                "Resume uploaded successfully"
            )
        )
})

export {
    generateProjectBulletPoints,
    generateExperienceBulletPoints,
    generateAboutMe,
    enhanceProjectDescription,
    enhanceExperienceDescription,
    enhanceAboutMe,
    uploadResume
}