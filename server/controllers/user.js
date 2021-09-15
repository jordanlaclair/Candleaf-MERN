import express from "express";
import mongoose from "mongoose";
import Users from "../models/User.js";
import axios from "axios";

const router = express.Router();
const url = "http://localhost:5000/users";

export const getUsers = async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	try {
		const users = await Users.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getUser = async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	const { id } = req.params;

	try {
		if (!mongoose.Types.ObjectId.isValid(id))
			res.status(404).json({ message: "Could not find user" });
		else {
			const user = await Users.findById(id);
			if (user == null)
				res.status(404).json({ message: "Could not find user" });
			else {
				res.status(200).json(user);
			}
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getAuthUser = async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	const { id } = req.params;
	try {
		const user = await Users.findOne({ auth0ID: id });
		if (user == null) {
			res.status(404).json({ message: "Could not find user" });
		} else {
			res.status(200).json(user);
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createUser = async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	let {
		orders,
		cart,
		name,
		createdAt,
		auth0ID,
		_id,
		guestID,
		firstName,
		lastName,
		country,
		region,
		cartTotal,
		filter,
		cartWeight,
		email,
		postalCode,
		shippingCost,
		shippingMethod,
		address,
		city,
		total,
		couponDiscount,
		totalDiscounts,
		newsLetterDiscount,
	} = req.body;

	try {
		cart = {};

		const newData = {
			orders,
			cart,
			name,
			createdAt,
			auth0ID,
			firstName,
			guestID,
			lastName,
			_id,
			cartTotal,
			email,
			cartWeight,
			postalCode,
			filter,
			shippingCost,
			shippingMethod,
			address,
			city,
			total,
			couponDiscount,
			country,
			region,
			totalDiscounts,
			newsLetterDiscount,
		};
		const newUser = new Users(newData);
		await newUser.save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updateUser = async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	const { id } = req.params;

	const {
		orders,
		cart,
		createdAt,
		auth0ID,
		_id,
		cartTotal,
		guestID,
		email,
		postalCode,
		filter,
		cartWeight,
		shippingCost,
		shippingMethod,
		address,
		city,
		firstName,
		lastName,
		country,
		region,
		total,
		couponDiscount,
		totalDiscounts,
		newsLetterDiscount,
	} = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const updatedUser = {
		orders,
		cart,
		firstName,
		lastName,
		createdAt,
		auth0ID,
		_id,
		cartTotal,
		email,
		guestID,
		filter,
		cartWeight,
		postalCode,
		shippingCost,
		shippingMethod,
		address,
		city,
		country,
		region,
		total,
		couponDiscount,
		totalDiscounts,
		newsLetterDiscount,
	};
	await Users.findByIdAndUpdate(id, updatedUser, { new: true });

	res.status(200).json(updatedUser);
};
export const updateAuthUser = async (req, res) => {
	try {
		res.header("Access-Control-Allow-Origin", "*");

		const { id } = req.params;

		const {
			orders,
			cart,
			createdAt,
			auth0ID,
			_id,
			cartTotal,
			guestID,
			filter,
			email,
			postalCode,
			cartWeight,
			shippingCost,
			shippingMethod,
			address,
			city,
			firstName,
			lastName,
			country,
			region,
			total,
			couponDiscount,
			totalDiscounts,
			newsLetterDiscount,
		} = req.body;

		const updatedUser = {
			orders,
			cart,
			firstName,
			lastName,
			createdAt,
			auth0ID,
			_id,
			filter,
			cartTotal,
			email,
			guestID,
			cartWeight,
			postalCode,
			shippingCost,
			shippingMethod,
			address,
			city,
			country,
			region,
			total,
			couponDiscount,
			totalDiscounts,
			newsLetterDiscount,
		};

		let newUser = await Users.findOneAndUpdate({ auth0ID: id }, updatedUser, {
			new: true,
		});
		res.status(200).json(newUser);
	} catch (error) {
		console.log(error);
	}
};
export const deleteUser = async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	const { id } = req.params;

	await Users.findByIdAndRemove(id);
	res.status(200).json({ message: "User deleted successfully." });
};

export const deleteAllUsers = async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	try {
		await Users.deleteMany({}, () => {});
		res.status(200).json({ message: "Users deleted successfully." });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export default router;
