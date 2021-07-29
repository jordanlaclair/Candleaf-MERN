import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import candleRoutes from "./routes/candle.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(bodyParser.json({ limit: "31mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "31mb", extended: true }));
app.use(cors());

app.use("/products/candles", candleRoutes);

mongoose
	.connect(process.env.CONNECTION_URL, {
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
