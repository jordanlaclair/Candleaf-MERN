import express from "express";
import mongoose from "mongoose";
import Review from "../models/Review.js";

const router = express.Router();

export const getAllReviews = async (req, res) => {
	try {
		const reviews = await Review.find();
		res.status(200).json(reviews);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getReviewsForCandle = async (req, res) => {
	const { id } = req.params;
	try {
		const reviews = await Review.find({ candleID: id });
		res.status(200).json(reviews);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getReview = async (req, res) => {
	const { id } = req.params;
	try {
		const review = await Review.findById(id, () => {
			console.log("found by id");
		});
		res.status(200).json(review);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createReview = async (req, res) => {
	const data = req.body;

	const newReview = new Review(data);

	try {
		await newReview.save();
		res.status(201).json(newReview);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const deleteReview = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	await Review.findByIdAndRemove(id);
	res.status(200).json({ message: "Review deleted successfully." });
};

export default router;
