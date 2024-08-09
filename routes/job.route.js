import { Router } from "express";
const router = Router();

import JobController from "../controller/job.controller.js";
import validate from "../middlewares/validate.middleware.js"; // Assuming you have a validate middleware
// import authenticate from "../middlewares/authentication.middleware.js"; // Assuming you have an authentication middleware
import createJobSchema from "../schema/job.schema.js"
import {authenticate} from "../middlewares/authentication.middleware.js";


router.post("/", [
  authenticate, validate(createJobSchema)
],
  JobController.createJob)

router.get("/", JobController.getJobs)
router.get("/artisan/:artisanId", JobController.findByArtisanId)
router.get("/:jobId", JobController.getJobById)
router.patch("/:jobId", JobController.updateJob)
router.delete("/:jobId", JobController.deleteJob)
router.put("/:jobId/accept", JobController.acceptJob)
router.put("/:jobId/complete", JobController.completeJob)
router.put("/:jobId/cancel", JobController.cancelJob)

export default router;
