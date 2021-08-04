import { ActionType } from "./actionTypes";
import { Dispatch } from "redux";
import { UserActions } from "./index";
import * as api from "../../apis/users";

interface UsersSchema {
	name: string;
	auth0ID: string;
	orders: Array<OrdersSchema>;
	cart: Array<OrdersSchema>;
}
interface NewUserSchema {
	name: string;
	auth0ID: string;
}
interface OrdersSchema {
	productName: string;
	productQuantity: number;
}

export const getUsers = () => async (dispatch: Dispatch<UserActions>) => {
	try {
		const { data } = await api.fetchUsers();
		dispatch({ type: ActionType.GET_USERS_COUNT, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const getUser =
	(id: string) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(id);
			dispatch({ type: ActionType.GET_USER, payload: data });
		} catch (error) {
			console.log(error.message);
		}
	};

export const createUser =
	(post: NewUserSchema) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.createUser(post);
			dispatch({ type: ActionType.CREATE_USER, payload: data });
		} catch (error) {
			console.log(error.message);
		}
	};

export const updateUser =
	(id: string, post: UsersSchema) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.updateUser(id, post);

			dispatch({ type: ActionType.UPDATE_USER, payload: data });
		} catch (error) {
			console.log(error);
		}
	};

export const addToCart =
	(id: string, product: object) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(id);

			const { cart, name, createdAt, auth0ID, _id, orders, __v } = data;
			const newCart = cart.push(product);
			const newUser = {
				cart: newCart,
				name,
				createdAt,
				auth0ID,
				_id,
				orders,
				__v,
			};

			await api.updateUser(id, newUser);

			dispatch({ type: ActionType.ADD_TO_CART, payload: newUser });
		} catch (error) {
			console.log(error);
		}
	};
