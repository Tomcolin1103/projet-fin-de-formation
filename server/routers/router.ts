export const router = require("express").Router();
import usersRouter from "./users.router";
import familyRouter from "./family.router";

router.use("/users", usersRouter);
router.use("/family", familyRouter);
