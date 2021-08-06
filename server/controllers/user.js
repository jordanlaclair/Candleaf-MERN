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
	let { orders, cart, name, createdAt, auth0ID, _id } = req.body;

	try {
		const newData = {
			orders,
			cart,
			name,
			createdAt,
			auth0ID,
			_id,
		};
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
				_id,
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

	const { orders, name, auth0ID, createdAt, cart, _id, __v } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const updatedUser = {
		orders,
		name,
		auth0ID,
		createdAt,
		cart,
		_id,
		__v,
	};

	await Users.findByIdAndUpdate(id, updatedUser, { new: true });

	res.json(updatedUser);
};

export const addToCart = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const { orders, name, auth0ID, createdAt, cart } = req.body;

	const updatedUser = {
		orders,
		name,
		auth0ID,
		createdAt,
		cart,
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
