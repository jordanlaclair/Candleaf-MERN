import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	orders: [
		{
			productName: String,
			productQuantity: Number,
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
});

const User = mongoose.model("User", userSchema);

export default User;
