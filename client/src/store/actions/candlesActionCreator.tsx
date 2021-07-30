import { ActionType } from "./actionTypes";
import { Dispatch } from "redux";
import { CandleActions } from "./index";
import * as api from "../../apis/memories";

export const getCandles = () => async (dispatch: Dispatch<CandleActions>) => {
	try {
		const { data } = await api.fetchCandles();

		dispatch({ type: ActionType.FETCH_ALL_CANDLES, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const getCandle =
	(id: string) => async (dispatch: Dispatch<CandleActions>) => {
		try {
			const { data } = await api.fetchCandle(id);

			dispatch({ type: ActionType.FETCH_CANDLE, payload: data });
		} catch (error) {
			console.log(error.message);
		}
	};

export const createCandle =
	(post: object) => async (dispatch: Dispatch<CandleActions>) => {
		try {
			const { data } = await api.createCandle(post);
			dispatch({ type: ActionType.CREATE_CANDLE, payload: data });
		} catch (error) {
			console.log(error.message);
		}
	};

export const updateCandle =
	(id: string, post: object) => async (dispatch: Dispatch<CandleActions>) => {
		try {
			const { data } = await api.updateCandle(id, post);

			dispatch({ type: ActionType.UPDATE_CANDLE, payload: data });
		} catch (error) {
			console.log(error);
		}
	};

export const purchaseCandle =
	(id: string) => async (dispatch: Dispatch<CandleActions>) => {
		try {
			const { data } = await api.purchaseCandle(id);

			dispatch({ type: ActionType.PURCHASE_CANDLE, payload: data });
		} catch (error) {
			console.log(error);
		}
	};

export const deleteCandle =
	(id: string) => async (dispatch: Dispatch<CandleActions>) => {
		try {
			await api.deleteCandle(id);
			dispatch({ type: ActionType.DELETE_CANDLE, payload: id });
		} catch (error) {
			console.log(error);
		}
	};
