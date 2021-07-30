import express from "express";
import mongoose from "mongoose";
import Candle from "../models/Product.js";

const router = express.Router();

export const getCandles = async (req, res) => {
	try {
		const candles = await Candle.find();
		res.status(200).json(candles);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getCandle = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await Candle.findById(id, () => {
			console.log("found by id");
		});
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createCandle = async (req, res) => {
	const data = req.body;
	const newCandle = new Candle(data);

	try {
		await newCandle.save();
		res.status(201).json(newCandle);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const deleteCandle = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	await Candle.findByIdAndRemove(id);
	res.status(204).json({ message: "Post deleted successfully." });
};

export const updateCandle = async (req, res) => {
	const { id } = req.params;

	const { message, title, tags, image } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const updatedCandle = { title, message, tags, image, _id: id };

	await Candle.findByIdAndUpdate(id, updatedCandle, { new: true });

	res.json(updatedCandle);
};

export const purchaseCandle = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const candle = await Candle.findById(id);

	const likedCandle = await Candle.findByIdAndUpdate(
		id,
		{ purchaseCount: candle.purchaseCount + 1 },
		{ new: true }
	);

	res.json(likedCandle);
};

export default router;
