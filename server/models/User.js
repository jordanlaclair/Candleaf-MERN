import mongoose from "mongoose";
const userSchema = mongoose.Schema({
	orders: Array,
	firstName: String,
	lastName: String,
	address: String,
	postalCode: Number,
	city: String,
	country: String,
	region: String,
	email: String,
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
	shippingMethod: String,

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
			productWeight: {
				type: Number,
				default: 0,
			},
		},
	],
	cartTotal: {
		type: Number,
		default: 0,
	},
	cartWeight: {
		type: Number,
		default: 0,
	},
});

const User = mongoose.model("User", userSchema);

export default User;
