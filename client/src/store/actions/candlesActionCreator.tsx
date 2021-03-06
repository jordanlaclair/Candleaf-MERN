import { ActionType } from "./actionTypes";
import { Dispatch } from "redux";
import { CandleActions } from "./index";
import { CandlesArray } from "./index";

import * as api from "../../apis/products";

export const getCandles = () => async (dispatch: Dispatch<CandleActions>) => {
	try {
		const { data } = await api.fetchCandles();

		dispatch({ type: ActionType.FETCH_ALL_CANDLES, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getCandle =
	(id: string) => async (dispatch: Dispatch<CandleActions>) => {
		try {
			const { data } = await api.fetchCandle(id);

			dispatch({ type: ActionType.FETCH_CANDLE, payload: data });
		} catch (error) {
			console.log(error);
		}
	};

export const createCandle =
	(post: object) => async (dispatch: Dispatch<CandleActions>) => {
		try {
			const { data } = await api.createCandle(post);
			dispatch({ type: ActionType.CREATE_CANDLE, payload: data });
		} catch (error) {
			console.log(error);
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

export const updateCandles =
	(candles: CandlesArray) => (dispatch: Dispatch<CandleActions>) => {
		dispatch({ type: ActionType.UPDATE_CANDLES, payload: candles });
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
