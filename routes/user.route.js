import { Router } from "express";
const router = Router();
import UserController from "../controller/user.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { updateArtisanSchema } from "../schema/user.schema.js";
import { USER_ROLES } from "../utils/user.js";
import {authenticate} from "../middlewares/authentication.middleware.js";

// router.post(
//   "/",
//   validate(signUpSchema),
//   UserController.createUser
// );

router.get("/", UserController.findUsers);

router.get("/:id", UserController.findUser);

router.get('/:serviceId', UserController.getArtisansByServiceId)
router.patch("/:id", validate(updateArtisanSchema), UserController.updateUser);

router.delete("/:id", UserController.delUser);

export default router;
