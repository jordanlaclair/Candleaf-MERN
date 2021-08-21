import express from "express";
import {
	getAllReviews,
	getReviewsForCandle,
	createReview,
	deleteReview,
	getReview,
} from "../controllers/review.js";
const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", getReview);
router.get("/candle/:id", getReviewsForCandle);
router.post("/", createReview);
router.delete("/:id", deleteReview);

export default router;
