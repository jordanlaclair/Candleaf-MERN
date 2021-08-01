import mongoose from "mongoose";

const productSchema = mongoose.Schema({
	title: String,
	message: String,
	tags: [String],
	image: String,
	purchaseCount: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
	wax: String,
	fragrance: String,
	burningTime: String,
	dimensions: String,
	weight: String,
	price: Number,
});

const Candle = mongoose.model("Candle", productSchema);

export default Candle;
