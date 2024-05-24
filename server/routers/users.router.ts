export const router = require("express").Router();
import usersController from "../controllers/users.controller";
import { auth } from "../middlewares/auth";

router.route("/").get(usersController.getAllUsers);
router.route("/register").post(usersController.createUser);
router.route("/login").post(usersController.login);
router
	.route("/:id")
	.get(auth, usersController.getUserById)
	.delete(auth, usersController.deleteUser)
	.put(auth, usersController.updateUser);

export default router;
