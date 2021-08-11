import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	orders: [
		{
			productName: {
				type: String,
				default: "None",
			},
			productId: {
				type: String,
				default: "None",
			},
			totalPrice: {
				type: Number,
				default: 0,
			},
			price: {
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
	address: {
		default: "None",
		type: String,
	},
	postalCode: {
		default: "None",
		type: String,
	},
	city: {
		default: "None",
		type: String,
	},
	country: {
		default: "None",
		type: String,
	},
	region: {
		default: "None",
		type: String,
	},
	email: {
		default: "None",
		type: String,
	},
	couponDiscount: {
		default: 0,
		type: Number,
	},
	newsLetterDiscount: {
		default: 0,
		type: Number,
	},
	totalDiscounts: {
		default: 0,
		type: Number,
	},
	total: {
		default: 0,
		type: Number,
	},
	shippingCost: {
		default: 0,
		type: Number,
	},
	newsLetterDiscount: {
		default: 0,
		type: Number,
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
				default: "None",
			},
			productId: {
				type: String,
				default: "None",
			},
			totalPrice: {
				type: Number,
				default: 0,
			},
			price: {
				type: Number,
				default: 0,
			},
			productQuantity: {
				type: Number,
				default: 0,
			},
		},
	],
	cartTotal: {
		type: Number,
		default: 0,
	},
});

const User = mongoose.model("User", userSchema);

export default User;
