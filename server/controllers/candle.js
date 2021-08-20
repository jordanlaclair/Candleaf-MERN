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

	const {
		message,
		title,
		tags,
		purchaseCount,
		createdAt,
		image,
		wax,
		fragrance,
		burningTime,
		dimensions,
		weight,
		price,
	} = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const updatedCandle = {
		title,
		message,
		tags,
		image,
		price,
		_id: id,
		wax,
		purchaseCount,
		createdAt,
		fragrance,
		burningTime,
		dimensions,
		weight,
	};

	await Candle.findByIdAndUpdate(id, updatedCandle, { new: true });

	res.json(updatedCandle);
};

export const purchaseCandle = async (req, res) => {
	try {
		const { id, quantity } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(404).send(`No post with id: ${id}`);

		const candle = await Candle.findById(id);
		let quantityInt = parseInt(quantity);

		const purchasedCandle = await Candle.findByIdAndUpdate(
			id,
			{ purchaseCount: candle.purchaseCount + quantityInt },
			{
				new: true,
			}
		);
		res.json(purchasedCandle);
	} catch (error) {
		console.log(error);
	}
};

export default router;
