import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	orders: [
		{
			productName: String,
			productId: String,
			totalPrice: {
				default: 0,
				type: Number,
			},
			productQuantity: {
				default: 0,
				type: Number,
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
			productName: String,
			productId: String,
			totalPrice: {
				default: 0,
				type: Number,
			},
			productQuantity: {
				default: 0,
				type: Number,
			},
		},
	],
});

const User = mongoose.model("User", userSchema);

export default User;
