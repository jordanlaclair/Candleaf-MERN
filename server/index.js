import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import CandleRoutes from "./routes/candle.js";
import UserRoutes from "./routes/user.js";
import ReviewRoutes from "./routes/review.js";

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
dotenv.config();
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.options("*", cors());

app.all("/*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"X-Requested-With,     Content-Type"
	);
	next();
});
app.use(cors(corsOptions));
app.use("/products/candles", CandleRoutes);
app.use("/users", UserRoutes);
app.use("/reviews", ReviewRoutes);

mongoose
	.connect(process.env.MONGODB_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		//if made it here, connected to database
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error(err.message);
	});

mongoose.set("useFindAndModify", false);
