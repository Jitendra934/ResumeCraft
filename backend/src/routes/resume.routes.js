import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

import { 
    createResume,
    deleteResume,
    getAllResumesByUser,
    getResumeById,
    updateResume,
 } from "../controllers/resume.controller.js";
import { upload } from "../middleware/multer.middleware.js";


const router = Router();
router.use(verifyJWT)

router.route("/create").post(createResume)

router.
    route("/r/:resumeId")
    .get(getResumeById)
    .delete(deleteResume)

router.route("/update-resume").put(upload.single('image'), updateResume)

router.route("/all-resumes").get(getAllResumesByUser)



export default router;