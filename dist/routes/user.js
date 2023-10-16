"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const userRouter = (0, express_1.Router)();
userRouter.get("/", user_controllers_1.getUsers);
userRouter.get("/:id", user_controllers_1.getUsersById);
userRouter.post("/", user_controllers_1.postUsers);
userRouter.put("/:id", user_controllers_1.putUsers);
userRouter.delete("/:id", user_controllers_1.deleteUser);
exports.default = userRouter;
//# sourceMappingURL=user.js.map