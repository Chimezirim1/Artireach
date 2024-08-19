import { Router } from "express"
const router = Router();
import authRouter from "./auth.route.js";
import jobRouter from "./job.route.js";
import serviceRouter from "./service.route.js"
import fileRouter from "./file.route.js"
import userRouter from "./user.route.js";
// import artisanRouter from "./artisan.route.js";
import reviewRouter from "./review.route.js";
// router.use("/api/v1/artisan", artisanRouter);
router.use("/api/v1/review", reviewRouter);
router.use("/api/v1/user", authRouter);
router.use("/api/v1/job", jobRouter);
router.use("/api/v1/service", serviceRouter);
router.use("/api/v1/file", fileRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/auth", authRouter);


export default router;

