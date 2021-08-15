import { ActionType } from "./actionTypes";
import { Dispatch } from "redux";
import { UserActions } from "./index";
import * as api from "../../apis/users";
import * as productApi from "../../apis/products";

interface UsersSchema {
	firstName: string;
	lastName: string;
	auth0ID: string;
	couponDiscount: number;
	newsLetterDiscount: number;
	totalDiscounts: number;
	shippingCost: number;
	total: number;
	email: string;
	address: string;
	createdAt: string;
	city: string;
	postalCode: number;
	country: string;
	region: string;
	orders: Array<CartSchema>;
	_id: string;
	cart: Array<CartSchema>;
	cartTotal: number;
	cartWeight: number;
}

export enum ShippingMethod {
	STANDARD = "STANDARD",
	EXPEDITED = "EXPEDITED",
}

interface NewUserSchema {
	firstName: string;
	lastName: string;
	auth0ID: string;
}
interface CartSchema {
	productName: string;
	productId: string;
	productWeight: number;
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
	productWeight: number;
}

interface UserSubmitDetails {
	userEmail: string;
	userFirstName: string;
	userLastName: string;
	userPostalCode: number;
	userCountry: string;
	userRegion: string;
	userAddress: string;
	userCity: string;
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

			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				country,
				region,
				address,
				city,
				cartWeight,
				total,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount,
			} = data;
			let newData;
			let exists = false;

			//if cart is empty
			if (cart.length == 0) {
				let firstItem = {
					productName: candleData.productName,
					productId: candleData.productId,
					totalPrice: candleData.price,
					productWeight: candleData.productWeight,
					price: candleData.price,
					productQuantity: 1,
				};
				cart.push(firstItem);
				newData = {
					orders,
					cart,
					firstName,
					lastName,
					createdAt,
					auth0ID,
					_id,
					cartTotal: candleData.price,
					cartWeight: candleData.productWeight,
					email,
					postalCode,
					shippingCost,
					country,
					region,
					address,
					city,
					total: candleData.price,
					couponDiscount,
					totalDiscounts,
					newsLetterDiscount,
				};

				await api.updateUser(userID, newData);
				dispatch({ type: ActionType.ADD_TO_CART, payload: newData });
			} else if (
				cart.length > 0 &&
				cart[0].productName == "None" &&
				cart.length == 1
			) {
				cart[0].productName = candleData.productName;
				cart[0].productId = candleData.productId;
				cart[0].productWeight = candleData.productWeight;
				cart[0].totalPrice = candleData.price;
				cart[0].price = candleData.price;
				cart[0].productQuantity = 1;

				newData = {
					orders,
					cart,
					firstName,
					lastName,
					createdAt,

					auth0ID,
					_id,
					cartTotal: candleData.price,
					cartWeight: candleData.productWeight,
					email,
					postalCode,
					shippingCost,
					country,
					region,
					address,
					city,
					total: candleData.price,
					couponDiscount,
					totalDiscounts,
					newsLetterDiscount,
				};
				await api.updateUser(userID, newData);
				dispatch({ type: ActionType.ADD_TO_CART, payload: newData });
			} else {
				for (let i = 0; i < cart.length; i++) {
					exists = Object.values(cart[i]).includes(candleData.productId);
					if (exists) {
						cart[i].productQuantity += 1;
						cart[i].totalPrice += candleData.price;
						cartTotal += candleData.price;
						total += candleData.price;
						cartWeight += candleData.productWeight;
						break;
					}
				}

				if (exists == false) {
					let newProduct = {
						productName: candleData.productName,
						productId: candleData.productId,
						totalPrice: candleData.price,
						productWeight: candleData.productWeight,
						productQuantity: 1,
						_id: _id,
						price: candleData.price,
					};
					cart.push(newProduct);
					cartTotal += candleData.price;
					cartWeight += candleData.productWeight;
					total += candleData.price;
				}
				newData = {
					orders,
					cart,
					firstName,
					lastName,
					createdAt,
					auth0ID,
					_id,
					cartTotal,
					email,
					postalCode,
					shippingCost,
					country,
					region,
					address,
					city,
					cartWeight,
					total,
					couponDiscount,
					totalDiscounts,
					newsLetterDiscount,
				};
				await api.updateUser(userID, newData);
				dispatch({ type: ActionType.ADD_TO_CART, payload: newData });
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

			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				cartWeight,
				email,
				postalCode,
				shippingCost,
				country,
				region,
				address,
				city,
				total,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount,
			} = data;
			for (const product of cart) {
				if (product.productId == productID) {
					cartTotal -= product.totalPrice;
					cartWeight -= product.productWeight;
					total -= product.totalPrice;
				}
			}
			let filtered: CartsArray = cart.filter((product: CartSchema) => {
				return product.productId != productID;
			});

			const newData = {
				orders,
				cart: filtered,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				country,
				region,
				cartWeight,
				address,
				city,
				total,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount,
			};

			await api.updateUser(userID, newData);
			dispatch({ type: ActionType.REMOVE_FROM_CART, payload: newData });
		} catch (error) {
			console.log(error);
		}
	};

export const lowerQuantity =
	(productID: string, userID: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(userID);

			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				country,
				cartWeight,
				region,
				address,
				city,
				total,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount,
			} = data;

			for (var i in cart) {
				if (cart[i].productId == productID) {
					if (cart[i].productQuantity > 1) {
						cart[i].totalPrice -= cart[i].price;
						cartTotal -= cart[i].price;
						cartWeight -= cart[i].productWeight;
						total -= cart[i].price;
						cart[i].productQuantity -= 1;
						break;
					}
				}
			}

			const newData = {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				country,
				region,
				address,
				city,
				cartWeight,
				total,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount,
			};

			await api.updateUser(userID, newData);
			dispatch({ type: ActionType.LOWER_QUANTITY, payload: newData });
		} catch (error) {
			console.log(error);
		}
	};

export const addSpecificAmount =
	(userID: string, productData: ProductSchema, quantity: number) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(userID);

			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				cartWeight,
				shippingCost,
				country,
				region,
				address,
				city,
				total,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount,
			} = data;

			let hasProduct = cart.some(
				(product: CartSchema) => product.productId === productData.productId
			);
			if (!hasProduct && cart[0].productName == "None") {
				let newData = {
					productName: productData.productName,
					productId: productData.productId,
					productWeight: productData.productWeight,
					totalPrice: productData.price * quantity,
					price: productData.price,
					productQuantity: quantity,
				};
				cart[0] = newData;
				cartTotal = productData.price * quantity;
				cartWeight = productData.productWeight * quantity;
				total = productData.price * quantity;
			} else if (!hasProduct) {
				let newData = {
					productName: productData.productName,
					productWeight: productData.productWeight,
					productId: productData.productId,
					totalPrice: productData.price * quantity,
					price: productData.price,
					productQuantity: quantity,
				};
				cart.push(newData);
				cartTotal += productData.price * quantity;
				cartWeight += productData.productWeight * quantity;
				total += productData.price * quantity;
			} else {
				for (var i in cart) {
					if (cart[i].productId == productData.productId) {
						cartTotal += productData.price * quantity;
						cartWeight += productData.productWeight * quantity;
						total += productData.price * quantity;
						cart[i].totalPrice += productData.price * quantity;
						cart[i].productQuantity += quantity;
						break;
					}
				}
			}

			const newData = {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				country,
				region,
				address,
				cartWeight,
				city,
				total,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount,
			};

			await api.updateUser(userID, newData);
			dispatch({ type: ActionType.ADD_TO_CART_QUANTITY, payload: newData });
		} catch (error) {
			console.log(error);
		}
	};
export const addCouponDiscount =
	(value: number, userID: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(userID);

			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				cartWeight,
				shippingCost,
				country,
				region,
				address,
				city,
				total,
				totalDiscounts,
				newsLetterDiscount,
			} = data;
			const newData = {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				cartWeight,
				shippingCost,
				country,
				region,
				address,
				city,
				total: total - value,
				couponDiscount: value,
				totalDiscounts,
				newsLetterDiscount,
			};

			await api.updateUser(userID, newData);

			dispatch({ type: ActionType.ADD_COUPON_DISCOUNT, payload: value });
		} catch (error) {
			console.log(error);
		}
	};

export const addNewsLetterDiscount =
	(value: number, userID: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(userID);

			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				country,
				region,
				address,
				cartWeight,
				city,
				total,
				couponDiscount,
				totalDiscounts,
			} = data;
			const newData = {
				orders,
				cart,
				firstName,
				lastName,
				cartWeight,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				country,
				region,
				address,
				city,
				total: total - value,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount: value,
			};

			await api.updateUser(userID, newData);

			dispatch({
				type: ActionType.ADD_NEWSLETTER_DISCOUNT,
				payload: value,
			});
		} catch (error) {
			console.log(error);
		}
	};

export const removeNewsLetterDiscount =
	(value: number, userID: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(userID);

			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				country,
				region,
				address,
				city,
				cartWeight,
				total,
				couponDiscount,
				totalDiscounts,
			} = data;
			const newData = {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				country,
				region,
				address,
				city,
				cartWeight,
				total: total + value,
				couponDiscount,
				totalDiscounts: totalDiscounts,
				newsLetterDiscount: 0,
			};

			await api.updateUser(userID, newData);

			dispatch({
				type: ActionType.REMOVE_NEWSLETTER_DISCOUNT,
				payload: value,
			});
		} catch (error) {
			console.log(error);
		}
	};

export const updateTotalDiscounts =
	(userID: string) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(userID);

			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				country,
				cartWeight,
				region,
				address,
				city,
				total,
				couponDiscount,
				newsLetterDiscount,
				totalDiscounts,
			} = data;

			const newData = {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				cartWeight,
				shippingCost,
				country,
				region,
				address,
				city,
				totalDiscounts: couponDiscount + newsLetterDiscount,
				total,
				couponDiscount,
				newsLetterDiscount,
			};

			await api.updateUser(userID, newData);
			dispatch({ type: ActionType.UPDATE_TOTAL_DISCOUNT });
		} catch (error) {
			console.log(error);
		}
	};

export const userSubmitDetails =
	(userID: string, userDetails: UserSubmitDetails) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(userID);

			let {
				userEmail,
				userFirstName,
				userLastName,
				userPostalCode,
				userCountry,
				userRegion,
				userAddress,
				userCity,
			} = userDetails;

			let {
				orders,
				cart,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				cartWeight,
				totalDiscounts,
				shippingCost,
				total,
				couponDiscount,
				newsLetterDiscount,
			} = data;

			const newData = {
				orders,
				cart,
				firstName: userFirstName,
				lastName: userLastName,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email: userEmail,
				postalCode: userPostalCode,
				shippingCost,
				country: userCountry,
				cartWeight,
				region: userRegion,
				address: userAddress,
				city: userCity,
				total,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount,
			};
			await api.updateUser(userID, newData);
		} catch (error) {
			console.log(error);
		}
	};

export const updateAddress =
	(value: string) => (dispatch: Dispatch<UserActions>) => {
		dispatch({ type: ActionType.UPDATE_ADDRESS, payload: value });
	};

export const updateCity =
	(value: string) => (dispatch: Dispatch<UserActions>) => {
		dispatch({ type: ActionType.UPDATE_CITY, payload: value });
	};

export const updatePostalCode =
	(value: number) => (dispatch: Dispatch<UserActions>) => {
		dispatch({ type: ActionType.UPDATE_POSTAL_CODE, payload: value });
	};

export const updateCountry =
	(value: string) => (dispatch: Dispatch<UserActions>) => {
		dispatch({ type: ActionType.UPDATE_COUNTRY, payload: value });
	};

export const updateRegion =
	(value: string) => (dispatch: Dispatch<UserActions>) => {
		dispatch({ type: ActionType.UPDATE_REGION, payload: value });
	};
export const updateEmail =
	(value: string) => (dispatch: Dispatch<UserActions>) => {
		dispatch({ type: ActionType.UPDATE_EMAIL, payload: value });
	};

export const updateFirstName =
	(value: string) => (dispatch: Dispatch<UserActions>) => {
		dispatch({ type: ActionType.UPDATE_FIRST_NAME, payload: value });
	};

export const updateLastName =
	(value: string) => (dispatch: Dispatch<UserActions>) => {
		dispatch({ type: ActionType.UPDATE_LAST_NAME, payload: value });
	};

export const updateShippingCost =
	(shippingMethod: string, userID: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.fetchUser(userID);
			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				cartWeight,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				country,
				region,
				address,
				city,
				total,
				couponDiscount,
				newsLetterDiscount,
				totalDiscounts,
			} = data;

			let price = 0;

			//every 500grams is $1
			switch (shippingMethod) {
				case ShippingMethod.STANDARD:
					price = cartWeight / 500 + 5;
					break;
				case ShippingMethod.EXPEDITED:
					price = cartWeight / 500 + 7;
					break;

				default:
					price = 0;
					break;
			}

			const newData = {
				orders,
				cart,
				firstName,
				lastName,
				cartWeight,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				shippingCost: price,
				country,
				region,
				address,
				city,
				total,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount,
			};
			await api.updateUser(userID, newData);
			dispatch({ type: ActionType.UPDATE_SHIPPING, payload: price });
		} catch (error) {
			console.log(error);
		}
	};
