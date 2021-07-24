import * as actionTypes from "./actionTypes";
import * as api from "../../apis/memories";

export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts();

		dispatch({ type: actionTypes.FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post);
		dispatch({ type: actionTypes.CREATE_POST, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);

		dispatch({ type: actionTypes.UPDATE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);

		dispatch({ type: actionTypes.LIKE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);

		dispatch({ type: actionTypes.DELETE_POST, payload: id });
	} catch (error) {
		console.log(error);
	}
};
