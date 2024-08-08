import { Router } from "express";
const router = Router();
import validate from "../middlewares/validate.middleware.js"
import ServiceController from "../controller/service.controller.js";
import createServiceSchema from "../schema/service.schema.js";
import authenticate from "../middlewares/authentication.middleware.js";

router.post('/', authenticate,validate(createServiceSchema), ServiceController.createService )
router.get('/', ServiceController.getServices)
router.get('/:serviceId', ServiceController.getServiceById)
// router.get('/query', ServiceController.findOne)
router.patch('/:serviceId', ServiceController.updateService)
router.delete('/:serviceId', ServiceController.deleteService)



export default router;