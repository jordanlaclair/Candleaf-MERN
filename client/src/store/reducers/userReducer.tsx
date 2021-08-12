import { ActionType } from "../actions/actionTypes";
import { UserActions } from "../actions";
import { Reducer } from "redux";

interface CartSchema {
	productName: string;
	productId: string;
	totalPrice: number;
	productQuantity: number;
	price: number;
	_id: string;
}

interface UserSchema {
	name: string;
	auth0ID: string;
	couponDiscount: number;
	newsLetterDiscount: number;
	totalDiscounts: number;
	shippingCost: number;
	createdAt?: string;
	total: number;
	email: string;
	address: string;
	city: string;
	postalCode: string;
	country: string;
	region: string;
	orders: CartsArray;
	_id: string;
	cart: CartsArray;
	cartTotal: number;
}

type CartsArray = Array<CartSchema>;

let initialState: UserSchema = {
	name: "Guest",
	auth0ID: "GuestID",
	orders: [],
	couponDiscount: 0,
	email: "",
	address: "",
	city: "",
	postalCode: "",
	country: "",
	createdAt: "",
	region: "",
	newsLetterDiscount: 0,
	totalDiscounts: 0,
	shippingCost: 0,
	total: 0,
	_id: "6109c4e2bf50d522609ed25f",
	cart: [
		{
			productName: "none",
			productQuantity: 0,
			productId: "none",
			totalPrice: 0,
			_id: "none",
			price: 0,
		},
	],
	cartTotal: 0,
};

const reducer: Reducer<UserSchema, UserActions> = (
	user = initialState,
	action
): UserSchema => {
	switch (action.type) {
		case ActionType.CREATE_USER:
			return action.payload;
		case ActionType.UPDATE_USER:
			return action.payload;
		case ActionType.REMOVE_FROM_CART:
			return action.payload;
		case ActionType.ADD_TO_CART:
			return action.payload;
		case ActionType.LOWER_QUANTITY:
			return action.payload;
		case ActionType.ADD_TO_CART_QUANTITY:
			return action.payload;
		case ActionType.ADD_COUPON_DISCOUNT:
			user.couponDiscount = action.payload;
			user.total -= user.couponDiscount;
			return user;
		case ActionType.ADD_NEWSLETTER_DISCOUNT:
			user.newsLetterDiscount = action.payload;
			user.total -= user.newsLetterDiscount;
			return user;
		case ActionType.REMOVE_NEWSLETTER_DISCOUNT:
			user.total += user.newsLetterDiscount;
			user.newsLetterDiscount = 0;
			return user;
		case ActionType.UPDATE_TOTAL_DISCOUNT:
			user.totalDiscounts = user.couponDiscount + user.newsLetterDiscount;
			return user;
		case ActionType.USER_SUBMIT_DETAILS:
			user = action.payload;
			return user;

		default:
			return user;
	}
};

export default reducer;
