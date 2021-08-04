import { ActionType } from "../actions/actionTypes";
import { CandleActions } from "../actions";
import { Reducer } from "redux";
interface PostsSchema {
	title: string;
	message: string;
	tags: Array<string>;
	purchaseCount: {
		type: number;
		default: 0;
	};
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
	dimensions: string;
	fragrance: string;
	wax: string;
	weight: string;
	price: number;
}

type PostsArray = Array<PostsSchema>;
let initialState: PostsArray = [];

const reducer: Reducer<PostsArray, CandleActions> = (
	candles = initialState,
	action
) => {
	switch (action.type) {
		case ActionType.FETCH_ALL_CANDLES:
			return action.payload;
		case ActionType.PURCHASE_CANDLE:
			let foundIndex = candles.findIndex(
				(candle) => candle._id === action.payload._id
			);
			candles[foundIndex] = action.payload;
			return candles;
		case ActionType.CREATE_CANDLE:
			return [...candles, action.payload];
		case ActionType.UPDATE_CANDLE:
			return action.payload;
		case ActionType.DELETE_CANDLE:
			return candles.filter((candle) => candle._id !== action.payload);
		default:
			return candles;
	}
};

export default reducer;
