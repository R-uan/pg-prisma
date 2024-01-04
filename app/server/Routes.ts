import { Router } from "express";
import ContactController from "../contacts/ContactController";
const router = Router();

router.route("/").get(ContactController.FindAll).post(ContactController.CreateOne);
router
	.route("/:id")
	.get(ContactController.FindOne)
	.delete(ContactController.DeleteOne)
	.patch(ContactController.UpdateOne);

export { router };
