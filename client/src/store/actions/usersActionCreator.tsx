import { ActionType } from "./actionTypes";
import { Dispatch } from "redux";
import { UserActions } from "./index";
import * as api from "../../apis/users";
import * as productApi from "../../apis/products";

interface UsersSchema {
	name: string;
	auth0ID: string;
	orders: Array<CartSchema>;
	cart: Array<CartSchema>;
}
interface NewUserSchema {
	name: string;
	auth0ID: string;
}
interface CartSchema {
	productName: string;
	productId: string;
	totalPrice: number;
	productQuantity: number;
	_id: string;
}
interface ProductSchema {
	productName: string;
	price: number;
	productId: string;
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
	(userID: string, candleData: ProductSchema) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(userID);

			let { orders, name, auth0ID, createdAt, cart, _id, __v } = data;

			let exists = false;
			//if cart is empty
			if (cart[0].productName == "none" && cart.length == 1) {
				cart[0].productName = candleData.productName;
				cart[0].productId = candleData.productId;
				cart[0].totalPrice = candleData.price;
				cart[0].productQuantity = 1;

				const newData = {
					orders,
					name,
					auth0ID,
					createdAt,
					cart,
					_id,
					__v,
				};
				await api.updateUser(userID, newData);
				dispatch({ type: ActionType.ADD_TO_CART, payload: cart });
			} else {
				for (let i = 0; i < cart.length; i++) {
					exists = Object.values(cart[i]).includes(candleData.productId);
					if (exists) {
						console.log("here3");
						cart[i].productQuantity += 1;
						cart[i].totalPrice += candleData.price;
						break;
					}
				}

				if (exists == false) {
					console.log("not existing case");
					let newProduct = {
						productName: candleData.productName,
						productId: candleData.productId,
						totalPrice: 0,
						productQuantity: 0,
						_id: _id,
					};
					cart.push(newProduct);
				}
				const newData = {
					orders,
					name,
					auth0ID,
					createdAt,
					cart,
					_id,
					__v,
				};
				await api.updateUser(userID, newData);
				dispatch({ type: ActionType.ADD_TO_CART, payload: cart });
			}
		} catch (error) {
			console.log(error);
		}
	};
