import { ActionType } from "./actionTypes";

export {
	createCandle,
	deleteCandle,
	purchaseCandle,
	getCandles,
	getCandle,
} from "./candlesActionCreator";

export {
	getUsers,
	getUser,
	updateUser,
	addToCart,
	createUser,
} from "./usersActionCreator";

export { toggleTheme } from "./appActionCreator";
export interface ToggleTheme {
	type: ActionType.TOGGLE_THEME;
}

interface PostsSchema {
	title: string;
	message: string;
	tags: Array<string>;
	purchaseCount: {
		type: number;
		default: 0;
	};
	createdAt: {
		type: Date;
		default: Date;
	};
	_id: string;
	__v: {
		type: number;
		default: 0;
	};
	burningTime: string;
	dimensions: string;
	fragrance: string;
	wax: string;
	weight: string;
	price: number;
}

interface CreateCandleAction {
	type: ActionType.CREATE_CANDLE;
	payload: Array<PostsSchema>;
}

interface DeleteCandleAction {
	type: ActionType.DELETE_CANDLE;
	payload: string;
}

interface UpdateCandleAction {
	type: ActionType.UPDATE_CANDLE;
	payload: PostsSchema;
}

interface PurchaseCandleAction {
	type: ActionType.PURCHASE_CANDLE;
	payload: PostsSchema;
}

interface GetCandle {
	type: ActionType.FETCH_CANDLE;
	payload: PostsSchema;
}

interface GetCandles {
	type: ActionType.FETCH_ALL_CANDLES;
	payload: Array<PostsSchema>;
}

export interface ToggleTheme {
	type: ActionType.TOGGLE_THEME;
}

export type CandleActions =
	| GetCandles
	| GetCandle
	| PurchaseCandleAction
	| UpdateCandleAction
	| DeleteCandleAction
	| CreateCandleAction;

interface OrdersSchema {
	productName: string;
	productQuantity: number;
}
interface UsersSchema {
	name: string;
	auth0ID: string;
	orders: Array<OrdersSchema>;
	_id: string;
	cart: Array<OrdersSchema>;
}

interface CreateUserAction {
	type: ActionType.CREATE_USER;
	payload: UsersSchema;
}

interface UpdateUserAction {
	type: ActionType.UPDATE_USER;
	payload: UsersSchema;
}

interface AddToCartAction {
	type: ActionType.ADD_TO_CART;
	payload: UsersSchema;
}

interface GetUserAction {
	type: ActionType.GET_USER;
	payload: UsersSchema;
}

interface GetUsersAction {
	type: ActionType.GET_USERS_COUNT;
	payload: Array<object>;
}

export type UserActions =
	| GetUserAction
	| UpdateUserAction
	| GetUsersAction
	| AddToCartAction
	| CreateUserAction;
