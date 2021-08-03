import express from "express";
import mongoose from "mongoose";
import Users from "../models/User.js";

const router = express.Router();

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
	const data = req.body;
	const newUser = new Users(data);
	const { auth0ID } = req.body;

	try {
		const doesUserExist = await Users.exists({ auth0ID: auth0ID });
		if (doesUserExist) {
			return res.status(404).send(`User with that id exists already!`);
		} else {
			await newUser.save();
			res.status(201).json(newUser);
		}
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updateUser = async (req, res) => {
	const { id } = req.params;

	const { orders, name, auth0ID } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const updatedUser = {
		orders,
		name,
		auth0ID,
	};

	await Users.findByIdAndUpdate(id, updatedUser, { new: true });

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
