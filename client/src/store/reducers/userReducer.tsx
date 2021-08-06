import { ActionType } from "../actions/actionTypes";
import { UserActions } from "../actions";
import { Reducer } from "redux";

interface OrdersSchema {
	productName: string;
	productQuantity: number;
}

interface UserSchema {
	name: string;
	auth0ID: string;
	orders: Array<OrdersSchema>;
	_id: string;
	cart: Array<OrdersSchema>;
}

let initialState: UserSchema = {
	name: "Guest",
	auth0ID: "GuestID",
	orders: [],
	_id: "6109c4e2bf50d522609ed25f",
	cart: [
		{
			productName: "",
			productQuantity: 0,
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
			user.cart.push(action.payload);
			return user;

		default:
			return user;
	}
};

export default reducer;
