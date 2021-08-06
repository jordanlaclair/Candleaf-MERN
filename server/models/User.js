import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	orders: [
		{
			productName: {
				type: String,
				default: "none",
			},
			productId: {
				type: String,
				default: "none",
			},
			totalPrice: {
				type: Number,
				default: 0,
			},
			productQuantity: {
				type: Number,
				default: 0,
			},
		},
	],
	name: {
		default: "Guest",
		type: String,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
	auth0ID: {
		default: "GuestID",
		type: String,
	},
	cart: [
		{
			productName: {
				type: String,
				default: "none",
			},
			productId: {
				type: String,
				default: "none",
			},
			totalPrice: {
				type: Number,
				default: 0,
			},
			productQuantity: {
				type: Number,
				default: 0,
			},
		},
	],
});

const User = mongoose.model("User", userSchema);

export default User;
