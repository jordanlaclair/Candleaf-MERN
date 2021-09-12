import { ActionType } from "./actionTypes";
import { Dispatch } from "redux";
import { UserActions } from "./index";
import * as api from "../../apis/users";
import * as productApi from "../../apis/products";

interface UsersSchema {
	firstName: string;
	lastName: string;
	auth0ID: string;
	guestID: string;
	couponDiscount: number;
	newsLetterDiscount: number;
	totalDiscounts: number;
	shippingCost: number;
	shippingMethod: string;
	total: number;
	email: string;
	address: string;
	createdAt: string;
	city: string;
	postalCode: number;
	country: string;
	region: string;
	orders: OrdersArray;
	_id: string;
	cart: CartsArray;
	cartTotal: number;
	cartWeight: number;
}

export enum ShippingMethod {
	STANDARD = "STANDARD",
	EXPEDITED = "EXPEDITED",
	NONE = "NONE",
}

interface CartSchema {
	productName: string;
	productWeight: number;
	productId: string;
	totalPrice: number;
	productQuantity: number;
	price: number;
	_id: string;
}

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
interface OrderData {
	productName: string;
	productWeight: number;
	productId: string;
	totalPrice: number;
	productQuantity: number;
	price: number;
	_id: string;
}

interface OrderSchema {
	data: Array<OrderData>;
	purchasedOn: String;
	shippingMethod: String;
	total: Number;
	orderNumber: Number;
}
type CartsArray = Array<CartSchema>;
type OrdersArray = Array<OrderSchema>;

export const getUsers = () => async (dispatch: Dispatch<UserActions>) => {
	try {
		const { data } = await api.fetchUsers();

		dispatch({ type: ActionType.GET_USERS_COUNT, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getUser =
	(id: string) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const response = await api.fetchUser(id);

			dispatch({ type: ActionType.GET_USER, payload: response?.data });
		} catch (error) {
			console.log(error);
			return 0;
		}
	};

export const createUser =
	(userData: object) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await api.createUser(userData);
			dispatch({ type: ActionType.CREATE_USER, payload: data });
		} catch (error) {
			console.log(error);
		}
	};

export const getAuthUser =
	(id: string) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const response = await api.fetchAuthUser(id);
			const data = response?.data;

			dispatch({ type: ActionType.GET_AUTH_USER, payload: data });
		} catch (error) {
			console.log(error);
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
	(userID: string, candleData: ProductSchema, typeOfUser: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			let response;
			if (typeOfUser == "auth") {
				response = await api.fetchAuthUser(userID);
			} else {
				response = await api.fetchUser(userID);
			}

			const data = response?.data;

			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				guestID,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				shippingMethod,
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
			if (cart.length === 0) {
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
					guestID,
					createdAt,
					auth0ID,
					_id,
					cartTotal: candleData.price,
					cartWeight: candleData.productWeight,
					email,
					postalCode,
					shippingCost,
					shippingMethod,
					country,
					region,
					address,
					city,
					total: candleData.price,
					couponDiscount,
					totalDiscounts,
					newsLetterDiscount,
				};
				if (typeOfUser == "auth") {
					await api.updateAuthUser(userID, newData);
				} else {
					await api.updateUser(userID, newData);
				}
				dispatch({ type: ActionType.ADD_TO_CART, payload: newData });
			} else if (
				cart.length > 0 &&
				cart[0].productName === "None" &&
				cart.length === 1
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
					guestID,
					createdAt,
					shippingMethod,
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
				if (typeOfUser == "auth") {
					await api.updateAuthUser(userID, newData);
				} else {
					await api.updateUser(userID, newData);
				}
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

				if (exists === false) {
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
					guestID,
					lastName,
					createdAt,
					auth0ID,
					shippingMethod,
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
				if (typeOfUser == "auth") {
					await api.updateAuthUser(userID, newData);
				} else {
					await api.updateUser(userID, newData);
				}
				dispatch({ type: ActionType.ADD_TO_CART, payload: newData });
			}
		} catch (error) {
			console.log(error);
		}
	};

export const removeFromCart =
	(productID: string, userID: string, typeOfUser: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			let response;
			if (typeOfUser == "auth") {
				response = await api.fetchAuthUser(userID);
			} else {
				response = await api.fetchUser(userID);
			}

			const data = response?.data;

			let {
				orders,
				cart,
				firstName,
				lastName,
				guestID,
				createdAt,
				auth0ID,
				_id,
				shippingMethod,
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
				if (product.productId === productID) {
					cartTotal -= product.totalPrice;
					cartWeight -= product.productWeight;
					total -= product.totalPrice;
				}
			}
			let filtered: CartsArray = cart.filter((product: CartSchema) => {
				return product.productId !== productID;
			});

			const newData = {
				orders,
				cart: filtered,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				guestID,
				cartTotal,
				email,
				postalCode,
				shippingMethod,
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

			if (typeOfUser == "auth") {
				await api.updateAuthUser(userID, newData);
			} else {
				await api.updateUser(userID, newData);
			}

			dispatch({ type: ActionType.REMOVE_FROM_CART, payload: newData });
		} catch (error) {
			console.log(error);
		}
	};

export const lowerQuantity =
	(productID: string, userID: string, typeOfUser: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			let response;
			if (typeOfUser == "auth") {
				response = await api.fetchAuthUser(userID);
			} else {
				response = await api.fetchUser(userID);
			}

			const data = response?.data;
			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				guestID,
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
				shippingMethod,
				city,
				total,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount,
			} = data;

			for (var i in cart) {
				if (cart[i].productId === productID) {
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
				guestID,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				country,
				shippingMethod,
				region,
				address,
				city,
				cartWeight,
				total,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount,
			};
			if (typeOfUser == "auth") {
				await api.updateAuthUser(userID, newData);
			} else {
				await api.updateUser(userID, newData);
			}

			dispatch({ type: ActionType.LOWER_QUANTITY, payload: newData });
		} catch (error) {
			console.log(error);
		}
	};

export const addSpecificAmount =
	(
		userID: string,
		productData: ProductSchema,
		quantity: number,
		typeOfUser: string
	) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			let response;
			if (typeOfUser == "auth") {
				response = await api.fetchAuthUser(userID);
			} else {
				response = await api.fetchUser(userID);
			}

			const data = response?.data;

			let {
				orders,
				cart,
				firstName,
				lastName,
				guestID,
				createdAt,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				cartWeight,
				shippingCost,
				shippingMethod,
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
			if (!hasProduct && cart[0].productName === "None") {
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
					if (cart[i].productId === productData.productId) {
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
				guestID,
				email,
				postalCode,
				shippingCost,
				shippingMethod,
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
			if (typeOfUser == "auth") {
				await api.updateAuthUser(userID, newData);
			} else {
				await api.updateUser(userID, newData);
			}

			dispatch({ type: ActionType.ADD_TO_CART_QUANTITY, payload: newData });
		} catch (error) {
			console.log(error);
		}
	};
export const addCouponDiscount =
	(value: number, userID: string, typeOfUser: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			let response;
			if (typeOfUser == "auth") {
				response = await api.fetchAuthUser(userID);
			} else {
				response = await api.fetchUser(userID);
			}

			const data = response?.data;

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
				guestID,
				shippingMethod,
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
				guestID,
				email,
				postalCode,
				cartWeight,
				shippingCost,
				shippingMethod,
				country,
				region,
				address,
				city,
				total,
				couponDiscount: value,
				totalDiscounts,
				newsLetterDiscount,
			};
			if (typeOfUser == "auth") {
				await api.updateAuthUser(userID, newData);
			} else {
				await api.updateUser(userID, newData);
			}

			dispatch({ type: ActionType.ADD_COUPON_DISCOUNT, payload: value });
		} catch (error) {
			console.log(error);
		}
	};

export const removeCouponDiscount =
	(userID: string, typeOfUser: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			let response;
			if (typeOfUser == "auth") {
				response = await api.fetchAuthUser(userID);
			} else {
				response = await api.fetchUser(userID);
			}

			const data = response?.data;

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
				guestID,
				cartWeight,
				shippingCost,
				shippingMethod,
				country,
				region,
				address,
				city,
			} = data;

			const newData = {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				guestID,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				cartWeight,
				shippingCost,
				shippingMethod,
				country,
				region,
				address,
				city,
				total: cartTotal,
				couponDiscount: 0,
				totalDiscounts: 0,
				newsLetterDiscount: 0,
			};

			if (typeOfUser == "auth") {
				await api.updateAuthUser(userID, newData);
			} else {
				await api.updateUser(userID, newData);
			}

			dispatch({ type: ActionType.REMOVE_COUPON_DISCOUNT });
		} catch (error) {
			console.log(error);
		}
	};

export const addNewsLetterDiscount =
	(value: number, userID: string, typeOfUser: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			let response;
			if (typeOfUser == "auth") {
				response = await api.fetchAuthUser(userID);
			} else {
				response = await api.fetchUser(userID);
			}

			const data = response?.data;

			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				guestID,
				auth0ID,
				_id,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				shippingMethod,
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
				guestID,
				postalCode,
				shippingCost,
				shippingMethod,
				country,
				region,
				address,
				city,
				total,
				couponDiscount,
				totalDiscounts,
				newsLetterDiscount: value,
			};
			if (typeOfUser == "auth") {
				await api.updateAuthUser(userID, newData);
			} else {
				await api.updateUser(userID, newData);
			}

			dispatch({
				type: ActionType.ADD_NEWSLETTER_DISCOUNT,
				payload: value,
			});
		} catch (error) {
			console.log(error);
		}
	};

export const removeNewsLetterDiscount =
	(value: number, userID: string, typeOfUser: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			let response;
			if (typeOfUser == "auth") {
				response = await api.fetchAuthUser(userID);
			} else {
				response = await api.fetchUser(userID);
			}
			const data = response?.data;

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
				guestID,
				shippingMethod,
				country,
				region,
				address,
				city,
				cartWeight,
			} = data;
			const newData = {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				_id,
				guestID,
				cartTotal,
				email,
				postalCode,
				shippingCost,
				shippingMethod,
				country,
				region,
				address,
				city,
				cartWeight,
				newsLetterDiscount: 0,
			};

			if (typeOfUser == "auth") {
				await api.updateAuthUser(userID, newData);
			} else {
				await api.updateUser(userID, newData);
			}

			dispatch({
				type: ActionType.REMOVE_NEWSLETTER_DISCOUNT,
				payload: value,
			});
		} catch (error) {
			console.log(error);
		}
	};

export const userSubmitDetails =
	(userID: string, userDetails: UserSubmitDetails, typeOfUser: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			let response;
			if (typeOfUser == "auth") {
				response = await api.fetchAuthUser(userID);
			} else {
				response = await api.fetchUser(userID);
			}

			const data = response?.data;
			console.log(userDetails);
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
				cartWeight,
				auth0ID,
				_id,
				guestID,
				cartTotal,
				shippingCost,
				shippingMethod,
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
				guestID,
				shippingMethod,
				email: userEmail,
				postalCode: userPostalCode,
				shippingCost,
				country: userCountry,
				cartWeight,
				region: userRegion,
				address: userAddress,
				city: userCity,
				total: cartTotal - (newsLetterDiscount + couponDiscount),
				couponDiscount,
				totalDiscounts: newsLetterDiscount + couponDiscount,
				newsLetterDiscount,
			};
			if (typeOfUser == "auth") {
				await api.updateAuthUser(userID, newData);
			} else {
				await api.updateUser(userID, newData);
			}
			dispatch({ type: ActionType.USER_SUBMIT_DETAILS });
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
	(shippingMethodInput: string, userID: string, typeOfUser: string) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			let response;
			if (typeOfUser == "auth") {
				response = await api.fetchAuthUser(userID);
			} else {
				response = await api.fetchUser(userID);
			}

			const data = response?.data;
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
				guestID,
				email,
				postalCode,
				shippingMethod,
				country,
				shippingCost,
				region,
				address,
				city,
				total,
				couponDiscount,
				newsLetterDiscount,
				totalDiscounts,
			} = data;

			let price = 0;
			let method = "";
			let shippingPayload;
			total = cartTotal - totalDiscounts;
			//every 800 grams is $1
			switch (shippingMethodInput) {
				case ShippingMethod.STANDARD:
					price = cartWeight / 800 + 5;
					method = "Standard";
					break;
				case ShippingMethod.EXPEDITED:
					price = cartWeight / 800 + 7;
					method = "Expedited";
					break;
				case ShippingMethod.NONE:
					price = 0;
					break;
				default:
					price = 0;
					break;
			}

			shippingCost = price;
			total = total + price;
			shippingMethod = method;

			shippingPayload = {
				newShippingCost: price,
				newShippingMethod: method,
				newTotal: total,
			};

			const newData = {
				orders,
				cart,
				firstName,
				lastName,
				cartWeight,
				createdAt,
				guestID,
				auth0ID,
				_id,
				shippingMethod,
				cartTotal,
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
			};
			if (typeOfUser == "auth") {
				await api.updateAuthUser(userID, newData);
			} else {
				await api.updateUser(userID, newData);
			}

			dispatch({
				type: ActionType.UPDATE_SHIPPING,
				payload: shippingPayload,
			});
		} catch (error) {
			console.log(error);
		}
	};

export const addToOrders =
	(
		userCart: CartsArray,
		userID: string,
		orderNumber: number,
		shippingMethod: string,
		cartTotal: number,
		typeOfUser: string
	) =>
	async (dispatch: Dispatch<UserActions>) => {
		try {
			let response;
			if (typeOfUser == "auth") {
				response = await api.fetchAuthUser(userID);
			} else {
				response = await api.fetchUser(userID);
			}

			const data = response?.data;
			let {
				orders,
				cart,
				firstName,
				lastName,
				createdAt,
				auth0ID,
				guestID,
				_id,
				email,
				postalCode,
				country,
				region,
				address,
				city,
			} = data;

			for (const product of cart) {
				let quantity = product.productQuantity;
				let id = product.productId;
				await productApi.purchaseCandle(id, quantity);
			}

			/* let totalCartPrice = 0;
			userCart.forEach((product) => {
				totalCartPrice += product.totalPrice;
			}); */

			let currentDate = new Date()
				.toLocaleTimeString("en-us", {
					month: "long",
					year: "numeric",
					day: "numeric",
				})
				.split(" ");
			const [month, day, year] = currentDate;
			let date = month + " " + day + " " + year.replace(",", "");

			const newOrder: OrderSchema = {
				data: userCart,
				orderNumber,
				purchasedOn: date,
				total: cartTotal,
				shippingMethod,
			};

			const newData: UsersSchema = {
				orders: [...orders, newOrder],
				cart: [],
				firstName,
				lastName,
				createdAt,
				cartWeight: 0,
				auth0ID,
				_id,
				cartTotal: 0,
				guestID,
				email,
				postalCode,
				shippingMethod: "",
				country,
				shippingCost: 0,
				region,
				address,
				city,
				total: 0,
				couponDiscount: 0,
				newsLetterDiscount: 0,
				totalDiscounts: 0,
			};
			if (typeOfUser == "auth") {
				await api.updateAuthUser(userID, newData);
			} else {
				await api.updateUser(userID, newData);
			}

			dispatch({ type: ActionType.PURCHASE_COMPLETE, payload: newData });
		} catch (error) {
			console.log(error);
		}
	};

export const signOut = () => (dispatch: Dispatch<UserActions>) => {
	dispatch({ type: ActionType.SIGN_OUT });
};
