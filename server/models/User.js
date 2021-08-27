import mongoose from "mongoose";

const emptyOrderData = {
	productName: "",
	productWeight: 0,
	productId: "",
	totalPrice: 0,
	productQuantity: 0,
	price: 0,
	_id: "",
};
const orderData = mongoose.Schema({
	productName: String,
	productWeight: Number,
	productId: String,
	totalPrice: Number,
	productQuantity: Number,
	price: Number,
	_id: String,
});
const orderSchema = mongoose.Schema({
	data: {
		type: [orderData],
		default: emptyOrderData,
	},
	purchasedOn: {
		type: Date,
		default: new Date(),
	},
	total: {
		default: 0,
		type: Number,
	},
	orderNumber: {
		type: Number,
		default: 0,
	},
	shippingMethod: {
		type: String,
		default: "",
	},
});

const userSchema = mongoose.Schema({
	orders: [orderSchema],
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
