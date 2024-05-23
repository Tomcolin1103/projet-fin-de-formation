export const router = require("express").Router();
import usersRouter from "./users.router";

router.use("/users", usersRouter);
