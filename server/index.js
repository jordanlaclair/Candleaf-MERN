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
app.options("*", cors()); // include before other routes
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
dotenv.config();
const allowedOrigins = [
	"http://localhost:3000",
	"https://candleafcandles.netlify.app",
];

app.use(function (req, res, next) {
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}

	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);

	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});
app.use(cors());

app.use(express.json());

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
