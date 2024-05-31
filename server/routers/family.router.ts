export const router = require("express").Router();
import familyController from "../controllers/family.controller";

// TODO Ajouter le middleware Auth pour devoir être connecter pour acceder aux routes
router.route("/").get(familyController.getAllFamily);
router
	.route("/:id")
	.delete(familyController.deleteFamily)
	.put(familyController.updateFamily);
router.route("/newFamily").post(familyController.createFamily);

export default router;
