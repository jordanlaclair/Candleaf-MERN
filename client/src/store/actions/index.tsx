import { ActionType } from "./actionTypes";

export {
	createCandle,
	deleteCandle,
	purchaseCandle,
	getCandles,
	getCandle,
} from "./candlesActionCreator";

export { toggleTheme } from "./appActionCreator";

interface PostsSchema {
	title: string;
	message: string;
	tags: [string];
	_id: string;
}

interface CreateCandleAction {
	type: ActionType.CREATE_CANDLE;
	payload: object;
}

interface DeleteCandleAction {
	type: ActionType.DELETE_CANDLE;
	payload: string;
}

interface UpdateCandleAction {
	type: ActionType.UPDATE_CANDLE;
	payload: PostsSchema;
}

interface PurchaseCandleAction {
	type: ActionType.PURCHASE_CANDLE;
	payload: string;
}

interface GetCandle {
	type: ActionType.FETCH_CANDLE;
	payload: object;
}

interface GetCandles {
	type: ActionType.FETCH_ALL_CANDLES;
	payload: Array<object>;
}

export interface ToggleTheme {
	type: ActionType.TOGGLE_THEME;
}

export type CandleActions =
	| GetCandles
	| GetCandle
	| PurchaseCandleAction
	| UpdateCandleAction
	| DeleteCandleAction
	| CreateCandleAction;
