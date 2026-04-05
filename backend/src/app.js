import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", 1);

app.use(express.json()) // express.json parses incoming requests with JSON payloads.
app.use(express.urlencoded({ extended: true })) // express.urlencoded parses incoming requests with URL - encoded payloads.
app.use(express.static("public")) // express.static serves static assets such as HTML files, images, and so on.
app.use(cookieParser())

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("API is running...");
});

import userRouter from "./routes/user.routes.js"
import resumeRouter from "./routes/resume.routes.js"
import aiRouter from "./routes/ai.routes.js"
import pdfRouter from "./routes/pdf.routes.js"

//routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/resumes", resumeRouter)
app.use("/api/v1/ai", aiRouter)
app.use("/api/v1/pdf", pdfRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || []
  });
});


export { app }