import AuthController from "../controller/auth.controller.js";
import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { signUpSchema, loginSchema,} from "../schema/user.schema.js";
const router = Router();
import { authenticate } from "../middlewares/authentication.middleware.js";

// router.post("/signup", validate(signUpSchema), AuthController.signUp);
// router.post("/login", validate(loginSchema), AuthController.login);



router.post(
    "/create-admin",
    validate(signUpSchema),
    AuthController.createAdmin
  );

  router.post(
    "/create-artisan", 
    validate(signUpSchema), 
    AuthController.createArtisan );

  router.post(
    "/create-user",
    validate(signUpSchema),
    AuthController.createUser
  );

  router.post("/login", validate(loginSchema), AuthController.login );

  router.post("/logout", AuthController.logout );

export default router;