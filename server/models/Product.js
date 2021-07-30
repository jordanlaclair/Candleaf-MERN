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
});

const Candle = mongoose.model("Candle", productSchema);

export default Candle;
