import { Router } from "express";
const router = Router();

import JobController from "../controller/job.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { createJobSchema, updateJobSchema } from "../schema/job.schema.js";
import { authenticate } from "../middlewares/authentication.middleware.js";
import { USER_ROLES } from "../utils/user.js";

router.post("/:artisanId", [
  authenticate([USER_ROLES.CLIENT]), validate(createJobSchema)
], JobController.createJob);
router.get('/total-jobs', JobController.getTotalJobs);
// New route for job counts by status
router.get('/job-status-counts', JobController.getJobCountsByStatus);

router.get("/job/:jobId", JobController.getJobById);
router.get('/', authenticate([]), JobController.getAllJobs);
router.get('/jobs/:userId', authenticate(['client', 'artisan']), JobController.getJobsByUserId);

router.patch("/:jobId", authenticate([]), validate(updateJobSchema), JobController.updateJob);
router.delete("/:jobId/delete", JobController.deleteJob);

// Add new routes to update clientStatus and artisanStatus without body
router.put("/:jobId/client-status/ongoing", authenticate([USER_ROLES.CLIENT]), JobController.updateClientStatusToOngoing);
router.put("/:jobId/client-status/completed", authenticate([USER_ROLES.CLIENT]), JobController.updateClientStatusToCompleted);

router.put("/:jobId/artisan-status/ongoing", authenticate([USER_ROLES.ARTISAN]), JobController.updateArtisanStatusToOngoing);
router.put("/:jobId/artisan-status/completed", authenticate([USER_ROLES.ARTISAN]), JobController.updateArtisanStatusToCompleted);


// Other existing routes
router.put("/:jobId/accept", authenticate([USER_ROLES.ARTISAN]), JobController.acceptJob);
router.put("/:jobId/complete", authenticate([]), JobController.completeJob);
router.put("/:jobId/ongoing", authenticate([]), JobController.updateJobStatusToOngoing);
router.put("/:jobId/cancel", authenticate([]), JobController.cancelJob);

export default router;
