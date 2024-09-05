import { Router } from "express";
const router = Router();
import UserController from "../controller/user.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { updateArtisanSchema, FindUsersQuerySchema } from "../schema/user.schema.js";
import { USER_ROLES } from "../utils/user.js";
import {authenticate} from "../middlewares/authentication.middleware.js";

// router.post(
//   "/",
//   validate(signUpSchema),
//   UserController.createUser
// );

router.get("/", validate(FindUsersQuerySchema, 'query'), UserController.findUsers);

router.get("/user/:id", UserController.findUser);

// router.get('/:serviceId', UserController.getArtisansByServiceId)
router.patch("/:id", validate(updateArtisanSchema), UserController.updateUser);

router.delete("/delete/:id", UserController.delUser);

router.get("/clients", UserController.getAllClients)
router.get("/artisans", UserController.getAllArtisans)

router.get('/:serviceId',  UserController.getArtisansByServiceId)


export default router;
