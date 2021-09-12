import { ActionType } from "../actions/actionTypes";
import { UserActions } from "../actions";
import { Reducer } from "redux";

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

interface CartSchema {
	productName: string;
	productWeight: number;
	productId: string;
	totalPrice: number;
	productQuantity: number;
	price: number;
	_id: string;
}

interface UserSchema {
	firstName: string;
	lastName: string;
	guestID: string;
	auth0ID: string;
	couponDiscount: number;
	newsLetterDiscount: number;
	totalDiscounts: number;
	shippingCost: number;
	shippingMethod: string;
	createdAt?: string;
	total: number;
	email: string;
	address: string;
	city: string;
	postalCode: number;
	country: string;
	region: string;
	orders: OrdersArray;
	_id: string;
	cart: CartsArray;
	cartWeight: number;
	cartTotal: number;
}

type CartsArray = Array<CartSchema>;
type OrdersArray = Array<OrderSchema>;

let initialState: UserSchema = {
	firstName: "Guest",
	lastName: "",
	auth0ID: "",
	orders: [],
	couponDiscount: 0,
	email: "",
	guestID: "",
	address: "",
	city: "",
	postalCode: 0,
	country: "",
	createdAt: "",
	cartWeight: 0,
	region: "",
	newsLetterDiscount: 0,
	totalDiscounts: 0,
	shippingCost: 0,
	shippingMethod: "",
	total: 0,
	_id: "none",
	cart: [
		{
			productName: "none",
			productQuantity: 0,
			productId: "none",
			productWeight: 0,
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
			if (user._id == "none") return action.payload;

			return {
				...action.payload,
				_id: user._id,
			};
		case ActionType.GET_AUTH_USER:
			return {
				...action.payload,
				_id: user._id,
			};
		case ActionType.GET_USER:
			return {
				...action.payload,
				_id: user._id,
			};
		case ActionType.UPDATE_USER:
			return {
				...action.payload,
				_id: user._id,
			};
		case ActionType.REMOVE_FROM_CART:
			return {
				...action.payload,
				_id: user._id,
			};
		case ActionType.ADD_TO_CART:
			return {
				...action.payload,
				_id: user._id,
			};
		case ActionType.LOWER_QUANTITY:
			return {
				...action.payload,
				_id: user._id,
			};
		case ActionType.ADD_TO_CART_QUANTITY:
			return {
				...action.payload,
				_id: user._id,
			};
		case ActionType.ADD_COUPON_DISCOUNT:
			user.couponDiscount = action.payload;
			return user;
		case ActionType.REMOVE_COUPON_DISCOUNT:
			return {
				...user,
				totalDiscounts: 0,
				total: user.cartTotal,
				couponDiscount: 0,
				newsLetterDiscount: 0,
			};
		case ActionType.ADD_NEWSLETTER_DISCOUNT:
			user.newsLetterDiscount = action.payload;
			return user;
		case ActionType.REMOVE_NEWSLETTER_DISCOUNT:
			user.newsLetterDiscount = 0;
			return user;

		case ActionType.USER_SUBMIT_DETAILS:
			user.totalDiscounts = user.newsLetterDiscount + user.couponDiscount;
			user.total =
				user.cartTotal - (user.newsLetterDiscount + user.couponDiscount);
			return user;
		case ActionType.UPDATE_ADDRESS:
			user.address = action.payload;
			return user;
		case ActionType.UPDATE_CITY:
			user.city = action.payload;
			return user;
		case ActionType.UPDATE_COUNTRY:
			return {
				...user,
				country: action.payload,
			};
		case ActionType.UPDATE_REGION:
			user.region = action.payload;
			return user;
		case ActionType.UPDATE_POSTAL_CODE:
			user.postalCode = action.payload;
			return user;
		case ActionType.UPDATE_EMAIL:
			user.email = action.payload;
			return user;
		case ActionType.UPDATE_LAST_NAME:
			user.lastName = action.payload;
			return user;
		case ActionType.UPDATE_FIRST_NAME:
			user.firstName = action.payload;
			return user;
		case ActionType.UPDATE_SHIPPING:
			user.shippingCost = action.payload.newShippingCost;
			user.total = action.payload.newTotal;
			user.shippingMethod = action.payload.newShippingMethod;
			return user;

		case ActionType.PURCHASE_COMPLETE:
			return {
				...action.payload,
				_id: user._id,
			};

		default:
			return user;
	}
};

export default reducer;
