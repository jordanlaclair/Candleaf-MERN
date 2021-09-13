import express from "express";
import {
	getUser,
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	getAuthUser,
	deleteAllUsers,
	updateAuthUser,
} from "../controllers/user.js";
import mongoose from "mongoose";
import Users from "../models/User.js";
const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.get("/auth/:id", getAuthUser);
router.delete("/:id", deleteUser);
router.delete("/", deleteAllUsers);
router.patch("/:id", updateUser);
router.patch("/auth/:id", updateAuthUser);

export default router;
