import { ActionType } from "./actionTypes";
import { Dispatch } from "redux";
import { PostActions } from "./index";
import * as api from "../../apis/memories";

export const getCandles = () => async (dispatch: Dispatch<PostActions>) => {
	try {
		const { data } = await api.fetchCandles();

		dispatch({ type: ActionType.FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const getCandle =
	(id: string) => async (dispatch: Dispatch<PostActions>) => {
		try {
			const { data } = await api.fetchCandle(id);

			dispatch({ type: ActionType.FETCH_ALL, payload: data });
		} catch (error) {
			console.log(error.message);
		}
	};

export const createCandle =
	(post: object) => async (dispatch: Dispatch<PostActions>) => {
		try {
			const { data } = await api.createCandle(post);
			dispatch({ type: ActionType.CREATE_POST, payload: data });
		} catch (error) {
			console.log(error.message);
		}
	};

export const updateCandle =
	(id: string, post: object) => async (dispatch: Dispatch<PostActions>) => {
		try {
			const { data } = await api.updateCandle(id, post);

			dispatch({ type: ActionType.UPDATE_POST, payload: data });
		} catch (error) {
			console.log(error);
		}
	};

export const purchaseCandle =
	(id: string) => async (dispatch: Dispatch<PostActions>) => {
		try {
			const { data } = await api.purchaseCandle(id);

			dispatch({ type: ActionType.LIKE_POST, payload: data });
		} catch (error) {
			console.log(error);
		}
	};

export const deleteCandle =
	(id: string) => async (dispatch: Dispatch<PostActions>) => {
		try {
			await api.deleteCandle(id);
			dispatch({ type: ActionType.DELETE_POST, payload: id });
		} catch (error) {
			console.log(error);
		}
	};
