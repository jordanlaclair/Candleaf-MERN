import express from "express";
import {
	getCandle,
	createCandle,
	deleteCandle,
	updateCandle,
	getCandles,
	purchaseCandle,
} from "../controllers/candle.js";
const router = express.Router();

router.get("/", getCandles);
router.post("/", createCandle);
router.get("/:id", getCandle);
router.delete("/:id", deleteCandle);
router.patch("/:id", updateCandle);
router.patch("/:id/purchase", purchaseCandle);

export default router;
