import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { 
    enhanceAboutMe,
    enhanceExperienceDescription,
    enhanceProjectDescription,
    generateAboutMe,
    generateExperienceBulletPoints,
    generateProjectBulletPoints,
    uploadResume,
 } from "../controllers/ai.controller.js";
 import { aiRateLimiter } from "../middleware/rateLimit.middleware.js";


const router = Router();
router.use(verifyJWT);

router.route("/generate-project-bullets")
    .post(aiRateLimiter, generateProjectBulletPoints)

router.route("/generate-experience-bullets")
    .post(aiRateLimiter, generateExperienceBulletPoints)

router.route("/generate-aboutme")
    .post(aiRateLimiter, generateAboutMe)

router.route("/enhance-project-description")
    .post(aiRateLimiter, enhanceProjectDescription)

router.route("/enhance-experience-description")
    .post(aiRateLimiter, enhanceExperienceDescription)

router.route("/enhance-aboutme")
    .post(aiRateLimiter, enhanceAboutMe)

router
    .route("/upload-resume")
    .post(uploadResume )

export default router