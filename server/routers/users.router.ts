export const router = require("express").Router();
import usersController from "../controllers/users.controller";

router
	.route("/")
	.get(usersController.getAllUsers)
	.post(usersController.createUser);
router.route("/login").post(usersController.login);
router
	.route("/:id")
	.get(usersController.getUserById)
	.delete(usersController.deleteUser)
	.put(usersController.updateUser);

export default router;
