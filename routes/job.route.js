import { Router } from "express";
const router = Router();

import JobController from "../controller/job.controller.js";
import validate from "../middlewares/validate.middleware.js"; // Assuming you have a validate middleware
// import authenticate from "../middlewares/authentication.middleware.js"; // Assuming you have an authentication middleware
import createJobSchema from "../schema/job.schema.js";
import updateJobSchema from "../schema/job.schema.js";
import {authenticate} from "../middlewares/authentication.middleware.js";
import { USER_ROLES } from "../utils/user.js";


router.post("/", [
  authenticate([USER_ROLES.CLIENT]), validate(createJobSchema)
],
  JobController.createJob)

router.get("/:jobId", JobController.getJobById)
router.get('/', authenticate([]), JobController.getAllJobs);
router.patch("/:jobId", authenticate(updateJobSchema), JobController.updateJob);
router.delete("/:jobId", JobController.deleteJob)
router.put("/:jobId/accept", JobController.acceptJob)
router.put("/:jobId/complete", JobController.completeJob)
router.put("/:jobId/cancel", JobController.cancelJob)

export default router;
