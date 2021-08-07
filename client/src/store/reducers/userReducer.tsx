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
	orders: CartsArray;
	_id: string;
	cart: CartsArray;
}

type CartsArray = Array<CartSchema>;

let initialState: UserSchema = {
	name: "Guest",
	auth0ID: "GuestID",
	orders: [],
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
			user.cart = action.payload;
			return user;
		case ActionType.ADD_TO_CART:
			user.cart = action.payload;
			return user;
		case ActionType.LOWER_QUANTITY:
			user.cart = action.payload;
			return user;

		default:
			return user;
	}
};

export default reducer;
