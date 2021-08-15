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
	lowerQuantity,
	createUser,
	removeFromCart,
	addSpecificAmount,
	userSubmitDetails,
	updateAddress,
	updateShippingCost,
	updateCity,
	updateFirstName,
	updateLastName,
	updatePostalCode,
	updateRegion,
	updateCountry,
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
interface ShippingPayload {
	newTotal: number;
	newShippingCost: number;
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
	productWeight: number;
	productId: string;
	totalPrice: number;
	price: number;
	productQuantity: number;
	_id: string;
}

type CartsArray = Array<CartSchema>;

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
	orders: CartsArray;
	_id: string;
	cart: CartsArray;
	cartTotal: number;
	cartWeight: number;
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

interface AddToCartQuantityAction {
	type: ActionType.ADD_TO_CART_QUANTITY;
	payload: UsersSchema;
}

interface RemoveFromCartAction {
	type: ActionType.REMOVE_FROM_CART;
	payload: UsersSchema;
}

interface LowerQuantityAction {
	type: ActionType.LOWER_QUANTITY;
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

interface AddCouponDiscount {
	type: ActionType.ADD_COUPON_DISCOUNT;
	payload: number;
}

interface RemoveCouponDiscount {
	type: ActionType.REMOVE_COUPON_DISCOUNT;
}

interface AddNewsLetterDiscount {
	type: ActionType.ADD_NEWSLETTER_DISCOUNT;
	payload: number;
}

interface RemoveNewsLetterDiscount {
	type: ActionType.REMOVE_NEWSLETTER_DISCOUNT;
	payload: number;
}
interface UpdateTotalDiscounts {
	type: ActionType.UPDATE_TOTAL_DISCOUNT;
}
interface UpdateTotal {
	type: ActionType.UPDATE_TOTAL;
	payload: number;
}

interface UserSubmitDetails {
	type: ActionType.USER_SUBMIT_DETAILS;
}

interface UpdateUserAddress {
	type: ActionType.UPDATE_ADDRESS;
	payload: string;
}

interface UpdateUserCity {
	type: ActionType.UPDATE_CITY;
	payload: string;
}

interface UpdateUserPostalCode {
	type: ActionType.UPDATE_POSTAL_CODE;
	payload: number;
}

interface UpdateUserCountry {
	type: ActionType.UPDATE_COUNTRY;
	payload: string;
}

interface UpdateUserRegion {
	type: ActionType.UPDATE_REGION;
	payload: string;
}

interface UpdateUserEmail {
	type: ActionType.UPDATE_EMAIL;
	payload: string;
}

interface UpdateFirstName {
	type: ActionType.UPDATE_FIRST_NAME;
	payload: string;
}

interface UpdateLastName {
	type: ActionType.UPDATE_LAST_NAME;
	payload: string;
}

interface UpdateLastName {
	type: ActionType.UPDATE_LAST_NAME;
	payload: string;
}

interface UpdateShipping {
	type: ActionType.UPDATE_SHIPPING;
	payload: ShippingPayload;
}

export type UserActions =
	| GetUserAction
	| UpdateUserAction
	| GetUsersAction
	| AddToCartAction
	| RemoveFromCartAction
	| LowerQuantityAction
	| UpdateTotalDiscounts
	| UpdateTotal
	| AddToCartQuantityAction
	| RemoveNewsLetterDiscount
	| AddCouponDiscount
	| RemoveCouponDiscount
	| AddNewsLetterDiscount
	| UserSubmitDetails
	| UpdateUserCountry
	| UpdateUserCity
	| UpdateUserPostalCode
	| UpdateUserAddress
	| UpdateFirstName
	| UpdateShipping
	| UpdateLastName
	| UpdateUserRegion
	| UpdateUserEmail
	| CreateUserAction;
