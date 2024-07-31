import { Router } from "express"
const router = Router();
// import bookingRouter from "./booking.route.js";
import authRouter from "./auth.route.js";
// import artisanRouter from "./artisan.route.js";
// import reviewRouter from "./review.route.js";

// router.use("/api/v1/booking", bookingRouter);
router.use("/api/v1/user", authRouter);
// router.use("/api/v1/artisan", artisanRouter);
// router.use("/api/v1/review", reviewRouter);

export default router;