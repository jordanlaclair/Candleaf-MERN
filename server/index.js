import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import CandleRoutes from "./routes/candle.js";
import UserRoutes from "./routes/user.js";
import ReviewRoutes from "./routes/review.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(bodyParser.json({ limit: "31mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "31mb", extended: true }));
app.use(cors());

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
