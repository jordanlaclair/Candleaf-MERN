import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
	title: {
		type: String,
		default: "",
	},
	name: {
		type: String,
		default: "",
	},
	description: {
		type: String,
		default: "",
	},
	rating: {
		type: Number,
		default: 0,
	},
	candleID: {
		type: String,
		default: "",
	},
	userPicture: {
		type: String,
		default: "",
	},
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
