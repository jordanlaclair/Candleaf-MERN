import { ActionType } from "../actions/actionTypes";
import { CandleActions } from "../actions";
import { Reducer } from "redux";
interface CandleSchema {
	title: string;
	message: string;
	tags: Array<string>;
	purchaseCount: number;
	createdAt: {
		type: Date;
		default: Date;
	};
	_id: string;
	__v: {
		type: number;
		default: 0;
	};
	burningTime: string;
	image: string;
	dimensions: string;
	fragrance: string;
	wax: string;
	weight: string;
	price: number;
}

type CandlesArray = Array<CandleSchema>;
let initialState: CandlesArray = [];

const reducer: Reducer<CandlesArray, CandleActions> = (
	candles = initialState,
	action
) => {
	switch (action.type) {
		case ActionType.FETCH_ALL_CANDLES:
			return action.payload;
		case ActionType.PURCHASE_CANDLE:
			let foundPurchased = candles.findIndex(
				(candle) => candle._id === action.payload._id
			);
			candles[foundPurchased] = action.payload;
			return candles;
		case ActionType.CREATE_CANDLE:
			return [...candles, action.payload];
		case ActionType.UPDATE_CANDLE:
			let foundUpdated = candles.findIndex(
				(candle) => candle._id === action.payload._id
			);
			candles[foundUpdated] = action.payload;
			return candles;
		case ActionType.DELETE_CANDLE:
			return candles.filter((candle) => candle._id !== action.payload);
		case ActionType.UPDATE_CANDLES:
			return action.payload;
		default:
			return candles;
	}
};

export default reducer;
