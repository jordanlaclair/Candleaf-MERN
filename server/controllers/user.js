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
			//console.log("found user by id");
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
		guestID,
		firstName,
		lastName,
		country,
		region,
		cartTotal,
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
		const auth0Exists = await Users.exists({ auth0ID: auth0ID });

		const guestExists = await Users.exists({ guestID: guestID });

		//when first login

		if (auth0Exists && auth0ID !== "") {
			await Users.findOne({ auth0ID: auth0ID }, (err, user) => {
				res.status(201).json(user);
			});
		} else if (!auth0Exists && auth0ID !== "") {
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
		} else if (guestExists) {
			await Users.findOne({ guestID: guestID }, (err, user) => {
				res.status(201).json(user);
			});
		} else {
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
		guestID,
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

	res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	await Users.findByIdAndRemove(id);
	res.status(200).json({ message: "User deleted successfully." });
};

export default router;
