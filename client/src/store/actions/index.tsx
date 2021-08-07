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

interface CandleSchema {
	title: string;
	message: string;
	tags: Array<string>;
	purchaseCount: number;
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
	image: string;
	dimensions: string;
	fragrance: string;
	wax: string;
	weight: string;
	price: number;
}

type CandlesArray = Array<CandleSchema>;

interface CreateCandleAction {
	type: ActionType.CREATE_CANDLE;
	payload: CandleSchema;
}

interface DeleteCandleAction {
	type: ActionType.DELETE_CANDLE;
	payload: string;
}

interface UpdateCandleAction {
	type: ActionType.UPDATE_CANDLE;
	payload: CandleSchema;
}

interface PurchaseCandleAction {
	type: ActionType.PURCHASE_CANDLE;
	payload: CandleSchema;
}

interface GetCandle {
	type: ActionType.FETCH_CANDLE;
	payload: CandleSchema;
}

interface GetCandles {
	type: ActionType.FETCH_ALL_CANDLES;
	payload: CandlesArray;
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

interface CartSchema {
	productName: string;
	productId: string;
	totalPrice: number;
	price: number;
	productQuantity: number;
	_id: string;
}

type CartsArray = Array<CartSchema>;

interface productSchema {
	productName: string;
	productId: string;
	price: number;
	productQuantity: number;
}

interface UsersSchema {
	name: string;
	auth0ID: string;
	orders: Array<CartSchema>;
	_id: string;
	cart: Array<CartSchema>;
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
	payload: CartsArray;
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
