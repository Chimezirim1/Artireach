import AuthController from "../controller/auth.controller.js";
import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { signUpSchema, loginSchema } from "../schema/user.schema.js";
const router = Router();

router.post("/signup", validate(signUpSchema), AuthController.signUp);
router.post("/login", validate(loginSchema), AuthController.login);

export default router;