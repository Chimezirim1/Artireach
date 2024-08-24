import { Router } from "express";
const router = Router();

import JobController from "../controller/job.controller.js";
import validate from "../middlewares/validate.middleware.js"; // Assuming you have a validate middleware
// import authenticate from "../middlewares/authentication.middleware.js"; // Assuming you have an authentication middleware
import {createJobSchema} from "../schema/job.schema.js";
import {updateJobSchema} from "../schema/job.schema.js";
import {authenticate} from "../middlewares/authentication.middleware.js";
import { USER_ROLES } from "../utils/user.js";


router.post("/:artisanId", [
  authenticate([USER_ROLES.CLIENT]), validate(createJobSchema)
],
  JobController.createJob)

router.get("/job/:jobId", JobController.getJobById)//
router.get('/', authenticate([]), JobController.getAllJobs);

// /jobs/:userId?status=pending
router.get('/jobs/:userId', authenticate(['client', 'artisan']), JobController.getJobsByUserId);

router.patch("/:jobId", authenticate([]), validate(updateJobSchema), JobController.updateJob);

router.delete("/:jobId/delete", JobController.deleteJob)
router.put("/:jobId/accept", authenticate([USER_ROLES.ARTISAN]), JobController.acceptJob);
router.put("/:jobId/complete", authenticate([USER_ROLES.ARTISAN]), JobController.completeJob);
router.put("/:jobId/cancel", authenticate([]), JobController.cancelJob);

export default router;
