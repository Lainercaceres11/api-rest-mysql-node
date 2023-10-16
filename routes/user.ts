import { Router } from "express";
import { deleteUser, getUsers, getUsersById, postUsers, putUsers } from "../controllers/user.controllers";

const userRouter = Router()

userRouter.get("/", getUsers)

userRouter.get("/:id", getUsersById)

userRouter.post("/", postUsers)

userRouter.put("/:id", putUsers)

userRouter.delete("/:id", deleteUser)

export default userRouter;