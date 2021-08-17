import express from "express";
import mongoose from "mongoose";
import Users from "../models/User.js";
import axios from "axios";
const router = express.Router();
const url = "http://localhost:5000/users";

export const getUsers = async (req, res) => {
	try {
		const users = await Users.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await Users.findById(id, () => {
			console.log("found user by id");
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createUser = async (req, res) => {
	let {
		orders,
		cart,
		name,
		createdAt,
		auth0ID,
		_id,
		firstName,
		lastName,
		country,
		region,
		cartTotal,
		cartWeight,
		email,
		postalCode,
		shippingCost,
		address,
		city,
		total,
		couponDiscount,
		totalDiscounts,
		newsLetterDiscount,
	} = req.body;

	try {
		const doesUserExist = await Users.exists({ auth0ID: auth0ID });
		if (doesUserExist) {
			await Users.findOne({ auth0ID: auth0ID }, (err, user) => {
				res.status(201).json(user);
			});
		} else {
			//handle subdocuments (set subdocument path to a non-nullish value)

			orders = {};
			cart = {};

			const newData = {
				orders,
				cart,
				name,
				createdAt,
				auth0ID,
				firstName,
				lastName,
				_id,
				cartTotal,
				email,
				cartWeight,
				postalCode,
				shippingCost,
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
		}
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updateUser = async (req, res) => {
	const { id } = req.params;

	const {
		orders,
		cart,
		createdAt,
		auth0ID,
		_id,
		cartTotal,
		email,
		postalCode,
		cartWeight,
		shippingCost,
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
	console.log(city);
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
		cartWeight,
		postalCode,
		shippingCost,
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

	res.json(updatedUser);
};

export const addToCart = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const {
		orders,
		cart,
		firstName,
		lastName,
		createdAt,
		auth0ID,
		_id,
		cartTotal,
		email,
		postalCode,
		shippingCost,
		country,
		region,
		cartWeight,
		address,
		city,
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
		cartWeight,
		createdAt,
		auth0ID,
		_id,
		cartTotal,
		email,
		postalCode,
		shippingCost,
		address,
		country,
		region,
		city,
		total,
		couponDiscount,
		totalDiscounts,
		newsLetterDiscount,
	};

	await Users.findByIdAndUpdate(id, { cart: cart }, { new: true });

	res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	await Users.findByIdAndRemove(id);
	res.status(200).json({ message: "Post deleted successfully." });
};

export default router;
