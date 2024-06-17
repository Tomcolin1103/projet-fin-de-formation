export const router = require("express").Router();
import usersRouter from "./users.router";
import familyRouter from "./family.router";
import shoppingListRouter from "./shoppingList.router";
import itemsRouter from "./items.router";

router.use("/users", usersRouter);
router.use("/family", familyRouter);
router.use("/shoppingList", shoppingListRouter);
router.use("/items", itemsRouter);
