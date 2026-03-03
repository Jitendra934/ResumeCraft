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
            You are an expert technical resume writer specializing in ATS-optimized project descriptions.

            OBJECTIVE:
            Rewrite and enhance the provided project information into EXACTLY 4 strong, impact-driven resume bullet points.

            INPUT:
            Project Title: ${projectTitle}
            Tech Stack: ${techStack.join(", ")}

            CRITICAL CONTENT RULES:
            - Use ONLY verifiable project information provided elsewhere in context
            - Do NOT invent new features, metrics, tools, integrations, or outcomes
            - Do NOT assume scale, users, performance improvements, or business impact unless explicitly stated
            - Do NOT repeat the project title or tech stack in the bullets
            - Maintain technical accuracy and realistic tone

            IMPACT STRUCTURE REQUIREMENT:
            Each bullet MUST clearly include:
            1) WHAT was implemented or built
            2) HOW it was implemented (architecture, logic, tools, approach — if known)
            3) WHY it mattered or the functional impact (only if explicitly supported)

            If impact is not explicitly available, describe purpose or functional significance without fabricating results.

            FORMAT RULES:
            - Return ONLY Bullet Points
            - Generate EXACTLY 4 bullet points
            - Each bullet must be one complete sentence
            - Each bullet must start with a strong action verb
            - One bullet per line
            - Return ONLY the bullet lines
            - NO markdown
            - NO bold
            - NO headings
            - NO labels
            - NO emojis
            - NO first-person pronouns
            - NO decorative symbols (*, -, •)
            - No blank lines before or after output
            - No extra commentary

            QUALITY STANDARDS:
            - Use ATS-friendly language
            - Avoid vague phrases such as "worked on" or "responsible for"
            - Keep bullets concise but technically meaningful
            - Avoid repetition across bullets
            - Strengthen weak wording without expanding scope
            - If any rule is violated, regenerate internally and correct before output

            Now output the 4 enhanced resume bullet points.
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
            You are an expert technical resume writer specializing in ATS-optimized resumes.

            Objective:
            Rewrite and professionally enhance the provided project description into concise, impactful resume bullet points.

            INPUT:
            Project Title: ${projectTitle}
            Tech Stack: ${techStack.join(", ")}
            Existing Description:
            ${description}

            CRITICAL INSTRUCTIONS:
            - Return ONLY bullet points
            - Use ONLY the information explicitly provided in "Existing Description"
            - DO NOT add new features, technologies, metrics, or assumptions
            - DO NOT infer functionality that is not clearly mentioned
            - If information is vague, improve wording without expanding scope
            - Do NOT repeat the project title or tech stack
            - Do NOT use first-person pronouns
            - Do NOT include headings, labels, markdown, symbols, or emojis
            - Output must contain ONLY bullet sentences
            - One bullet per line
            - Each bullet must begin with a strong action verb
            - Focus on implementation details, technical contributions, and outcomes
            - Keep language ATS-friendly, concise, and professional
            - Avoid generic phrases like "worked on" or "responsible for"

            QUALITY RULES:
            - Improve clarity and technical depth without changing meaning
            - Convert weak descriptions into strong accomplishment-driven statements
            - Keep sentences direct and impact-oriented
            - Remove redundancy
            - If any rule is violated, regenerate internally and fix before outputting

            Now generate the improved resume bullet points.
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
            You are an expert technical resume writer and ATS optimization specialist.

            OBJECTIVE:
            Rewrite and professionally enhance the provided work experience into strong, impact-driven resume bullet points.

            INPUT:
            Job Title:
            ${jobTitle}

            Existing Description:
            ${jobDescription}

            CRITICAL RULES:
            - Return ONLY bullet points
            - Use ONLY the information explicitly provided in "Existing Description"
            - Do NOT invent metrics, results, tools, or responsibilities
            - Do NOT assume impact if not clearly stated
            - If impact is unclear, improve clarity without expanding scope
            - Generate exactly 5 bullet points
            - Each bullet must begin with a strong action verb
            - Each bullet must be one complete sentence
            - Focus on responsibilities, implementations, and measurable outcomes (only if explicitly mentioned)
            - Avoid vague phrases such as "worked on", "helped with", or "responsible for"
            - Do NOT use first-person pronouns (I, me, my, we)
            - Do NOT add emojis, numbering, headings, or extra commentary
            - Keep language concise, professional, and ATS-friendly
            - Avoid repetition across bullets

            QUALITY ENFORCEMENT:
            - Each bullet must clearly state WHAT was done
            - If explicitly available, include WHY it mattered or the outcome
            - Maintain realistic, non-exaggerated tone
            - Strengthen weak wording without changing meaning
            - Keep bullets medium-length (1–2 resume lines)
            - If any rule is violated, regenerate internally and correct before output

            FORMAT:
            - Return ONLY the bullet points
            - Use "-" (hyphen) at the start of each bullet
            - No text before or after the bullets

            Now generate the improved resume bullet points.
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
            You are an expert resume writer specializing in entry-level and fresher profiles.

            OBJECTIVE:
            Rewrite and professionally enhance the provided "About Me" section into a polished resume summary.

            INPUT:
            About Me:
            ${data.aboutMe}

            Skills:
            ${data.skills}

            Education:
            ${data.education}

            CRITICAL RULES:
            - Use ONLY the information explicitly provided
            - Do NOT invent achievements, tools, certifications, or experience
            - Do NOT assume professional experience if not clearly mentioned
            - Do NOT exaggerate skills or impact
            - Keep the summary suitable for a fresher / student profile
            - Maintain a confident but realistic tone
            - Do NOT use first-person pronouns (I, me, my, we)
            - Do NOT use emojis, casual language, or buzzwords
            - Avoid generic phrases such as "hardworking individual" or "passionate about everything"
            - Do NOT repeat information unnecessarily

            STRUCTURE REQUIREMENTS:
            - 2-3 concise lines
            - Write as a professional resume summary (not paragraphs with extra spacing)
            - Focus on core strengths, technical foundation, learning mindset, and career readiness
            - Incorporate relevant skills naturally without listing them
            - Keep language ATS-friendly and clean

            OUTPUT RULES:
            - Return ONLY one final polished version
            - No headings
            - No labels
            - No explanations
            - No multiple options
            - No extra text before or after

            If any rule is violated, regenerate internally and correct before output.

            Now generate the enhanced professional summary.
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