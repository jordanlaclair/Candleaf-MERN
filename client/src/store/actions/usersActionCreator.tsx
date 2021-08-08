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
	price: number;
	productQuantity: number;
	_id: string;
}
type CartsArray = Array<CartSchema>;
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
			let newData;
			let exists = false;

			//if cart is empty
			if (cart.length == 0) {
				let firstItem = {
					productName: candleData.productName,
					productId: candleData.productId,
					totalPrice: candleData.price,
					price: candleData.price,
					productQuantity: 1,
				};

				cart.push(firstItem);
				dispatch({ type: ActionType.ADD_TO_CART, payload: cart });
				newData = {
					orders,
					name,
					auth0ID,
					createdAt,
					cart,
					_id,
					__v,
				};
				await api.updateUser(userID, newData);
			} else if (
				cart.length > 0 &&
				cart[0].productName == "none" &&
				cart.length == 1
			) {
				cart[0].productName = candleData.productName;
				cart[0].productId = candleData.productId;
				cart[0].totalPrice = candleData.price;
				cart[0].price = candleData.price;
				cart[0].productQuantity = 1;

				newData = {
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
						cart[i].productQuantity += 1;
						cart[i].totalPrice += candleData.price;
						break;
					}
				}

				if (exists == false) {
					let newProduct = {
						productName: candleData.productName,
						productId: candleData.productId,
						totalPrice: candleData.price,
						productQuantity: 1,
						_id: _id,
						price: candleData.price,
					};
					cart.push(newProduct);
				}
				newData = {
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

export const removeFromCart =
	(productID: string, userID: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(userID);

			let { orders, name, auth0ID, createdAt, cart, _id, __v } = data;

			let filtered: CartsArray = cart.filter((product: CartSchema) => {
				return product.productId != productID;
			});

			const newData = {
				orders,
				name,
				auth0ID,
				createdAt,
				cart: filtered,
				_id,
				__v,
			};

			await api.updateUser(userID, newData);
			dispatch({ type: ActionType.REMOVE_FROM_CART, payload: filtered });
		} catch (error) {
			console.log(error);
		}
	};

export const lowerQuantity =
	(productID: string, userID: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(userID);

			let { orders, name, auth0ID, createdAt, cart, _id, __v } = data;

			for (var i in cart) {
				if (cart[i].productId == productID) {
					if (cart[i].productQuantity > 1) {
						cart[i].totalPrice -= cart[i].price;
						cart[i].productQuantity -= 1;
						break;
					}
				}
			}

			const newData = {
				orders,
				name,
				auth0ID,
				createdAt,
				cart: cart,
				_id,
				__v,
			};

			await api.updateUser(userID, newData);
			dispatch({ type: ActionType.LOWER_QUANTITY, payload: cart });
		} catch (error) {
			console.log(error);
		}
	};

export const addSpecificAmount =
	(userID: string, productData: ProductSchema, quantity: number) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(userID);

			let { orders, name, auth0ID, createdAt, cart, _id, __v } = data;

			let hasProduct = cart.some(
				(product: CartSchema) => product.productId === productData.productId
			);

			if (!hasProduct) {
				let newData = {
					productName: productData.productName,
					productId: productData.productId,
					totalPrice: productData.price * quantity,
					price: productData.price,
					productQuantity: quantity,
				};
				cart.push(newData);
			} else {
				for (var i in cart) {
					if (cart[i].productId == productData.productId) {
						cart[i].totalPrice += productData.price * quantity;
						cart[i].productQuantity += quantity;
						break;
					}
				}
			}

			const newData = {
				orders,
				name,
				auth0ID,
				createdAt,
				cart: cart,
				_id,
				__v,
			};

			await api.updateUser(userID, newData);
			dispatch({ type: ActionType.ADD_TO_CART_QUANTITY, payload: cart });
		} catch (error) {
			console.log(error);
		}
	};
