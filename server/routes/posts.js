import express from "express";
import {
	getPosts,
	createPost,
	getPost,
	deletePost,
	updatePost,
	likePost,
} from "../controllers/posts.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);
router.patch("/:id/like", likePost);

export default router;
