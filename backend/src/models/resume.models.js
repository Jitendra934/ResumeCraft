import mongoose from "mongoose";



const resumeSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true,
            default: "Untitled_resume"
        },

        template: {
            type: String,
            default: "classic"
        },

        accent_color: {
            type: String,
            default: "#3B82F6"
        },

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
                    type: String,
                },
                graduationYear: {
                    type: String,
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
                },
                projectLink: {
                    type: String,
                    match: [/^https?:\/\/.+/, "Invalid project link"]
                },
                techStack: {
                    type: [String],
                },
                description: {
                    type: [String],
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
                    type: String
                },
                endDate: {
                    type: String,
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

    },
    { timestamps: true }
)

//Every subdocument inside an array automatically gets its own _id
export const Resume = mongoose.model("Resume", resumeSchema)