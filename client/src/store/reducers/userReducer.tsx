import { ActionType } from "../actions/actionTypes";
import { UserActions } from "../actions";
import { Reducer } from "redux";

interface CartSchema {
	productName: string;
	productId: string;
	totalPrice: number;
	productQuantity: number;
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
		case ActionType.ADD_TO_CART:
			if (user.cart[0].productName == "none" && user.cart.length == 1) {
				user.cart = action.payload;
				return user;
			} else {
				user.cart = action.payload;
				return user;
			}

		default:
			return user;
	}
};

export default reducer;
