import { ActionType } from "./actionTypes";
import { Dispatch } from "redux";
import { PostActions } from "./index";
import * as api from "../../apis/memories";

export const getPosts = () => async (dispatch: Dispatch<PostActions>) => {
	try {
		const { data } = await api.fetchPosts();

		dispatch({ type: ActionType.FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createPost =
	(post: object) => async (dispatch: Dispatch<PostActions>) => {
		try {
			const { data } = await api.createPost(post);
			dispatch({ type: ActionType.CREATE_POST, payload: data });
		} catch (error) {
			console.log(error.message);
		}
	};

export const updatePost =
	(id: string, post: object) => async (dispatch: Dispatch<PostActions>) => {
		try {
			const { data } = await api.updatePost(id, post);

			dispatch({ type: ActionType.UPDATE_POST, payload: data });
		} catch (error) {
			console.log(error);
		}
	};

export const likePost =
	(id: string) => async (dispatch: Dispatch<PostActions>) => {
		try {
			const { data } = await api.likePost(id);

			dispatch({ type: ActionType.LIKE_POST, payload: data });
		} catch (error) {
			console.log(error);
		}
	};

export const deletePost =
	(id: string) => async (dispatch: Dispatch<PostActions>) => {
		try {
			await api.deletePost(id);
			dispatch({ type: ActionType.DELETE_POST, payload: id });
		} catch (error) {
			console.log(error);
		}
	};
